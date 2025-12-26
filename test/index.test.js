const assert = require('assert');
const { saluer, addition, multiplication } = require('../index.js');

// Tests pour la fonction saluer
console.log('Tests de la fonction saluer...');
assert.strictEqual(saluer('Alice'), 'Bonjour, Alice !', 'Devrait saluer Alice');
assert.strictEqual(saluer('Bob'), 'Bonjour, Bob !', 'Devrait saluer Bob');
assert.strictEqual(saluer(''), 'Bonjour,  !', 'Devrait gérer une chaîne vide');
console.log('Tous les tests de saluer() passent');

// Tests pour la fonction addition
console.log('Tests de la fonction addition...');
assert.strictEqual(addition(2, 3), 5, '2 + 3 devrait égaler 5');
assert.strictEqual(addition(0, 0), 0, '0 + 0 devrait égaler 0');
assert.strictEqual(addition(-1, 1), 0, '-1 + 1 devrait égaler 0');
assert.strictEqual(addition(10, -5), 5, '10 + (-5) devrait égaler 5');
console.log('Tous les tests de addition() passent');

// Tests pour la fonction multiplication
console.log('Tests de la fonction multiplication...');
assert.strictEqual(multiplication(2, 3), 6, '2 * 3 devrait égaler 6');
assert.strictEqual(multiplication(0, 5), 0, '0 * 5 devrait égaler 0');
assert.strictEqual(multiplication(-2, 3), -6, '-2 * 3 devrait égaler -6');

// ⚠️ TEST QUI VA ÉCHOUER INTENTIONNELLEMENT
// console.log('Test qui va échouer intentionnellement...');
// assert.strictEqual(multiplication(5, 5), 20, 'Ce test va échouer : 5 * 5 devrait égaler 25, pas 20');
// console.log('Tous les tests de multiplication() passent');

console.log('\n Tous les tests unitaires passent !');

