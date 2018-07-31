<?php 
include '/etc/pawsToCare.config.php';
include '/etc/webuser.password.php';

$pdo = new PDO($databaseDsn, $databaseUser, $databasePassword, $databaseOpt);

$orders = array('id', 'catsFk', 'vetName', 'date', 'note');
function addDescending($value) {
  return $value ." desc";
}
$orders = array_merge(array_map("addDescending",$orders),$orders);
$order = $orders[array_search($_GET['sort'],$orders)] ?: 'id';
$page = $_GET['page']?:1;
$page = $page - 1;
$limit = $_GET['limit']?:10;
$filter['catsFk'] = $_GET['cat'] ?: null;
$filter['vetName'] = $_GET['filter-vetName'] . "%" ?: "%";
$filter['date'] = $_GET['filter-date'] . "%" ?: "%";
$filter['note'] = $_GET['note'] . "%" ?: "%";


$stmt = $pdo->prepare("
SELECT * 
FROM catNotes 
WHERE 
catsFk = COALESCE(:filterCatsFk,catsFk)
AND vetName LIKE :filterVetName
AND date LIKE :filterDate
AND note LIKE :filterNote
ORDER BY $order 
LIMIT :page, :limit;
");
$stmt->execute([
'page' => $page*$limit, 
'limit' => $limit,
'filterCatsFk' => $filter['catsFk'],
'filterVetName' => $filter['vetName'],
'filterDate' => $filter['date'],
'filterNote' => $filter['note']
]);
$result = $stmt->fetchAll();

header('Content-Type: application/json');
echo json_encode($result);

$pdo = null;
?>