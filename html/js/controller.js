let dataStore = [];

const animalTableHeaderRow = (animal, showOwners) => {
  animal = R.nth(0, animal);
  let row = tableRow({});
  let cells = [
    R.has('name', animal) ? sortableCell('Name') : undefined,
    R.has('age', animal) ? sortableCell('Age') : undefined,
    R.has('sex', animal) ? sortableCell('Sex') : undefined,
    R.has('breed', animal) ? sortableCell('Breed') : undefined,
    R.has('species', animal) ? sortableCell('Species') : undefined,
    R.has('shots', animal) ? sortableCell('Shots') : undefined,
    R.has('neutered', animal) ? sortableCell('Neutered') : undefined,
    R.has('declawed', animal) ? sortableCell('Declawed') : undefined,
    R.has('licensed', animal) ? sortableCell('Licensed') : undefined,
    R.has('weight', animal) ? sortableCell('Size') : undefined,
    showOwners ? headerCell({}, 'Owners') : undefined,
    headerCell({}, 'Notes')
  ];
  for (cell of cells) row.append(cell);
  return row;
};

const animalTableFilterRow = (animal, showOwners) => {
  animal = R.nth(0, animal);
  let row = tableRow({});
  let cells = [
    R.has('name', animal) ? filterCell('name') : undefined,
    R.has('age', animal) ? rangeFilterCell('age') : undefined,
    R.has('sex', animal)
      ? dropDownFilterCell('sex', { All: '', F: 'F', M: 'M' })
      : undefined,
    R.has('breed', animal) ? filterCell('breed') : undefined,
    R.has('species', animal) ? filterCell('species') : undefined,
    R.has('shots', animal)
      ? dropDownFilterCell('shots', { All: '', Yes: 1, No: 0 })
      : undefined,
    R.has('neutered', animal)
      ? dropDownFilterCell('neutered', { All: '', Yes: 1, No: 0 })
      : undefined,
    R.has('declawed', animal)
      ? dropDownFilterCell('declawed', { All: '', Yes: 1, No: 0 })
      : undefined,
    R.has('licensed', animal)
      ? dropDownFilterCell('licensed', { All: '', Yes: 1, No: 0 })
      : undefined,
    R.has('weight', animal)
      ? dropDownFilterCell('size', {
          All: '',
          Small: 'S',
          Medium: 'M',
          Large: 'L',
          Giant: 'G'
        })
      : undefined,
    showOwners ? headerCell({}, '') : undefined,
    headerCell({}, '')
  ];
  for (cell of cells) row.append(cell);
  return row;
};

const animalTableRow = R.curry((showOwners, animal) => {
  let row = tableRow({ id: R.prop('id', animal) });
  let cells = [
    R.has('name', animal) ? defaultCell(R.prop('name', animal)) : undefined,
    R.has('age', animal) ? defaultCell(R.prop('age', animal)) : undefined,
    R.has('sex', animal) ? defaultCell(R.prop('sex', animal)) : undefined,
    R.has('breed', animal) ? defaultCell(R.prop('breed', animal)) : undefined,
    R.has('species', animal)
      ? defaultCell(R.prop('species', animal))
      : undefined,
    R.has('shots', animal) ? booleanCell(R.prop('shots', animal)) : undefined,
    R.has('neutered', animal)
      ? booleanCell(R.prop('neutered', animal))
      : undefined,
    R.has('declawed', animal)
      ? booleanCell(R.prop('declawed', animal))
      : undefined,
    R.has('licensed', animal)
      ? booleanCell(R.prop('licensed', animal))
      : undefined,
    R.has('weight', animal)
      ? defaultCell(weightToSize(R.prop('weight', animal)))
      : undefined,
    showOwners
      ? R.lte(1, R.prop('ownersCount', animal))
        ? ownersButton(
            { class: 'btn owners', id: `owners-${animal.id}-${animal.name}` },
            'Owners'
          )
        : defaultCell('')
      : undefined,
    R.lte(1, R.prop('notesCount', animal))
      ? notesButton(
          { class: 'btn notes', id: `notes-${animal.id}-${animal.name}` },
          'Notes'
        )
      : defaultCell('')
  ].filter(x => x !== undefined);
  for (cell of cells) row.append(cell);
  return row;
});

