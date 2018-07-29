const faker = require('faker');
const json2csv = require('json2csv').parse;

let fakeSecondaryAddress = function() { return faker.random.number({min:0, max:100}) > 75 ? faker.address.secondaryAddress() : null };

let fakeOwner = [faker.name.firstName, faker.name.lastName, faker.address.streetAddress, fakeSecondaryAddress, faker.address.city, faker.address.stateAbbr, faker.address.zipCode];

let ownersArray = [];
for(let owner = 0; owner < 1000; owner++)
{
  let fakedOwner = fakeOwner.map(f => f.call());
  fakedOwner = {
    fname: fakedOwner[0], lname: fakedOwner[1], add1: fakedOwner[2], add2: fakedOwner[3],
    city: fakedOwner[4], st: fakedOwner[5], zip: fakedOwner[6].slice(0,5)
  };
  ownersArray.push(fakedOwner);
}

let csvOwners = json2csv(ownersArray,['fname','lname','add1','add2','city','st','zip']);
console.log(csvOwners);


