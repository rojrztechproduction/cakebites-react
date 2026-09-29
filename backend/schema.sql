-- Database: `cakebite react`
-- Use the database
USE `cakebite react`;

-- Drop existing tables if needed (in reverse dependency order)
DROP TABLE IF EXISTS `order_items`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `delivery_areas`;
DROP TABLE IF EXISTS `categories`;

-- 1. Categories Table
CREATE TABLE `categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(50) NOT NULL UNIQUE,
  `name` VARCHAR(100) NOT NULL,
  `banner_url` TEXT NOT NULL,
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Delivery Areas Table
CREATE TABLE `delivery_areas` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `fee` DECIMAL(10,2) NOT NULL DEFAULT 200.00,
  `time_estimate` VARCHAR(50) NOT NULL DEFAULT '60-90 mins',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Products Table
CREATE TABLE `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `category_id` INT NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `original_price` DECIMAL(10,2) NULL,
  `image_url` TEXT NULL,
  `badge` VARCHAR(50) NULL,
  `description` TEXT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Orders Table
CREATE TABLE `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_code` VARCHAR(20) NOT NULL UNIQUE,
  `customer_name` VARCHAR(150) NOT NULL,
  `customer_phone` VARCHAR(50) NOT NULL,
  `delivery_area` VARCHAR(100) NOT NULL,
  `delivery_address` TEXT NOT NULL,
  `notes` TEXT NULL,
  `subtotal` DECIMAL(10,2) NOT NULL,
  `delivery_fee` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `total_amount` DECIMAL(10,2) NOT NULL,
  `status` ENUM('pending', 'confirmed', 'baking', 'out_for_delivery', 'delivered', 'cancelled') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Order Items Table
