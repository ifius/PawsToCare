let catsData = [];
let sortedCatsData = [];

$(() => {
  const table = $('[data-table=\'cats\']');
  const dataUrl = table.attr('data-url');
  $.ajax({ url: dataUrl }).done(data => {
    catsData = data[0];
    sortedCatsData = data[0];
    buildTable();
  });
});

function buildTable() {
  const table = $('[data-table=\'cats\']');
  table.append(buildHeader);
  buildTableBody();
}

function buildTableBody() {
  let cats = filterCats();
  const table = $('[data-table=\'cats\']');
  $(table)
    .find('thead > tr > td > span[id$=Sort]')
    .addClass('invisible');
  $('table')
    .find('span#resultCount')
    .text(cats.length);
  table.append($('<tbody>').html(cats.map(buildRow)));
  let sortColumn = table.attr('data-sortColumn');
  let sortDirection = table.attr('data-sortDirection');
  let sortSpan = $(table).find(`thead > tr > td > span[id=${sortColumn}Sort]`);
  $(sortSpan).removeClass('invisible');
  if (sortDirection === 'ascending') $(sortSpan).text('▲');
  else $(sortSpan).text('▼');
}

function clearTable() {
  $('[data-table=\'cats\'] > tbody').remove();
}

function redisplayTable() {
  clearTable();
  buildTableBody();
}

function buildHeader() {
  let header = $('<td>', {
    html: $('<span>')
      .text('Name')
      .add(
        $('<span>', {
          id: 'NameSort',
          class: 'd-inline float-right invisible'
        }).text('▲')
      ),
    title: 'Cat\'s Name',
    class: 'clickable filterable'
  })
    .click(sortCatsByName)
    .add(
      $('<td>', {
        html: $('<span>', { class: 'd-inline' })
          .text('Breed')
          .add(
            $('<span>', {
              id: 'BreedSort',
              class: 'd-inline float-right invisible'
            }).text('▲')
          ),
        title: 'Breed of cat',
        class: 'clickable filterable'
      }).click(sortCatsByBreed)
    )
    .add(
      $('<td>', {
        html: $('<span>', { class: 'd-inline' })
          .text('Sex')
          .add(
            $('<span>', {
              id: 'SexSort',
              class: 'd-inline float-right invisible'
            }).text('▲')
          ),
        title: 'Sex of cat',
        class: 'clickable filterable'
      }).click(sortCatsBySex)
    )
    .add(
      $('<td>', {
        html: $('<span>', { class: 'd-inline' })
          .text('Shots')
          .add(
            $('<span>', {
              id: 'ShotsSort',
              class: 'd-inline float-right invisible'
            }).text('▲')
          ),
        title: 'Does the cat have all their shots?',
        class: 'clickable filterable'
      }).click(sortCatsByShots)
    )
    .add(
      $('<td>', {
        html: $('<span>', { class: 'd-inline' })
          .text('Age')
          .add(
            $('<span>', {
              id: 'AgeSort',
              class: 'd-inline float-right invisible'
            }).text('▲')
          ),
        title: 'How old is the cat?',
        class: 'clickable filterable'
      }).click(sortCatsByAge)
    )
    .add(
      $('<td>', {
        html: $('<span>', { class: 'd-inline' })
          .text('Declawed')
          .add(
            $('<span>', {
              id: 'DeclawedSort',
              class: 'd-inline float-right invisible'
            }).text('▲')
          ),
        title: 'Has the cat been declawed?',
        class: 'clickable filterable'
      }).click(sortCatsByDeclawed)
    )
    .add(
      $('<td>', {
        html: $('<span>', { class: 'd-inline' })
          .text('Neutered')
          .add(
            $('<span>', {
              id: 'NeuteredSort',
              class: 'd-inline float-right invisible'
            }).text('▲')
          ),
        title: 'Is the cat neutered?',
        class: 'clickable filterable'
      }).click(sortCatsByNeutered)
    )
    .add(
      $('<td>', {
        text: 'Owners',
        title: 'Who owns this cat?'
      })
    )
    .add(
      $('<td>', {
        text: 'Notes',
        title: 'Veterinarian notes about this cat'
      })
    );

  $(header).attr('data-toggle', 'tooltip');
  $(header).tooltip();

  let inputHeader = $('<td>')
    .append(
      $('<input>', {
        class: 'form-control',
        placeholder: 'filter',
        id: 'nameFilter'
      }).keyup(catsDebounceFilter)
    )
    .add(
      $('<td>').append(
        $('<input>', {
          class: 'form-control',
          placeholder: 'filter',
          id: 'breedFilter'
        }).keyup(catsDebounceFilter)
      )
    )
    .add(
      $('<td>').append(
        $('<select>', { class: 'form-control', id: 'sexFilter' })
          .change(redisplayTable)
          .append($('<option>', { value: '', text: 'All' }))
          .append($('<option>', { value: 'M', text: 'M' }))
          .append($('<option>', { value: 'F', text: 'F' }))
      )
    )
    .add(
      $('<td>').append(
        $('<select>', { class: 'form-control', id: 'shotsFilter' })
          .change(redisplayTable)
          .append($('<option>', { value: '', text: 'All' }))
          .append($('<option>', { value: '1', text: 'Yes' }))
          .append($('<option>', { value: '0', text: 'No' }))
      )
    )
    .add(
      $('<td>')
        .append(
          $('<input>', {
            class: 'form-control w-25 d-inline',
            placeholder: 'begin',
            id: 'ageBeginFilter'
          }).keyup(catsDebounceFilter)
        )
        .append($('<span>').text(' - '))
        .append(
          $('<input>', {
            class: 'form-control w-25 d-inline',
            placeholder: 'end',
            id: 'ageEndFilter'
          }).keyup(catsDebounceFilter)
        )
    )
    .add(
      $('<td>').append(
        $('<select>', { class: 'form-control', id: 'declawedFilter' })
          .change(redisplayTable)
          .append($('<option>', { value: '', text: 'All' }))
          .append($('<option>', { value: '1', text: 'Yes' }))
          .append($('<option>', { value: '0', text: 'No' }))
      )
    )
    .add(
      $('<td>').append(
        $('<select>', { class: 'form-control', id: 'neuteredFilter' })
          .change(redisplayTable)
          .append($('<option>', { value: '', text: 'All' }))
          .append($('<option>', { value: '1', text: 'Yes' }))
          .append($('<option>', { value: '0', text: 'No' }))
      )
    )
    .add($('<td>'))
    .add($('<td>'));

  return $('<thead>').html(
    $('<tr>')
      .append(header)
      .add($('<tr>').append(inputHeader))
  );
}

