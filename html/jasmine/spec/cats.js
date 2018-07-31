/*

Terrible, hacky functions. Please fix to pure functions for release.
Non-pure functions are very hard to test.

*/

describe("In cats.js", () => {
  beforeEach( () => {
      jQuery('input#nameFilter').val('');

      catsData = [
        {id: 1, name: "a cat", breed: "f breed", sex: "M", shots: true, age: 5, declawed: false, neutered: true},
        {id: 1, name: "B cat", breed: "E breed", sex: "F", shots: false, age: 8, declawed: true, neutered: true},
        {id: 1, name: "c cat", breed: "d breed", sex: "M", shots: true, age: 6, declawed: false, neutered: false},
        {id: 1, name: "D cat", breed: "C breed", sex: "F", shots: false, age: 9, declawed: true, neutered: false},
        {id: 1, name: "e cat", breed: "b breed", sex: "M", shots: true, age: 7, declawed: false, neutered: true},
        {id: 1, name: "F cat", breed: "A breed", sex: "F", shots: false, age: 10, declawed: true, neutered: true}];
      sortedCatsData = catsData;
    });
    describe("sorting", () => {
      it("by name ascending", () => {
        catsData.sort(catNamesDescendingSort);
        expect(catsData.map(cat => cat.name)).toEqual(["a cat", "B cat", "c cat", "D cat", "e cat", "F cat"]);
      });

      it("by name descending", () => {
        catsData.sort(catNamesSort);
        expect(catsData.map(cat => cat.name)).toEqual(["F cat", "e cat", "D cat", "c cat", "B cat", "a cat"]);
      });

      it("by breed ascending", () => {
        catsData.sort(catBreedDescendingSort);
        expect(catsData.map(cat => cat.breed)).toEqual(["A breed", "b breed", "C breed", "d breed", "E breed", "f breed"]);
      });

      it("by breed descending", () => {
        catsData.sort(catBreedSort);
        expect(catsData.map(cat => cat.breed)).toEqual(["f breed", "E breed", "d breed", "C breed", "b breed", "A breed"]);
      });

     it("by sex ascending", () => {
        catsData.sort(catSexDescendingSort);
        expect(catsData.map(cat => cat.sex)).toEqual(["F","F","F","M","M","M"]);
      });

    it("by sex descending", () => {
        catsData.sort(catSexSort);
        expect(catsData.map(cat => cat.sex)).toEqual(["M","M","M","F","F","F"]);
      });

     it("by shots ascending", () => {
        catsData.sort(catShotsDescendingSort);
        expect(catsData.map(cat => cat.shots)).toEqual([false,false,false,true,true,true]);
      });

    it("by sex descending", () => {
        catsData.sort(catShotsSort);
        expect(catsData.map(cat => cat.shots)).toEqual([true,true,true,false,false,false]);
      });

     it("by age ascending", () => {
        catsData.sort(catAgeDescendingSort);
        expect(catsData.map(cat => cat.age)).toEqual([5,6,7,8,9,10]);
      });

    it("by age descending", () => {
        catsData.sort(catAgeSort);
        expect(catsData.map(cat => cat.age)).toEqual([10,9,8,7,6,5]);
      });

     it("by declawed ascending", () => {
        catsData.sort(catDeclawedDescendingSort);
        expect(catsData.map(cat => cat.declawed)).toEqual([false,false,false,true,true,true]);
      });

    it("by declawed descending", () => {
        catsData.sort(catDeclawedSort);
        expect(catsData.map(cat => cat.declawed)).toEqual([true,true,true,false,false,false]);
      });


     it("by neutered ascending", () => {
        catsData.sort(catNeuteredDescendingSort);
        expect(catsData.map(cat => cat.neutered)).toEqual([false,false,true,true,true,true]);
      });

    it("by neutered descending", () => {
        catsData.sort(catNeuteredSort);
        expect(catsData.map(cat => cat.neutered)).toEqual([true,true,true,true,false,false]);
      });


    });
    describe("filtering", () => {

      it("by name", () => {
        $ = jQuery;
	$('input#nameFilter').val('F');
        let filteredData = sortedCatsData.filter(cat => cat.name.toLowerCase().startsWith(
          $('input#nameFilter')
          .val()
          .toLowerCase()));
        expect(filteredData.map(cat => cat.name)).toEqual(["F cat"]);
        $ = () => {};
      });

      it("by breed", () => {
        $ = jQuery;
	$('input#breedFilter').val('a');
        let filteredData = sortedCatsData.filter(cat => cat.breed.toLowerCase().startsWith(
          $('input#breedFilter')
          .val()
          .toLowerCase()));
        expect(filteredData.map(cat => cat.breed)).toEqual(["A breed"]);
        $ = () => {};
      });

      it("by sex", () => {
        $ = jQuery;
	$('input#sexFilter').val('M');
        let filteredData = sortedCatsData.filter(cat => cat.sex.toLowerCase().startsWith(
          $('input#sexFilter')
          .val()
          .toLowerCase()));
        expect(filteredData.map(cat => cat.sex)).toEqual(["M","M","M"]);
        $ = () => {};
      });

      it("by shots", () => {
        $ = jQuery;
	$('input#shotsFilter').val(false);
        let filteredData = sortedCatsData.filter(cat => cat.shots.toString() ==
          $('input#shotsFilter').val());
        expect(filteredData.map(cat => cat.shots)).toEqual([false,false,false]);
        $ = () => {};
      });

     it("by declawed", () => {
        $ = jQuery;
	$('input#declawedFilter').val(true);
        let filteredData = sortedCatsData.filter(cat => cat.declawed.toString() ==
          $('input#declawedFilter').val());
        expect(filteredData.map(cat => cat.declawed)).toEqual([true,true,true]);
        $ = () => {};
      });

     it("by neutered", () => {
        $ = jQuery;
	$('input#neuteredFilter').val(false);
        let filteredData = sortedCatsData.filter(cat => cat.neutered.toString() ==
          $('input#neuteredFilter').val());
        expect(filteredData.map(cat => cat.neutered)).toEqual([false,false]);
        $ = () => {};
      });

     it("by age", () => {
        $ = jQuery;
	$('input#ageBeginFilter').val(7);
	$('input#ageEndFilter').val(9);
        let filteredData = sortedCatsData.filter(cat => 
        
        ($('input#ageBeginFilter').val() === '' &&
          $('input#ageEndFilter').val() === '') ||
        ($('input#ageBeginFilter').val() === '' &&
          cat.age <= $('input#ageEndFilter').val()) ||
        (cat.age >= $('input#ageBeginFilter').val() &&
          $('input#ageEndFilter').val() === '') ||
        (cat.age >= $('input#ageBeginFilter').val() &&
          cat.age <= $('input#ageEndFilter').val()));

        expect(filteredData.map(cat => cat.age)).toEqual([8,9,7]);
        $ = () => {};
      });
    });
    describe("pagination", () => {
      it("by 10 items", () => {
        pending("PAGINATION WILL BE ADDED IN THE NEXT MILESTONE");
      });
    });
});
