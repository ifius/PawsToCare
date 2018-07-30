let dogsData = [];
let sorteddogsData = [];

$(() => {
  const table = $('[data-table=\'dogs\']');
  const dataUrl = table.attr('data-url');
  $.ajax({ url: dataUrl }).done(data => {
    dogsData = data[0];
    sorteddogsData = data[0];
    buildTable();
  });
});

function buildTable() {
  const table = $('[data-table=\'dogs\']');
  table.append(buildHeader);
  buildTableBody();
}


function buildTableBody() {
  let dogs = filterdogs();
  const table = $('[data-table=\'dogs\']');
  $(table).find('thead > tr > td > span[id$=Sort]').addClass('invisible');
  $('table').find('span#resultCount').text(dogs.length);
  table.append($('<tbody>').html(dogs.map(buildRow)));
  let sortColumn = table.attr('data-sortColumn');
  let sortDirection = table.attr('data-sortDirection');
  let sortSpan = $(table).find(`thead > tr > td > span[id=${sortColumn}Sort]`);
  $(sortSpan).removeClass('invisible');
  if (sortDirection === 'ascending')  $(sortSpan).text('▲');
  else $(sortSpan).text('▼');  
}

function clearTable() {
  $('[data-table=\'dogs\'] > tbody').remove();
}

function redisplayTable() {
  clearTable();
  buildTableBody();
}

function buildHeader() {
  let header = $('<td>', {
    html: $('<span>').text('Name').add($('<span>', {id: 'NameSort', class: 'd-inline float-right invisible'}).text('▲')),
    title: 'Dog\'s Name',
    class: 'clickable filterable'
  })
    .click(sortdogsByName)
    .add(
      $('<td>', {
        html: $('<span>', {class:'d-inline'}).text('Breed').add($('<span>', {id: 'BreedSort', class: 'd-inline float-right invisible'}).text('▲')),
        title: 'Breed of dog',
        class: 'clickable filterable'
      }).click(sortdogsByBreed)
    )
    .add(
      $('<td>', {
        html: $('<span>', {class:'d-inline'}).text('Sex').add($('<span>', {id: 'SexSort', class: 'd-inline float-right invisible'}).text('▲')),
        title: 'Sex of dog',
        class: 'clickable filterable'
      }).click(sortdogsBySex)
    )
    .add(
      $('<td>', {
        html: $('<span>', {class:'d-inline'}).text('Shots').add($('<span>', {id: 'ShotsSort', class: 'd-inline float-right invisible'}).text('▲')),
        title: 'Does the dog have all their shots?',
        class: 'clickable filterable'
      }).click(sortdogsByShots)
    )
    .add(
      $('<td>', {
        html: $('<span>', {class:'d-inline'}).text('Age').add($('<span>', {id: 'AgeSort', class: 'd-inline float-right invisible'}).text('▲')),
        title: 'How old is the dog?',
        class: 'clickable filterable'
      }).click(sortdogsByAge)
    )
    .add( 
      $('<td>', {
        html: $('<span>', {class:'d-inline'}).text('Size').add($('<span>', {id: 'SizeSort', class: 'd-inline float-right invisible'}).text('▲')),
        title: 'S < 20 lbs. | M < 50 lbs. | L < 100 lbs. | G >= 100 lbs.',
        class: 'clickable filterable'
      }).click(sortdogsBySize)
    )
    .add(
      $('<td>', {
        html: $('<span>', {class:'d-inline'}).text('Licensed').add($('<span>', {id: 'LicensedSort', class: 'd-inline float-right invisible'}).text('▲')),
        title: 'Is the dog licensed?',
        class: 'clickable filterable'
      }).click(sortdogsByLicensed)
    )
    .add(
      $('<td>', {
        html: $('<span>', {class:'d-inline'}).text('Neutered').add($('<span>', {id: 'NeuteredSort', class: 'd-inline float-right invisible'}).text('▲')),
        title: 'Is the dog neutered?',
        class: 'clickable filterable'
      }).click(sortdogsByNeutered)
    )
    .add(
      $('<td>', {
        text: 'Owners',
        title: 'Who owns this dog?'
      })
    )
    .add(
      $('<td>', {
        text: 'Notes',
        title: 'Veterinarian notes about this dog'
      })
    );

  $(header).attr('data-toggle', 'tooltip');
  $(header).tooltip();

  let inputHeader = $('<td>').append($('<input>', {class: 'form-control', placeholder: 'filter', id: 'nameFilter'}).keyup(debounceFilter))
    .add($('<td>').append($('<input>', {class: 'form-control',placeholder: 'filter', id: 'breedFilter'}).keyup(debounceFilter)))
    .add($('<td>').append($('<select>', {class: 'form-control', id: 'sexFilter'}).change(redisplayTable)
      .append($('<option>', {value: '', text: 'All'}))
      .append($('<option>', {value: 'M', text: 'M'}))
      .append($('<option>', {value: 'F', text: 'F'}))))
    .add($('<td>').append($('<select>', {class: 'form-control', id: 'shotsFilter'}).change(redisplayTable)
      .append($('<option>', {value: '', text: 'All'}))
      .append($('<option>', {value: '1', text: 'Yes'}))
      .append($('<option>', {value: '0', text: 'No'}))))
    .add($('<td>').append($('<input>', {class: 'form-control w-25 d-inline',placeholder: 'begin', id: 'ageBeginFilter'}).keyup(debounceFilter))
      .append($('<span>').text(' - '))
      .append($('<input>', {class: 'form-control w-25 d-inline',placeholder: 'end', id: 'ageEndFilter'}).keyup(debounceFilter)))
    .add($('<td>').append($('<select>', {class: 'form-control', id: 'sizeFilter'}).change(redisplayTable)
      .append($('<option>', {value: '', text: 'All'}))
      .append($('<option>', {value: 'S', text: 'Small'}))
      .append($('<option>', {value: 'M', text: 'Medium'}))
      .append($('<option>', {value: 'L', text: 'Large'}))
      .append($('<option>', {value: 'G', text: 'Great'}))))
    .add($('<td>').append($('<select>', {class: 'form-control', id: 'licensedFilter'}).change(redisplayTable)
      .append($('<option>', {value: '', text: 'All'}))
      .append($('<option>', {value: '1', text: 'Yes'}))
      .append($('<option>', {value: '0', text: 'No'}))))
    .add($('<td>').append($('<select>', {class: 'form-control', id: 'neuteredFilter'}).change(redisplayTable)
      .append($('<option>', {value: '', text: 'All'}))
      .append($('<option>', {value: '1', text: 'Yes'}))
      .append($('<option>', {value: '0', text: 'No'}))))
    .add($('<td>'))
    .add($('<td>'));

  return $('<thead>').html($('<tr>').append(header).add($('<tr>').append(inputHeader)));
}

