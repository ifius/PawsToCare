<?php 
session_start();

$result['role'] = $_SESSION['role'];
$result['user'] = $_SESSION['user'];

header('Content-Type: application/json');
echo json_encode($result);

?>
