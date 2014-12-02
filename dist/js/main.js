$(document).on('submit', '#get-form', function(e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: $(this).attr('action'),
            data: $(this).serialize(),
            success: function(response, textStatus, XMLHttpRequest) {
                //process all the data you want over here in this block with index and element
                console.log(response);
            }
        });
        return false;
});

$(document).on('submit', '#post-form', function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr('action'),
            data: $(this).serialize(),
            success: function(response, textStatus, XMLHttpRequest) {
                //process all the data you want over here in this block with index and element
                console.log(response);
            }
        });
        return false;
});