function buildRow(dog) {
  let row = $('<td>', { text: dog.name })
    .add($('<td>', { text: dog.breed }))
    .add($('<td>', { text: dog.sex }))
    .add($('<td>', { text: dog.shots ? '✔' : '✘', class: dog.shots ? 'text-success' : 'text-failure'}))
    .add($('<td>', { text: dog.age }))
    .add($('<td>', { text: dogSizeForDisplay(dog.weight) }))
    .add($('<td>', { text: dog.licensed ? '✔' : '✘', class: dog.licensed ? 'text-success' : 'text-failure'}))
    .add($('<td>', { text: dog.neutered ? '✔' : '✘', class: dog.neutered ? 'text-success' : 'text-failure'}))
    .add(
      $('<td>', {
        html: $('<button>', {
          text: 'Details',
          class: 'btn btn-primary',
          'data-toggle': 'modal',
          'data-target': '#ownersModal'
        })
      })
    )
    .add(
      $('<td>', {
        html: $('<button>', {
          text: 'Details',
          class: 'btn btn-primary',
          'data-toggle': 'modal',
          'data-target': '#notesModal'
        })
      })
    );
  return $('<tr>').html(row).attr('id',dog.id);
}

function dogSizeForDisplay(weight) {
  if(weight < 20) return 'S';
  if(weight < 50) return 'M';
  if(weight < 100) return 'L';
  return 'G';
}

