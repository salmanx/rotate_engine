import { DataType } from "./type";
import { transformMatrix } from "./utl";
import { listToMatrix } from "./utl";

export default class RotateEngine {
  public flatList: DataType[];
  public rotatedTable: any = [];

  constructor(public data: DataType[]) {
    this.flatList = data;
  }

  public rotate() {
    return this.transformRotation();
  }

  private transformRotation() {
    this.flatList.map((list: DataType) => {
      // Rotate engine can perfectly rotate any matrix in any form
      // But we should not pass the records to engine those are not matrix
      // We should skip the record from engine those are invalid  i,e -0 unreal number
      if (this.validList(list.json)) {
        if (list.json.length < 2) {
          // we don't need to run the heavy algorithm for if array length < 2
          this.rotatedTable.push({
            id: list.id,
            json: JSON.stringify(list.json),
            is_valid: true,
          });
        } else {
          const vector = Math.sqrt(list.json.length);
          const arrayToMatrix = listToMatrix(list.json, vector);
          const transformedMatrix = transformMatrix(arrayToMatrix, vector);
          this.rotatedTable.push({
            id: list.id,
            // Converting  matrix to flat array using array shorthand method.
            json: JSON.stringify([].concat(...transformedMatrix)),
            is_valid: true,
          });
        }
      } else {
        this.rotatedTable.push({
          id: list.id,
          json: JSON.stringify([]),
          is_valid: false,
        });
      }
    });

    return this.rotatedTable;
  }

  public validList(list: number[]) {
    // Order is important here.

    // We should have early return if we have any negative 0 which is unreal number
    if (list.some((a) => Object.is(a, -0))) return false;

    if (list.length === 1) return true;

    if (list.length > 2 && Math.sqrt(list.length) % 1 === 0) return true;

    // For all other cases
    return false;
  }
}
