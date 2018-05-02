// Inside burger.js, import orm.js into burger.js

// Also inside burger.js, create the code that will call the ORM functions using burger specific input for the ORM.
// Export at the end of the burger.js file.


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
    // insertOne: function (cols, vals, callback) {
    //     orm.insertOne("burgers", cols, vals, function (res) {
    //         cb(res);
    //     })
    // },
    //first update attempt
    // updateOne: function (objColVals, condition, callback) {
    //     orm.updateOne("burgers", objColVals, condition, function (res) {
    //         cb(res);
    //     })
    // }
    updateOne: function (objColVals, condition, cb) {
        orm.updateOne("burgers", objColVals, condition, function (res) {
            cb(res);
        })
    }
}

module.exports = burger;