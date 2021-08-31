// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (num, array) => {                                                                                         //create factory function
  return {                                                                                                                       //and return object
    specimenNum: Number(num),
    dna: array,
    mutate() {                                                                                                                   //mutate method
      const randDnaBaseIndex = Math.floor(Math.random() * this.dna.length);                                                      //generate a random number for index
      const dnaBase = this.dna[randDnaBaseIndex];                                                                                //use random index for selecting dna base
      let randBase = returnRandBase();                                                                                           //generate a random base with provided function
      while (dnaBase === randBase) {                                                                                             //while random dna base  ->
        randBase = returnRandBase();                                                                                             //and new random generated base are equal ->
      }                                                                                                                          //keep generating random base
      this.dna[randDnaBaseIndex] = randBase;                                                                                     //if different, change random dna base ->
      console.log(`DNA's base index ${randDnaBaseIndex} changed from ${dnaBase} to ${randBase}`);                                //with the random generated base and print
      return this.dna;
    },
      compareDNA(pAequor) {                                                                                                     //compare function
      const sharedDna = this.dna.filter((base, index) => base.indexOf(pAequor.dna[index]) !== -1);          //filter dna, for every base and its index, check if base returns an index from argument array if argument array contains base in given index, return base
      const sharedPercent = ((sharedDna.length / 15) * 100).toFixed(2);                                                         //get percent of shared dna
      console.log(`Specimen ${this.specimenNum} and specimen ${pAequor.specimenNum} have ${sharedPercent}% DNA in common`);     //print specimens numbers and shared percent
    },
    willLikelySurvive() {                                                                                                       //will likely survive function
      const survivor = this.dna.filter(base => base === 'C' || base === 'G');                               //filter dna, for every base check if equal C or G and return base
      return (((survivor.length / 15).toFixed(2)) >= 0.6);                                                  //if the generated array has a 60% length of original dna return true
    },
    complementStrand() {                                                                                                        //complement strand function
      const complementaryDna = this.dna.map(base => {                                                                           //map dna and for every base change ->
        return base === 'A' ? 'T'                                                                                               //it to its complementary ->
          : base === 'T' ? 'A'                                                                                                  //using ternary operators 
            : base === 'C' ? 'G'
              : base === 'G' ? 'C'
                : null;
      })
      return complementaryDna;                                                                                                  //return the complementary dna
    }
  }
};

const instancesArray = [];                                                    //new array for saving instances
const survivors = [];                                                         //new array for saving surviving dna's

const createInstances = (num, array) => {                                     //function for creating instances given a number of instances to create and an array to save them
  for (let i = 1; i <= num; i++) {                                            //loop the number of times 
    array.push(pAequorFactory(i, mockUpStrand()));                            //create instances using factory function and push to this array
  }                                                                          
};

const checkSurvivors = (instArry, survArray) => {                             //function for checking survivors given an instances array and an array to save survivors
  instArry.forEach(value => {                                                 //check if every instance dna will survive
    if (value.willLikelySurvive()) {                                          //if true, push to survivors array
      survArray.push(value);
    }
  })
  while (survArray.length < 30) {                                             //while survivors array has less than 30 entries
    const num = instArry.length + 1;                                          //create const num equal to instances array plus one
    instArry.push(pAequorFactory(num, mockUpStrand()));                       //use num to create new consecutive instance with factory function and push to instances array
    const index = num - 1;                                                    //create const index equals to num minus one to access the previous created instance by index
    const willSurvive = instArry[index].willLikelySurvive();                  //create const willSurvive to check if instance in index will survive with the survive method
    if (willSurvive) {                                                        //if willSurvive is true
      survArray.push(instArry[index]);                                        //push the instance from instances array given the index into survivors array
    }
  }
};

//createInstances(5, instancesArray);                                         //some code for testing
//console.log(instancesArray);

//checkSurvivors(instancesArray, survivors);
//console.log(instancesArray);
//console.log(survivors);
