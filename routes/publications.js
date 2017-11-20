var express = require("express");
var router = express.Router();

var connection = require("../lib/connection.js");

router.post("/:username/publications", function(req, res, next) {
    connection.query(
        "INSERT INTO Game (gameId, currentPrice, developerName, gameName) " +
        "VALUES ()",   // TODO
        function(err) {
            if (err) {
                next(err);
                return;
            }

            connection.query(
                "INSERT INTO Develops (developerName, gameId, dateOfPublish) " +
                "VALUES ()",
                function(err) {
                    if (err) {
                        next(err);
                        return;
                    }

                    res.status(200);
                    res.end();
                }
            );
        }
    );
});

router.get("/:username/publications", function(req, res, next) {
    connection.query(
        "SELECT gameName, currentPrice " +
        "FROM Game " +
        "WHERE developerName = '" + req.params.username + "'",
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

router.post("/:username/dlcs", function(req, res, next) {
    connection.query(
        "INSERT INTO DLC (gameId, currentPrice, developerName, gameName) " +
        "VALUES (" + req.body.gameId + ", " + req.body.currentPrice + ", '" + req.params.username + "', '" + req.body.gameName + "')",
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

router.get("/:username/dlcs", function(req, res, next) {
    connection.query(
        "SELECT dlcName, dlcPrice " +
        "FROM Developer INNER JOIN Game INNER JOIN DLC " +
        "WHERE Developer.developerName = '" + req.params.username + "'",
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
