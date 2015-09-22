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
                        title: "Arqueria | Carnival",
                        eventname: "Arqueria",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Participants must prepare a bot (wired or wireless) which must be capable of moving on a metal rod and shooting an ordinary table tennis ball by aiming the bull's eye. Competition consists of 2 rounds.",
                        description: "ARQUERIA!!!!!! Are u ready for Spanish archery? Not like other archeries,let’s be technical and automotive. We would like a BOT to aim the target.Its purpose is to have an unmanned hunting source at wilder times.",
                        probstmt: "Participants must prepare a bot (wired or wireless) which must be capable of moving on a metal rod and shooting an ordinary ping pong ball aiming the bull's eye. The event consists of 3 rounds",
                        rules: "1) 15 points will be reduced each time the bot falls down. 2) 20 points will be reduced for each restart (if requested by the participants). 3) Only a maximum of 2 restarts are allowed. 4) Radius of ball to be shot is 2cm. 5) Damaging the ARENA will lead to elimination.",
                        judging: "30 Points will be awarded for crossing the threshold point. End point of the bot must cross the threshold point to get all the 30points. Points for shooting the ping pong ball at the bull’s eye depends upon the point at which the ball is shot at target sheet as mentioned in the diagram.",
                        rounds: "Round1: The Bot must move on the horizontal metal rod which is supported by two pillars and it is marked with a threshold point. The threshold is after 40 centimeters from the initial point of the bot. When it reaches the threshold it should stop and shoot balls (ordinary ping pong balls) targeting a bull's eye. Round 2: In this round, the bot must move on a rod which is inclined at an angle of 30 degrees form the horizontal line. After reaching a threshold point it should fire balls (ordinary ping pong balls) on the bull’s eye. Round 3 : This round is the same as Round 2 except that the Bot must hit the bull's eye which is rotating around its own axis at the rate of 10 rotations per minute.As we know that the bull’s eye is a thin cardboard sheet of two sides. One side consists of bull’s eye and the other side is plain. The bot should not shoot on the plain side. If the ball strikes the plain side then negative points will be given. Assume that the horizontal rod is on x-axis and the vertical rod is on y-axis. Then the bull’s eye is on the z-axis i.e, into the sheet of paper",
                        specifications: "The distance between the two vertical rods is 2 meters. The rod is of 2 inch in diameter. Distance between rod and the ground is 1 meter. Distance between rod and the center of bulls eye is 0.25 meter.(in y direction). Distance between the bulls eye and the horizontal rod in z direction is 1 meter. Bot must be less than 30cm in length, breadth and height.",
                        contact: " Gowtham Srinivas (9542945129, penjarlagowtham@gmail.com), Sarath Chandra (9704967303, krishnasarathchandra@gmail.com)",
                        further: ""
                    });
                }
                else if (page == "casestudy") {
                    res.render('eventcontent', {
                        title: "Case Study | Carnival",
                        eventname: "Case Study",
                        imgname: "2.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Imagine your life without facebook, YouTube or Google. Hard isn’t it? The harder truth is out of 1.28 billion people in India, only 243 million people have access to internet which is less than 20% of the total population.",
                        description: "Imagine your life without facebook, YouTube or Google. Hard isn’t it? The harder truth is, out of 1.28 billion people in India, only 243 million people have access to the internet which is less than 20% of the total population. This is in stark contrast to 86% in the USA and 89% in the UK. As more and more companies are turn to digitization of their markets and services, people in rural India still travel miles to gain access to the internet. Do you think the idea of Modi’s government to provide high speed internet connectivity to all rural areas in India can be realized by 2019? Don’t you want to see a DIGITAL INDIA? This event aims to involve students from diverse fields to come up with ideas on tackling this problem.",
                        probstmt: "The team should submit an abstract on the given topic or as guided by the Event Co-ordinators",
                        rules: "Teams can have a maximum of 3 members. All the members need to participate in the presentation equally.",
                        judging: "The abstract will be shortlisted purely on the basis of feasibility of the solutions and the extent of impact on the society. The decisions made by the judges will be final and irrevokable. In case of a clash between two ideas, public opinion will be considered.",
                        rounds: "Round 1: In this round, the participants are given a list of topics and asked to select a topic. They will have to submit an abstract on the selected topic. The list of topics will be disclosed two weeks prior to the date of the event. The abstracts are to be submitted online. The shortlisted candidates shall proceed to the next round held during the carnival. Round 2: The shortlisted candidates need to come with a detailed version of their abstract which will be scrutinized by the judging panel. They need to take public opinion to support their idea and state a conclusion which aptly suits the situation. Round 3: Selected candidates need to give a presentation on their solution.",
                        specifications: "",
                        contact: "Sravya (9963560718), Keerthi Kaushal (9177575776)",
                        further: ""
                    });
                }
                else if (page == "magnogenesis") {
                    res.render('eventcontent', {
                        title: "Magnogenesis | Carnival",
                        eventname: "Magnogenesis",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Magnetic levitation, maglev or magnetic method by which an object is suspended with no support other than magnetic fields. Magnetic force is used to counteract the effects of the gravitational and any other accelerations.",
                        description: "Magnetic levitation, maglev or magnetic method by which an object is suspended with no support other than magnetic fields. Magnetic force is used to counteract the effects of the gravitational and any other accelerations.",
                        probstmt: "1. In our event the participants should make a device which isbalanced in air by using the concept of magnetic levitation. * 2. The device should be made in such a way that the magnetic levitation can be used to create a continuous rotatory motion to thefloating part. 3. The change in flux during the rotatory motion is used to produce voltage in a copper coil which serves as the judging criteria**. 4. We will check the voltage produced at the ends of the coil using a DMM (Digital Multi Meter). *The procedure to make a magnetic levitation device is given in the following link https://www.youtube.com/watch?v=FM0c0GL9ha0 ** The voltage produced can be measured using a Digital Multi-meter. https://www.facebook.com/ncharan.sai/videos/o.426744474134669/425534517589202/?type=2&theater",
                        rules: "(1) Motors with any external aid or ready-made turbines should not be used to rotate the levitating part.(2) The number of turns in the coil, radius of the coil and position of the coil should be well planned before participating in the event.(3) The magnets used should be round shaped.(4) The number of magnets should not exceed 25 (In case of magnets with smaller diameter).",
                        judging: "In the first round filtering the participants is done on the basis of the DC and AC voltages produced at the output ends of the coil.In the second round the judgement is done based on the distance travelled by the rover. Top 20% of the round-1 will be qualified to round-2. And in the second round the device which makes the rover cover large distance is given as the winner.",
                        rounds: "In first round the dc and ac voltages obtained at the ends of the copper coil are measured. In the second round a basic rover* is connected at the output and the distance travelled by the rover is measured. *The rover is made using 1.5v basic dc motors.",
                        specifications: "(1) A basic magnetic levitation device should be made and brought by the participants. (2) The magnets used can be of any material.",
                        contact: "Aravinda Karthik (8106828753, karthik.ark4@gmail.com), Radha Rani (9553311770, radharani.b1996@gmail.com), K. Sai Chandra (8121230396, saichandra62@gmail.com)",
                        further: "In the first round the average values of dc and ac voltages respectively will be taken into consideration. In the second round an amplifier and a rectifier is provided by us. The rover will also be provided by us."
                    });
                }
                else if (page == "clashofbots") {
                    res.render('eventcontent', {
                        title: "Clash Of Bots | Carnival",
                        eventname: "Clash Of Bots",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "The theme of the event is to construct a bot which has the immense capability to destroy the enemy bot in the given arena.",
                        description: "Want to have a real experience of REAL STEEL…!!??? Want to take your bot for a real clash…???? Want to have an adrenaline rush…???? This is show time guys…!!!! Get your bots ready to roll…!! We are waiting for you at the arena, bring your bots, have a clash and become the champ!!",
                        probstmt: "The theme of the event is to construct a bot which has the immense capability to destroy the enemy bot in the arena. Basically, the event tests the efficiency and the strength of the bot to sustain in the competition. Moreover, the path for the bot to reach the arena will not be a cake walk. The path will consist of hurdles, which the bot should be able to overcome to reach the arena.",
                        rules: "GENERAL RULES:  The competition will be played on a knock-out basis consisting of 2 players (BOTS) at a time. The maximum duration for round 1 will be 5 minutes and that of round 2 will be 10 min. Any team that is not ready at the time specified will be disqualified from the competition. The machine would be checked for its safety before the competition and would be discarded if found unsafe for other participants and spectators. Judges' decision shall be treated as final and the organizers reserve the rights to change any or all of the above rules as they deem fit.  Violation of any the above rules will lead to disqualification.  Change in rules(if any), will be highlighted on the website and notified to the registered teams. Safety Rules: 1. Compliance with all event rules is mandatory. It is expected that competitors stay within the rules and procedures of their own accord and do not require constant policing. 2. If you have a robot or weapon design that does not fit within the categories set forth in these rules or is in some way ambiguous or borderline, please contact the event organizers. 3. All weapons must have a safety cover on any sharp edges",
                        judging: "1) A robot is declared victorious if its opponent is immobilized. 2) A robot will be declared immobile if it cannot display linear motion of at least one inch in a timed period of 20 seconds. A bot with one side of its drive train disabled will not be counted out if it can demonstrate some degree of controlled movement. 3). If both robots survive the three minutes, the robot with the higher hit points wins. 4.) The winner moves on and the loser is eliminated from the tournament.",
                        rounds: "The event consists of two rounds: ROUND 1: This round will be the eliminating round. The bot should clear some basic obstacles before entering the Main Arena. After entering the Arena both the Bots will clash. There will be a specific time limit for the Clash. The winners will move to the next round. ROUND 2: This is the deciding round. The bots are directly placed in the fighting zone. At the arena, the bots will be having sufficient time for the clash. The winner will be based on the time factor and the clash. Arena will be disclosed at the time of this round NOTE: Both rounds will be having different Arenas. Team Specification: A team may consist of a maximum of 4 participants.",
                        specifications: "Dimensions and Fabrications:  The bot should fit in a box of dimension 40cm x 40 cm x 40 cm (lxbxh) with all mechanisms fully executing motions. Length and width is measured to the extremities of the Robot, i.e. includes any overhanging bodywork, weaponry or protrusions. The external device used to control the bot is not included in the size constraint. Mobility: All bots must have easily visible and controlled mobility in order to compete. Methods of mobility include: Rolling (wheels, tracks or the whole robot). Jumping and hopping is not allowed. Flying (using air foil, helium balloons, ornithopters, etc.) is not allowed. Robot Control Requirements: If the bot is wired then the wire should remain slack under all circumstances during the competition. All the wires coming out of the bot should be stacked as a single unit. The wires should be properly insulated. Teams are suggested to use only rated wires such as ISI marked. Loose connections or improper wiring may lead to direct disqualification even before the event.If the bot is controlled wirelessly, the bot must at least have a four frequency remote control circuit or two dual control circuits which may be interchanged before the start of the race to avoid frequency interference with other teams. Cases of any interference in the wireless systems will not be considered forrematch. Remote control systems from toys may be used. Remote control systems available in the market may also be used. Battery and POWER: The machine can be powered electrically only. Batteries must be sealed and immobilized- electrolyte types (such as Li-ion, NiCd, NiMH or dry cells). Working voltages must not exceed 24V DC (mean voltage) at any point of time. All power connections must be of an adequate grade and adequately insulated. Cables must be routed to minimize the chances of being cut. All efforts must be made to protect battery terminals from a direct shot and causing a battery fire, failure to do so will cause direct disqualification. Motors: The robot should move as fast as possible around the arena with the help of motors. DC motors and stepper motors (12V-24V) can be used as per the design of bots",
                        contact: "Rakesh Inty (9848236975, rakeshinty@yahoo.com), Vishnu Varma Pusapati (8374729000,vishnuvarma5427@gmail.com)",
                        further: "VIDEO LINKS: https://www.youtube.com/watch?v=uBRzHZlQUkU, https://www.youtube.com/watch?v=olQ4FkkguLM, https://www.youtube.com/watch?v=9aTY0TcRoiE"
                    });
                }
                else if (page == "extremeadv") {
                    res.render('eventcontent', {
                        title: "Extreme Adventures | Carnival",
                        eventname: "Extreme Adventures",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Build a bot that is capable of traversing a grid and passing through different stages.The bot has to traverse a grid and should be able to pass through different stages placed randomly.",
                        description: "The bot has to traverse a grid and should be able to pass through different stages placed randomly.",
                        probstmt: "Build a bot that is capable of traversing a grid and passing through different stages.",
                        rules: " A maximum number of participants allowed per team: 4 people. All arena dimensions have a tolerance of 10%. Teams qualifying the first round will go into the second round. Teams cannot touch their bots during the course of the run, unless timeout is taken. LEGO kits or its spare parts or pre-made mechanical parts are not allowed. The team members can be from different institutes or colleges. Each team should have unique participants i.e. no two teams can have common participants.The decision of the Team Extreme Adventures will be final.",
                        judging: "POSITIVES: Initial base score for Round 1 and Round 2 : 1200 points, For each correctly passed stage : +100, For every difficulty path choosen :+150. NEGATIVES: For  each time the bot is arranged manually : -20, For every time the bot is dropped down: -50, Restart : -80 points",
                        rounds: "ROUND 1- This round will be a mixture of different stages. For eg. Sand,water, hurdles, inclined paths,etc. In this round the judging criteria will be mainly based on the completion of the task and then on the time taken to complete. ROUND 2- The task and arena of the second round will be disclosed at the time of the event. No extra mechanisms will be required on the part of the bot.",
                        specifications: " The bot must fit in a box of 25cm X 20cm with a tolerance of 10% in the dimensions of bot. No part/mechanism of/on the bot should exceed the given dimensions before the commencement of the event. However the dimensions can change during the course of the run. The bots should not harm the event arena in any way. If it does so, a penalty will be imposed on the team. Bot can be either wired or wireless. Power supply for the bot will not be provided.",
                        contact: " B.MUKESH CHOWDARY- (9441347770, e-mail id: mukesh.boginani94@gmail.com, Fb id: mukesh944),  V. SAI YESHWANTH- (8374474447, e-mail id: 95yeshu@gmail.com, Fb id: yeshwanthsaivankayala)",
                        further: "VIDEO LINK: https://www.youtube.com/watch?v=zXp4l16MWPY"
                    });
                }
                else if (page == "jury") {
                    res.render('eventcontent', {
                        title: "You the Jury | Carnival",
                        eventname: "You the Jury",
                        imgname: "6.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Its Judgment time. Put your legal knowledge and analytical skills to test and deliver justice to your clients. Solve the given case within the stipulated time and present your arguments to justify your points.",
                        description: "Description : Think and come out with a judgement or say in simple a punishment to be awarded for a criminal offence when committed,irrespctive of what the enacted law is, and that which befits the society at large.",
                        probstmt: "Leave aside the proper legal aspects for and instance in view of a change in the existing scenario.",
                        rules: " Each team consisting min of 3 and max of 6. A case is given to each team for analysis. Time limit for analysis: 15min. Time limit for argumentation: 5-10min. Judgment to be given by concerned faculty",
                        judging: "Presentation and confidence - 20 marks. Appropriate content (relevancy)- 30 marks. Ideology based argumentation  - 40 marks. Overall impression of the panel of judges - 10 marks",
                        rounds: "Single round",
                        specifications: "None",
                        contact: "V Saishree (8008299242​​​), B. Bhavya (9703311269)",
                        further: ""
                    });
                }
                else if (page == "killerquest") {
                    res.render('eventcontent', {
                        title: "Killer Quest | Carnival",
                        eventname: "Killer Quest",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Step into the shoes of a private detective and solve puzzling cases Hunt down clues and catch the quest Hone your detective skills..!!!",
                        description: "Step into the shoes of a private detective and solve puzzling cases. Hunt down clues and catch the quest Hone your detective skills..!!!",
                        probstmt: "Analyze the given crime scene, solve the case and present a report.",
                        rules: " Each team consisting min of 5 max of 8. A video clip of a crime scene along with statements diposed by accused. The teams after keen observation need to unravel the mystery. Explore and crack the quest. Written based analysis",
                        judging: "Logical reasoning (35m). Creativeness and writing style (20m). Research in the given problem (10m). Match with the jury's answer (35marks)",
                        rounds: "Single Round",
                        specifications: "None",
                        contact: "V Saishree (8008299242​​​), B. Bhavya (9703311269)",
                        further: ""
                    });
                }
                else if (page == "pharmascruto") {
                    res.render('eventcontent', {
                        title: "Pharmascruto | Carnival",
                        eventname: "Pharmascruto",
                        imgname: "8.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Gear up for one of the most awaited and brain storming events of GUSAC Carnival V.4.0. Get ready to tickle your nerves and dive into your world of pharmacy.",
                        description: "Gear up for one of the most awaited and brain storming events of GUSAC Carnival V.4.0. Get ready to tickle your nerves and dive into your world of pharmacy.",
                        probstmt: "Read the Description Again",
                        rules: "Rules and Regulations:  The participants must finish the task in the given time. The participants must abide by the rules. The organizing committee reserves the right to change the venue, time and rules if desired.Any type of damage to the institute property in any form is not tolerable and strict disciplinary action will be initiated against the defaulter(s) as per the rules of the institute.",
                        judging: "Judging Criteria: Participants will be tested on the basis of their practical and theoretical knowledge in pharmaceutical sciences. Decision of the judges will be final and binding.",
                        rounds: "Round 1 (Quiz) : There will be a multiple choice quiz. This will test your knowledge in the field of biology. Participants selected will be qualified for the next round.Round 2 (Microscopy) : Participants must prepare slides with the given powder sample and identify the sample. Participant’s slide preparation skills will be tested. Participants selected will be qualified for the next round. Round 3 (Picture quiz) : There will be a picture quiz. Participants knowledge about instruments and technology used in pharmacy profession will be tested. The winner will be declared in this round.",
                        specifications: "Nothing required.",
                        contact: "Namrata Ch (8374021602, namrata.ch94@gmail.com), Akshay B (8143888587)",
                        further: ""
                    });
                }
                else if (page == "60secs") {
                    res.render('eventcontent', {
                        title: "60 Seconds to Fame | Carnival",
                        eventname: "60 Seconds to Fame",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Participants should pull the crowd and judges and impress them.",
                        description: "To change from what you are to what you want to become, all you need is 60 seconds !!",
                        probstmt: "Participants must be able to pull a throng and impress the judges in just 60 seconds.",
                        rules: "The performer or a group have to get up onstage and do absolutely anything that the crowd and the judges would like to see in the 60 seconds allotted. The range of performances vary from singing, dancing, mono acting, skits, juggling, playing the guitars, gymnastics, reciting poems, telling jokes, Harlem Shake,etc. The only boundry is your imagination. Participants can bring their own props. Decision of the organizers is final and irrevokable.",
                        judging: "Please look at the rules again",
                        rounds: "ROUND 1 - 1. In this round the judging criteria will be based mainly on the reaction of the audience and then on the Time taken to complete the act. 2. Contestants unable to impress the crowd will not be qualified for the next round. ROUND 2 - 1. Judges will choose the best contestant considering their performance and the reaction of the audience.",
                        specifications: "None",
                        contact: "Shahrukh shaik-8978633867,e-mail id: shahrukhshaik25@gmail.com, Fb id: Shahrukh Zaved",
                        further: ""
                    });
                }
                else if (page == "cstrike") {
                    res.render('eventcontent', {
                        title: "Counter Strike | Carnival",
                        eventname: "Counter Strike",
                        imgname: "10.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Get ready to wake the gamer in you! Prove your combat skills head on in Counter Strike.",
                        description: "Please wait for further information",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "fifa") {
                    res.render('eventcontent', {
                        title: "Fifa | Carnival",
                        eventname: "Fifa",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "What is it About",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Are you a football freak???.....Are you good at it???......Then it’s time to showcase your FIFA skills on a head on match.",
                        description: "Are you a football freak???.....Are you good at it???......Then it’s time to showcase your FIFA skills on a head on match.",
                        probstmt: "FIFA gaming",
                        rules: "NO controllers allowed. Any player found using cheats will be disqualified. Organizers decision is final in case of any dispute.",
                        judging: "The Player with most number of goals wins. If the match ends in a draw then the team whose player is declared as the man of the match wins.",
                        rounds: "The event is a head on 1-on-1 knockout tournament. Every person is matched with another random participant. The only way to advance forward is to keep winning.",
                        specifications: "There is no need to bring any sort of equipment, everything will be provided.",
                        contact: "Ashish kumar (8297413821, Kumar.ashish583@gmail.com), Amarnadh Matsa (9652825454, m.amarnadh@gmail.com)",
                        further: ""
                    });
                }
                else if (page == "steeryouway") {
                    res.render('eventcontent', {
                        title: "Steer Your Way | Carnival",
                        eventname: "Steer Your Way",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "The game is based on the game of steady hands. There will be a specially equipped rover provided and the participant is supposed to guide the rover along the length of the wire without touching the ring attached to the rover.",
                        description: "The game is based on the game of steady hands. There will be a specially equipped rover provided and the participant is supposed to guide the rover along the length of the wire without touching the ring attached to the rover.",
                        probstmt: "There will be 5-10 checkpoints depending on the length of the track. Each checkpoint carries 10 points. Selection is done based on the points and timing.",
                        rules: "Refer Gameplay and Rounds",
                        judging: "Refer Gameplay again",
                        rounds: "ROUND 1: The top “N” contestants will move to next round. Each pardon costs 5 points. 5 pardons given. There will be 10-15 participants allowed in the second round. ROUND 2: Each pardon costs 10 points. 3 pardons given. The participants with top points will be declared to next round.There will be 3-5 participants allowed in the third round. ROUND 3: One pardon given. Third round is the final round.",
                        specifications: "",
                        contact: "Mehar Narayanam (9642968977), Parna Bose",
                        further: ""
                    });
                }
                else if (page == "Jenga") {
                    res.render('eventcontent', {
                        title: "Jenga | Carnival",
                        eventname: "Jenga",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Blocks are arranged in tower form. Participants should remove each one block from the tower and place in top of tower such that structure should not fall.",
                        description: "Jenga is a game involving the physical and mental skill of the players that is played by 2 or more players .During the game, players  take  turns  to  remove  one  block  at  a  time  from  a tower of  evenly placed blocks.  Each block removed  is then placed  on  top  of  tower,  creating  a  taller  but  less  stable structure.",
                        probstmt: "Blocks  are  arranged  in  tower  form.  Participants  should remove  each one block from the tower  and place  in top of tower such that structure should not fall.",
                        rules: "This is an individual event. The decision of the organizers is final.",
                        judging: "a) Points will be awarded on basis of blocks taken. b) Each  participant  will  get  points  and  those  will  be noted. c) This process is followed until the tower collapses. d) The  one  who  gets  more  points  among  all  the participants will be awarded as the winner.",
                        rounds: "This is single round  event  where the  participants  play  each other.",
                        specifications: "Please refer rounds and judging criteria again",
                        contact: "SAI  DINESH (9618943450, dineshbillakurti03@gmail.com), KVK PRASAD (9908589369, Kvkprasad007@gmail.com)",
                        further: ""
                    });
                }
                else if (page == "roborun") {
                    res.render('eventcontent', {
                        title: "Robo Run | Carnival",
                        eventname: "Robo Run",
                        imgname: "14.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "An autonomous robot starting from the point marked on arena should reach  the end point tracing the path.",
                        description: "An autonomous robot starting from the point marked on arena should reach  the end point tracing the path.",
                        probstmt: "DIGITALISING INDIA: This robots can be used to serve  patients in hospitals where there is need of manpower. Can be used in multi-star hotels for guiding customers to their respective rooms.",
                        rules: "A Team can consist of a maximum of 4 participants. The bot’s maximum dimensions should not exceed 25x25x25cm. Only 1 member of the team is allowed to handle the bot in the arena. Participants are not allowed to keep anything inside the arena other than the bot. The time clocked by the organizers will be final and will be taken as criteria to evaluate the teams. In case of any disputes / discrepancies, the organizer’s decision will be final and binding. The organizers reserve the rights to change any or all of the above rules as they deem fit. Change of rules, if any, will be highlighted on the website and notified to the teams concerned.",
                        judging: "Please refer each round again since the criteria is specific to each round",
                        rounds: "",
                        specifications: "",
                        contact: "V.ABHISHEK (9640628428), BHARGAV VAMSI (8885690718)",
                        further: ""
                    });
                }
                else if (page == "civilstructures") {
                    res.render('eventcontent', {
                        title: "Civil Structures | Carnival",
                        eventname: "Civil Structures",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "The participants need to construct an arch with supports using bricks and sand only instead of using concrete and steel. The arch constructed should be capable of bearing the weights that will be placed on it. A team of 3 participants will be allowed to peform the event.",
                        description: "Civil structure, the word itself describes that a structure is to be constructed. It is a technical event and the participants will be given an arch shaped iron stand over which they have to construct an arch with supports at both its ends using bricks and sand. There will be a time barrier of 20 minutes. After which, the strength of the arch will be tested using weights. The arch bearing the maximum weight wins the event.",
                        probstmt: "The participants need to construct an arch with supports using bricks and sand. The arch constructed should be capable of bearing the weights that will be placed on it.",
                        rules: " A maximum of 3 members are allowed per team. Cement or any binding materials can't be used. Teams will not be allowed to use broken brick, only full size brick can be used. If any structure does not stand on its supports then it will be out of the race.",
                        judging: "The team which constructs the arch that bears the maximum load put on it will be considered as winner.",
                        rounds: "The participating team needs to construct an arch using bricks and sand with supports at both ends. After constructing the arch, the iron stand is removed slowly such that the constructed arch is balanced on its supports. Weights are placed on the arch one after the other. The arch should be capable of bearing those weights.",
                        specifications: "Time limits: Making brick arch bridge on support arch - 20 minutes, Removing the support arch - 5 minutes",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "wargames") {
                    res.render('eventcontent', {
                        title: "War Games | Carnival",
                        eventname: "War Games",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Did you watch die hard 4, wargames or the matrix because you couldn't get enough? Does mr. robot keep you awake all night? Do you look in the source code for clues? This event is for you! All you have to do is play the games to win.",
                        description: "Did you watch die hard 4, wargames or the matrix because you couldn't get enough? Does mr. robot keep you awake all night? Do you look in the source code for clues? This event is for you! All you have to do is play the games to win.",
                        probstmt: "Each level gives you the password to the next. Play! Faster you complete, more points you get. Each level is different, fun and challenging.",
                        rules: "Lone rangers or Duets only. BYOD for the 2nd round if you want to. Few challenges may require you to do it. Get a laptop with a live cd of kali linux and spare yourselves the pain of installing tools during the event (time is precious, waste it wisely). Additional rules will be informed once you reach round 2.",
                        judging: "Please refer the rounds again, in order to understand the Judging criteria",
                        rounds: "Round 1: Pen and paper round to advance to round 2. Every hacker has to know his lore, his origins and his commands! Easy questions carry lesser marks than hard questions. Round 2: The second round is nothing like the first. Let the games begin. You compete against others who have been deemed worthy of this round. One with the highest points wins!",
                        specifications: "No specifications as required, but will be changed at the time of the event",
                        contact: "Om Bhallamudi (+91-9573663478, om.bhallamudi@gmail.com)",
                        further: ""
                    });
                }
                else if (page == "enigma") {
                    res.render('eventcontent', {
                        title: "Enigma | Carnival",
                        eventname: "Enigma",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "An Enigma machine was a series of electro-mechanical rotor cipher machines developed and used in the early to early-mid twentieth century for commercial and military usage.",
                        description: "An Enigma machine was a series of electro-mechanical rotor cipher machines developed and used in the early to early-mid twentieth century for commercial and military usage.",
                        probstmt: "The enemy forces of thanos have trivial enigma machines that must be broken. You comorade, are one of the candidates selected to help mr.stark do it.",
                        rules: "Lone rangers only. BYOD for the 2nd round if you want to. Not necessary but we at shield understand some people like programming on their own laptops Additional rules will be informed once you reach round 2.",
                        judging: "Please refer the rounds again, in order to understand the Judging criteria",
                        rounds: "Round 1: Pen and paper round to advance to round 2. Yes, I have selected you, but you have to pass the test set by JARVIS.Round 2: Programming! Mr. Stark is busy with the civil war. Can you write some code for him?",
                        specifications: "No specifications as required, but will be changed at the time of the event",
                        contact: "Om Bhallamudi (+91-9573663478, om.bhallamudi@gmail.com)",
                        further: ""
                    });
                }
                else if (page == "magnetron") {
                    res.render('eventcontent', {
                        title: "Magnetron | Carnival",
                        eventname: "Magnetron",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "You may be familiar with permanent magnets—the kind that hang on a refrigerator. But did you know that other magnets, called electromagnets, can be turned on and off?",
                        description: "Magnetron is based on the principle of electromagnetism. A rover (bot) is attached with an electromagnet to its arm which should be capable of displacing any kind of small ferric substances (pins, nails, screws) from the given place to the destination with the help of magnetising and demagnetising the electromagnet as per the requirement.",
                        probstmt: "In this event the participants should make a rover which consists of an arm (which has a electromagnet) that should be capable of lifting small metallic pieces like nails and pins which are placed on ground.",
                        rules: "A team should consists of 2- 4 participants.",
                        judging: "1) In the first round basic functioning of the participant's rover will be tested i.e. whether it is capable of lifting metallic pieces placed randomly placed on ground, and drop them at specified location after carrying through the given path. 2) In the second round time taken by the rover to complete the task is considered. 3) In the third round all the selected teams will participate at a time. Participants who collects the most is considered as the   winners, score will be awarded accordingly.",
                        rounds: "Please contact the event Co-ordinators",
                        specifications: "1) Rover should contain an electromagnet to its arm. 2) Arm of the rover should be movable. 3)Rover designed must be capable of lifting the metallic pieces (nails, screws, pins) which are placed on ground as well as carry them and drop them in the specified location. 4) Rover max dimensions: 30x30cms including tyres.",
                        contact: "G. Tharun Kumar (9618410510, tharunkumarguntupu@gmail.com), L. Mahesh (9866209025, maheshlekkala043@gmail.com)",
                        further: "* Reference link: https://youtu.be/HQdLFEiVeCA, ** Video in the link contains just an electromagnetic arm while participants must design an entire rover"
                    });
                }
                else if (page == "riptide") {
                    res.render('eventcontent', {
                        title: "Riptide | Carnival",
                        eventname: "Riptide",
                        imgname: "19.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "The participants are given a particular task in each round. They are to carry out the task inthe most simplest, yet efficient manner. The difficulty level of the task increases as they advance into the next rounds.",
                        description: "This is an innovative idea to modernise the conventional way of transportation i.e boats. This event involves all the basic mechanisms and operations of motors and analysing the racing path in the water medium. The accuracy in controlling the boat and efficiency in decoding the path to reach the fastest unfolds the key to win. The profound nature of beating others down in actions brings up the true spirit of this completion.",
                        probstmt: "The participants are given a particular task in each round. They are to carry out the task in the most simplest, yet efficient manner. The difficulty level of the task increases as they advance into the next rounds.",
                        rules: "The teams should contain a maximum of FOUR participants and a minimum of THREE. Only one member of the team is allowed to control the boat. The teams will be given ONE chance as trail before the completion starts. The teams should design their boats based on the dimensions of the arena for different rounds specified. The organisers will not be responsible of any misconceptions. Any changes regarding the event will be informed to all the teams will in advance.",
                        judging: "Carefully read the rules again in order to be clear",
                        rounds: "ROUND 1 :ELIMINATION ROUND, TASK : To complete a lap in minimum time. DESCRIPTION : This is an elimination round where the boat must must complete the lap in minimum amount of time. The boat will be be placed in the start zone. JUDGMENT CRITERIA : Judgment will be based on the time taken by the participant to complete the lap. The teams with best time will be taken into consideration and will be qualified into next round. NOTE : The filtering depends on the number of participants registered in this event. ROUND 2 ,TASK : To project the ball into the scale(slot) with maximum point. DESCRIPTION : To place the ball from ground into the water where the scales with different points  is placed. The ball will be tied to your boat by means of a hook and thread. You can move the boat in any direction so that it falls into the scale holding maximum point. You will be given three chances and points acquired in each chance will be summed up. NOTE: The means of fitting the hook to the boat should be taken care by the participant. The thread will be provided by us. JUDGMENT CRITERIA :  It will be based on the points acquired by the team in three attempts. Top four teams with maximum points will advance into the round 3 i.e., the FINAL ROUND. ROUND 3, FINAL ROUND, TASK : In this event two teams will have to compete each other. PROBLEM STATEMENT: A set of balls of two different colors will be placed randomly in the water. The competing will teams have to place the balls of their choice into their respective goal posts provided at the end of the arena. HINT: The board should be fitted with an arm (like a snow plow) which pushes the ball forward. (You can also use any other suitable mechanism which fulfils the aim of the task.) JUDGEMENT CRITERIA: The team which manages to place maximum number of balls into the post in the given time frame will be declared as winner of the event, followed by the runner-ups. NOTE:The arena dimensions will be same for all the three rounds.",
                        specifications: "The width of the boat should not exceed 20cm and the length can be upto 30cm. NOTE: It is advised to make the boat precise and apt to the rounds.",
                        contact: "Akash Benny (email :akashbenny161@gmail.com ; mob: 8121713148), Bhargav Vamsi (email : pbv.easwar@gmail.com    ; mob: 8885690718), Eswar sai (email: eswarsaib96@gmail.com    ; mob:8790756499)",
                        further: ""
                    });
                }
                else if (page == "brainiac") {
                    res.render('eventcontent', {
                        title: "Brainiac | Carnival",
                        eventname: "Brainiac",
                        imgname: "20.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "This event is all about your common sense and presence of mind. It is a non-technical event and the Event consists of three rounds. These rounds test your ability to solve simple conundrums and general situations.  Each team should consist of 2 or 3 members.",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "treasurehunt") {
                    res.render('eventcontent', {
                        title: "Treasure Hunt | Carnival",
                        eventname: "Treasure Hunt",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Treasure Hunt  is all about finding your milestones for your destination. This is an amusement oriented hunt with an added flavor of thrill and suspense.",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "sciencequiz") {
                    res.render('eventcontent', {
                        title: "Science Quiz | Carnival",
                        eventname: "Science Quiz",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "As today’s world is dependent on science and technology,we as  budding  engineers of India  must know the basic scientific theories so as to improve the present day technologies to a higher level thus developing  India to  a “scientific India.”",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "digitalkab") {
                    res.render('eventcontent', {
                        title: "Digital Kabbadi | Carnival",
                        eventname: "Digital Kabbadi",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Participants must prepare a bot (wired or wireless) which must be capable of moving on a metal rod and shooting an ordinary table tennis ball by aiming the bull's eye. Competition consists of 2 rounds",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "waterrock") {
                    res.render('eventcontent', {
                        title: "Water Rocketary | Carnival",
                        eventname: "Water Rocketary",
                        imgname: "24.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Design and construct a water propelled rocket pressurized with air to compete against different constraints in separate rounds.",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "electron") {
                    res.render('eventcontent', {
                        title: "Electron | Carnival",
                        eventname: "Electron",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Clear the tasks assigned in each round and present the required outputs of your circuits to advance to the next level.",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "paperprep") {
                    res.render('eventcontent', {
                        title: "Paper Presentation | Carnival",
                        eventname: "Paper Presentation",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "This event aims at professional study of concept to ideate for the solution of global challenges and to sway out the information of newborn technology.Participants can present their views on a wide range of topics from international issues to the latest technology.",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
                else if (page == "canvasideas") {
                    res.render('eventcontent', {
                        title: "Canvas of Ideas | Carnival",
                        eventname: "Canvas of Ideas",
                        imgname: "alt.jpg",
                        tit1: "Description",
                        tit2: "Problem Statement",
                        tit3: "Rules and Regulations",
                        tit4: "Judging Criteria",
                        tit5: "Rounds and Gameplay",
                        tit6: "Specifications and Further Information",
                        tit7: "Event Co-ordinators",
                        eventcontent: "Products are of various types some are helpful and some can be more helpful. The main aim of this event is to enable to participant to design a product to the given requirements. Be creative and think outside the box!",
                        description: "",
                        probstmt: "",
                        rules: "",
                        judging: "",
                        rounds: "",
                        specifications: "",
                        contact: "",
                        further: ""
                    });
                }
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
