<?php 
include '/etc/pawsToCare.config.php';
include '/etc/webuser.password.php';

$pdo = new PDO($databaseDsn, $databaseUser, $databasePassword, $databaseOpt);
  session_start(); 
  if(isset($_SESSION['user'])) unset($_SESSION['user']);
  if(isset($_SESSION['role'])) unset($_SESSION['role']);
  if($_SERVER['REQUEST_METHOD'] !== "POST") {
    header("HTTP/1.1 405 Method Not Allowed");
    exit();
  }

  $username = $_POST["username"];
  $password = $_POST["password"];
  $username = trim($username);
  $password = trim($password);

  $stmt = $pdo->prepare("
    SELECT id, username, password, ownersFk 
    FROM users
    WHERE username = :username
  ");
  $stmt->execute(['username' => $username]);
  $result = $stmt->fetch();

  $verified = password_verify($password, $result["password"]);
  if(!$verified)
  {
    header("HTTP/1.1 401 Unauthorized");
    exit();
  }
  if($result['id'] == -1 ) {
	$_SESSION['role'] = 'admin';
  	$_SESSION['user'] = 'admin';
  }
  else {
	$_SESSION['role'] = 'owner';
	$_SESSION['user'] = $result['ownersFk'];
  }
  header('Content-Type: application/json');
  
  $response['id'] = $_SESSION['user'];
  $response['username'] = $result['username'];
  $response['role'] = $_SESSION['role'];

  echo json_encode($response);
$pdo = null;
?>
