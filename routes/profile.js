var express = require("express");
var router = express.Router();

var connection = require("../lib/connection.js");

router.post("/:username/profile", function(req, res, next) {
    connection.query(
        "UPDATE Users " +
        "SET email = '" + req.body.email + "', password = '" + req.body.password + "', description = '" + req.body.description + "' " +
        "WHERE username = '" + req.params.username + "'",
        function(err) {
            if (err) {
                next(err);
                return;
            }

            res.status(200);
            res.end();
        }
    );
});

router.get("/:username/profile", function(req, res, next) {
    connection.query(
        "SELECT username, description " +
        "FROM Users " +
        "WHERE username = '" + req.params.username + "'",
        function(err, data) {
            if (err) {
                next(err);
                return;
            }

            res.status(200);
            res.json(data);
        }
    );
});

module.exports = router;
