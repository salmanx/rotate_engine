import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse";

import { DataType } from "./type";
import RotateEngine from "./RotateEngine";
import CSVFormatter from "./CSVFormatter";

export default class CSVParser {
  private headers = ["id", "json"];

  constructor(public fileName: string) {
    const csvFilePath = path.resolve(__dirname, fileName);
    this.parser(csvFilePath);
  }

  public async parser(csvFilePath: string) {
    try {
      const fileContent: any = fs.readFileSync(csvFilePath, {
        encoding: "utf-8",
      });
      // Parse does streaming behind the scene
      // It read data asynchronously which takes care performance for large streaming file
      parse(
        fileContent,
        {
          delimiter: ",",
          columns: this.headers,
          fromLine: 2,
          cast: (columnValue, context) => {
            if (context.column === "json") {
              return JSON.parse(columnValue);
            }
            return columnValue;
          },
        },
        (error, result: DataType[]) => {
          if (error) this.exitProgram(error?.message, error.code);

          // Definitely We could write stream the data in somewhere else and make the class independent form RotateEngine
          const content = new RotateEngine(result);
          const rotatedContent = content.rotate();
          new CSVFormatter(rotatedContent);
        }
      );
    } catch (error) {
      this.exitProgram("File not found or format is not in csv!");
    }
  }

  private exitProgram(errorMessage = "", errorType = "") {
    process.on("exit", function (code) {
      return console.log(
        `Exiting the program. Reason: (${errorType}) ${errorMessage}`
      );
    });
  }
}