const tableRow = properties => {
  return $('<tr>', properties);
};

const tableCell = R.curry((properties, value) => {
  return $('<td>', properties).text(value);
});

const headerCell = R.curry((properties, value) => {
  return $('<th>', properties).text(value);
});

const sortableCell = value => {
  return headerCell({ class: 'clickable sortable' }, value).append(
    $('<span>', {
      class: 'd-inline float-right invisible',
      id: `${value.toLowerCase()}Sort`
    }).text('▼')
  ); //▼
};

const filterCell = value => {
  return headerCell({}, '').append(
    $('<input>', {
      class: 'input form-control',
      id: `${value.toLowerCase()}Filter`,
      placeholder: 'Filter'
    })
  );
};

const dropDownFilterCell = (value, choices) => {
  let select = $('<select>', {
    class: 'input form-control',
    id: `${value.toLowerCase()}Filter`
  });
  R.forEachObjIndexed(
    (key, value) => select.append($('<option>', { text: value, value: key })),
    choices
  );
  return headerCell({}, '').append(select);
};

const rangeFilterCell = value => {
  return headerCell({}, '').append(
    $('<input>', {
      class: 'input form-control w-50 d-inline',
      id: `${value.toLowerCase()}Range1`,
      placeholder: 'Begin'
    })
      .add($('<span>', { text: ' - ' }))
      .add(
        $('<input>', {
          class: 'input form-control w-50 d-inline',
          id: `${value.toLowerCase()}Range2`,
          placeholder: 'End'
        })
      )
  );
};

const ownersButton = R.curry((properties, value) => {
  return defaultCell('').append($('<button>', properties).text(value));
});

const notesButton = R.curry((properties, value) => {
  return defaultCell('').append($('<button>', properties).text(value));
});

const defaultCell = tableCell({});
const booleanCell = value => (value ? trueCell('✔') : falseCell('✘'));
const trueCell = tableCell({ class: 'text-success' });
const falseCell = tableCell({ class: 'text-danger' });

const weightToSize = weight => {
  const mapping = { 20: 'S', 50: 'M', 100: 'L' };
  let value = R.compose(
    R.reduce(R.min, Infinity),
    R.filter(R.lt(weight)),
    R.map(x => Number(x)),
    R.keys
  )(mapping);
  return value === Infinity ? 'G' : mapping[value];
};

const getData = table => {
  return JSON.parse(dataStore[$(table).attr('id')]);
};

const storeData = (table, data) => {
  dataStore[$(table).attr('id')] = JSON.stringify(data);
};

const getTableData = value => {
  let dataUrl = $(value).attr('data-url');
  return $.ajax({ url: dataUrl });
};

const buildTableHeader = table => {
  let data = R.nth(0, getData(table));
  let header = $('<thead>').append(
    animalTableHeaderRow(data, $(table).attr('data-show-owners') !== undefined)
  );
  if ($(table).attr('data-filterable') !== undefined)
    header.append(
      animalTableFilterRow(
        data,
        $(table).attr('data-show-owners') !== undefined
      )
    );
  $(table).append(header);
  $(table)
    .find('th.sortable')
    .click(sortTable);
  $(table)
    .find('input[id$="Filter"]')
    .keyup(debounce(filterChange, 100));
  $(table)
    .find('select[id$="Filter"]')
    .change(filterChange);
  $(table)
    .find('input[id*=Range]')
    .keyup(debounce(filterChange, 100));
};

