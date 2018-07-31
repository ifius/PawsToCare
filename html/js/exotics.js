let exoticsData = [];
let sortedExoticsData = [];

$(() => {
  const table = $('[data-table=\'exotics\']');
  const dataUrl = table.attr('data-url');
  $.ajax({ url: dataUrl }).done(data => {
    exoticsData = data[0];
    sortedExoticsData = data[0];
    buildTable();
  });
});

function buildTable() {
  const table = $('[data-table=\'exotics\']');
  table.append(buildHeader);
  buildTableBody();
}


function buildTableBody() {
  let exotics = filterexotics();
  const table = $('[data-table=\'exotics\']');
  $(table).find('thead > tr > td > span[id$=Sort]').addClass('invisible');
  $('table').find('span#resultCount').text(exotics.length);
  table.append($('<tbody>').html(exotics.map(buildRow)));
  let sortColumn = table.attr('data-sortColumn');
  let sortDirection = table.attr('data-sortDirection');
  let sortSpan = $(table).find(`thead > tr > td > span[id=${sortColumn}Sort]`);
  $(sortSpan).removeClass('invisible');
  if (sortDirection === 'ascending')  $(sortSpan).text('▲');
  else $(sortSpan).text('▼');  
}

function clearTable() {
  $('[data-table=\'exotics\'] > tbody').remove();
}

function redisplayTable() {
  clearTable();
  buildTableBody();
}

function buildHeader() {
  let header = $('<td>', {
    html: $('<span>').text('Name').add($('<span>', {id: 'NameSort', class: 'd-inline float-right invisible'}).text('▲')),
    title: 'Exotic\'s Name',
    class: 'clickable filterable'
  })
    .click(sortExoticsByName)
    .add(
      $('<td>', {
        html: $('<span>', {class:'d-inline'}).text('Species').add($('<span>', {id: 'speciesSort', class: 'd-inline float-right invisible'}).text('▲')),
        title: 'species of exotic',
        class: 'clickable filterable'
      }).click(sortExoticsByspecies)
    )
    .add(
      $('<td>', {
        html: $('<span>', {class:'d-inline'}).text('Sex').add($('<span>', {id: 'SexSort', class: 'd-inline float-right invisible'}).text('▲')),
        title: 'Sex of exotic',
        class: 'clickable filterable'
      }).click(sortExoticsBySex)
    )
    .add(
      $('<td>', {
        html: $('<span>', {class:'d-inline'}).text('Age').add($('<span>', {id: 'AgeSort', class: 'd-inline float-right invisible'}).text('▲')),
        title: 'How old is the exotic?',
        class: 'clickable filterable'
      }).click(sortExoticsByAge)
    )
    .add(
      $('<td>', {
        text: 'Owners',
        title: 'Who owns this exotic?'
      })
    )
    .add(
      $('<td>', {
        text: 'Notes',
        title: 'Veterinarian notes about this exotic'
      })
    );

  $(header).attr('data-toggle', 'tooltip');
  $(header).tooltip();

  let inputHeader = $('<td>').append($('<input>', {class: 'form-control', placeholder: 'filter', id: 'nameFilter'}).keyup(exoticsDebounceFilter))
    .add($('<td>').append($('<input>', {class: 'form-control',placeholder: 'filter', id: 'speciesFilter'}).keyup(exoticsDebounceFilter)))
    .add($('<td>').append($('<select>', {class: 'form-control', id: 'sexFilter'}).change(redisplayTable)
      .append($('<option>', {value: '', text: 'All'}))
      .append($('<option>', {value: 'M', text: 'M'}))
      .append($('<option>', {value: 'F', text: 'F'}))))
    .add($('<td>').append($('<input>', {class: 'form-control w-25 d-inline',placeholder: 'begin', id: 'ageBeginFilter'}).keyup(exoticsDebounceFilter))
      .append($('<span>').text(' - '))
      .append($('<input>', {class: 'form-control w-25 d-inline',placeholder: 'end', id: 'ageEndFilter'}).keyup(exoticsDebounceFilter)))
    .add($('<td>'))
    .add($('<td>'));

  return $('<thead>').html($('<tr>').append(header).add($('<tr>').append(inputHeader)));
}

function buildRow(exotic) {
  let row = $('<td>', { text: exotic.name })
    .add($('<td>', { text: exotic.species }))
    .add($('<td>', { text: exotic.sex }))
    .add($('<td>', { text: exotic.age }))
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
  return $('<tr>').html(row).attr('id',exotic.id);
}

