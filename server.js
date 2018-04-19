// Get the dependencies

const express = require('express');//create server for us
const path = require('path');//move around the dirs
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const cookieParser  = require('cookie-parser');
const session       = require('express-session');
var passport = require('passport');

app.use(session({
  secret: 'webdevsecret',
  saveUninitialized: true,
  resave: true}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'src/assets')));

// CORS
//security
app.use(function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "https://cs5610-webdev-peishanwang.herokuapp.com");
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});


const port = process.env.PORT || '5100';
app.set('port', port);


// Create HTTP server
const server = http.createServer(app);

require("./server/app")(app);

// For Build: Catch all other routes and return the index file -- BUILDING
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


//server.listen( port , () => console.log('Running'));
server.listen( port , function() {
  console.log('Node app is running on port', app.get('port'))});


