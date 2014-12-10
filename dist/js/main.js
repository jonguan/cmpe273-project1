$(document).ready(function() {

  $('#get-button').on('click', function(e) {
    if ($("#url").val() != '') {
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
      //url: $("#url").val(),
      url: "http://localhost:8080/api/RouterSettings",
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


  $('#latency-button').on('click', function(e) {
      e.preventDefault();
      $.ajax({
        type: "POST",
        //url: $("#url").val(),
        url: "http://localhost:8080/api/LatencySettings",
        data: $("#latency-data").val(),
        contentType: 'application/json',
        datatype: 'text',
        success: function(response) {
          console.log(response);
          var res = JSON.stringify(response, null, '\t');
          $('#server-response').val(response);
        }
      });
      return false;
    });


  $('#put-button').on('click', function(e) {
    e.preventDefault();
    $.ajax({
      type: "PUT",
      url: $("#url").val(),
      data: $("#put-textarea").val(),
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

  $('#delete-button').on('click', function(e) {
    e.preventDefault();
    $.ajax({
      type: "DELETE",
      url: $("#url").val(),
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
