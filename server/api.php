<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = 'localhost';
$user = 'root';
$pass = '';
$db   = 'cakebite react';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}

$action = $_GET['action'] ?? 'health';

switch ($action) {
    case 'health':
        $catCount = $pdo->query("SELECT COUNT(*) FROM categories")->fetchColumn();
        $prodCount = $pdo->query("SELECT COUNT(*) FROM products WHERE is_active = 1")->fetchColumn();
        $orderCount = $pdo->query("SELECT COUNT(*) FROM orders")->fetchColumn();
        $areaCount = $pdo->query("SELECT COUNT(*) FROM delivery_areas WHERE is_active = 1")->fetchColumn();
        echo json_encode([
            'status' => 'connected',
            'database' => 'cakebite react',
            'counts' => [
                'categories' => (int)$catCount,
                'products' => (int)$prodCount,
                'orders' => (int)$orderCount,
                'areas' => (int)$areaCount
            ],
            'timestamp' => date('c')
        ]);
        break;

    case 'categories':
        $stmt = $pdo->query("SELECT * FROM categories ORDER BY sort_order ASC");
        echo json_encode($stmt->fetchAll());
        break;

    case 'areas':
        $stmt = $pdo->query("SELECT * FROM delivery_areas WHERE is_active = 1 ORDER BY id ASC");
        echo json_encode($stmt->fetchAll());
        break;

    case 'products':
        $stmt = $pdo->query("
            SELECT p.*, c.name as category_name, c.slug as category_slug 
            FROM products p 
            JOIN categories c ON p.category_id = c.id 
            WHERE p.is_active = 1 
            ORDER BY c.sort_order ASC, p.sort_order ASC
        ");
        echo json_encode($stmt->fetchAll());
        break;

    case 'sections':
        $categories = $pdo->query("SELECT * FROM categories ORDER BY sort_order ASC")->fetchAll();
        $products = $pdo->query("SELECT * FROM products WHERE is_active = 1 ORDER BY sort_order ASC")->fetchAll();

        $sections = [];
        foreach ($categories as $cat) {
            $catProds = [];
            foreach ($products as $p) {
                if ($p['category_id'] == $cat['id']) {
                    $item = [
                        $p['name'],
                        (float)$p['price'],
                        $p['original_price'] ? (float)$p['original_price'] : null,
                        $p['image_url'] ?? null,
                        $p['badge'] ?? null,
                        (int)$p['id']
                    ];
                    $catProds[] = $item;
                }
            }
            $sections[] = [
                'id' => $cat['slug'],
                'title' => $cat['name'],
                'banner' => $cat['banner_url'],
                'category' => $cat['name'],
                'products' => $catProds
            ];
        }
        echo json_encode($sections);
        break;

    case 'orders':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = json_decode(file_get_contents('php://input'), true);
            if (!$data || empty($data['customer_name']) || empty($data['customer_phone'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing customer name or phone']);
                exit();
            }

            $pdo->beginTransaction();
            try {
                $maxId = $pdo->query("SELECT COALESCE(MAX(id), 1000) FROM orders")->fetchColumn();
                $orderCode = 'CB-' . ($maxId + 1);

                $stmt = $pdo->prepare("
                    INSERT INTO orders 
                    (order_code, customer_name, customer_phone, delivery_area, delivery_address, notes, subtotal, delivery_fee, total_amount, status)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
                ");
                $stmt->execute([
                    $orderCode,
                    $data['customer_name'],
                    $data['customer_phone'],
                    $data['delivery_area'] ?? 'Karachi',
                    $data['delivery_address'] ?? 'Confirmed on call',
                    $data['notes'] ?? '',
                    $data['subtotal'] ?? 0,
                    $data['delivery_fee'] ?? 0,
                    $data['total_amount'] ?? 0
                ]);
                $orderId = $pdo->lastInsertId();

                if (!empty($data['items'])) {
                    $itemStmt = $pdo->prepare("
                        INSERT INTO order_items (order_id, product_name, price, quantity, subtotal)
                        VALUES (?, ?, ?, ?, ?)
                    ");
                    foreach ($data['items'] as $item) {
                        $qty = $item['qty'] ?? 1;
                        $price = $item['price'] ?? 0;
                        $itemStmt->execute([$orderId, $item['name'], $price, $qty, $price * $qty]);
                    }
                }

                $pdo->commit();
                echo json_encode([
                    'success' => true,
                    'message' => 'Order created successfully in cakebite react',
                    'order' => ['id' => $orderId, 'order_code' => $orderCode]
                ]);
            } catch (Exception $e) {
                $pdo->rollBack();
                http_response_code(500);
                echo json_encode(['error' => $e->getMessage()]);
            }
        } else {
            $orders = $pdo->query("SELECT * FROM orders ORDER BY id DESC LIMIT 50")->fetchAll();
            $items = $pdo->query("SELECT * FROM order_items")->fetchAll();
            foreach ($orders as &$order) {
                $order['items'] = array_values(array_filter($items, function($it) use ($order) {
                    return $it['order_id'] == $order['id'];
                }));
            }
            echo json_encode($orders);
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Unknown action']);
}
