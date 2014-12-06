$(document).ready(function(){

  $('#get-button').on('click', function(e) {
    if($("#url").val()!=''){
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: $("#url").val(),
      success: function(response) {
        console.log(response);
        var res = JSON.stringify(response, null, '\t');
        $('#server-response').val(res);
      }
    });
  }
    return false;
  });

  $('#post-button').on('click', function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: $("#url").val(),
      data: $("#json-data").val(),
      contentType: 'application/json',
      datatype: 'text',
      success: function(response) {
        console.log(response);
        var res = JSON.stringify(response, null, '\t');
        $('#server-response').val(res);
      }
    });
    return false;
  });
})