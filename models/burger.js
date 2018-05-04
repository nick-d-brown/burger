
var orm = require("../config/orm");

var burger = {
    selectAll: function (callback) {
        orm.selectAll("burgers", function (res) {
            callback(res);
        });
    },
    insertOne: function (table, col1, col2, name, devoured, cb ) {
        orm.insertOne(table, col1, col2, name, devoured, function (res) {
            cb(res);
        })
    },
    updateOne: function (objColVals, condition, cb) {
        orm.updateOne("burgers", objColVals, condition, function (res) {
            cb(res);
        })
    }
}

module.exports = burger;