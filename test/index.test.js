const assert = require('assert');
const { saluer, addition, multiplication } = require('../index.js');

// Compteur de tests
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
console.log('           TESTS UNITAIRES - index.js');
console.log('═══════════════════════════════════════════════════\n');

// ============================================================
// Tests pour la fonction saluer
// ============================================================
console.log('📋 Tests de la fonction saluer()');
console.log('───────────────────────────────────────────────────');

runTest('saluer() avec un nom valide', () => {
  assert.strictEqual(saluer('Alice'), 'Bonjour, Alice !');
});

runTest('saluer() avec un autre nom', () => {
  assert.strictEqual(saluer('Bob'), 'Bonjour, Bob !');
});

runTest('saluer() avec une chaîne vide', () => {
  assert.strictEqual(saluer(''), 'Bonjour,  !');
});

runTest('saluer() avec un nom contenant des espaces', () => {
  assert.strictEqual(saluer('Jean Dupont'), 'Bonjour, Jean Dupont !');
});

// ============================================================
// Tests pour la fonction addition
// ============================================================
console.log('\n📋 Tests de la fonction addition()');
console.log('───────────────────────────────────────────────────');

runTest('addition() avec deux nombres positifs', () => {
  assert.strictEqual(addition(2, 3), 5);
});

runTest('addition() avec zéro', () => {
  assert.strictEqual(addition(0, 0), 0);
});

runTest('addition() avec nombres négatifs et positifs', () => {
  assert.strictEqual(addition(-1, 1), 0);
});

runTest('addition() avec nombre positif et négatif', () => {
  assert.strictEqual(addition(10, -5), 5);
});

runTest('addition() avec deux nombres négatifs', () => {
  assert.strictEqual(addition(-5, -3), -8);
});

runTest('addition() avec grands nombres', () => {
  assert.strictEqual(addition(1000, 2000), 3000);
});

// ============================================================
// Tests pour la fonction multiplication
// ============================================================
console.log('\n📋 Tests de la fonction multiplication()');
console.log('───────────────────────────────────────────────────');

runTest('multiplication() avec deux nombres positifs', () => {
  assert.strictEqual(multiplication(2, 3), 6);
});

runTest('multiplication() avec zéro', () => {
  assert.strictEqual(multiplication(0, 5), 0);
  assert.strictEqual(multiplication(5, 0), 0);
});

runTest('multiplication() avec nombre négatif', () => {
  assert.strictEqual(multiplication(-2, 3), -6);
  assert.strictEqual(multiplication(2, -3), -6);
});

runTest('multiplication() avec deux nombres négatifs', () => {
  assert.strictEqual(multiplication(-2, -3), 6);
});

runTest('multiplication() avec un', () => {
  assert.strictEqual(multiplication(5, 1), 5);
  assert.strictEqual(multiplication(1, 5), 5);
});

// ============================================================
// Résumé des tests
// ============================================================
console.log('\n═══════════════════════════════════════════════════');
console.log('                    RÉSUMÉ');
console.log('═══════════════════════════════════════════════════');
console.log(`Tests réussis:  ${testsPassed}`);
console.log(`Tests échoués:  ${testsFailed}`);
console.log(`Total:          ${testsPassed + testsFailed}`);

if (testsFailed === 0) {
  console.log('\n✅ Tous les tests unitaires passent !');
  process.exit(0);
} else {
  console.log(`\n❌ ${testsFailed} test(s) ont échoué`);
  process.exit(1);
}

