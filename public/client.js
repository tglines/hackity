var clientId;
var path = document.URL.replace('http://www.hackity.com','');

$(document).ready(function(){

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

  now.ready(function(){
    now.addMeToGroup(path);
  });
 
});
