const assert = require('assert');
const { saluer, addition } = require('../index.js');

// Tests pour la fonction saluer
console.log('🧪 Tests de la fonction saluer...');
assert.strictEqual(saluer('Alice'), 'Bonjour, Alice !', 'Devrait saluer Alice');
assert.strictEqual(saluer('Bob'), 'Bonjour, Bob !', 'Devrait saluer Bob');
assert.strictEqual(saluer(''), 'Bonjour,  !', 'Devrait gérer une chaîne vide');
console.log('✅ Tous les tests de saluer() passent');

// Tests pour la fonction addition
console.log('🧪 Tests de la fonction addition...');
assert.strictEqual(addition(2, 3), 5, '2 + 3 devrait égaler 5');
assert.strictEqual(addition(0, 0), 0, '0 + 0 devrait égaler 0');
assert.strictEqual(addition(-1, 1), 0, '-1 + 1 devrait égaler 0');
assert.strictEqual(addition(10, -5), 5, '10 + (-5) devrait égaler 5');
console.log('✅ Tous les tests de addition() passent');

console.log('\n🎉 Tous les tests unitaires passent !');

