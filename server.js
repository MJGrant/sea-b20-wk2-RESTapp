var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');

var app = express();

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/notes-development');
//when on heroku, url will be used

app.use(bodyparser.json());
require('./routes/note-routes')(app); //require note-routes (which is exported from same named file) 

var server = http.createServer(app);

server.listen(3000, function() {
  console.log('server runnning on port 3000');
});