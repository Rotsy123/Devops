let currentFilter = 'all';

// Charger les tâches au démarrage
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    loadStats();
});

async function loadTasks() {
    try {
        const url = currentFilter === 'all' ? '/api/tasks' : `/api/tasks?status=${currentFilter}`;
        const response = await fetch(url);
        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        console.error('Erreur lors du chargement des tâches:', error);
    }
}

async function loadStats() {
    try {
        const response = await fetch('/api/stats');
        const stats = await response.json();
        document.getElementById('statTotal').textContent = stats.total;
        document.getElementById('statActive').textContent = stats.active;
        document.getElementById('statCompleted').textContent = stats.completed;
        document.getElementById('statRate').textContent = stats.completionRate + '%';
    } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
    }
}

function displayTasks(tasks) {
    const tasksList = document.getElementById('tasksList');
    
    if (tasks.length === 0) {
        tasksList.innerHTML = '<p class="empty-state">Aucune tâche</p>';
        return;
    }
    
    tasksList.innerHTML = tasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}">
            <input 
                type="checkbox" 
                class="task-checkbox" 
                ${task.completed ? 'checked' : ''}
                onchange="toggleTask(${task.id})"
            />
            <div class="task-content">
                <div class="task-title">${escapeHtml(task.title)}</div>
                ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
                <div class="task-meta">
                    <span class="task-priority ${task.priority}">${getPriorityLabel(task.priority)}</span>
                    <span>${formatDate(task.createdAt)}</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="btn-icon" onclick="deleteTask(${task.id})">Supprimer</button>
            </div>
        </div>
    `).join('');
}

async function addTask() {
    const titleInput = document.getElementById('taskTitle');
    const descriptionInput = document.getElementById('taskDescription');
    const priorityInput = document.getElementById('taskPriority');
    
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const priority = priorityInput.value;
    
    if (!title) {
        return;
    }
    
    try {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description, priority })
        });
        
        if (response.ok) {
            titleInput.value = '';
            descriptionInput.value = '';
            priorityInput.value = 'medium';
            loadTasks();
            loadStats();
        }
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la tâche:', error);
    }
}

async function toggleTask(id) {
    try {
        // Récupérer la tâche actuelle
        const getResponse = await fetch(`/api/tasks/${id}`);
        if (!getResponse.ok) {
            console.error('Erreur lors de la récupération de la tâche');
            return;
        }
        
        const task = await getResponse.json();
        
        // Mettre à jour le statut
        const putResponse = await fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: !task.completed })
        });
        
        if (putResponse.ok) {
            loadTasks();
            loadStats();
        }
    } catch (error) {
        console.error('Erreur lors de la modification de la tâche:', error);
    }
}

async function deleteTask(id) {
    if (!confirm('Supprimer cette tâche ?')) {
        return;
    }
    
    try {
        await fetch(`/api/tasks/${id}`, {
            method: 'DELETE'
        });
        
        loadTasks();
        loadStats();
    } catch (error) {
        console.error('Erreur lors de la suppression de la tâche:', error);
    }
}

function filterTasks(filter) {
    currentFilter = filter;
    
    // Mettre à jour les boutons de filtre
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    loadTasks();
}

function getPriorityLabel(priority) {
    const labels = {
        low: 'Faible',
        medium: 'Moyenne',
        high: 'Haute'
    };
    return labels[priority] || priority;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
