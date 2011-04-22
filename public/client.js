var clientId;

$(document).ready(function(){

  $('textarea.codebox').keyup(function(e){
    now.updateText($('textarea.codebox').val());
  });

  now.setClientId = function(id){
    clientId = id;
  }

  now.updateClientText = function(otherClientId,t){
    if(otherClientId != clientId)
      $('textarea.codebox').val(t);
  }

});
