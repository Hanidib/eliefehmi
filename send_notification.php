<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load PHPMailer classes
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get JSON data
    $input = json_decode(file_get_contents('php://input'), true);
    $email = isset($input['email']) ? filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL) : '';

    // Check if email is valid
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // Server settings (same as your contact form)
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'hanidib21@gmail.com';
        $mail->Password   = 'mhny irpk ldzr enrv';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom('hanidib21@gmail.com', 'Program Notifications');
        $mail->addAddress('hanidib21@gmail.com', 'Elie Fehmi');
        $mail->addReplyTo($email);

        // Content
        $mail->isHTML(true);
        $mail->Subject = "New Program Interest - From Chains to Change";
        $mail->Body    = "
            <h2>🚀 New Program Interest Registration</h2>
            <p><strong>Someone wants to be notified when your Group Mentorship Program launches!</strong></p>
            
            <div style='background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 15px 0;'>
                <h3 style='color: #febd0f; margin-top: 0;'>Program Details:</h3>
                <p><strong>Program:</strong> From Chains to Change Group Mentorship</p>
                <p><strong>Interested User Email:</strong> $email</p>
                <p><strong>Submission Date:</strong> " . date('F j, Y \a\t g:i A') . "</p>
            </div>
            
            <p style='color: #666; font-style: italic;'>
                This user should be added to your waiting list and notified when the program launches.
            </p>
        ";

        $mail->AltBody = "NEW PROGRAM INTEREST\n\nProgram: From Chains to Change Group Mentorship\nUser Email: $email\nDate: " . date('F j, Y \a\t g:i A') . "\nIP: " . $_SERVER['REMOTE_ADDR'] . "\n\nAdd this user to your waiting list.";

        $mail->send();

        // Optional: Save to text file as backup
        file_put_contents('program_interest.txt', date('Y-m-d H:i:s') . " - " . $email . PHP_EOL, FILE_APPEND | LOCK_EX);

        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Thank you! We\'ll notify you when the program launches.']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Sorry, there was an error. Please try again or contact us directly.']);
        // Log the error
        error_log("PHPMailer Error: " . $mail->ErrorInfo);
    }
} else {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
