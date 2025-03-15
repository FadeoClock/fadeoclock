
$(function()
{
    function after_form_submitted(data) 
    {
        console.log("Response from server:", data); 

        if(data.result == 'success')
        {
            $('#success_message').show();
            $('#error_message').hide();
        }
        else
        {
            $('#error_message').append('<ul></ul>');

            jQuery.each(data.errors,function(key,val)
            {
                $('#error_message ul').append('<li>'+key+':'+val+'</li>');
            });
            $('#success_message').hide();
            $('#error_message').show();

            //reverse the response on the button
            $('button[type="button"]', $form).each(function()
            {
                $btn = $(this);
                label = $btn.prop('orig_label');
                if(label)
                {
                    $btn.prop('type','submit' ); 
                    $btn.text(label);
                    $btn.prop('orig_label','');
                }
            });
            
        }//else
    }

	$('#contact_form').submit(function(e)
      {
        e.preventDefault();

        $form = $(this);
        console.log("Form submitted");
        //show some response on the button
        $('button[type="submit"]', $form).each(function()
        {
            $btn = $(this);
            $btn.prop('type','button' ); 
            $btn.prop('orig_label',$btn.text());
            $btn.text('Sending ...');
        });
        

        $.ajax({
            type: "POST",
            url: 'handler.php',
            data: $form.serialize(),
            success: after_form_submitted,
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("AJAX Error:", textStatus, errorThrown); // Debug: Log AJAX errors
            },
            dataType: 'json' 
        });        
        
      });	
});
