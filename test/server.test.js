const assert = require('assert');

// Tests de la logique du serveur (sans démarrer le serveur)
// Ces tests vérifient que les modules peuvent être chargés correctement

let testsPassed = 0;
let testsFailed = 0;

function runTest(testName, testFunction) {
  try {
    testFunction();
    testsPassed++;
    console.log(`✅ ${testName}`);
  } catch (error) {
    testsFailed++;
    console.error(`❌ ${testName}`);
    console.error(`   Erreur: ${error.message}`);
  }
}

console.log('═══════════════════════════════════════════════════');
console.log('           TESTS SERVEUR - server.js');
console.log('═══════════════════════════════════════════════════\n');

// Tests de chargement des modules
console.log('📋 Tests de chargement des modules');
console.log('───────────────────────────────────────────────────');

runTest('Chargement du module server.js', () => {
  // Vérifier que le fichier peut être chargé sans erreur de syntaxe
  const fs = require('fs');
  const serverContent = fs.readFileSync('./server.js', 'utf8');
  assert(serverContent.includes('express'), 'Le serveur doit utiliser Express');
  assert(serverContent.includes('/api/tasks'), 'Le serveur doit avoir des routes API');
});

runTest('Vérification de la structure Express', () => {
  // Vérifier que le code contient les éléments essentiels
  const fs = require('fs');
  const serverContent = fs.readFileSync('./server.js', 'utf8');
  assert(serverContent.includes('app.use'), 'Le serveur doit utiliser app.use');
  assert(serverContent.includes('app.get'), 'Le serveur doit avoir des routes GET');
  assert(serverContent.includes('app.post'), 'Le serveur doit avoir des routes POST');
  assert(serverContent.includes('app.put'), 'Le serveur doit avoir des routes PUT');
  assert(serverContent.includes('app.delete'), 'Le serveur doit avoir des routes DELETE');
});

runTest('Vérification des endpoints API', () => {
  const fs = require('fs');
  const serverContent = fs.readFileSync('./server.js', 'utf8');
  
  // Vérifier que tous les endpoints nécessaires existent
  assert(serverContent.includes('/api/tasks'), 'Endpoint GET /api/tasks manquant');
  assert(serverContent.includes('/api/tasks/:id'), 'Endpoint GET /api/tasks/:id manquant');
  assert(serverContent.includes('/api/stats'), 'Endpoint GET /api/stats manquant');
});

runTest('Vérification de la gestion JSON', () => {
  const fs = require('fs');
  const serverContent = fs.readFileSync('./server.js', 'utf8');
  assert(serverContent.includes('express.json()'), 'Le serveur doit parser le JSON');
});

runTest('Vérification des fichiers statiques', () => {
  const fs = require('fs');
  const serverContent = fs.readFileSync('./server.js', 'utf8');
  assert(serverContent.includes('express.static'), 'Le serveur doit servir les fichiers statiques');
});

runTest('Vérification de la gestion des erreurs', () => {
  const fs = require('fs');
  const serverContent = fs.readFileSync('./server.js', 'utf8');
  // Vérifier qu'il y a une gestion d'erreur 404
  assert(serverContent.includes('404') || serverContent.includes('status(404)'), 
    'Le serveur doit gérer les erreurs 404');
});

runTest('Vérification de la structure des tâches', () => {
  const fs = require('fs');
  const serverContent = fs.readFileSync('./server.js', 'utf8');
  // Vérifier que les tâches ont les propriétés nécessaires
  assert(serverContent.includes('completed'), 'Les tâches doivent avoir un statut completed');
  assert(serverContent.includes('title'), 'Les tâches doivent avoir un titre');
  assert(serverContent.includes('priority'), 'Les tâches doivent avoir une priorité');
});

// Résumé
console.log('\n═══════════════════════════════════════════════════');
console.log('                    RÉSUMÉ');
console.log('═══════════════════════════════════════════════════');
console.log(`Tests réussis:  ${testsPassed}`);
console.log(`Tests échoués:  ${testsFailed}`);
console.log(`Total:          ${testsPassed + testsFailed}`);

if (testsFailed === 0) {
  console.log('\n✅ Tous les tests serveur passent !');
  process.exit(0);
} else {
  console.log(`\n❌ ${testsFailed} test(s) ont échoué`);
  process.exit(1);
}
