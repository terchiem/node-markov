const MarkovMachine = require('./markov.js')

describe("Markov Machine tests", function() {
  let markov;

  beforeEach(function (){
    markov = new MarkovMachine("the cat in the hat");

  });

  test("class gets created with the proper chains", function () {

    let chains = {
      "the": ["cat", "hat"], 
      "cat": ["in"], 
      "in": ["the"], 
      "hat": [null]
    }

    expect(markov.chains).toEqual(chains)
  })

  test("class created with an empty string has no data in chains", function () {
    let invalidMarkov = new MarkovMachine("");
    expect(invalidMarkov.chains).toEqual({});
  })


})