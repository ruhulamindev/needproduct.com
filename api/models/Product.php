<?php
class Product {
    private $conn;
    private $table_name = "products";

    public $id;
    public $name;
    public $slug;
    public $description;
    public $short_description;
    public $price;
    public $original_price;
    public $sku;
    public $category_id;
    public $stock_quantity;
    public $in_stock;
    public $featured;
    public $status;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Get all products with pagination
    public function read($page = 1, $limit = 12, $filters = []) {
        $offset = ($page - 1) * $limit;
        
        $query = "SELECT p.*, c.name as category_name, 
                         pi.image_url as primary_image,
                         AVG(r.rating) as avg_rating,
                         COUNT(r.id) as review_count
                  FROM " . $this->table_name . " p
                  LEFT JOIN categories c ON p.category_id = c.id
                  LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = 1
                  LEFT JOIN reviews r ON p.id = r.product_id AND r.status = 'approved'
                  WHERE p.status = 'active'";

        // Apply filters
        if (!empty($filters['category'])) {
            $query .= " AND c.slug = :category";
        }
        
        if (!empty($filters['min_price'])) {
            $query .= " AND p.price >= :min_price";
        }
        
        if (!empty($filters['max_price'])) {
            $query .= " AND p.price <= :max_price";
        }
        
        if (!empty($filters['in_stock'])) {
            $query .= " AND p.in_stock = 1";
        }

        $query .= " GROUP BY p.id";

        // Apply sorting
        if (!empty($filters['sort_by'])) {
            switch ($filters['sort_by']) {
                case 'price_asc':
                    $query .= " ORDER BY p.price ASC";
                    break;
                case 'price_desc':
                    $query .= " ORDER BY p.price DESC";
                    break;
                case 'name':
                    $query .= " ORDER BY p.name ASC";
                    break;
                case 'rating':
                    $query .= " ORDER BY avg_rating DESC";
                    break;
                case 'newest':
                    $query .= " ORDER BY p.created_at DESC";
                    break;
                default:
                    $query .= " ORDER BY p.featured DESC, p.created_at DESC";
            }
        } else {
            $query .= " ORDER BY p.featured DESC, p.created_at DESC";
        }

        $query .= " LIMIT :limit OFFSET :offset";

        $stmt = $this->conn->prepare($query);
        
        // Bind filter parameters
        if (!empty($filters['category'])) {
            $stmt->bindParam(':category', $filters['category']);
        }
        if (!empty($filters['min_price'])) {
            $stmt->bindParam(':min_price', $filters['min_price']);
        }
        if (!empty($filters['max_price'])) {
            $stmt->bindParam(':max_price', $filters['max_price']);
        }
        
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
        
        $stmt->execute();
        return $stmt;
    }

    // Get single product by ID
    public function readOne() {
        $query = "SELECT p.*, c.name as category_name,
                         AVG(r.rating) as avg_rating,
                         COUNT(r.id) as review_count
                  FROM " . $this->table_name . " p
                  LEFT JOIN categories c ON p.category_id = c.id
                  LEFT JOIN reviews r ON p.id = r.product_id AND r.status = 'approved'
                  WHERE p.id = :id AND p.status = 'active'
                  GROUP BY p.id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            $this->name = $row['name'];
            $this->slug = $row['slug'];
            $this->description = $row['description'];
            $this->short_description = $row['short_description'];
            $this->price = $row['price'];
            $this->original_price = $row['original_price'];
            $this->sku = $row['sku'];
            $this->category_id = $row['category_id'];
            $this->stock_quantity = $row['stock_quantity'];
            $this->in_stock = $row['in_stock'];
            $this->featured = $row['featured'];
            $this->status = $row['status'];
            $this->created_at = $row['created_at'];
            
            return $row;
        }
        
        return false;
    }

    // Get product images
    public function getImages() {
        $query = "SELECT * FROM product_images WHERE product_id = :product_id ORDER BY is_primary DESC, sort_order ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':product_id', $this->id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Get product attributes
    public function getAttributes() {
        $query = "SELECT attribute_name, GROUP_CONCAT(attribute_value) as values 
                  FROM product_attributes 
                  WHERE product_id = :product_id 
                  GROUP BY attribute_name";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':product_id', $this->id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Get featured products
    public function getFeatured($limit = 8) {
        $query = "SELECT p.*, c.name as category_name, 
                         pi.image_url as primary_image,
                         AVG(r.rating) as avg_rating,
                         COUNT(r.id) as review_count
                  FROM " . $this->table_name . " p
                  LEFT JOIN categories c ON p.category_id = c.id
                  LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = 1
                  LEFT JOIN reviews r ON p.id = r.product_id AND r.status = 'approved'
                  WHERE p.status = 'active' AND p.featured = 1
                  GROUP BY p.id
                  ORDER BY p.created_at DESC
                  LIMIT :limit";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    // Create product (admin)
    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                  SET name=:name, slug=:slug, description=:description, 
                      short_description=:short_description, price=:price, 
                      original_price=:original_price, sku=:sku, 
                      category_id=:category_id, stock_quantity=:stock_quantity,
                      featured=:featured, status=:status";

        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->slug = htmlspecialchars(strip_tags($this->slug));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->short_description = htmlspecialchars(strip_tags($this->short_description));

        // Bind values
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':slug', $this->slug);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':short_description', $this->short_description);
        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':original_price', $this->original_price);
        $stmt->bindParam(':sku', $this->sku);
        $stmt->bindParam(':category_id', $this->category_id);
        $stmt->bindParam(':stock_quantity', $this->stock_quantity);
        $stmt->bindParam(':featured', $this->featured);
        $stmt->bindParam(':status', $this->status);

        if ($stmt->execute()) {
            return $this->conn->lastInsertId();
        }

        return false;
    }

    // Update product
    public function update() {
        $query = "UPDATE " . $this->table_name . "
                  SET name=:name, slug=:slug, description=:description,
                      short_description=:short_description, price=:price,
                      original_price=:original_price, sku=:sku,
                      category_id=:category_id, stock_quantity=:stock_quantity,
                      featured=:featured, status=:status
                  WHERE id=:id";

        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->slug = htmlspecialchars(strip_tags($this->slug));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->short_description = htmlspecialchars(strip_tags($this->short_description));

        // Bind values
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':slug', $this->slug);
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':slug', $this->slug);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':short_description', $this->short_description);
        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':original_price', $this->original_price);
        $stmt->bindParam(':sku', $this->sku);
        $stmt->bindParam(':category_id', $this->category_id);
        $stmt->bindParam(':stock_quantity', $this->stock_quantity);
        $stmt->bindParam(':featured', $this->featured);
        $stmt->bindParam(':status', $this->status);

        return $stmt->execute();
    }

    // Delete product
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id);
        return $stmt->execute();
    }

    // Search products
    public function search($keyword, $limit = 20) {
        $query = "SELECT p.*, c.name as category_name, 
                         pi.image_url as primary_image,
                         AVG(r.rating) as avg_rating,
                         COUNT(r.id) as review_count
                  FROM " . $this->table_name . " p
                  LEFT JOIN categories c ON p.category_id = c.id
                  LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = 1
                  LEFT JOIN reviews r ON p.id = r.product_id AND r.status = 'approved'
                  WHERE p.status = 'active' AND (p.name LIKE :keyword OR p.description LIKE :keyword)
                  GROUP BY p.id
                  ORDER BY p.featured DESC, p.created_at DESC
                  LIMIT :limit";

        $stmt = $this->conn->prepare($query);
        $keyword = "%{$keyword}%";
        $stmt->bindParam(':keyword', $keyword);
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }
}
?>
