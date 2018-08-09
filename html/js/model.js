const sortMethod = {
  boolean: property =>
    R.comparator((a, b) =>
      R.lt(R.prop(property, a) ? 1 : 0, R.prop(property, b) ? 1 : 0)
    ),
  caseInsensitiveString: property =>
    R.comparator((a, b) =>
      R.lt(
        R.prop(property, a)
          .toString()
          .toLowerCase(),
        R.prop(property, b)
          .toString()
          .toLowerCase()
      )
    ),
  numeric: property =>
    R.comparator((a, b) =>
      R.lt(Number(R.prop(property, a)), Number(R.prop(property, b)))
    )
};

const sortAnimalsBy = {
  // Shared sort methods
  id: R.sort(sortMethod.numeric('id')),
  name: R.sort(sortMethod.caseInsensitiveString('name')),
  sex: R.sort(sortMethod.caseInsensitiveString('sex')),
  age: R.sort(sortMethod.numeric('age')),
  // Dog and cat sort methods
  breed: R.sort(sortMethod.caseInsensitiveString('breed')),
  shots: R.sort(sortMethod.boolean('shots')),
  neutered: R.sort(sortMethod.boolean('neutered')),
  // Cat sort methods
  declawed: R.sort(sortMethod.boolean('declawed')),
  // Dog sort methods
  licensed: R.sort(sortMethod.boolean('licensed')),
  size: R.sort(sortMethod.numeric('weight')),
  // Exotic sort methods
  species: R.sort(sortMethod.caseInsensitiveString('species'))
};

const filterAnimalsBy = {
  id: value =>
    R.filter(R.anyPass([() => isNullOrEmpty(value), R.propEq('id', value)])),
  name: value =>
    R.filter(
      R.anyPass([
        () => isNullOrEmpty(value),
        propertyCaseInsensitiveLike('name', value)
      ])
    ),
  sex: value =>
    R.filter(
      R.anyPass([
        () => isNullOrEmpty(value),
        propertyCaseInsensitiveLike('sex', value)
      ])
    ),
  age: (value1, value2) =>
    R.filter(
      R.propSatisfies(
        age =>
          R.and(
            R.gte(age, isNullOrEmpty(value1) ? -Infinity : value1),
            R.lte(age, isNullOrEmpty(value2) ? Infinity : value2)
          ),
        'age'
      )
    ),
  breed: value =>
    R.filter(
      R.anyPass([
        () => isNullOrEmpty(value),
        propertyCaseInsensitiveLike('breed', value)
      ])
    ),
  shots: value =>
    R.filter(
      R.anyPass([
        () => isNullOrEmpty(value),
        R.propEq('shots', Boolean(Number(value)) ? 1 : 0)
      ])
    ),
  neutered: value =>
    R.filter(
      R.anyPass([
        () => isNullOrEmpty(value),
        R.propEq('neutered', Boolean(Number(value)) ? 1 : 0)
      ])
    ),
  declawed: value =>
    R.filter(
      R.anyPass([
        () => isNullOrEmpty(value),
        R.propEq('declawed', Boolean(Number(value)) ? 1 : 0)
      ])
    ),
  licensed: value =>
    R.filter(
      R.anyPass([
        () => isNullOrEmpty(value),
        R.propEq('licensed', Boolean(Number(value)) ? 1 : 0)
      ])
    ),
  size: value =>
    R.filter(
      R.anyPass([
        () => isNullOrEmpty(value),
        animal => R.equals(value, weightToSize(R.prop('weight', animal)))
      ])
    ),
  species: value =>
    R.filter(
      R.anyPass([
        () => isNullOrEmpty(value),
        propertyCaseInsensitiveLike('species', value)
      ])
    )
};

const propertyCaseInsensitiveLike = (property, value) => {
  return R.propSatisfies(
    prop => R.toLower(String(prop)).startsWith(R.toLower(String(value))),
    property
  );
};

const paginate = R.curry((page, limit, items) => {
  return R.compose(
    R.take(limit),
    R.drop((page - 1) * limit)
  )(items);
});

const isNullOrEmpty = value => {
  return R.or(R.isNil(value), R.isEmpty(value));
};
