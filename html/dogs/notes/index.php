<?php 
// error_reporting(E_ALL);
// ini_set('display_errors', 1);
session_start();

if(!isset($_SESSION['role'])) {
  header("HTTP/1.1 401 Unauthorized");
  exit();
}

$rowFilter = "JOIN dogsOwners ON dogsOwners.dogsFk = dogNotes.dogsFk AND 2 = 1";

if($_SESSION['role'] === 'admin') $rowFilter = "JOIN dogsOwners ON dogsOwners.dogsFk = dogNotes.dogsFk AND 1 = 1";
else if(isset($_SESSION['user'])) $rowFilter = ("JOIN dogsOwners ON dogsOwners.dogsFk = dogNotes.dogsFk AND dogsOwners.ownersFk = " . $_SESSION['user']);

include '/etc/pawsToCare.config.php';
include '/etc/webuser.password.php';

$pdo = new PDO($databaseDsn, $databaseUser, $databasePassword, $databaseOpt);

$orders = array('id', 'dogsFk', 'vetName', 'date', 'note');
function addDescending($value) {
  return $value ." desc";
}
$orders = array_merge(array_map("addDescending",$orders),$orders);
$order = $orders[array_search($_GET['sort'],$orders)] ?: 'id';
$page = $_GET['page']?:1;
$page = $page - 1;
$limit = $_GET['limit']?:10;
$filter['dogsFk'] = $_GET['dog'] ?: null;
$filter['vetName'] = $_GET['filter-vetName'] . "%" ?: "%";
$filter['date'] = $_GET['filter-date'] . "%" ?: "%";
$filter['note'] = $_GET['note'] . "%" ?: "%";


$stmt = $pdo->prepare("
SELECT dogNotes.* 
FROM dogNotes 
$rowFilter
WHERE 
dogNotes.dogsFk = COALESCE(:filterDogsFk,dogNotes.dogsFk)
AND vetName LIKE :filterVetName
AND date LIKE :filterDate
AND note LIKE :filterNote
ORDER BY $order 
LIMIT :page, :limit;
");
$stmt->execute([
'page' => $page*$limit, 
'limit' => $limit,
'filterDogsFk' => $filter['dogsFk'],
'filterVetName' => $filter['vetName'],
'filterDate' => $filter['date'],
'filterNote' => $filter['note']
]);
$result = $stmt->fetchAll();

header('Content-Type: application/json');
echo json_encode($result);

$pdo = null;
?>
