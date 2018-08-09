// Cats

describe('/cats endpoint', () => {
  let catsArray, catObject, count;
  beforeAll(async () => {
    await $.ajax('../cats/').done(data => {
      results = data;
    });
    catsArray = R.nth(0, results);
    count = R.nth(1, results);
    catObject = R.nth(0, catsArray);
  });
  it('returns a cat object', () => {
    let catSpec = R.allPass([
      R.has('id'),
      R.has('name'),
      R.has('age'),
      R.has('sex'),
      R.has('breed'),
      R.has('shots'),
      R.has('neutered'),
      R.has('declawed')
    ]);
    expect(catSpec(catObject)).toBe(true);
  });
  it('includes a totalCount property', () => {
    let totalCountProp = R.has('totalCount');
    expect(totalCountProp(count)).toBe(true);
  });
  it('returns an array of cats', () => {
    expect(catsArray instanceof Array).toBe(true);
  });
  it('is sortable by name ascending', () => {
    let sortedByName = sortAnimalsBy['name'](catsArray);
    let names = R.pluck('name', sortedByName);
    let prevName = -Infinity;
    let checkSort = name => {
      if (name < prevName) return false;
      prevName = name;
      return true;
    };
    let isSorted = R.all(R.equals(true), R.map(checkSort, names));
    expect(isSorted).toBe(true);
  });
  it('is sortable by name descending', () => {
    let sortedByName = R.reverse(sortAnimalsBy['name'](catsArray));
    let names = R.pluck('name', sortedByName);
    let prevName = Infinity;
    let checkSort = name => {
      if (name > prevName) return false;
      prevName = name;
      return true;
    };
    let isSorted = R.all(R.equals(true), R.map(checkSort, names));
    expect(isSorted).toBe(true);
  });
  it('is filterable by name', () => {
    let testFilter = 'aB';
    let filteredByName = R.pluck(
      'name',
      filterAnimalsBy['name'](testFilter)(catsArray)
    );
    let test = R.all(
      R.equals(true),
      R.map(
        name => R.startsWith(R.toLower(testFilter), R.toLower(name)),
        filteredByName
      )
    );
    expect(test).toBe(true);
  });
  it('can paginate', () => {
    let paginatedResult = paginate(1, 2, catsArray);
    expect(paginatedResult.length).toBe(2);
    expect(paginate(1, 1, []).length).toBe(0);
    paginatedResult = paginate(1, 1, catsArray);
    expect(R.equals(paginatedResult, [catObject])).toBe(true);
  });
});

// DOGS

describe('/dogs endpoint', () => {
  let dogsArray, dogObject, count;
  beforeAll(async () => {
    await $.ajax('../dogs/').done(data => {
      results = data;
    });
    dogsArray = R.nth(0, results);
    count = R.nth(1, results);
    dogObject = R.nth(0, dogsArray);
  });
  it('returns a dog object', () => {
    console.log(dogObject);
    let dogSpec = R.allPass([
      R.has('id'),
      R.has('name'),
      R.has('age'),
      R.has('sex'),
      R.has('breed'),
      R.has('shots'),
      R.has('neutered'),
      R.has('licensed'),
      R.has('weight')
    ]);
    expect(dogSpec(dogObject)).toBe(true);
  });
  it('includes a totalCount property', () => {
    let totalCountProp = R.has('totalCount');
    expect(totalCountProp(count)).toBe(true);
  });
  it('returns an array of dogs', () => {
    expect(dogsArray instanceof Array).toBe(true);
  });
  it('is sortable by name ascending', () => {
    let sortedByName = sortAnimalsBy['name'](dogsArray);
    let names = R.pluck('name', sortedByName);
    let prevName = -Infinity;
    let checkSort = name => {
      if (name < prevName) return false;
      prevName = name;
      return true;
    };
    let isSorted = R.all(R.equals(true), R.map(checkSort, names));
    expect(isSorted).toBe(true);
  });
  it('is sortable by name descending', () => {
    let sortedByName = R.reverse(sortAnimalsBy['name'](dogsArray));
    let names = R.pluck('name', sortedByName);
    let prevName = Infinity;
    let checkSort = name => {
      if (name > prevName) return false;
      prevName = name;
      return true;
    };
    let isSorted = R.all(R.equals(true), R.map(checkSort, names));
    expect(isSorted).toBe(true);
  });
  it('is filterable by name', () => {
    let testFilter = 'aB';
    let filteredByName = R.pluck(
      'name',
      filterAnimalsBy['name'](testFilter)(dogsArray)
    );
    let test = R.all(
      R.equals(true),
      R.map(
        name => R.startsWith(R.toLower(testFilter), R.toLower(name)),
        filteredByName
      )
    );
    expect(test).toBe(true);
  });
  it('can paginate', () => {
    let paginatedResult = paginate(1, 2, dogsArray);
    expect(paginatedResult.length).toBe(2);
    expect(paginate(1, 1, []).length).toBe(0);
    paginatedResult = paginate(1, 1, dogsArray);
    expect(R.equals(paginatedResult, [dogObject])).toBe(true);
  });
});

// Exotics

describe('/exotics endpoint', () => {
  let exoticsArray, exoticObject, count;
  beforeAll(async () => {
    await $.ajax('../exotics/').done(data => {
      results = data;
    });
    exoticsArray = R.nth(0, results);
    count = R.nth(1, results);
    exoticObject = R.nth(0, exoticsArray);
  });
  it('returns a exotic object', () => {
    let exoticSpec = R.allPass([
      R.has('id'),
      R.has('name'),
      R.has('age'),
      R.has('sex'),
      R.has('species'),
      R.has('neutered')
    ]);
    expect(exoticSpec(exoticObject)).toBe(true);
  });
  it('includes a totalCount property', () => {
    let totalCountProp = R.has('totalCount');
    expect(totalCountProp(count)).toBe(true);
  });
  it('returns an array of exotics', () => {
    expect(exoticsArray instanceof Array).toBe(true);
  });
  it('is sortable by name ascending', () => {
    let sortedByName = sortAnimalsBy['name'](exoticsArray);
    let names = R.pluck('name', sortedByName);
    let prevName = -Infinity;
    let checkSort = name => {
      if (name < prevName) return false;
      prevName = name;
      return true;
    };
    let isSorted = R.all(R.equals(true), R.map(checkSort, names));
    expect(isSorted).toBe(true);
  });
  it('is sortable by name descending', () => {
    let sortedByName = R.reverse(sortAnimalsBy['name'](exoticsArray));
    let names = R.pluck('name', sortedByName);
    let prevName = Infinity;
    let checkSort = name => {
      if (name > prevName) return false;
      prevName = name;
      return true;
    };
    let isSorted = R.all(R.equals(true), R.map(checkSort, names));
    expect(isSorted).toBe(true);
  });
  it('is filterable by name', () => {
    let testFilter = 'aB';
    let filteredByName = R.pluck(
      'name',
      filterAnimalsBy['name'](testFilter)(exoticsArray)
    );
    let test = R.all(
      R.equals(true),
      R.map(
        name => R.startsWith(R.toLower(testFilter), R.toLower(name)),
        filteredByName
      )
    );
    expect(test).toBe(true);
  });
  it('can paginate', () => {
    let paginatedResult = paginate(1, 2, exoticsArray);
    expect(paginatedResult.length).toBe(2);
    expect(paginate(1, 1, []).length).toBe(0);
    paginatedResult = paginate(1, 1, exoticsArray);
    expect(R.equals(paginatedResult, [exoticObject])).toBe(true);
  });
});
