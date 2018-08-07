<?php 
// error_reporting(E_ALL);
// ini_set('display_errors', 1);
session_start();

if($_SESSION['role'] !== 'admin') {
  header("HTTP/1.1 401 Unauthorized");
  exit();
}
if(!isset($_GET['id'])) {
    echo json_encode(array());
    exit();
}

include '/etc/pawsToCare.config.php';
include '/etc/webuser.password.php';

$pdo = new PDO($databaseDsn, $databaseUser, $databasePassword, $databaseOpt);

$stmt = $pdo->prepare("
SELECT * 
FROM owners 
WHERE id IN 
(
    SELECT ownersFk 
    FROM catsOwners
    WHERE catsFk = :id
)
");
$stmt->execute(['id' => $_GET['id']]);
$result = $stmt->fetchAll();

header('Content-Type: application/json');
echo json_encode($result);

$pdo = null;
?>
