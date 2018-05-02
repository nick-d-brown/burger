
var connection = require("./../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
} 

// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection
var orm = {
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM ??";
        connection.query(queryString, [tableInput], function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    //first attempt w/o cat example
//    insertOne: function (table, burger_name, devoured, burger, yesOrNo) {
//         var queryString = "INSERT INTO ?? (? , ?) VALUES (? ,?);";
//         console.log(queryString);
//         connection.query(queryString, [table, burger_name, devoured, burger, yesOrNo], function (err, result) {
//             if (err) throw err;
//             console.log(result);
//         });
    // },



    insertOne: function (table, col1, col2, name, devoured, cb ) {
        var queryString =
            "INSERT INTO ?? (" + col1 +"," + col2 + ") VALUES (?,?);"; 

        connection.query(
            queryString,
            [table, name, devoured],
            function (err, result) {
                if (err) throw err;
                console.log(queryString);
                
                cb(result);
            }
        );
    },


    // thrid attempt
    // insertOne: function(table, cols, vals, cb) {
    //     var queryString = "INSERT INTO " + table;

    //     queryString += " (";
    //     queryString += cols.toString();
    //     queryString += ") ";
    //     queryString += "VALUES (";
    //     queryString += printQuestionMarks(vals.length);
    //     queryString += ") ";

    //     console.log(queryString);

    //     connection.query(queryString, vals, function (err, result) {
    //         if (err) {
    //             throw err;
    //         }

    //         cb(result);
    //     });
    // },
    // Second attempt w/ cats example
//    insertOne: function (table, cols, vals, cb) {
//         var queryString = "INSERT INTO ?? (?) VALUES (?);";
//         console.log(queryString);
//         connection.query(queryString, [table, cols.toString(), printQuestionMarks(vals.length)], function (err, result) {
//             if (err) throw err;
//            cb(result);
//         });
//     },
       // first attempt w/o cat example
    // updateOne: function (table, devoured, trueOrFalse, id, value, cb) {
    //     var queryString =
    //         "UPDATE ?? SET "+devoured+"=? WHERE "+id+"=?";
    //     console.log(queryString);
        
    //     connection.query(
    //         queryString,
    //         [table, trueOrFalse, value],
    //         function (err, result) {
    //             if (err) throw err;
    //             console.log(result);
    //             cb(result);
    //         }
    //     );
    // }

    //second attempt
    // updateOne: function (table, objColVals, condition, cb) {
    //     var queryString =
    //         "UPDATE ?? SET ? WHERE ?";

    //     connection.query(
    //         queryString,
    //         [table, objToSql(objColVals), condition],
    //         function (err, result) {
    //             if (err) throw err;
    //             cb(result);
    //         }
    //     );
    // }
    // third attempt
    updateOne: function (table, objColVals, condition, cb) {
        var queryString =
            "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        
        connection.query(
            queryString, function (err, result) {
                if (err) throw err;
                cb(result);
            }
        );
    }
};

module.exports = orm;
