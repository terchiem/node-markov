/** Command-line tool to generate Markov text. */

const fs = require("fs").promises
const axios = require("axios");
const MarkovMachine = require('./markov.js');

let flag = process.argv[2];
let inputPath = process.argv[3];


if (flag === 'file') {
  readFile(inputPath);
} else {
  readURL(inputPath);
}


async function readFile(filePath) {
  let response;

  try {
    response = await fs.readFile(filePath, 'utf8');
  } catch (err) {
    console.log("No good! Can't read file", err);
    process.exit(1);
  }

  outputData(response);
}

async function readURL(url) {
  let response;
  try {
    response = await axios.get(url);
  } catch (err) {
    console.log(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }

  outputData(response.data)
}


function outputData(data) {
  let markov = new MarkovMachine(data);
  console.log(markov.makeText());
  process.exit(0);
}
