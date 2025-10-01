<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../models/User.php';

$database = new Database();
$db = $database->getConnection();
$user = new User($db);

$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($method == 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    switch($action) {
        case 'login':
            if (!empty($data->email) && !empty($data->password)) {
                $user->email = $data->email;
                $user->password = $data->password;
                
                if ($user->login()) {
                    // Generate JWT token (simplified)
                    $token = base64_encode(json_encode(array(
                        'user_id' => $user->id,
                        'email' => $user->email,
                        'role' => $user->role,
                        'exp' => time() + (24 * 60 * 60) // 24 hours
                    )));
                    
                    http_response_code(200);
                    echo json_encode(array(
                        "message" => "Login successful.",
                        "token" => $token,
                        "user" => array(
                            "id" => $user->id,
                            "name" => $user->name,
                            "email" => $user->email,
                            "role" => $user->role
                        )
                    ));
                } else {
                    http_response_code(401);
                    echo json_encode(array("message" => "Invalid credentials."));
                }
            } else {
                http_response_code(400);
                echo json_encode(array("message" => "Email and password required."));
            }
            break;
            
        case 'register':
            if (!empty($data->name) && !empty($data->email) && !empty($data->password)) {
                $user->email = $data->email;
                
                if ($user->emailExists()) {
                    http_response_code(400);
                    echo json_encode(array("message" => "Email already exists."));
                } else {
                    $user->name = $data->name;
                    $user->password = $data->password;
                    $user->phone = $data->phone ?? '';
                    $user->role = 'customer';
                    
                    $user_id = $user->create();
                    
                    if ($user_id) {
                        http_response_code(201);
                        echo json_encode(array("message" => "User registered successfully.", "id" => $user_id));
                    } else {
                        http_response_code(503);
                        echo json_encode(array("message" => "Unable to register user."));
                    }
                }
            } else {
                http_response_code(400);
                echo json_encode(array("message" => "Name, email and password required."));
            }
            break;
            
        default:
            http_response_code(400);
            echo json_encode(array("message" => "Invalid action."));
            break;
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed."));
}
?>
