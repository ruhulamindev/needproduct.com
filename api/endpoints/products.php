<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../models/Product.php';

$database = new Database();
$db = $database->getConnection();
$product = new Product($db);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            // Get single product
            $product->id = $_GET['id'];
            $product_data = $product->readOne();
            
            if ($product_data) {
                $product_data['images'] = $product->getImages();
                $product_data['attributes'] = $product->getAttributes();
                
                http_response_code(200);
                echo json_encode($product_data);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Product not found."));
            }
        } elseif (isset($_GET['featured'])) {
            // Get featured products
            $limit = isset($_GET['limit']) ? $_GET['limit'] : 8;
            $stmt = $product->getFeatured($limit);
            $products = array();
            
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $products[] = $row;
            }
            
            http_response_code(200);
            echo json_encode($products);
        } elseif (isset($_GET['search'])) {
            // Search products
            $keyword = $_GET['search'];
            $limit = isset($_GET['limit']) ? $_GET['limit'] : 20;
            $stmt = $product->search($keyword, $limit);
            $products = array();
            
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $products[] = $row;
            }
            
            http_response_code(200);
            echo json_encode($products);
        } else {
            // Get all products with filters
            $page = isset($_GET['page']) ? $_GET['page'] : 1;
            $limit = isset($_GET['limit']) ? $_GET['limit'] : 12;
            
            $filters = array();
            if (isset($_GET['category'])) $filters['category'] = $_GET['category'];
            if (isset($_GET['min_price'])) $filters['min_price'] = $_GET['min_price'];
            if (isset($_GET['max_price'])) $filters['max_price'] = $_GET['max_price'];
            if (isset($_GET['in_stock'])) $filters['in_stock'] = $_GET['in_stock'];
            if (isset($_GET['sort_by'])) $filters['sort_by'] = $_GET['sort_by'];
            
            $stmt = $product->read($page, $limit, $filters);
            $products = array();
            
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $products[] = $row;
            }
            
            http_response_code(200);
            echo json_encode($products);
        }
        break;
        
    case 'POST':
        // Create product (admin only)
        $data = json_decode(file_get_contents("php://input"));
        
        if (!empty($data->name) && !empty($data->price)) {
            $product->name = $data->name;
            $product->slug = $data->slug;
            $product->description = $data->description;
            $product->short_description = $data->short_description;
            $product->price = $data->price;
            $product->original_price = $data->original_price;
            $product->sku = $data->sku;
            $product->category_id = $data->category_id;
            $product->stock_quantity = $data->stock_quantity;
            $product->featured = $data->featured ?? 0;
            $product->status = $data->status ?? 'active';
            
            $product_id = $product->create();
            
            if ($product_id) {
                http_response_code(201);
                echo json_encode(array("message" => "Product created.", "id" => $product_id));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to create product."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to create product. Data is incomplete."));
        }
        break;
        
    case 'PUT':
        // Update product (admin only)
        $data = json_decode(file_get_contents("php://input"));
        
        if (!empty($data->id)) {
            $product->id = $data->id;
            $product->name = $data->name;
            $product->slug = $data->slug;
            $product->description = $data->description;
            $product->short_description = $data->short_description;
            $product->price = $data->price;
            $product->original_price = $data->original_price;
            $product->sku = $data->sku;
            $product->category_id = $data->category_id;
            $product->stock_quantity = $data->stock_quantity;
            $product->featured = $data->featured;
            $product->status = $data->status;
            
            if ($product->update()) {
                http_response_code(200);
                echo json_encode(array("message" => "Product updated."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to update product."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to update product. Data is incomplete."));
        }
        break;
        
    case 'DELETE':
        // Delete product (admin only)
        $data = json_decode(file_get_contents("php://input"));
        
        if (!empty($data->id)) {
            $product->id = $data->id;
            
            if ($product->delete()) {
                http_response_code(200);
                echo json_encode(array("message" => "Product deleted."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to delete product."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Unable to delete product. Data is incomplete."));
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed."));
        break;
}
?>
