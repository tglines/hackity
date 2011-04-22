var sys = require('sys');
var express = require('express');
var app = express.createServer();
var fs = require('fs');

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

var text = '';
var rooms = [];
rooms.push({url:'/',text:'',password:''});

getRoom = function(url){
  for(var i=0;i<rooms.length;i++){
    if(rooms[i].url == url)
      return rooms[i];
  }
  return null;  
}


app.listen(80);

// SERVER
var nowjs = require("now");
var everyone = nowjs.initialize(app);

everyone.connected(function(){
  this.now.setClientId(this.user.clientId);
});

everyone.disconnected(function(){
  for(var i=0;i<rooms.length;i++){
    var g = nowjs.getGroup(rooms[i].url);
    g.removeUser(this.user.clientId);
  }
  console.log('removing!');
});

everyone.now.addMeToGroup = function(roomUrl){
  console.log('adding!');
  var g = nowjs.getGroup(roomUrl);
  g.addUser(this.user.clientId);
}

everyone.now.sendMessage = function(roomUrl, message){
  var g = nowjs.getGroup(roomUrl);
  g.now.receiveMessage(this.now.name, message.replace('<','&lt;').replace('>','&gt;'));
}

everyone.now.updateText = function(roomUrl,t){
  var g = nowjs.getGroup(roomUrl);
  for(var i=0;i<rooms.length;i++){
    if(rooms[i].url == roomUrl){
      rooms[i].text = t;
      break;
    }
  }
  g.now.updateClientText(this.user.clientId,t);
}

app.get('/', function(req, response){
  var home = getRoom('/');
  response.render('index', {locals:{
    title: "Hackity",
    text: home.text
  }});
});

app.get('/:roomUrl', function(req, response){
  var room = getRoom('/'+req.params.roomUrl);
  if(room){
    response.render('index', {locals:{
      title: "Hackity - "+req.params.roomUrl,
      text: room.text
    }});
  }
  else{
    response.send('room not found');
  }
});

app.post('/createRoom', function(req,response){
  var r = {url:'/'+req.body.name,text:'',password:req.body.password};
  rooms.push(r);
  response.redirect('/'+req.body.name);
});
