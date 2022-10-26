import { listToMatrix, transformMatrix } from "../utl";

test("It should convert list to matrix", () => {
  const list = [40, 20, 90, 10];
  const matrix = [
    [40, 20],
    [90, 10],
  ];
  const vector = Math.sqrt(list.length);

  const list2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const matrix2 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const vector2 = Math.sqrt(list2.length);

  expect(listToMatrix(list, vector)).toEqual(matrix);
  expect(listToMatrix(list2, vector2)).toEqual(matrix2);
});

test("It should transform element clockwise in matrix", () => {
  const matrix = [
    [40, 20],
    [90, 10],
  ];
  const transformedMatrix = [
    [90, 40],
    [10, 20],
  ];
  const vector = 2;

  const matrix2 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const transformedMatrix2 = [
    [4, 1, 2],
    [7, 5, 3],
    [8, 9, 6],
  ];
  const vector2 = 3;

  expect(transformMatrix(matrix, vector)).toEqual(transformedMatrix);
  expect(transformMatrix(matrix2, vector2)).toEqual(transformedMatrix2);
});
