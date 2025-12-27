const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir les fichiers statiques depuis le dossier public
app.use(express.static('public'));

// Parser JSON pour les requêtes POST
app.use(express.json());

// Stockage en mémoire des tâches (en production, utiliser une base de données)
let tasks = [];
let taskIdCounter = 1;

// API endpoints pour les tâches
app.get('/api/tasks', (req, res) => {
  const { status } = req.query;
  let filteredTasks = tasks;
  
  if (status === 'active') {
    filteredTasks = tasks.filter(task => !task.completed);
  } else if (status === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  }
  
  res.json(filteredTasks);
});

app.get('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  
  if (!task) {
    return res.status(404).json({ error: 'Tâche non trouvée' });
  }
  
  res.json(task);
});

app.post('/api/tasks', (req, res) => {
  const { title, description, priority } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Le titre est requis' });
  }
  
  const newTask = {
    id: taskIdCounter++,
    title: title.trim(),
    description: description ? description.trim() : '',
    priority: priority || 'medium',
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  
  if (!task) {
    return res.status(404).json({ error: 'Tâche non trouvée' });
  }
  
  const { title, description, priority, completed } = req.body;
  
  if (title !== undefined) task.title = title.trim();
  if (description !== undefined) task.description = description.trim();
  if (priority !== undefined) task.priority = priority;
  if (completed !== undefined) task.completed = completed;
  
  res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tâche non trouvée' });
  }
  
  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

app.get('/api/stats', (req, res) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const active = total - completed;
  
  res.json({
    total,
    active,
    completed,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
  });
});

// Route par défaut
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

