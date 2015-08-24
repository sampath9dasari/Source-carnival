/*
 * Email Server for Processing and Sending Emails
 * Team pclubGU
 * The MIT License
 */

var c = require('./config').emailconfig;
var s = require("sendgrid")(c.uname, c.pwd:)

module.exports.activateAccount = function(opt){
        s.send({
                to: opt.to,
                from: "admin@gusac.org",
                subject: "Registered | GUSAC CARNIVAL",
                text: "Thank you for registering to GUSAC Carnival 2015, Please click on the link" + opt.link
        }, function(err, json) {
                if(err) {
                        console.error(err);
                }
                else {
                        console.log(json);
                }
        });
}

module.exports.resetAccount = function(opt){
        s.send({
                to: opt.to,
                from: "admin@gusac.org",
                subject: "Account Reset | GUSAC Carnival",
                text: "Your account has been requested for a reset, Please click on the link in order to reset the Account" + opt.link
        }, function(err, json) {
                if(err) {
                        console.error(err);
                }
                else {
                        console.log(json);
                }
        });
}

module.exports.resetPassword = function(opt){
        s.send({
                to: opt.to,
                from: "admin@gusac.org",
                subject: "Password reset | GUSAC Carnival",
                text: "Your account requested for a password reset, Please click on the link to reset password" + opt.link
        }, function(err, json) {
                if(err) {
                        console.error(err);
                }
                else {
                        console.log(json);
                }
        });
}

module.exports.deleteAccount = {
	s.send({
                to: opt.to,
                from: "admin@gusac.org",
                subject: "Delete Account | GUSAC Carnival",
                text: "Your account has been deleted, Thank you"
        }, function(err, json) {
                if(err) {
                        console.error(err);
                }
                else {
                        console.log(json);
                }
        });
}

