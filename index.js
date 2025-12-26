function saluer(nom) {
  return `Bonjour, ${nom} !`;
}

function addition(a, b) {
  return a + b;
}

module.exports = {
  saluer,
  addition
};

if (require.main === module) {
  console.log(saluer('Monde'));
  console.log(`Résultat de 5 + 3 = ${addition(5, 3)}`);
}

