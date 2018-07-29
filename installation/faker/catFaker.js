const faker = require('faker');
const json2csv = require('json2csv').parse;

let catBreeds = [
'Abyssinian',
'Aegean',
'American Curl',
'American Bobtail',
'American Shorthair',
'American Wirehair',
'Aphrodite Giant',
'Arabian Mau',
'Australian Mist',
'Asian',
'Asian Semi-longhair',
'Balinese',
'Bambino',
'Bengal',
'Birman',
'Bombay',
'Brazilian Shorthair',
'British Semi-longhair',
'British Shorthair',
'British Longhair',
'Burmese',
'Burmilla',
'California Spangled',
'Chantilly-Tiffany',
'Chartreux',
'Chausie',
'Cheetoh',
'Colorpoint Shorthair',
'Cornish Rex',
'Cymric',
'Cyprus',
'Devon Rex',
'Donskoy',
'Dragon Li',
'Dwelf',
'Egyptian Mau',
'European Shorthair',
'Exotic Shorthair',
'Foldex[5]',
'German Rex',
'Havana Brown',
'Highlander',
'Himalayan',
'Japanese Bobtail',
'Javanese',
'Karelian Bobtail',
'Khao Manee',
'Korat',
'Korean Bobtail',
'Korn Ja',
'Kurilian Bobtail',
'LaPerm',
'Lykoi',
'Maine Coon',
'Manx',
'Mekong Bobtail',
'Minskin',
'Munchkin',
'Nebelung',
'Napoleon',
'Norwegian Forest cat',
'Ocicat',
'Ojos Azules',
'Oregon Rex',
'Oriental Bicolor',
'Oriental Shorthair',
'Oriental Longhair',
'Persian (modern)',
'Persian (traditional)',
'Peterbald',
'Pixie-bob',
'Raas',
'Ragamuffin',
'Ragdoll',
'Russian Blue',
'Russian White',
'Sam Sawet',
'Savannah',
'Scottish Fold',
'Selkirk Rex',
'Serengeti',
'Serrade petit',
'Siamese ',
'Siberian',
'Singapura',
'Snowshoe',
'Sokoke',
'Somali',
'Sphynx',
'Suphalak',
'Thai',
'Thai Lilac',
'Tonkinese',
'Toyger',
'Turkish Angora',
'Turkish Van',
'Ukrainian Levkoy',
'York Chocolate'];

let randomBreed = function() { return faker.random.arrayElement(catBreeds); };
let randomSex = function() { return faker.random.arrayElement(['M','F','U']); };
let randomDate = function() {let date = faker.date.past(); return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`};

// name, breed, sex, shots, declawed, neutered, birthdate
let fakeCat = [faker.name.firstName, randomBreed, randomSex, faker.random.boolean, faker.random.boolean, faker.random.boolean, randomDate];

let catsArray = [];
for(let cat = 0; cat < 1000; cat++)
{
  let fakedCat = fakeCat.map(f => f.call());
  fakedCat = {
    name: fakedCat[0], breed: fakedCat[1], sex: fakedCat[2], 
    shots: fakedCat[3] ? 1 : 0, declawed: fakedCat[4] ? 1 : 0, neutered: fakedCat[5] ? 1 : 0, 
    birthdate: fakedCat[6]
  };
  catsArray.push(fakedCat);
}

let csvCats = json2csv(catsArray,['name','breed','sex','shots','declawed','neutered','birthdate']);
console.log(csvCats);