const buildTable = table => {
  let page = R.defaultTo(1, $(table).attr('data-page'));
  let data = R.nth(0, getData(table));
  let filters = $(table).find('[id$="Filter"]');
  let filteredData = data;
  filters.each((index, value) => {
    filteredData = filterAnimalsBy[
      R.replace(/Filter/g, '', $(value).attr('id'))
    ]($(value).val())(filteredData);
  });
  let rangeFilters = $(table).find('input[id*=Range]');
  rangeFilters.each((index, value) => {
    let id = R.replace(/[1|2]/g, '', $(value).attr('id'));
    filteredData = filterAnimalsBy[R.replace(/Range/g, '', id)](
      $(table)
        .find(`#${id}1`)
        .val(),
      $(table)
        .find(`#${id}2`)
        .val()
    )(filteredData);
  });
  let rows = $('<tbody>').append(
    R.map(
      animalTableRow($(table).attr('data-show-owners') !== undefined),
      paginate(page, 10)(filteredData)
    )
  );
  $(table).append(rows);
  storeData(`${$(table).attr('id')}-sorted`, filteredData);
  addTitles();
};

const addHandlers = table => {
  $(table)
    .find('button.owners')
    .click(showOwnersModal);
  $(table)
    .find('button.notes')
    .click(showNotesModal);
};

const filterChange = event => {
  let table = $(event.target).parents('table');
  changePage(1, $(table));
};

const showOwnersModal = event => {
  let dataUrl = $(event.target)
    .parents('table')
    .attr('data-url');
  dataUrl = R.replace(/\/.*/g, '/owners', dataUrl);
  dataUrl += `?id=${
    $(event.target)
      .attr('id')
      .split('-')[1]
  }`;
  $.ajax({ url: `${dataUrl}` }).done(data => {
    if (R.not(R.isEmpty(data))) {
      $('#ownersModalHeader').text('Owners');
      let content = '';
      data.map(owner => {
        content += `${owner.lname}, ${owner.fname} - ${owner.city}, ${
          owner.st
        } ${owner.zip}<br><br>`;
      });
      $('#ownersModalContent').html(content);
      $('#ownersModal').modal();
    }
  });
};

const showNotesModal = event => {
  let id = $(event.target)
    .parents('tr')
    .attr('id');
  let dataUrl = $(event.target)
    .parents('table')
    .attr('data-url');
  let animalType = R.replace(/s\/.*/g, '', dataUrl);
  dataUrl = R.replace(/\/.*/g, `/notes/?${animalType}=${id}`, dataUrl);
  $.ajax({ url: `${dataUrl}` }).done(data => {
    if (R.not(R.isEmpty(data))) {
      $('#notesModalHeader').text('Notes');
      let content = '';
      data.map(note => {
        content += `<u>${note.vetName} - ${note.date}</u><br>${
          note.note
        }<br><br>`;
      });
      $('#notesModalContent').html(content);
      $('#notesModal').modal();
    }
  });
};

const sortTable = event => {
  let span = $(event.target).is('span')
    ? $(event.target)
    : $(event.target).find('span');
  let table = $(span).parents('table');
  $(table).attr('data-page', 1);
  let sortFunction = R.replace(/Sort/g, '', $(span).attr('id'));
  let data = getData(table);
  let arrow = $(span).text();
  data[0] = sortAnimalsBy[sortFunction](data[0]);
  if (arrow === '▲') data[0] = R.reverse(data[0]);
  storeData(table, data);
  $(table)
    .find('tbody')
    .remove();
  buildTable($(table));
  addHandlers($(table));
  $(span).text(arrow === '▲' ? '▼' : '▲');
  $('th.sortable > span[id$="Sort"]').addClass('invisible');
  $(`th.sortable > span[id$=${sortFunction}Sort`).removeClass('invisible');
};

