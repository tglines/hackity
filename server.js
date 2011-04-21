var fs = require('fs');
var sys = require('sys');
var express = require('express');

var app = express.createServer();

app.use(express.staticProvider(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('view options', {layout: false});

app.get('/', function(req, response){
	response.render('index', {locals:{
		title: "Hackity"
	}});
});

app.listen(8080);

// SERVER
var nowjs = require("now");
var everyone = nowjs.initialize(app);