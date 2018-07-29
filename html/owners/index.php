<?php 
include '/etc/pawsToCare.config.php';
include '/etc/webuser.password.php';

$pdo = new PDO($databaseDsn, $databaseUser, $databasePassword, $databaseOpt);

$orders = array('id', 'fname', 'lname', 'add1', 'add2', 'city', 'st', 'zip');
function addDescending($value) {
  return $value ." desc";
}
$orders = array_merge(array_map("addDescending",$orders),$orders);
$order = $orders[array_search($_GET['sort'],$orders)] ?: 'id';
$page = $_GET['page']?:1;
$page = $page - 1;
$limit = $_GET['limit']?:10;

$filter['fname'] = $_GET['filter-fname'] . "%" ?: "%";
$filter['lname'] = $_GET['filter-lname'] . "%" ?: "%";
$filter['add1'] = $_GET['filter-add1'] . "%" ?: "%";
$filter['add2'] = $_GET['filter-add2'] . "%" ?: "%";
$filter['city'] = $_GET['filter-city'] . "%" ?: "%";
$filter['st'] = $_GET['filter-st'] . "%" ?: "%";
$filter['zip'] = $_GET['filter-zip'] . "%" ?: "%";


$stmt = $pdo->prepare("
SELECT * FROM owners WHERE 
fname LIKE :filterFname
AND lname LIKE :filterLname
AND add1 LIKE :filterAdd1
AND IFNULL(add2,1) LIKE :filterAdd2
AND city LIKE :filterCity
AND st LIKE :filterSt
AND zip LIKE :filterZip 
ORDER BY $order LIMIT :page, :limit;
");


$stmt->execute(['page' => $page*$limit, 'limit' => $limit, 
'filterFname' => $filter['fname'],
'filterLname' => $filter['lname'],
'filterAdd1' => $filter['add1'],
'filterAdd2' => $filter['add2'],
'filterCity' => $filter['city'],
'filterSt' => $filter['st'],
'filterZip' => $filter['zip']
]);
$result = $stmt->fetchAll();

header('Content-Type: application/json');
echo json_encode($result);

$pdo = null;
?>
