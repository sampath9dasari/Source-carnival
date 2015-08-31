/*
 * Database Model and Other Operations
 * Team pclubGU
 * The MIT License
 */
var m = require('mysql'),
    conf = require('./config'),
    usePooling = false;

var pool = m.createPool({
        host: 'localhost',
        user: 'root',
        password: 'akhil',
});

module.exports.login = function() {
        pool.getConnection(function(err, conn) {
                conn.query("", function(err, rows) {
                        conn.close();
                });
        });
}

module.exports.deleteAccount = function() {
        pool.getConnection(function(err, conn) {
                conn.query("", function(err, rows) {
                        conn.close();
                });
        });
}

