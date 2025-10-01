-- Insert sample categories
INSERT INTO categories (name, slug, description) VALUES
('Traditional Wear', 'traditional-wear', 'Premium traditional clothing for men'),
('Panjabi', 'panjabi', 'Traditional panjabi collection'),
('Kurta', 'kurta', 'Comfortable kurta styles'),
('Formal Wear', 'formal-wear', 'Formal traditional attire');

-- Insert sample products
INSERT INTO products (name, slug, description, short_description, price, original_price, sku, category_id, stock_quantity, featured) VALUES
('Premium White Panjabi', 'premium-white-panjabi', 'Elegant white panjabi made from premium cotton fabric. Perfect for special occasions and festivals.', 'Premium cotton white panjabi', 2500.00, 3000.00, 'PWP001', 2, 50, TRUE),
('Royal Blue Kurta', 'royal-blue-kurta', 'Stylish royal blue kurta with intricate embroidery. Comfortable fit for all-day wear.', 'Royal blue embroidered kurta', 2200.00, 2800.00, 'RBK001', 3, 30, TRUE),
('Black Formal Panjabi', 'black-formal-panjabi', 'Sophisticated black panjabi ideal for formal events and business occasions.', 'Black formal panjabi', 2800.00, 3500.00, 'BFP001', 2, 25, TRUE),
('Cream Cotton Kurta', 'cream-cotton-kurta', 'Lightweight cream cotton kurta perfect for casual and semi-formal occasions.', 'Cream cotton kurta', 1800.00, 2200.00, 'CCK001', 3, 40, FALSE),
('Navy Blue Panjabi', 'navy-blue-panjabi', 'Classic navy blue panjabi with modern cut and traditional appeal.', 'Navy blue classic panjabi', 2300.00, 2700.00, 'NBP001', 2, 35, TRUE),
('Maroon Silk Kurta', 'maroon-silk-kurta', 'Luxurious maroon silk kurta with golden thread work. Premium quality fabric.', 'Maroon silk kurta with golden work', 3500.00, 4200.00, 'MSK001', 3, 20, TRUE);

-- Insert product images
INSERT INTO product_images (product_id, image_url, alt_text, is_primary) VALUES
(1, '/placeholder.svg?height=400&width=300', 'Premium White Panjabi Front View', TRUE),
(1, '/placeholder.svg?height=400&width=300', 'Premium White Panjabi Side View', FALSE),
(2, '/placeholder.svg?height=400&width=300', 'Royal Blue Kurta Front View', TRUE),
(2, '/placeholder.svg?height=400&width=300', 'Royal Blue Kurta Detail View', FALSE),
(3, '/placeholder.svg?height=400&width=300', 'Black Formal Panjabi Front View', TRUE),
(4, '/placeholder.svg?height=400&width=300', 'Cream Cotton Kurta Front View', TRUE),
(5, '/placeholder.svg?height=400&width=300', 'Navy Blue Panjabi Front View', TRUE),
(6, '/placeholder.svg?height=400&width=300', 'Maroon Silk Kurta Front View', TRUE);

-- Insert product attributes (sizes)
INSERT INTO product_attributes (product_id, attribute_name, attribute_value) VALUES
(1, 'size', 'S'), (1, 'size', 'M'), (1, 'size', 'L'), (1, 'size', 'XL'), (1, 'size', 'XXL'),
(2, 'size', 'S'), (2, 'size', 'M'), (2, 'size', 'L'), (2, 'size', 'XL'),
(3, 'size', 'M'), (3, 'size', 'L'), (3, 'size', 'XL'), (3, 'size', 'XXL'),
(4, 'size', 'S'), (4, 'size', 'M'), (4, 'size', 'L'), (4, 'size', 'XL'),
(5, 'size', 'S'), (5, 'size', 'M'), (5, 'size', 'L'), (5, 'size', 'XL'), (5, 'size', 'XXL'),
(6, 'size', 'M'), (6, 'size', 'L'), (6, 'size', 'XL');

-- Insert sample admin user
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@manfare.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
('John Doe', 'john@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'customer');

-- Insert sample reviews
INSERT INTO reviews (product_id, user_id, rating, title, comment, verified_purchase, status) VALUES
(1, 2, 5, 'Excellent Quality', 'Amazing quality panjabi. The fabric is very comfortable and the stitching is perfect.', TRUE, 'approved'),
(1, 2, 4, 'Good Product', 'Nice panjabi but delivery was a bit slow.', TRUE, 'approved'),
(2, 2, 5, 'Love the Color', 'Beautiful royal blue color and great fit. Highly recommended!', TRUE, 'approved'),
(3, 2, 4, 'Professional Look', 'Perfect for office wear. Good quality fabric.', TRUE, 'approved');

-- Insert sample coupon
INSERT INTO coupons (code, type, value, minimum_amount, usage_limit, valid_from, valid_until) VALUES
('3093', 'percentage', 20.00, 1000.00, 100, '2024-01-01', '2024-12-31');

-- Insert basic settings
INSERT INTO settings (setting_key, setting_value, setting_type) VALUES
('site_name', 'Manfare', 'text'),
('site_description', 'Premium Traditional Wear for Men', 'text'),
('contact_phone', '01746098257', 'text'),
('contact_email', 'info@manfare.com', 'email'),
('shipping_cost', '100', 'number'),
('free_shipping_minimum', '2000', 'number'),
('tax_rate', '0', 'number');