function buildRow(cat) {
  let row = $('<td>', { text: cat.name })
    .add($('<td>', { text: cat.breed }))
    .add($('<td>', { text: cat.sex }))
    .add($('<td>', { text: cat.shots ? '✔' : '✘', class: cat.shots ? 'text-success' : 'text-danger'}))
    .add($('<td>', { text: cat.age }))
    .add($('<td>', { text: cat.declawed ? '✔' : '✘', class: cat.declawed ? 'text-success' : 'text-danger'}))
    .add($('<td>', { text: cat.neutered ? '✔' : '✘', class: cat.neutered ? 'text-success' : 'text-danger'}))
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
  return $('<tr>').html(row).attr('id',cat.id);
}

function sortCatsByName(event) {
  let header = $(event.target);
  let table = header.closest('table');
  if (
    table.attr('data-sortDirection') === 'ascending' &&
    table.attr('data-sortColumn') === 'Name'
  ) {
    table.attr('data-sortDirection', 'descending');
    table.attr('data-sortColumn', 'Name');
    sortedCatsData = catsData.sort(catNamesSort);
  } else {
    table.attr('data-sortDirection', 'ascending');
    table.attr('data-sortColumn', 'Name');
    sortedCatsData = catsData.sort(catNamesDescendingSort);
  }
  redisplayTable();
}

function catNamesSort(a, b) {
  const sortA = a.name;
  const sortB = b.name;
  return sortB.toLowerCase().localeCompare(sortA.toLowerCase());
}

function catNamesDescendingSort(a, b) {
  return catNamesSort(b, a);
}

function sortCatsByBreed(event) {
  let header = $(event.target);
  let table = header.closest('table');
  if (
    table.attr('data-sortDirection') === 'ascending' &&
    table.attr('data-sortColumn') === 'Breed'
  ) {
    table.attr('data-sortDirection', 'descending');
    table.attr('data-sortColumn', 'Breed');
    sortedCatsData = catsData.sort(catBreedSort);
  } else {
    table.attr('data-sortDirection', 'ascending');
    table.attr('data-sortColumn', 'Breed');
    sortedCatsData = catsData.sort(catBreedDescendingSort);
  }
  redisplayTable();
}

function catBreedSort(a, b) {
  const sortA = a.breed;
  const sortB = b.breed;
  return sortB.toLowerCase().localeCompare(sortA.toLowerCase());
}

function catBreedDescendingSort(a, b) {
  return catBreedSort(b, a);
}

function sortCatsBySex(event) {
  let header = $(event.target);
  let table = header.closest('table');
  if (
    table.attr('data-sortDirection') === 'ascending' &&
    table.attr('data-sortColumn') === 'Sex'
  ) {
    table.attr('data-sortDirection', 'descending');
    table.attr('data-sortColumn', 'Sex');
    sortedCatsData = catsData.sort(catSexSort);
  } else {
    table.attr('data-sortDirection', 'ascending');
    table.attr('data-sortColumn', 'Sex');
    sortedCatsData = catsData.sort(catSexDescendingSort);
  }
  redisplayTable();
}

function catSexSort(a, b) {
  const sortA = a.sex;
  const sortB = b.sex;
  return sortB.toLowerCase().localeCompare(sortA.toLowerCase());
}

function catSexDescendingSort(a, b) {
  return catSexSort(b, a);
}

