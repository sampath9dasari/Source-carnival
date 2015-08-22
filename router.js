/*
 * Express Router for serving the templates
 * Team pclubGU
 * The MIT License
 */
var http = require('http'),
    express = require('express'),
    fs = require('fs'),
    bcrypt = require('bcrypt'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser');

module.exports.app = function() {        
        var port = process.env.PORT || 8000;
        var app = express();
        var router = express.Router();

        app.use(express.static('assets'));
        app.set('title', "GUSAC Carnival 4");
        app.use(cookieParser());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        app.use('/', router);

        http.createServer(app).listen(port, function() {
                console.log("Front End Application Server started");
        });
}
