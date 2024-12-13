<?php 
session_start();
include('connect.php');

// ตรวจสอบว่าผู้ใช้กด submit หรือไม่
if(isset($_POST['submit'])) {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $errors = array();

    // ตรวจสอบว่ากรอกข้อมูลครบถ้วน
    if(empty($email)) {
        $errors[] = "Enter email address";
    }
    if(empty($password)) {
        $errors[] = "Enter password";
    }

    if(empty($errors)) {
        // ใช้ Prepared Statements ป้องกัน SQL Injection
        $stmt = $conn->prepare("SELECT * FROM customer WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if($result->num_rows === 1) {
            $user = $result->fetch_assoc();

            // ตรวจสอบรหัสผ่าน
            if(password_verify($password, $user['password'])) {
                $_SESSION['email'] = $user['email'];
                $_SESSION['success'] = "You are now logged in";
                header("Location: home.php");
                exit();
            } else {
                $_SESSION['error'] = "Invalid email or password!";
            }
        } else {
            $_SESSION['error'] = "Invalid email or password!";
        }
        $stmt->close();
    }
    
    // หากมีข้อผิดพลาด ให้เก็บใน session และ redirect ไป login.html
    if(!empty($errors)) {
        $_SESSION['errors'] = $errors;
        header("Location: login.html");
        exit();
    }
}
?>
