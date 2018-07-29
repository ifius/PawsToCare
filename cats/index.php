<?php 
include '/etc/pawsToCare.config.php';
include '/etc/webuser.password.php';

$pdo = new PDO($databaseDsn, $databaseUser, $databasePassword, $databaseOpt);

$orders = array('id', 'name', 'breed', 'sex', 'shots', 'declawed', 'neutered', 'birthdate');
function addDescending($value) {
  return $value ." desc";
}
$orders = array_merge(array_map("addDescending",$orders),$orders);
$order = $orders[array_search($_GET['sort'],$orders)] ?: 'id';
$page = $_GET['page']?:1;
$page = $page - 1;
$limit = $_GET['limit']?:10;
$filter['name'] = $_GET['filter-name'] . "%" ?: "%";
$filter['breed'] = $_GET['filter-breed'] . "%" ?: "%";
$filter['sex'] = $_GET['filter-sex'] . "%" ?: "%";
$filter['shots'] = $_GET['filter-shots'] . "%" ?: "%";
$filter['declawed'] = $_GET['filter-declawed'] . "%" ?: "%";
$filter['neutered'] = $_GET['filter-neutered'] . "%" ?: "%";
$filter['birthdate'] = $_GET['filter-birthdate'] . "%" ?: "%";


$stmt = $pdo->prepare("
SELECT * 
FROM cats 
WHERE 
name LIKE :filterName
AND breed LIKE :filterBreed
AND sex LIKE :filterSex
AND shots LIKE :filterShots
AND declawed LIKE :filterDeclawed
AND neutered LIKE :filterNeutered
AND birthdate LIKE :filterBirthdate
ORDER BY $order 
LIMIT :page, :limit;
");
$stmt->execute([
'page' => $page*$limit, 
'limit' => $limit,
'filterName' => $filter['name'],
'filterBreed' => $filter['breed'],
'filterSex' => $filter['sex'],
'filterShots' => $filter['shots'],
'filterDeclawed' => $filter['declawed'],
'filterNeutered' => $filter['neutered'],
'filterBirthdate' => $filter['birthdate']
]);
$result = $stmt->fetchAll();

$count = $pdo->prepare("
SELECT count(*) AS totalCount
FROM cats 
WHERE 
name LIKE :filterName
AND breed LIKE :filterBreed
AND sex LIKE :filterSex
AND shots LIKE :filterShots
AND declawed LIKE :filterDeclawed
AND neutered LIKE :filterNeutered
AND birthdate LIKE :filterBirthdate
");
$count->execute([
'filterName' => $filter['name'],
'filterBreed' => $filter['breed'],
'filterSex' => $filter['sex'],
'filterShots' => $filter['shots'],
'filterDeclawed' => $filter['declawed'],
'filterNeutered' => $filter['neutered'],
'filterBirthdate' => $filter['birthdate']
]);
$countResult = $count->fetch();


header('Content-Type: application/json');
echo json_encode(array($result,$countResult));

$pdo = null;
?>
