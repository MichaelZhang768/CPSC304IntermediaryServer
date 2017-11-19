var mySql = require("mysql");

var connection = mySql.createConnection({
    "host": "sql3.freemysqlhosting.net",
    "port": 3306,   // not strictly necessary... port is 3306 by default
    "database": "sql3205841",
    "user": "sql3205841",
    "password": "cT6eYJUvtz"
});

connection.connect(function(err) {
    if (err) {
        throw err;
    }
    console.log("Connected to MySQL");
});

process.on("SIGINT", function() {
    connection.end();
    console.log("Disconnected from MySQL");
});

module.exports = connection;
