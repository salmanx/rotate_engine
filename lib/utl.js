"use strict";
exports.__esModule = true;
exports.transformMatrix = exports.listToMatrix = void 0;
// @ts-nocheck
function listToMatrix(arr, vector) {
    return arr.reduce(function (rows, key, index) {
        return (index % vector == 0
            ? rows.push([key])
            : rows[rows.length - 1].push(key)) && rows;
    }, []);
}
exports.listToMatrix = listToMatrix;
function transformMatrix(matrix, vector) {
    var _a = [0, 0], row = _a[0], col = _a[1];
    var _b = [vector, vector], m = _b[0], n = _b[1];
    var prev, curr;
    while (row < m && col < n) {
        if (row + 1 == m || col + 1 == n)
            break;
        prev = matrix[row + 1][col];
        for (var i = col; i < n; i++) {
            curr = matrix[row][i];
            matrix[row][i] = prev;
            prev = curr;
        }
        row++;
        for (var i = row; i < m; i++) {
            curr = matrix[i][n - 1];
            matrix[i][n - 1] = prev;
            prev = curr;
        }
        n--;
        if (row < m) {
            for (var i = n - 1; i >= col; i--) {
                curr = matrix[m - 1][i];
                matrix[m - 1][i] = prev;
                prev = curr;
            }
        }
        m--;
        if (col < n) {
            for (var i = m - 1; i >= row; i--) {
                curr = matrix[i][col];
                matrix[i][col] = prev;
                prev = curr;
            }
        }
        col++;
    }
    return matrix;
}
exports.transformMatrix = transformMatrix;
