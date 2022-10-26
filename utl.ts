// @ts-nocheck
export function listToMatrix(arr: number[], vector: number) {
  return arr.reduce(
    (rows: any[], key: any, index: number) =>
      (index % vector == 0
        ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows,
    []
  );
}

export function transformMatrix(matrix, vector: number) {
  let [row, col]: [number, number] = [0, 0];
  let [m, n]: [number, number] = [vector, vector];
  let prev, curr;

  while (row < m && col < n) {
    if (row + 1 == m || col + 1 == n) break;
    prev = matrix[row + 1][col];

    for (let i: number = col; i < n; i++) {
      curr = matrix[row][i];
      matrix[row][i] = prev;
      prev = curr;
    }
    row++;

    for (let i: number = row; i < m; i++) {
      curr = matrix[i][n - 1];
      matrix[i][n - 1] = prev;
      prev = curr;
    }
    n--;

    if (row < m) {
      for (let i: number = n - 1; i >= col; i--) {
        curr = matrix[m - 1][i];
        matrix[m - 1][i] = prev;
        prev = curr;
      }
    }
    m--;

    if (col < n) {
      for (let i: number = m - 1; i >= row; i--) {
        curr = matrix[i][col];
        matrix[i][col] = prev;
        prev = curr;
      }
    }
    col++;
  }

  return matrix;
}
