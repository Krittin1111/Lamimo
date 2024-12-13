<?php

if($open_connec !=1){
  die(header('Location: process-login.php'));
}

// Configuration variables
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "lamimo";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
} 
echo "Connection complete"; 

// Close connection
mysqli_close($conn);
?>
