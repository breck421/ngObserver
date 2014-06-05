'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var ejs = require('ejs');


var app  = express();
app.engine('html', ejs.renderFile);

app.set('views', __dirname + '/views');
app.set('port', process.env.PORT || 3030);


app.use(morgan('dev')); 					// log every request to the console
app.use(bodyParser()); 						// pull information from html in POST
app.use(methodOverride()); 					// simulate DELETE and PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/libs will be /libs for users
app.use('/', express.static(__dirname + '/app'));


app.get('*', function(req, res, next) {
	res.render('index.html', {});
});

app.listen(3030);
console.log('Listening at http://localhost:' + app.get("port"));