function sortExoticsByName(event) {
  let header = $(event.target);
  let table = header.closest('table');
  if (
    table.attr('data-sortDirection') === 'ascending' &&
    table.attr('data-sortColumn') === 'Name'
  ) {
    table.attr('data-sortDirection', 'descending');
    table.attr('data-sortColumn', 'Name');
    sortedExoticsData = exoticsData.sort(exoticNamesSort);
  } else {
    table.attr('data-sortDirection', 'ascending');
    table.attr('data-sortColumn', 'Name');
    sortedExoticsData = exoticsData.sort(exoticNamesDescendingSort);
  }
  redisplayTable();
}

function exoticNamesSort(a, b) {
  const sortA = a.name;
  const sortB = b.name;
  return sortB.toLowerCase().localeCompare(sortA.toLowerCase());
}

function exoticNamesDescendingSort(a, b) {
  return exoticNamesSort(b, a);
}

function sortExoticsByspecies(event) {
  let header = $(event.target);
  let table = header.closest('table');
  if (
    table.attr('data-sortDirection') === 'ascending' &&
    table.attr('data-sortColumn') === 'species'
  ) {
    table.attr('data-sortDirection', 'descending');
    table.attr('data-sortColumn', 'species');
    sortedExoticsData = exoticsData.sort(exoticSpeciesSort);
  } else {
    table.attr('data-sortDirection', 'ascending');
    table.attr('data-sortColumn', 'species');
    sortedExoticsData = exoticsData.sort(exoticspeciesDescendingSort);
  }
  redisplayTable();
}

function exoticSpeciesSort(a, b) {
  const sortA = a.species;
  const sortB = b.species;
  return sortB.toLowerCase().localeCompare(sortA.toLowerCase());
}

function exoticspeciesDescendingSort(a, b) {
  return exoticSpeciesSort(b, a);
}

function sortExoticsBySex(event) {
  let header = $(event.target);
  let table = header.closest('table');
  if (
    table.attr('data-sortDirection') === 'ascending' &&
    table.attr('data-sortColumn') === 'Sex'
  ) {
    table.attr('data-sortDirection', 'descending');
    table.attr('data-sortColumn', 'Sex');
    sortedExoticsData = exoticsData.sort(exoticSexSort);
  } else {
    table.attr('data-sortDirection', 'ascending');
    table.attr('data-sortColumn', 'Sex');
    sortedExoticsData = exoticsData.sort(exoticSexDescendingSort);
  }
  redisplayTable();
}

function exoticSexSort(a, b) {
  const sortA = a.sex;
  const sortB = b.sex;
  return sortB.toLowerCase().localeCompare(sortA.toLowerCase());
}

function exoticSexDescendingSort(a, b) {
  return exoticSexSort(b, a);
}

function sortExoticsByAge(event) {
  let header = $(event.target);
  let table = header.closest('table');
  if (
    table.attr('data-sortDirection') === 'ascending' &&
    table.attr('data-sortColumn') === 'Age'
  ) {
    table.attr('data-sortDirection', 'descending');
    table.attr('data-sortColumn', 'Age');
    sortedExoticsData = exoticsData.sort(exoticAgeSort);
  } else {
    table.attr('data-sortDirection', 'ascending');
    table.attr('data-sortColumn', 'Age');
    sortedExoticsData = exoticsData.sort(exoticAgeDescendingSort);
  }
  redisplayTable();
}

function exoticAgeSort(a, b) {
  const sortA = a.age;
  const sortB = b.age;
  return sortB - sortA;
}

function exoticAgeDescendingSort(a, b) {
  return exoticAgeSort(b, a);
}


function filterexotics () {
  let filteredData = 
        sortedExoticsData
          .filter(exotic => exotic.name.toLowerCase().startsWith($('input#nameFilter').val().toLowerCase()))
          .filter(exotic => exotic.species.toLowerCase().startsWith($('input#speciesFilter').val().toLowerCase()))
          .filter(exotic => exotic.sex.startsWith($('select#sexFilter').val()))
          .filter(exotic => ($('input#ageBeginFilter').val() === '' && $('input#ageEndFilter').val() === '') || 
                ($('input#ageBeginFilter').val() === '' && exotic.age <= $('input#ageEndFilter').val()) ||
                (exotic.age >= $('input#ageBeginFilter').val() && $('input#ageEndFilter').val() === '') ||
                (exotic.age >= $('input#ageBeginFilter').val() && exotic.age <= $('input#ageEndFilter').val()));
  return filteredData;
}

const exoticsDebounceFilter = _.debounce(redisplayTable, 500);
