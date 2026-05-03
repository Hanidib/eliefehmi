<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load PHPMailer classes
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = strip_tags(trim($_POST["name"]));
    $lastname = strip_tags(trim($_POST["lastname"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $message = trim($_POST["message"]);
    $service = isset($_POST["service"]) ? strip_tags(trim($_POST["service"])) : 'Not specified';

    // Check if data is valid
    if (empty($name) || empty($lastname) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($service)) {
        http_response_code(400);
        echo "Please complete all required fields and select a service.";
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'hanidib21@gmail.com';
        $mail->Password   = 'mhny irpk ldzr enrv';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom('hanidib21@gmail.com', 'From Shadow to Light Website');
        $mail->addAddress('hanidib21@gmail.com', 'Elie Fehmi');
        $mail->addReplyTo($email, $name . ' ' . $lastname);

        // Content
        $mail->isHTML(true);
        $mail->Subject = "New Booking Request: $service - From $name $lastname";
        $mail->Body    = "
            <h2>New Service Booking Request</h2>
            <div style='background: #f9f9f9; padding: 20px; border-radius: 10px; border-left: 4px solid #eafa07;'>
                <h3 style='color: #2c2c2c; margin-bottom: 15px;'>Client Information</h3>
                <p><strong>Name:</strong> $name $lastname</p>
                <p><strong>Email:</strong> <a href='mailto:$email'>$email</a></p>
                <p><strong>Phone:</strong> $phone</p>
                <p><strong>Service Interested In:</strong> <span style='color: #eafa07; font-weight: bold;'>$service</span></p>
            </div>
            <div style='margin-top: 20px; background: #f5f5f5; padding: 15px; border-radius: 8px;'>
                <h3 style='color: #2c2c2c; margin-bottom: 10px;'>Client's Message:</h3>
                <p style='color: #555; line-height: 1.6;'>$message</p>
            </div>
            <div style='margin-top: 25px; padding: 15px; background: #2c2c2c; color: white; border-radius: 8px;'>
                <p style='margin: 0;'><strong>Action Required:</strong> Please follow up with this client within 24 hours to schedule their call.</p>
            </div>
        ";

        $mail->AltBody = "NEW SERVICE BOOKING REQUEST\n\n" .
            "Client: $name $lastname\n" .
            "Email: $email\n" .
            "Phone: $phone\n" .
            "Service: $service\n\n" .
            "Message:\n$message\n\n" .
            "ACTION REQUIRED: Please follow up within 24 hours.";

        $mail->send();

        // Send auto-reply to client
        $clientMail = new PHPMailer(true);
        $clientMail->isSMTP();
        $clientMail->Host       = 'smtp.gmail.com';
        $clientMail->SMTPAuth   = true;
        $clientMail->Username   = 'hanidib21@gmail.com';
        $clientMail->Password   = 'mhny irpk ldzr enrv';
        $clientMail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $clientMail->Port       = 587;

        $clientMail->setFrom('hanidib21@gmail.com', 'Elie Fehmi - From Shadow to Light');
        $clientMail->addAddress($email, $name . ' ' . $lastname);
        $clientMail->addReplyTo('hanidib21@gmail.com', 'Elie Fehmi');

        $clientMail->isHTML(true);
        $clientMail->Subject = "Thank you for your interest in $service";
        $clientMail->Body    = "
            <h2>Thank You for Reaching Out!</h2>
            <p>Dear $name,</p>
            <p>Thank you for your interest in my <strong>$service</strong>. I've received your message and will be in touch within 24 hours to schedule our call.</p>
            <div style='background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 15px 0;'>
                <p><strong>Service Selected:</strong> $service</p>
                <p><strong>Your Message:</strong> $message</p>
            </div>
            <p>I look forward to connecting with you and supporting your transformation journey.</p>
            <p>With gratitude,<br><strong>Elie Fehmi</strong><br>From Shadow to Light</p>
        ";

        $clientMail->AltBody = "Thank you for your interest in $service.\n\nDear $name,\n\nThank you for reaching out. I've received your message and will contact you within 24 hours to schedule our call.\n\nService: $service\nYour Message: $message\n\nI look forward to connecting with you.\n\nElie Fehmi\nFrom Shadow to Light";

        $clientMail->send();

        http_response_code(200);
        echo "Thank you! Your booking request for $service has been sent successfully. We'll contact you within 24 hours to schedule your call.";
    } catch (Exception $e) {
        http_response_code(500);
        echo "Sorry, there was an error sending your message. Please try again or contact us directly at hanidib21@gmail.com";
    }
} else {
    http_response_code(403);
    echo "Invalid request method. Please use the contact form.";
}
