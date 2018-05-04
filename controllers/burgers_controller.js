
var express = require("express");
var routes = express.Router();
var burger = require("./../models/burger.js");

routes.get("/", function (req, res) {
    // get all of the cats data and render it to the index html file
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers:data
        };
        console.log(hbsObject);
        res.render("index", hbsObject)
        
    })
});

routes.get("/index", function (req, res) {
    // get all of the cats data and render it to the index html file
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers:data
        };
        console.log(hbsObject);
        res.render("index", hbsObject)
        
    })
});


routes.post("/api/burgers", function (req, res) {
    console.log(req.body.name);
    console.log(req.body.devoured);
    
    // ORM insertOne new burger with a name and whether or not is devoured
    burger.insertOne(
        "burgers",
        "burger_name",
        "devoured",
        req.body.name,
        req.body.devoured,
        // 0,
        function (result) {
            // Send back the ID of the new quote
            res.json({ id: result.insertId });
        });

});

routes.put("/api/burgers/:id", function (req, res) {
    // update a burgers "devoured" condition at its specific id
    var condition = "id = " + req.params.id;
    
    console.log("condition: ", condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function (result) {
        if ((result.changedRows == 0)) {
            return res.status(404).end();
        } else {
            // res.status(200).end
            res.json(result);
        }
    }); 
});


module.exports = routes;

// CHANGED EVER INSTANCE OF "router" TO "routes" WITH EXCEPTION - router initialization