function sortCatsByShots(event) {
  let header = $(event.target);
  let table = header.closest('table');
  if (
    table.attr('data-sortDirection') === 'ascending' &&
    table.attr('data-sortColumn') === 'Shots'
  ) {
    table.attr('data-sortDirection', 'descending');
    table.attr('data-sortColumn', 'Shots');
    sortedCatsData = catsData.sort(catShotsSort);
  } else {
    table.attr('data-sortDirection', 'ascending');
    table.attr('data-sortColumn', 'Shots');
    sortedCatsData = catsData.sort(catShotsDescendingSort);
  }
  redisplayTable();
}

function catShotsSort(a, b) {
  const sortA = a.shots;
  const sortB = b.shots;
  return (sortA ? 1 : 0) < (sortB ? 1 : 0);
}

function catShotsDescendingSort(a, b) {
  return catShotsSort(b, a);
}

function sortCatsByAge(event) {
  let header = $(event.target);
  let table = header.closest('table');
  if (
    table.attr('data-sortDirection') === 'ascending' &&
    table.attr('data-sortColumn') === 'Age'
  ) {
    table.attr('data-sortDirection', 'descending');
    table.attr('data-sortColumn', 'Age');
    sortedCatsData = catsData.sort(catAgeSort);
  } else {
    table.attr('data-sortDirection', 'ascending');
    table.attr('data-sortColumn', 'Age');
    sortedCatsData = catsData.sort(catAgeDescendingSort);
  }
  redisplayTable();
}

function catAgeSort(a, b) {
  const sortA = a.age;
  const sortB = b.age;
  return sortB - sortA;
}

function catAgeDescendingSort(a, b) {
  return catAgeSort(b, a);
}

function sortCatsByDeclawed(event) {
  let header = $(event.target);
  let table = header.closest('table');
  if (
    table.attr('data-sortDirection') === 'ascending' &&
    table.attr('data-sortColumn') === 'Declawed'
  ) {
    table.attr('data-sortDirection', 'descending');
    table.attr('data-sortColumn', 'Declawed');
    sortedCatsData = catsData.sort(catDeclawedSort);
  } else {
    table.attr('data-sortDirection', 'ascending');
    table.attr('data-sortColumn', 'Declawed');
    sortedCatsData = catsData.sort(catDeclawedDescendingSort);
  }
  redisplayTable();
}

function catDeclawedSort(a, b) {
  const sortA = a.declawed;
  const sortB = b.declawed;
  return (sortA ? 1 : 0) < (sortB ? 1 : 0);
}

function catDeclawedDescendingSort(a, b) {
  return catDeclawedSort(b, a);
}

function sortCatsByNeutered(event) {
  let header = $(event.target);
  let table = header.closest('table');
  if (
    table.attr('data-sortDirection') === 'ascending' &&
    table.attr('data-sortColumn') === 'Neutered'
  ) {
    table.attr('data-sortDirection', 'descending');
    table.attr('data-sortColumn', 'Neutered');
    sortedCatsData = catsData.sort(catNeuteredSort);
  } else {
    table.attr('data-sortDirection', 'ascending');
    table.attr('data-sortColumn', 'Neutered');
    sortedCatsData = catsData.sort(catNeuteredDescendingSort);
  }
  redisplayTable();
}

function catNeuteredSort(a, b) {
  const sortA = a.neutered;
  const sortB = b.neutered;
  return (sortA ? 1 : 0) < (sortB ? 1 : 0);
}

function catNeuteredDescendingSort(a, b) {
  return catNeuteredSort(b, a);
}

function filterCats() {
  let filteredData = sortedCatsData
    .filter(cat =>
      cat.name.toLowerCase().startsWith(
        $('input#nameFilter')
          .val()
          .toLowerCase()
      )
    )
    .filter(cat =>
      cat.breed.toLowerCase().startsWith(
        $('input#breedFilter')
          .val()
          .toLowerCase()
      )
    )
    .filter(cat => cat.sex.startsWith($('select#sexFilter').val()))
    .filter(
      cat =>
        $('select#shotsFilter').val() === '' ||
        cat.shots == $('select#shotsFilter').val()
    )
    .filter(
      cat =>
        ($('input#ageBeginFilter').val() === '' &&
          $('input#ageEndFilter').val() === '') ||
        ($('input#ageBeginFilter').val() === '' &&
          cat.age <= $('input#ageEndFilter').val()) ||
        (cat.age >= $('input#ageBeginFilter').val() &&
          $('input#ageEndFilter').val() === '') ||
        (cat.age >= $('input#ageBeginFilter').val() &&
          cat.age <= $('input#ageEndFilter').val())
    )
    .filter(
      cat =>
        $('select#declawedFilter').val() === '' ||
        cat.declawed == $('select#declawedFilter').val()
    )
    .filter(
      cat =>
        $('select#neuteredFilter').val() === '' ||
        cat.neutered == $('select#neuteredFilter').val()
    );
  return filteredData;
}

const catsDebounceFilter = _.debounce(redisplayTable, 500);
