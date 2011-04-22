var clientId;
var path = document.URL.replace('http://www.hackity.com','').replace('http://hackity.com','');

$(document).ready(function(){
  now.name = prompt("What's your name?", "");  

  $('textarea.codebox').keyup(function(e){
    now.updateText( path, $('textarea.codebox').val() );
  });

  now.setClientId = function(id){
    clientId = id;
  }

  now.updateClientText = function(otherClientId,t){
    if(otherClientId != clientId)
      $('textarea.codebox').val(t);
  }

  now.receiveMessage = function(sender, message){
    $("#chat-text").append("<br>" + sender + ": " + message);
  }

  $("#chat-input").keyup(function(event){
    if(event.keyCode == 13){
      now.sendMessage(path, $("#chat-input").val());
      $("#chat-input").val("");
    }
  });

  now.ready(function(){
    now.addMeToGroup(path);
  });
 
});
