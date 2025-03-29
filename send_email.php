<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection parameters
$host = "sql101.infinityfree.com"; // Change this if needed
$dbname = "if0_38256126_contact_form_portfolioviki"; // Your database name
$username = "if0_38256126"; // Your database username
$password = "oB8CQ8FnC2pTM"; // Your database password

// Function to sanitize input data
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve and sanitize form data
    $name = sanitize_input($_POST["name"]);
    $email = sanitize_input($_POST["email"]);
    $subject = sanitize_input($_POST["subject"]);
    $message = sanitize_input($_POST["message"]);

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "message" => "Invalid email format"]);
        exit;
    }

    try {
        // Establish database connection
        $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Insert form data into the database
        $sql = "INSERT INTO contact_messages (name, email, subject, message) VALUES (:name, :email, :subject, :message)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            ":name" => $name,
            ":email" => $email,
            ":subject" => $subject,
            ":message" => $message
        ]);

        // Email details
        $to = "vikikumar0505@gmail.com"; // Replace with your email address
        $email_subject = "New Contact Form Submission: $subject";
        $email_body = "You have received a new message from your website contact form.\n\n"
            . "Name: $name\n"
            . "Email: $email\n"
            . "Subject: $subject\n"
            . "Message:\n$message";
        $headers = "From: $email\n";
        $headers .= "Reply-To: $email";

        // Send email
        if (mail($to, $email_subject, $email_body, $headers)) {
            echo json_encode(["success" => true, "message" => "Message sent and stored successfully"]);
        } else {
            echo json_encode(["success" => false, "message" => "Message stored but email not sent"]);
        }
    } //catch (PDOException $e) {
    //     echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    // }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
?>