CREATE TABLE `order_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `product_id` INT NULL,
  `product_name` VARCHAR(150) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `subtotal` DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- SEED DATA
-- ============================================================

-- Insert Categories
INSERT INTO `categories` (`id`, `slug`, `name`, `banner_url`, `sort_order`) VALUES
(1, 'combos', "Combo's", 'https://cakebites.pk/wp-content/uploads/2026/06/5f831c29-370c-4062-8ddb-7c8c29d40e18.png', 1),
(2, 'best', 'Best Selling', 'https://cakebites.pk/wp-content/uploads/2026/07/37911e05-62ce-4781-b7bc-0f9efda0b824.png', 2),
(3, 'cakes', 'Cakes', 'https://cakebites.pk/wp-content/uploads/2026/05/Cake-bites-catogery-banner-1.png', 3),
(4, 'cupcakes', 'Cupcakes', 'https://cakebites.pk/wp-content/uploads/2026/05/Cupcake-banner-1.png', 4),
(5, 'brownies', 'Brownies', 'https://cakebites.pk/wp-content/uploads/2026/05/Baronies-cake-1.png', 5),
(6, 'sundae', 'Sundae', 'https://cakebites.pk/wp-content/uploads/2026/05/sundae-cup-in-cake-bites.png', 6),
(7, 'bento', 'Bento Cake', 'https://cakebites.pk/wp-content/uploads/2026/05/Bento-cake-banner-for-cakbites.png', 7),
(8, 'custom', 'Customized Cakes', 'https://cakebites.pk/wp-content/uploads/2026/05/customized-cake-in-cakebites-banner.png', 8);

-- Insert Delivery Areas (Karachi)
INSERT INTO `delivery_areas` (`name`, `fee`, `time_estimate`) VALUES
('Gulshan-e-Iqbal', 250.00, '60-90 mins'),
('North Nazimabad', 250.00, '60-90 mins'),
('Shah Faisal', 250.00, '60-90 mins'),
('Clifton', 200.00, '45-60 mins'),
('DHA (Phases 1-8)', 200.00, '45-60 mins'),
('Boat Basin', 200.00, '45-60 mins'),
('Gulistan-e-Johar', 250.00, '60-90 mins'),
('PECHS / Tariq Road', 200.00, '45-60 mins'),
('Bahadurabad & Dhoraji', 200.00, '45-60 mins'),
('Federal B Area (F.B Area)', 250.00, '60-90 mins'),
('Saddar & Garden', 200.00, '45-60 mins'),
('Malir & Malir Cantt', 350.00, '90-120 mins'),
('Bahria Town Karachi', 500.00, 'Same Day (Slots)');

-- Insert Products
INSERT INTO `products` (`category_id`, `name`, `price`, `original_price`, `badge`, `sort_order`) VALUES
-- Combos
(1, 'Mango Bliss Combo', 6499.00, 8000.00, 'Hot Deal', 1),
(1, 'Golden Nutella Combo', 8999.00, 9999.00, 'Bestseller', 2),
(1, 'Milky Bloom Combo', 7999.00, 9999.00, 'Special Offer', 3),

-- Best Selling
(2, 'Double Fudge Cake', 1999.00, 2350.00, 'Top Rated', 1),
(2, 'Lotus Three Milk Cake', 2099.00, 2500.00, 'Trending', 2),
(2, 'Nutella Cake (Medium)', 2049.00, 2400.00, 'Popular', 3),
(2, 'Three Milk Mango Cake', 2199.00, 2600.00, 'Seasonal Special', 4),
(2, 'Dream Lava Cake', 2349.00, 2800.00, 'Chef Favorite', 5),
(2, 'Ferrero Rocher Chocolate Cake', 3500.00, 4000.00, 'Luxury', 6),

-- Cakes
(3, 'German Fudge Cake (Medium)', 1799.00, NULL, NULL, 1),
(3, 'Red Velvet Cake (Medium)', 2199.00, NULL, NULL, 2),
(3, 'Belgian Malt Cake (Medium)', 2099.00, NULL, NULL, 3),
(3, 'Chocolate Mousse Cake', 1699.00, NULL, NULL, 4),
(3, 'Milky Malt Cake', 1799.00, 2150.00, 'Special Price', 5),
(3, 'Coffee Cake', 1799.00, NULL, NULL, 6),
(3, 'Black Forest Cake', 1799.00, NULL, NULL, 7),
(3, 'Pineapple Cake', 1799.00, NULL, NULL, 8),

-- Cupcakes
(4, 'Ferrero Cup Cake', 249.00, NULL, NULL, 1),
(4, 'Belgian Chocolate Cup Cakes', 249.00, NULL, NULL, 2),
(4, 'M&M Cup Cake', 249.00, NULL, NULL, 3),
(4, 'Swiss Dark Cup Cake', 249.00, NULL, NULL, 4),
(4, 'Milky Chocolate Cup Cake', 249.00, NULL, NULL, 5),
(4, 'Nutella Chocolate Cup Cake', 249.00, NULL, NULL, 6),
(4, 'Red Velvet Cup Cake', 249.00, NULL, NULL, 7),
(4, 'Salted Caramel Cup Cake', 249.00, NULL, NULL, 8),

-- Brownies
(5, 'Nutella Brownie', 199.00, NULL, NULL, 1),
(5, 'Cadbury Brownie', 199.00, NULL, NULL, 2),
(5, 'Mars Chocolate Brownie', 199.00, NULL, NULL, 3),
(5, 'Belgian Malt Brownie', 199.00, NULL, NULL, 4),

-- Sundae
(6, 'Three Milk Sundae', 399.00, NULL, NULL, 1),
(6, 'Nutella Sundae', 399.00, NULL, NULL, 2),
(6, 'Galaxy Sundae', 399.00, NULL, NULL, 3),
(6, 'Red Velvet Sundae', 399.00, NULL, NULL, 4),

-- Bento Cake
(7, 'Vintage Aesthetic Bento Cake', 2999.00, NULL, 'Trending', 1),
(7, 'Pastel Ribbon Bento Cake', 2999.00, NULL, NULL, 2),
(7, 'Korean Floral Bento Cake', 2999.00, NULL, NULL, 3),
(7, 'Minimalist Birthday Bento Cake', 2999.00, NULL, NULL, 4),

-- Customized Cakes
(8, 'Custom Cup Cake Box (Medium)', 4800.00, NULL, NULL, 1),
(8, 'Artisanal Cream Cakes (Medium)', 7500.00, NULL, NULL, 2),
(8, 'Royal Chocolate Cakes (Medium)', 7500.00, NULL, NULL, 3),
(8, 'Grand Doll Cake (Medium)', 10500.00, NULL, 'Special', 4);

-- Insert a Sample Demonstration Order
INSERT INTO `orders` (`order_code`, `customer_name`, `customer_phone`, `delivery_area`, `delivery_address`, `notes`, `subtotal`, `delivery_fee`, `total_amount`, `status`) VALUES
('CB-1001', 'Hamza Khan', '+92 300 1234567', 'Clifton', 'Block 5, Ocean View Apartments, Flat 4B', 'Happy Birthday cake topper please', 4498.00, 200.00, 4698.00, 'confirmed');

INSERT INTO `order_items` (`order_id`, `product_id`, `product_name`, `price`, `quantity`, `subtotal`) VALUES
(1, 4, 'Lotus Three Milk Cake', 2099.00, 1, 2099.00),
(1, 8, 'Dream Lava Cake', 2349.00, 1, 2349.00),
(1, 19, 'Ferrero Cup Cake', 249.00, 2, 498.00);