const debounce = (func, wait, immediate) => {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const buildPagination = id => {
  const pageLink = page => {
    return `changePage(${page},'#${$(table).attr('id')}');`;
  };

  let nav = $(id);
  let table = $($(nav).attr('data-pagination-for'));
  let data = getData(`${$(table).attr('id')}-sorted`);
  let page = R.defaultTo(1, $(table).attr('data-page'));
  page -= 1;
  let totalCount = data.length;
  let resultSpan = `Showing <span class="badge badge-pill badge-secondary">${page *
    10 +
    1} - ${(page + 1) *
    10}</span> of <span class="badge badge-pill badge-secondary">${totalCount}</span> results</br>`;
  let html = '';
  if (totalCount > 10) {
    let disabled = page == 0 ? ' disabled' : '';
    let navBefore = `<nav aria-label="Owners page navigation"><ul class="pagination pagination-dark">`;
    let prevButton = `<li class="page-item${disabled}"><a class="page-link" href="javascript:void(0);" onClick="${pageLink(
      page,
      table
    )}">Prev</a></li>`;
    let firstButton = `<li class="page-item${disabled}"><a class="page-link" href="javascript:void(0);" onClick="${pageLink(
      1,
      table
    )}">First</a></li>`;
    disabled = page == Math.round(totalCount / 10) - 1 ? ' disabled' : '';
    let lastButton = `<li class="page-item${disabled}"><a class="page-link" href="javascript:void(0);" onClick="${pageLink(
      Math.round(totalCount / 10),
      table
    )}">Last</a></li>`;
    let nextButton = `<li class="page-item${disabled}"><a class="page-link" href="javascript:void(0);" onClick="${pageLink(
      page + 2,
      table
    )}">Next</a></li>`;
    let navAfter = `</ul></nav>`;
    let pageLinks = '';
    for (
      let p = (page - 10) * 10 <= 0 ? 10 : (page - 10) * 10;
      p <= Math.round(totalCount / 10) * 10 && p <= (page + 10) * 10;
      p += 10
    ) {
      let active = Math.floor(p / 10) == page + 1 ? ' active' : '';
      pageLinks = `${pageLinks}<li class="page-item${active}"><a class="page-link" href="javascript:void(0);" onClick="${pageLink(
        Math.floor(p / 10),
        table
      )}">${Math.floor(p / 10)}</a></li>`;
    }
    html = `${navBefore}${prevButton}${firstButton}${pageLinks}${lastButton}${nextButton}${navAfter}`;
  } else {
    resultSpan = `Showing <span class="badge badge-pill badge-secondary">${totalCount}</span> results</br>`;
  }
  $(nav).html(`${html}${resultSpan}`);
};

const changePage = (page, table) => {
  $(table).attr('data-page', page);
  $(table)
    .find('tbody')
    .remove();
  buildTable($(table));
  addHandlers($(table));
  let nav = $(`[data-pagination-for="#${$(table).attr('id')}"]`);
  buildPagination(nav);
};

const addTitles = () => {
  $('th').each((a,b) => {
    if(R.contains('Name', b.innerText)) $(b).attr('title',"The name of the animal");
    if(R.contains('Age', b.innerText)) $(b).attr('title',"The age of the animal (years)");
    if(R.contains('Sex', b.innerText)) $(b).attr('title',"The sex of the animal (Male/Female/Unknown)");
    if(R.contains('Breed', b.innerText)) $(b).attr('title',"The breed of the animal");
    if(R.contains('Species', b.innerText)) $(b).attr('title',"The species of the animal");
    if(R.contains('Shots', b.innerText)) $(b).attr('title',"Have all applicable shots been administered?");
    if(R.contains('Neutered', b.innerText)) $(b).attr('title',"Has the animal been neutered?");
    if(R.contains('Declawed', b.innerText)) $(b).attr('title',"Is the cat declawed?");
    if(R.contains('Licensed', b.innerText)) $(b).attr('title',"Do we have a valid license on file for this animal?");
    if(R.contains('Size', b.innerText)) $(b).attr('title',"The weight of the animal ([S] <20lbs. [M] <50lbs.[L] <100lbs. [G] >100lbs.");
    if(R.contains('Owners', b.innerText)) $(b).attr('title',"Who owns this animal?");
    if(R.contains('Notes', b.innerText)) $(b).attr('title',"Vet notes for this animal");
  });
};
