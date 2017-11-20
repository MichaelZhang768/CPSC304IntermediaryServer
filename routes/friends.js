var express = require("express");
var router = express.Router();

var connection = require("../lib/connection.js");

router.post("/:username/friends", function(req, res, next) {
    connection.query(
        "INSERT INTO Friend (username1, username2) " +
        "VALUES ('" + req.body.username1 + "', '" + req.body.username2 + "')",
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

router.get("/:username/friends", function(req, res, next) {
    connection.query(
        "SELECT username2 " +
        "FROM Users, Friend " +
        "WHERE username = username1",
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

router.delete("/:username/friends/:friend", function(req, res, next) {
    connection.query(
        "DELETE FROM Friend " +
        "WHERE username1 = '" + req.params.username + "' AND username2 = '" + req.params.friend + "'",
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

module.exports = router;
