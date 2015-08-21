/*
 * Email Server for Processing and Sending Emails
 * Team pclubGU
 * The MIT License
 */

var c = require('./config').emailconfig;
var s = require("sendgrid")(c.uname, c.pwd)

module.exports.activateAccount = {
}

module.exports.resetAccount = {
}

module.exports.resetPassword = {
}

module.exports.deleteAccount = {
}

