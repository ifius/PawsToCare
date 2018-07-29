const faker = require('faker');
const json2csv = require('json2csv').parse;


let fakeId = function() { return faker.random.number(1,1000) };

let fakeNote = [fakeId, faker.name.findName, faker.date.past, faker.lorem.text];

let notesArray = [];
for(let note = 0; note < 1000; note++)
{
  let fakedNote = fakeNote.map(f => f.call());
  fakedNote = {
    fk: fakedNote[0], vetName: fakedNote[1], date: fakedNote[2], note: fakedNote[3] 
  };
  notesArray.push(fakedNote);
}

let csvNotes = json2csv(notesArray,['fk', 'vetName', 'date', 'note']);
console.log(csvNotes);


