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

router.post("/:username/my_games", function(req, res, next) {
    connection.query(
        "SELECT currentPrice " +
        "FROM Game " +
        "WHERE gameId = '" + req.body.gameId + "'",
        function(err, data) {
            if (err) {
                next(err);
                return;
            }

            var currentPrice = data[0]["currentPrice"];
            connection.query(
                "INSERT INTO Owns (username, gameId, purchasePrice, dateOfPurchase) " +
                "VALUES ('" + req.params.username + "', '" + req.body.gameId + "', " + currentPrice + ", STR_TO_DATE('" + req.body.dateOfPayment + "', '%Y-%m-%d')",
                function(err) {
                    if (err) {
                        next(err);
                        return;
                    }

                    connection.query(
                        "UPDATE Users " +
                        "SET accountBalance = accountBalance - " + currentPrice + " " +
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
                }
            );
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

router.delete("/:username/my_games/:gameId", function(req, res, next) {
    connection.query(
        "SELECT purchasePrice " +
        "FROM Owns " +
        "WHERE gameId = " + req.params.gameId,
        function(err, data) {
            if (err) {
                next(err);
                return;
            }

            var purchasePrice = data[0]["purchasePrice"];
            connection.query(
                "DELETE FROM Owns " +
                "WHERE gameId = " + req.params.gameId,
                function(err) {
                    if (err) {
                        next(err);
                        return;
                    }

                    connection.query(
                        "UPDATE Users" +
                        "SET accountBalance = accountBalance + " + purchasePrice + " " +
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
                }
            );
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
