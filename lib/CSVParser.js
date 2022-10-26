"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var csv_parse_1 = require("csv-parse");
var RotateEngine_1 = require("./RotateEngine");
var CSVFormatter_1 = require("./CSVFormatter");
var CSVParser = /** @class */ (function () {
    function CSVParser(inputFile, outputFile) {
        this.inputFile = inputFile;
        this.outputFile = outputFile;
        this.headers = ["id", "json"];
        var csvFilePath = path.resolve(__dirname, "..", inputFile);
        this.outputFilePath = path.resolve(__dirname, "..", outputFile);
        this.parser(csvFilePath);
    }
    CSVParser.prototype.parser = function (csvFilePath) {
        return __awaiter(this, void 0, void 0, function () {
            var fileContent;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    fileContent = fs.readFileSync(csvFilePath, {
                        encoding: "utf-8"
                    });
                    // Parse does streaming behind the scene
                    // It read data asynchronously which takes care performance for large streaming file
                    (0, csv_parse_1.parse)(fileContent, {
                        delimiter: ",",
                        columns: this.headers,
                        fromLine: 2,
                        cast: function (columnValue, context) {
                            if (context.column === "json") {
                                return JSON.parse(columnValue);
                            }
                            return columnValue;
                        }
                    }, function (error, result) {
                        if (error)
                            _this.exitProgram(error === null || error === void 0 ? void 0 : error.message, error.code);
                        // Definitely We could write stream the data in somewhere else and make the class independent form RotateEngine
                        var content = new RotateEngine_1["default"](result);
                        var rotatedContent = content.rotate();
                        new CSVFormatter_1["default"](rotatedContent, _this.outputFilePath);
                    });
                }
                catch (error) {
                    this.exitProgram("File not found or format is not in csv!");
                }
                return [2 /*return*/];
            });
        });
    };
    CSVParser.prototype.exitProgram = function (errorMessage, errorType) {
        if (errorMessage === void 0) { errorMessage = ""; }
        if (errorType === void 0) { errorType = ""; }
        process.on("exit", function (code) {
            return console.log("Exiting the program. Reason: (".concat(errorType, ") ").concat(errorMessage));
        });
    };
    return CSVParser;
}());
exports["default"] = CSVParser;
