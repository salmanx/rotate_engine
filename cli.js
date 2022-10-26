"use strict";
// STEP: 1: Receive CSV file from command line
// STEP: 2: Read and parse the CSV
// STEP: 3: Validate the list
// STEP: 4: Based on invalid list do early return with response
// STEP: 5: Build a left col, right col and matrix from the flat list
// STEP: 6: Run rotate method on the matrix
// STEP: 7: If rotate method works, then build the flat list
// STEP: 8: Write the flat list with expected format to CSV file
exports.__esModule = true;
var CSVParser_1 = require("./lib/CSVParser");
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.prototype.start = function () {
        var inputCsvFile = process.argv[2];
        var outputCsvFile = process.argv[3];
        if (inputCsvFile && outputCsvFile) {
            new CSVParser_1["default"](inputCsvFile, outputCsvFile);
        }
        else {
            console.error("Please pass a csv file for input and output as argument. ");
            console.error("like this: node cli.js input.csv  output.csv ");
            process.exit();
        }
    };
    return Main;
}());
var data = new Main();
data.start();
