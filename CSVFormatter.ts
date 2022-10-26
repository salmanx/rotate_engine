import * as csv from "fast-csv";
import { FormattedDataType } from "./type";

export default class CSVFormatter {
  constructor(private data: FormattedDataType[]) {
    this.formatter(data);
  }

  public formatter(lists: FormattedDataType[]) {
    const csvStream = csv.format({
      headers: true,
      quoteColumns: { json: true },
      quoteHeaders: false,
    });

    csvStream.pipe(process.stdout).on("end", () => process.exit());

    lists.forEach((list) => {
      csvStream.write({
        id: list.id,
        json: list.json,
        is_valid: list.is_valid,
      });
    });
    csvStream.end();
  }
}
