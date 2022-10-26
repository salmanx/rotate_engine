"use strict";
exports.__esModule = true;
var utl_1 = require("./utl");
var utl_2 = require("./utl");
var RotateEngine = /** @class */ (function () {
    function RotateEngine(data) {
        this.data = data;
        this.rotatedTable = [];
        this.flatList = data;
    }
    RotateEngine.prototype.rotate = function () {
        return this.transformRotation();
    };
    RotateEngine.prototype.transformRotation = function () {
        var _this = this;
        this.flatList.map(function (list) {
            // Rotate engine can perfectly rotate any matrix in any form
            // But we should not pass the records to engine those are not matrix
            // We should skip the record from engine those are invalid  i,e -0 unreal number
            if (_this.validList(list.json)) {
                if (list.json.length < 2) {
                    // we don't need to run the heavy algorithm for if array length < 2
                    _this.rotatedTable.push({
                        id: list.id,
                        json: JSON.stringify(list.json),
                        is_valid: true
                    });
                }
                else {
                    var vector = Math.sqrt(list.json.length);
                    var arrayToMatrix = (0, utl_2.listToMatrix)(list.json, vector);
                    var transformedMatrix = (0, utl_1.transformMatrix)(arrayToMatrix, vector);
                    _this.rotatedTable.push({
                        id: list.id,
                        // Converting  matrix to flat array using array shorthand method.
                        json: JSON.stringify([].concat.apply([], transformedMatrix)),
                        is_valid: true
                    });
                }
            }
            else {
                _this.rotatedTable.push({
                    id: list.id,
                    json: JSON.stringify([]),
                    is_valid: false
                });
            }
        });
        return this.rotatedTable;
    };
    RotateEngine.prototype.validList = function (list) {
        // Order is important here.
        // We should have early return if we have any negative 0 which is unreal number
        if (list.some(function (a) { return Object.is(a, -0); }))
            return false;
        if (list.length === 1)
            return true;
        if (list.length > 2 && Math.sqrt(list.length) % 1 === 0)
            return true;
        // For all other cases
        return false;
    };
    return RotateEngine;
}());
exports["default"] = RotateEngine;
