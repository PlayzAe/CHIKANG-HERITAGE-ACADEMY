<?php
// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input
    $name = filter_var(trim($_POST["name"]), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = filter_var(trim($_POST["subject"]), FILTER_SANITIZE_STRING);
    $message = filter_var(trim($_POST["message"]), FILTER_SANITIZE_STRING);

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format";
        exit;
    }

    // Principal's email address
    $to = "azuorugeorge@gmail.com";  // Replace with the principal's actual email address

    // Set temporary email address for the "From" header
    $headers = "From: norwood@mancelipo.com" . "\r\n" .  // Temporary email
               "Reply-To: $email" . "\r\n" .  // Sender's email address
               "X-Mailer: PHP/" . phpversion();  // PHP version info for the email

    // Compose the email subject and body
    $email_subject = "New Contact Form Submission: $subject";
    $email_body = "You have received a new message from your website contact form.<br><br>" .
                  "<strong>Name:</strong> $name<br>" .
                  "<strong>Email:</strong> $email<br>" .
                  "<strong>Subject:</strong> $subject<br>" .
                  "<strong>Message:</strong><br>$message";

    // Send the email using PHP's built-in mail() function
    if (mail($to, $email_subject, $email_body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Failed to send email.";
    }
}
?>
