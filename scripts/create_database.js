var mysql = require('mysql');
var dbconfig = require('./database');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('CREATE DATABASE ' + dbconfig.database);

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `regname` VARCHAR(255) NOT NULL, \
    `regemail` VARCHAR(255) NOT NULL, \
    `regphone` VARCHAR(255) NOT NULL, \
    `regevent` VARCHAR(255) NOT NULL, \
    `regyear` VARCHAR(255) NOT NULL, \
    `regcollege` VARCHAR(255) NOT NULL, \
    PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) \
)');

console.log('Success: Database Created!')

connection.end();
