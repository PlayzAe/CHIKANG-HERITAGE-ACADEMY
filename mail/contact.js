$(function () {
    // Form element selectors
    const $contactForm = $("#contactForm");
    const $sendMessageButton = $("#sendMessageButton");
    const $success = $('#success');
    
    // Validation and form submission handling
    $contactForm.find("input, textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            console.error("Form submission error:", errors);
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();

            // Get form data
            const formData = {
                "entry.2005620554": $("input#name").val(),  // Name
                "entry.1045781291": $("input#email").val(), // Email
                "entry.1065046570": $("input#subject").val(), // Subject
                "entry.1166974658": $("textarea#message").val() // Message
            };

            console.log("Form Data Submitted:", formData);

            // Disable submit button while sending data
            $sendMessageButton.prop("disabled", true);

            // Submit data to Google Form (replace with your Google Apps Script URL)
            $.ajax({
                url: "https://script.google.com/macros/s/AKfycbwUbt_FL6GjA36ROpaj8A1DZNpRsq-xO36phB8331xXPFa3T7dBGGpoc5hL60p4y8I/exec", 
                type: "POST",
                data: formData, // Use formData object here
                dataType: "json",
                success: function () {
                    showSuccessMessage("Your message has been sent.");
                    $contactForm.trigger("reset");
                },
                error: function () {
                    showErrorMessage("Sorry, there was an error sending your message. Please try again later.");
                    $contactForm.trigger("reset");
                },
                complete: function () {
                    setTimeout(function () {
                        $sendMessageButton.prop("disabled", false); // Re-enable the button after 1 second
                    }, 1000);
                }
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    // Reset success message on focus
    $('#name').focus(function () {
        $success.html('');
    });

    // Helper functions to handle success and error messages
    function showSuccessMessage(message) {
        $success.html("<div class='alert alert-success'>");
        $success.find('.alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>")
            .append("<strong>" + message + "</strong>")
            .append("</div>");
    }

    function showErrorMessage(message) {
        $success.html("<div class='alert alert-danger'>");
        $success.find('.alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>")
            .append("<strong>" + message + "</strong>")
            .append("</div>");
    }
});
