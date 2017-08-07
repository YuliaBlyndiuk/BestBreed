//server.js setup

var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

//configuration

mongoose.connect(configDB.url); //connect to our database

require('./config/passport')(passport); //pass passport for configuration

//set up our express app

app.use(morgan('dev')); //log each request to the console
app.use(cookieParser()); //read cookies: neede for auth
app.use(bodyParser()); //get info from html forms

app.set('view engine', 'ejs'); //set up ejs for templating

//required for passport
app.use(session({ secret: '123'})); //session secret
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
app.use(flash()); //use connect-flash for flash messages stored in session

//routes ==========================
require('./app/routes.js')(app, passport); //load our routes and pass in our app in full

//launch ===========================

app.listen(port);
console.log('using ' + port);

app.use(express.static('public'));

// app.get('/search', function(req, res) {
// 	res.status(200);
// 	res.send('search page');
// })

// app.get('/result', function(req, res) {
// 	res.status(200);
// 	res.send('result page');
// })

module.exports = {app};