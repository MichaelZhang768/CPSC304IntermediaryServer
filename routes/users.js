var express = require("express");
var router = express.Router();

var connection = require("../lib/connection.js");

router.get("/users/", function(req, res) {
    connection.query("SELECT * FROM Users", function(err, data) {
        if (err) {
            throw err;
        }
        console.log(data);
    });
    res.send("respond with a resource");
});

module.exports = router;
