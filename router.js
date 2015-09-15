/*
 * Express Router for serving the templates
 * Team pclubGU
 * The MIT License
 */
var http = require('http'),
    express = require('express'),
    fs = require('fs'),
    db = require('./db'),
    bcrypt = require('bcrypt'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser');

module.exports.app = function() {        
        var port = process.env.PORT || 8000;
        var app = express();
        var router = express.Router();
        var errorPage = fs.readFileSync("404.html", "UTF-8");

        app.use(express.static('assets'));
        app.set('title', "GUSAC Carnival 4");
        app.use(cookieParser());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        router.get('/', function(req, res) {
                var data = fs.readFileSync("views/index.html", "UTF-8");
                res.send(data.toString());
        });

        router.get('/about', function(req, res) {
                var data = fs.readFileSync("views/about.html", "UTF-8");
                res.send(data.toString());
        });

        router.get('/contact', function(req, res) {
                var data = fs.readFileSync("views/contact.html", "UTF-8");
                res.send(data.toString());
        });

        router.post('/controller/contact', function(req, res) {
                var name = req.body.name,
                    phone = req.body.phone,
                    email = req.body.email,
                    query = req.body.query;
        });

        router.get('/events', function(req, res) {
                var data = fs.readFileSync("views/events.html", "UTF-8");
                res.send(data.toString());
        });

        router.get('/register', function(req, res) {
                var data = fs.readFileSync("views/register.html", "UTF-8");
                res.send(data.toString());
        });

        router.post('/controller/register', function(req, res) {
               db.accAdd({
                       name = req.body['name'],
                       college = req.body['collegename'],
                       collegeid = req.body['collegeid'],
                       email = req.body['email'],
                       dept = req.body['dept'],
                       pwd = req.body['pass1'],
                       confpwd = req.body['pass2'],
                       phone = req.body['phone']
               }, function(err) {
                       if(err) {
                               res.status(400).send(err);
                       }
                       else {
                               res.status(200).send('it is done');
                       }
               });
        });

        router.get('/team', function(req, res) {
                var data = fs.readFileSync("views/team.html", "UTF-8");
                res.send(data.toString());
        });

        router.get('/[0-9]', function(req, res) {
                res.redirect(errorPage);
        });

        router.get('*', function(req, res) {
                var match = 'views/' + req.params[0] + '.html';
                fs.exists(match, function(present) {
                        if(present) {
                                fs.readFile(match, function(err, data) {
                                        if(err) {
                                                res.send(errorPage.toStrng(), "UTF-8");
                                        }
                                        else {
                                                res.end(data, "UTF-8");
                                        }
                                });
                        }
                        else {
                                res.end(errorPage.toString(), "UTF-8");
                        }
                });
        });
        
        app.use('/', router);

        http.createServer(app).listen(port, function() {
                console.log("Front End Application Server started");
        });
}
