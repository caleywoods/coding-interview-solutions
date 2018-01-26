/*
  [2,4,1,6,5,40,-1]
  [-10]
  [40,-1,5,1,7,9,1,1,3,6,7,8,9,0,1,-2,14,37,99,104,4]
  [5,4]

  Take in a parameter that is an array of numbers and return the two numbers
  which when multiplied together, equal 20. Return null otherwise.
*/

/*
  Solution 1 - Based on looping over the array and then with each number,
  looping again and storing the resulting multiplication as the key in an object
  with the value being an array of the two numbers we used to get 20. This
  actually made me want to take a shower it was so gross but it was the first
  solution I came up with while my head screamed "There has to be a better way!!!"

  Time ~ 20 minutes

  O(n^2)
*/
getTwenty = ( numArray ) => {
  let hashTable = {};

  for ( const [i, value] of numArray.entries() ) {
    let nextElement = numArray[i+1];

    for ( const val of numArray.slice(i, numArray.length) ) {
      hashTable[value * val] = [value,val];

      /*
        This assumes we should return the first pair of numbers that equals 20.
        If this is a bad assumption this needs changed.
      */
      if ( hashTable[20] ) { return hashTable[20]; }
    }
  }
  return null;
}

/*
  Solution 2 - Based around doing 20 % n where N is the current value and
  if the result of the modulus is 0 then we look ahead for potential numbers
  that multiply to 20. Modulus operator shows remainder so if a number cannot
  go evenly into 20 then it cannot be part of a pair that multiplies

  Time ~ 15 minutes (and 2 nutty bars.)

  O(n)
*/


getTwenty = ( numArray ) => {
  for ( const val of numArray ) {
    if ( (20 % val) === 0 ) {
      // Partner is the number we need to look ahead into the array with to see if it exists
      const partner = 20 / val;

      if ( numArray.indexOf(partner) !== -1 ) {
        return [val, partner];
      }
    }
  }

  return null;
}

/*
  Test Scenario

  https://jsperf.com/example1comparison1

  OPS = Operations Per Second, higher is better

  Solution 1 - 84,987 - 81,859 - 82,036
    3 run average of 82,960 OPS

  Solution 2 - 6,106,821 -  6,068,295 - 5,904,048
    3 run average of 6,026,388 OPS
*/