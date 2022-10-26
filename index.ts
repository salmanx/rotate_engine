// STEP: 1: Receive CSV file from command line
// STEP: 2: Read and parse the CSV
// STEP: 3: Validate the list
// STEP: 4: Based on invalid list do early return with response
// STEP: 5: Build a left col, right col and matrix from the flat list
// STEP: 6: Run rotate method on the matrix
// STEP: 7: If rotate method works, then build the flat list
// STEP: 8: Write the flat list with expected format to CSV file

import CSVParser from "./CSVParser";

class Main {
  public start() {
    const csvFile = process.argv[2];
    if (csvFile) {
      new CSVParser(csvFile);
    } else {
      console.error("Please pass a csv file as argument.");
      process.exit();
    }
  }
}

const data = new Main();

data.start();
