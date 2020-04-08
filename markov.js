/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chains = {};
    this.startWords = [];

    for (let i = 0; i < this.words.length; i++) {
      let currentWord = this.words[i];
      let nextWord = this.words[i+1] || null;

      // add words that start with a capital letter to startWords
      if (currentWord[0] === currentWord[0].toUpperCase()) {
        this.startWords.push(currentWord);
      } 

      // create chains for the word
      if (this.chains[currentWord] === undefined) {
        this.chains[currentWord] = [nextWord];
      } else {
        this.chains[currentWord].push(nextWord);
      }
    }
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let lastWord = this.getRandomWord(this.startWords);
    let sentence = lastWord;

    for (let i = 0; i < numWords; i++) {
      let currentWord;

      if (lastWord.endsWith('.')) {
        currentWord = this.getRandomWord(this.startWords);
      } else {
        currentWord = this.getRandomWord(this.chains[lastWord])
      }

      if (currentWord === null) {
        break;
      }

      sentence += ` ${currentWord}`;
      lastWord = currentWord;
    }

    return sentence;
  }

  /** return a random word from the passed array */

  getRandomWord(arr) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }
}

let m = new MarkovMachine("‘You are old,’ said the Dormouse, who was talking. Alice could only see her. She is such a new pair of white kid gloves and the blades of grass, but she remembered the number of bathing machines in the kitchen that did not like the wind, and was just beginning to grow up any more if you’d like it put the Dormouse again, so she went nearer to make out that it was certainly English. ‘I don’t quite understand you,’ she said, ‘for her hair goes in such confusion that she was looking down with it.")
console.log(m.makeText());

module.exports = MarkovMachine;