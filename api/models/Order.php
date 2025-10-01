<?php
class Order {
    private $conn;
    private $table_name = "orders";

    public $id;
    public $user_id;
    public $order_number;
    public $status;
    public $total_amount;
    public $shipping_amount;
    public $tax_amount;
    public $discount_amount;
    public $payment_status;
    public $payment_method;
    public $shipping_address;
    public $billing_address;
    public $notes;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Create order
    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                  SET user_id=:user_id, order_number=:order_number, status=:status,
                      total_amount=:total_amount, shipping_amount=:shipping_amount,
                      tax_amount=:tax_amount, discount_amount=:discount_amount,
                      payment_method=:payment_method, shipping_address=:shipping_address,
                      billing_address=:billing_address, notes=:notes";

        $stmt = $this->conn->prepare($query);

        // Generate order number
        $this->order_number = 'MF' . date('Y') . str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);

        // Bind values
        $stmt->bindParam(':user_id', $this->user_id);
        $stmt->bindParam(':order_number', $this->order_number);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':total_amount', $this->total_amount);
        $stmt->bindParam(':shipping_amount', $this->shipping_amount);
        $stmt->bindParam(':tax_amount', $this->tax_amount);
        $stmt->bindParam(':discount_amount', $this->discount_amount);
        $stmt->bindParam(':payment_method', $this->payment_method);
        $stmt->bindParam(':shipping_address', $this->shipping_address);
        $stmt->bindParam(':billing_address', $this->billing_address);
        $stmt->bindParam(':notes', $this->notes);

        if ($stmt->execute()) {
            return $this->conn->lastInsertId();
        }

        return false;
    }

    // Get orders by user
    public function getByUser($user_id, $limit = 10) {
        $query = "SELECT * FROM " . $this->table_name . " 
                  WHERE user_id = :user_id 
                  ORDER BY created_at DESC 
                  LIMIT :limit";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt;
    }

    // Get all orders (admin)
    public function read($page = 1, $limit = 20) {
        $offset = ($page - 1) * $limit;
        
        $query = "SELECT o.*, u.name as customer_name, u.email as customer_email
                  FROM " . $this->table_name . " o
                  LEFT JOIN users u ON o.user_id = u.id
                  ORDER BY o.created_at DESC
                  LIMIT :limit OFFSET :offset";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt;
    }

    // Update order status
    public function updateStatus() {
        $query = "UPDATE " . $this->table_name . " 
                  SET status=:status, payment_status=:payment_status 
                  WHERE id=:id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':payment_status', $this->payment_status);

        return $stmt->execute();
    }

    // Get order items
    public function getItems() {
        $query = "SELECT oi.*, p.name as product_name, p.sku, pi.image_url
                  FROM order_items oi
                  LEFT JOIN products p ON oi.product_id = p.id
                  LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = 1
                  WHERE oi.order_id = :order_id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':order_id', $this->id);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
