import * as csv from "fast-csv";
import { writeToPath } from "@fast-csv/format";

import { FormattedDataType } from "./type";

export default class CSVFormatter {
  constructor(private data: FormattedDataType[], private csvFilePath: string) {
    this.formatter(data);
  }

  public formatter(lists: FormattedDataType[]) {
    const options = {
      headers: true,
      quoteColumns: { json: true },
      quoteHeaders: false,
    };
    writeToPath(this.csvFilePath, lists, options)
      .on("error", (err) => {
         console.error(err);
         process.exit();
      })
      .on("finish", () => console.log("Done writing."));
  }
}
