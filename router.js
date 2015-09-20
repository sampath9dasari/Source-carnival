/*
 * Express Router for serving the templates
 * Team pclubGU
 * The MIT License
 */
var http = require('http'),
    express = require('express'),
    session = require('express-session'),
    fs = require('fs'),
    db = require('./scripts/db'),
    flash = require('connect-flash'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser');

function isLoggedin(req, res, next) {
        if(req.isAuthenticated()) {
                return next();
        }
        res.redirect('/');
}

module.exports.app = function() {
        var port = process.env.PORT || 8000;
        var app = express();
        var router = express.Router();
        var errorPage = fs.readFileSync("404.html", "UTF-8");

        app.use(express.static('assets'));
        app.set('title', "GUSAC Carnival 4");
        app.set('view engine', 'ejs');
        app.use(session({
                secret : 'gusac123!@#',
                resave : true,
                saveUninitialized : true
        }));
        app.use(cookieParser());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(flash());

        router.get('/', function(req, res) {
                res.render('index.ejs');
        });

        router.get('/about', function(req, res) {
                res.render('about.ejs');
        });

        router.get('/contact', function(req, res) {
                res.render('contact.ejs');
        });

        router.post('/controller/contact', function(req, res) {
                var name = req.body.name,
                    phone = req.body.phone,
                    email = req.body.email,
                    query = req.body.query;
        });

        router.get('/events', function(req, res) {
                res.render('events.ejs');
        });

        router.get('/events/:name', function(req, res) {
                var page = req.params.name;
                if(page == "arqueria") {
                    res.render('eventcontent', {
                        title: "Arqueria",
                        eventname: "Arqueria",
                        imgname: "1.jpg",
                        eventcontent: "Participants must prepare a bot (wired or wireless) which must be capable of moving on a metal rod and shooting an ordinary table tennis ball by aiming the bull's eye. Competition consists of 2 rounds.",
                        description: "",
                        probstmt: "",
                        rules: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "casestudy") {

                }
                else if (page == "magnogenesis") {

                }
                else if (page == "clashofbots") {

                }
                else if (page == "extremeadv") {

                }
                else if (page == "jury") {

                }
                else if (page == "killerquest") {

                }
                else if (page == "pharmascruto") {

                }
                else if (page == "60secs") {

                }
                else if (page == "cstrike") {

                }
                else if (page == "fifa") {

                }
                else if (page == "steeryouway") {

                }
                else if (page == "Jenga") {

                }
                else if (page == "roborun") {

                }
                else if (page == "civilstructures") {

                }
                else if (page == "wargames") {

                }
                else if (page == "enigma") {

                }
                else if (page == "magnetron") {

                }
                else if (page == "riptide") {

                }
                else if (page == "brainiac") {

                }
                else if (page == "treasurehunt") {

                }
                else if (page == "sciencequiz") {

                }
                else if (page == "digitalkab") {

                }
                else if (page == "waterrock") {

                }
                else if (page == "electron") {

                }
                else if (page == "paperprep") {

                }
                else if (page == "canvasideas") {

                }
        });

        router.get('/profile', isLoggedin, function(req, res) {
                res.render('profile.ejs', {
                        user: req.user
                });
        });

        router.get('/register', function(req, res) {
                res.render('register.ejs');
        });

        router.post('/controller/register', function(req, res) {
               db.accAdd({
                       name : req.body['inputName'],
                       user : req.body['inputEmail'],
                       pass : req.body['inputPassword'],
                       email : req.body['inputEmail'],
                       phone : req.body['inputPhoneNumber'],
                       state: req.body['stateName'],
                       college : req.body['collegeName'],
                       dept : req.body['deptName']
               }, function(err) {
                       if(err) {
                               res.status(400).send(err);
                       }
                       else {
                               res.status(200).send('it is done');
                       }
               });
        });

        router.get('/logout', function(req, res) {
                req.logout();
                res.redirect('/');
        });

        router.get('/team', function(req, res) {
                res.render('team.ejs');
        });

        router.get('/[0-9]', function(req, res) {
                res.redirect(errorPage);
        });

        router.get('*', function(req, res) {
                var match = 'views/' + req.params[0] + '.ejs';
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
