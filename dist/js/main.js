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

  $('#next-go-btn').on('click', function(e) {
    if ($("#url").val() != '') {
      window.location = $("#url").val();
    }
    return false;
  });




  $('#post-button').on('click', function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      //url: $("#url").val(),
      url: "http://54.149.154.58:8080/api/RouterSettings",
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
        url: "http://54.149.154.58:8080/api/LatencySettings",
        data: $("#latency-data").val(),
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


$('#post-button-lb').on('click', function(e) {
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: $("#url-lb").val(),
      datatype: 'text',
      success: function(response,status,xhr) {
        console.log(response);
        $('#server-response-lb').val(response);
      }
    });
    return false;
  });

$('#post-button-pt').on('click', function(e) {
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: $("#url-pt").val(),
      datatype: 'text',
      success: function(response,status,xhr) {
        console.log(response);
        $('#server-response-pt').val( "\nResponse Headers:\n"+ xhr.getAllResponseHeaders()+"\nResponse Body:\n"+response);
      }
    });
    return false;
  });

$('#post-button-gz').on('click', function(e) {
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: $("#url-gz").val(),
      datatype: 'text',
      success: function(response,status,xhr) {
        console.log(response);
        $('#server-response-gz').val( "\nResponse Headers:\n"+ xhr.getAllResponseHeaders()+"\nResponse Body:\n"+response);
      }
    });
    return false;
  });


})