function sortdogsByName(event) {
  let header = $(event.target);
  let table = header.closest('table');
  if (
    table.attr('data-sortDirection') === 'ascending' &&
    table.attr('data-sortColumn') === 'Name'
  ) {
    table.attr('data-sortDirection', 'descending');
    table.attr('data-sortColumn', 'Name');
    sorteddogsData = dogsData.sort(dogNamesSort);
  } else {
    table.attr('data-sortDirection', 'ascending');
    table.attr('data-sortColumn', 'Name');
    sorteddogsData = dogsData.sort(dogNamesDescendingSort);
  }
  redisplayTable();
}

function dogNamesSort(a, b) {
  const sortA = a.name;
  const sortB = b.name;
  return sortB.toLowerCase().localeCompare(sortA.toLowerCase());
}

function dogNamesDescendingSort(a, b) {
  return dogNamesSort(b, a);
}

function sortdogsByBreed(event) {
  let header = $(event.target);
  let table = header.closest('table');
  if (
    table.attr('data-sortDirection') === 'ascending' &&
    table.attr('data-sortColumn') === 'Breed'
  ) {
    table.attr('data-sortDirection', 'descending');
    table.attr('data-sortColumn', 'Breed');
    sorteddogsData = dogsData.sort(dogBreedSort);
  } else {
    table.attr('data-sortDirection', 'ascending');
    table.attr('data-sortColumn', 'Breed');
    sorteddogsData = dogsData.sort(dogBreedDescendingSort);
  }
  redisplayTable();
}

function dogBreedSort(a, b) {
  const sortA = a.breed;
  const sortB = b.breed;
  return sortB.toLowerCase().localeCompare(sortA.toLowerCase());
}

function dogBreedDescendingSort(a, b) {
  return dogBreedSort(b, a);
}

function sortdogsBySex(event) {
  let header = $(event.target);
  let table = header.closest('table');
  if (
    table.attr('data-sortDirection') === 'ascending' &&
    table.attr('data-sortColumn') === 'Sex'
  ) {
    table.attr('data-sortDirection', 'descending');
    table.attr('data-sortColumn', 'Sex');
    sorteddogsData = dogsData.sort(dogSexSort);
  } else {
    table.attr('data-sortDirection', 'ascending');
    table.attr('data-sortColumn', 'Sex');
    sorteddogsData = dogsData.sort(dogSexDescendingSort);
  }
  redisplayTable();
}

function dogSexSort(a, b) {
  const sortA = a.sex;
  const sortB = b.sex;
  return sortB.toLowerCase().localeCompare(sortA.toLowerCase());
}

function dogSexDescendingSort(a, b) {
  return dogSexSort(b, a);
}

function sortdogsByShots(event) {
  let header = $(event.target);
  let table = header.closest('table');
  if (
    table.attr('data-sortDirection') === 'ascending' &&
    table.attr('data-sortColumn') === 'Shots'
  ) {
    table.attr('data-sortDirection', 'descending');
    table.attr('data-sortColumn', 'Shots');
    sorteddogsData = dogsData.sort(dogShotsSort);
  } else {
    table.attr('data-sortDirection', 'ascending');
    table.attr('data-sortColumn', 'Shots');
    sorteddogsData = dogsData.sort(dogShotsDescendingSort);
  }
  redisplayTable();
}

function dogShotsSort(a, b) {
  const sortA = a.shots;
  const sortB = b.shots;
  return (sortA ? 1 : 0) < (sortB ? 1 : 0);
}

function dogShotsDescendingSort(a, b) {
  return dogShotsSort(b, a);
}

function sortdogsByAge(event) {
  let header = $(event.target);
  let table = header.closest('table');
  if (
    table.attr('data-sortDirection') === 'ascending' &&
    table.attr('data-sortColumn') === 'Age'
  ) {
    table.attr('data-sortDirection', 'descending');
    table.attr('data-sortColumn', 'Age');
    sorteddogsData = dogsData.sort(dogAgeSort);
  } else {
    table.attr('data-sortDirection', 'ascending');
    table.attr('data-sortColumn', 'Age');
    sorteddogsData = dogsData.sort(dogAgeDescendingSort);
  }
  redisplayTable();
}

function dogAgeSort(a, b) {
  const sortA = a.age;
  const sortB = b.age;
  return sortB - sortA;
}

