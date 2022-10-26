// STEP: 1: Receive CSV file from command line
// STEP: 2: Read and parse the CSV
// STEP: 3: Validate the list
// STEP: 4: Based on invalid list do early return with response
// STEP: 5: Build a left col, right col and matrix from the flat list
// STEP: 6: Run rotate method on the matrix
// STEP: 7: If rotate method works, then build the flat list
// STEP: 8: Write the flat list with expected format to CSV file

import CSVParser from "./lib/CSVParser";

class Main {
  public start() {
    const inputCsvFile = process.argv[2];
    const outputCsvFile = process.argv[3];

    if (inputCsvFile && outputCsvFile) {
      new CSVParser(inputCsvFile, outputCsvFile);
    } else {
      console.error(
        "Please pass a csv file for input and output as argument. "
      );
      console.error("like this: node cli.js input.csv  output.csv ");
      process.exit();
    }
  }
}

const data = new Main();

data.start();
