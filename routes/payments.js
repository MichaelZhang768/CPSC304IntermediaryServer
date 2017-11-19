var express = require("express");
var router = express.Router();

var connection = require("../lib/connection.js");

router.post("/:username/payments", function(req, res, next) {
    connection.query(
        "INSERT INTO Payment (username, paymentNumber, dateOfPayment, cost, paymentMethod) " +
        "VALUES ('" + req.params.username + "', " + req.body.paymentNumber + ", STR_TO_DATE('" + req.body.dateOfPayment + "', '%Y-%m-%d'), " + req.body.cost + ", '" + req.body.paymentMethod + "'",
        function(err) {
            if (err) {
                next(err);
                return;
            }

            connection.query(
                "UPDATE Users " +
                "SET accountBalance = accountBalance + " + req.body.cost + " " +
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
});

module.exports = router;
