var express = require("express");
var router = express.Router();

var connection = require("../lib/connection.js");

router.get("/:username/all_games", function(req, res, next) {
    connection.query(
        "SELECT gameName, developerName, currentPrice, IF(username IS NULL, FALSE, TRUE) " +
        "FROM Game LEFT JOIN (SELECT * FROM Owns WHERE username = '" + req.params.username + "') AS MyOwns ON Game.gameId = MyOwns.gameId",
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

router.get("/:username/my_games", function(req, res, next) {
    connection.query(
        "SELECT gameName, developerName, currentPrice " +
        "FROM Owns INNER JOIN Game " +
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

router.get("/:username/recommended_games", function(req, res, next) {
    connection.query(
        "SELECT gameName, developerName, currentPrice " +
        "FROM Friend, Owns, Game " +
        "WHERE username1 = '" + req.params.username + "' AND username2 = Owns.username AND Owns.gameID = Game.gameId",
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
