<?php 
session_start();

if($_SESSION['role'] !== 'admin') {
  header("HTTP/1.1 401 Unauthorized");
  exit();
}

include '/etc/pawsToCare.config.php';
include '/etc/webuser.password.php';

$pdo = new PDO($databaseDsn, $databaseUser, $databasePassword, $databaseOpt);

$orders = array('id', 'ownersFk', 'vetName', 'date', 'note');
function addDescending($value) {
  return $value ." desc";
}
$orders = array_merge(array_map("addDescending",$orders),$orders);
$order = array_search($_GET['sort'],$orders) ? $_GET['sort'] : 'date desc';

$page = $_GET['page']?:1;
$page = $page - 1;
$limit = $_GET['limit']?:10;
$filter['ownersFk'] = $_GET['owner'] ?: null;
$filter['vetName'] = $_GET['filter-vetName'] . "%" ?: "%";
$filter['date'] = $_GET['filter-date'] . "%" ?: "%";
$filter['note'] = $_GET['note'] . "%" ?: "%";


$stmt = $pdo->prepare("
SELECT * 
FROM ownerNotes 
WHERE 
ownersFk = COALESCE(:filterOwnersFk,ownersFk)
AND vetName LIKE :filterVetName
AND date LIKE :filterDate
AND note LIKE :filterNote
ORDER BY $order 
LIMIT :page, :limit;
");
$stmt->execute([
'page' => $page*$limit, 
'limit' => $limit,
'filterOwnersFk' => $filter['ownersFk'],
'filterVetName' => $filter['vetName'],
'filterDate' => $filter['date'],
'filterNote' => $filter['note']
]);
$result = $stmt->fetchAll();

header('Content-Type: application/json');
echo json_encode($result);

$pdo = null;
?>
