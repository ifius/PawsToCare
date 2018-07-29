const faker = require('faker');
const json2csv = require('json2csv').parse;

let ownersArray = []

for(let animal=1; animal<=1000; animal++)
{
  ownersArray.push({animalFk: animal, ownersFk: faker.random.number({min:1,max:1000})});
  if(faker.random.number({min:1, max:100}) > 75) animal--; 
}

let csvOwners = json2csv(ownersArray,['animalFk','ownersFk']);
console.log(csvOwners);


