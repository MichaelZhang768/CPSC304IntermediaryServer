var express = require("express");
var router = express.Router();

var connection = require("../lib/connection.js");

router.post("/users", function(req, res, next) {
    connection.query(
        "INSERT INTO Users (username, password, email) " +
        "VALUES ('" + req.body.username + "', '" + req.body.password + "', '" + req.body.email + "'",
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

router.get("/users/:username", function(req, res, next) {
    connection.query(
        "SELECT * " +
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

router.get("/user_usernames/:username", function(req, res, next) {
    connection.query(
        "SELECT username " +
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