function dogAgeDescendingSort(a, b) {
  return dogAgeSort(b, a);
}

function sortdogsBySize(event) {
  let header = $(event.target);
  let table = header.closest('table');
  if (
    table.attr('data-sortDirection') === 'ascending' &&
    table.attr('data-sortColumn') === 'Size'
  ) {
    table.attr('data-sortDirection', 'descending');
    table.attr('data-sortColumn', 'Size');
    sorteddogsData = dogsData.sort(dogSizeSort);
  } else {
    table.attr('data-sortDirection', 'ascending');
    table.attr('data-sortColumn', 'Size');
    sorteddogsData = dogsData.sort(dogSizeDescendingSort);
  }
  redisplayTable();
}

function dogSizeSort(a, b) {
  const sortA = a.weight;
  const sortB = b.weight;
  return sortB - sortA;
}

function dogSizeDescendingSort(a, b) {
  return dogSizeSort(b, a);
}

function sortdogsByLicensed(event) {
  let header = $(event.target);
  let table = header.closest('table');
  if (
    table.attr('data-sortDirection') === 'ascending' &&
    table.attr('data-sortColumn') === 'Licensed'
  ) {
    table.attr('data-sortDirection', 'descending');
    table.attr('data-sortColumn', 'Licensed');
    sorteddogsData = dogsData.sort(dogLicensedSort);
  } else {
    table.attr('data-sortDirection', 'ascending');
    table.attr('data-sortColumn', 'Licensed');
    sorteddogsData = dogsData.sort(dogLicensedDescendingSort);
  }
  redisplayTable();
}

function dogLicensedSort(a, b) {
  const sortA = a.licensed;
  const sortB = b.licensed;
  return (sortA ? 1 : 0) < (sortB ? 1 : 0);
}

function dogLicensedDescendingSort(a, b) {
  return dogLicensedSort(b, a);
}

function sortdogsByNeutered(event) {
  let header = $(event.target);
  let table = header.closest('table');
  if (
    table.attr('data-sortDirection') === 'ascending' &&
    table.attr('data-sortColumn') === 'Neutered'
  ) {
    table.attr('data-sortDirection', 'descending');
    table.attr('data-sortColumn', 'Neutered');
    sorteddogsData = dogsData.sort(dogNeuteredSort);
  } else {
    table.attr('data-sortDirection', 'ascending');
    table.attr('data-sortColumn', 'Neutered');
    sorteddogsData = dogsData.sort(dogNeuteredDescendingSort);
  }
  redisplayTable();
}

function dogNeuteredSort(a, b) {
  const sortA = a.neutered;
  const sortB = b.neutered;
  return (sortA ? 1 : 0) < (sortB ? 1 : 0);
}

function dogNeuteredDescendingSort(a, b) {
  return dogNeuteredSort(b, a);
}

function filterdogs () {
  let filteredData = 
        sorteddogsData
          .filter(dog => dog.name.toLowerCase().startsWith($('input#nameFilter').val().toLowerCase()))
          .filter(dog => dog.breed.toLowerCase().startsWith($('input#breedFilter').val().toLowerCase()))
          .filter(dog => dog.sex.startsWith($('select#sexFilter').val()))
          .filter(dog => $('select#shotsFilter').val() === '' || dog.shots == $('select#shotsFilter').val())
          .filter(dog => ($('input#ageBeginFilter').val() === '' && $('input#ageEndFilter').val() === '') || 
                ($('input#ageBeginFilter').val() === '' && dog.age <= $('input#ageEndFilter').val()) ||
                (dog.age >= $('input#ageBeginFilter').val() && $('input#ageEndFilter').val() === '') ||
                (dog.age >= $('input#ageBeginFilter').val() && dog.age <= $('input#ageEndFilter').val()))
          .filter(dog => dogSizeForDisplay(dog.weight).startsWith($('select#sizeFilter').val()))
          .filter(dog => $('select#licensedFilter').val() === '' || dog.licensed == $('select#licensedFilter').val())
          .filter(dog => $('select#neuteredFilter').val() === '' || dog.neutered == $('select#neuteredFilter').val());
  return filteredData;
}

const debounceFilter = _.debounce(redisplayTable, 500);
