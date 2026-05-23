-- Create users table (no role column — admin is determined by email in the application code)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    image_url VARCHAR(500),
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    category VARCHAR(100) DEFAULT 'General',
    quantity INT NOT NULL DEFAULT 0,
    image_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Delivered', 'Cancelled')),
    total_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    wilaya VARCHAR(100) NOT NULL,
    baladiya VARCHAR(100) NOT NULL,
    delivery_type VARCHAR(50) NOT NULL,
    home_address VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create order items table
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE SET NULL,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create cart items table
CREATE TABLE IF NOT EXISTS cart_items (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_cart_user_product UNIQUE (user_id, product_id)
);

-- Insert seed product data
INSERT INTO products (id, name, description, price, category, quantity, image_url, created_at) VALUES
(1, 'Bougie parfumée', 'Bougie artisanale aux notes de vanille.', 1200.00, 'General', 18, NULL, '2026-06-03 19:58:30+00'),
(2, 'Tasse personnalisée', 'Tasse en céramique avec un message offert.', 1500.00, 'General', 34, NULL, '2026-06-03 19:58:30+00'),
(3, 'Coffret cadeau', 'Sélection de petits cadeaux pour toutes occasions.', 3000.00, 'General', 12, NULL, '2026-06-03 19:58:30+00'),
(4, 'Bougie parfumée', 'Bougie artisanale aux notes de vanille.', 1200.00, 'General', 18, NULL, '2026-06-03 20:02:52+00'),
(5, 'Tasse personnalisée', 'Tasse en céramique avec un message offert.', 1500.00, 'General', 34, NULL, '2026-06-03 20:02:52+00'),
(6, 'Coffret cadeau', 'Sélection de petits cadeaux pour toutes occasions.', 3000.00, 'General', 12, NULL, '2026-06-03 20:02:52+00'),
(7, 'Bougie parfumée', 'Bougie artisanale aux notes de vanille.', 1200.00, 'General', 18, NULL, '2026-06-05 08:18:57+00'),
(8, 'Tasse personnalisée', 'Tasse en céramique avec un message offert.', 1500.00, 'General', 34, NULL, '2026-06-05 08:18:57+00'),
(9, 'Coffret cadeau', 'Sélection de petits cadeaux pour toutes occasions.', 3000.00, 'General', 12, NULL, '2026-06-05 08:18:57+00')
ON CONFLICT (id) DO NOTHING;

-- Synchronize the serial sequence for products
SELECT setval(pg_get_serial_sequence('products', 'id'), COALESCE(MAX(id), 1)) FROM products;

-- Insert users (no role column — superuser is admin@giftoria.com, identified in app code)
INSERT INTO users (username, email, password, phone, image_url) VALUES
('mohammed', 'salahilyes194@gmial.com', 'ilyesadmin', '+213770000000', NULL),
('John Doe', 'john@email.com', 'password123', '+213550123456', '/assets/product-images/product-image2.jpg')
ON CONFLICT (email) DO NOTHING;

