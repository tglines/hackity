$(document).ready(function(){

  $('textarea.codebox').keyup(function(e){
    now.updateText($('textarea.codebox').val());
  });

  now.updateClientText = function(t){
    $('textarea.codebox').val(t);
  }

});
