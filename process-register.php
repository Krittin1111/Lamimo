<?php

$open_connect = 1;

// ตั้งค่าการเชื่อมต่อฐานข้อมูล
$dbHost = "localhost";
$dbUser = "root";
$dbPassword = "";
$dbName = "lamimo";

try {
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8", $dbUser, $dbPassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

// ตรวจสอบว่าคำขอเป็น POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // รับข้อมูลจากฟอร์ม
    $firstName = $_POST['firstname']; // ชื่อตรงกับ name="firstname" ในฟอร์ม
    $lastName = $_POST['lastname'];
    $phoneNumber = $_POST['phonenumber'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $gender = $_POST['gender'];
    $day = $_POST['day'];
    $month = $_POST['month'];
    $year = $_POST['year'];
    $birthDate = "$year-$month-$day"; // แปลงวันเกิดเป็นรูปแบบ YYYY-MM-DD

    // ตรวจสอบว่าอีเมลไม่ซ้ำในฐานข้อมูล
    $stmt = $pdo->prepare("SELECT * FROM customer WHERE email = :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        die("This email is already registered.");
    }

    // แฮชรหัสผ่าน
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // บันทึกข้อมูลลงในฐานข้อมูล
    $stmt = $pdo->prepare("INSERT INTO customer (first_name, last_name, phone_number, email, password, gender, birth_date) 
                                    VALUES (:first_name, :last_name, :phone_number, :email, :password, :gender, :birth_date)");
    $stmt->bindParam(':first_name', $firstName);
    $stmt->bindParam(':last_name', $lastName);
    $stmt->bindParam(':phone_number', $phoneNumber);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $hashedPassword);
    $stmt->bindParam(':gender', $gender);
    $stmt->bindParam(':birth_date', $birthDate);

    if ($stmt->execute()) {
        echo "Registration successful!";
        header("Location: Login.html"); // เปลี่ยนเส้นทางไปยังหน้าสำเร็จ
        exit();
    } else {
        echo "Failed to register. Please try again.";
    }
} else {
    echo "Invalid request.";
}
?>
