var fs = require('fs');
var sys = require('sys');
var express = require('express');

var app = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('view options', {layout: false});
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.logger({ format: ':date :remote-addr :method :status :url' }));
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});


app.get('/', function(req, response){
  response.render('index', {locals:{
    title: "Hackity"
  }});
});

app.listen(80);

var text = '';

// SERVER
var nowjs = require("now");
var everyone = nowjs.initialize(app);

everyone.connected(function(){
});

everyone.disconnected(function(){
});

everyone.now.updateText = function(t){
  text = t;
  everyone.now.updateClientText(text);
}
