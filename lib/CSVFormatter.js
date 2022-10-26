"use strict";
exports.__esModule = true;
var format_1 = require("@fast-csv/format");
var CSVFormatter = /** @class */ (function () {
    function CSVFormatter(data, csvFilePath) {
        this.data = data;
        this.csvFilePath = csvFilePath;
        this.formatter(data);
    }
    CSVFormatter.prototype.formatter = function (lists) {
        var options = {
            headers: true,
            quoteColumns: { json: true },
            quoteHeaders: false
        };
        (0, format_1.writeToPath)(this.csvFilePath, lists, options)
            .on("error", function (err) {
            console.error(err);
            process.exit();
        })
            .on("finish", () => {});
    };
    return CSVFormatter;
}());
exports["default"] = CSVFormatter;
