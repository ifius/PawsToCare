<?php 
include '/etc/pawsToCare.config.php';
include '/etc/webuser.password.php';

$pdo = new PDO($databaseDsn, $databaseUser, $databasePassword, $databaseOpt);

$orders = array('id', 'name', 'species', 'sex', 'neutered', 'birthdate');
function addDescending($value) {
  return $value ." desc";
}
$orders = array_merge(array_map("addDescending",$orders),$orders);
$order = $orders[array_search($_GET['sort'],$orders)] ?: 'id';
$page = $_GET['page']?:1;
$page = $page - 1;
$limit = $_GET['limit']?:10;

$filter['name'] = $_GET['filter-name'] . "%" ?: "%";
$filter['species'] = $_GET['filter-species'] . "%" ?: "%";
$filter['sex'] = $_GET['filter-sex'] . "%" ?: "%";
$filter['neutered'] = $_GET['filter-neutered'] . "%" ?: "%";
$filter['birthdate'] = $_GET['filter-birthdate'] . "%" ?: "%";

$stmt = $pdo->prepare("
SELECT id, name, species, sex, neutered,
FLOOR(DATEDIFF(NOW(),birthdate)/365) AS age
FROM exotics 
WHERE 
name LIKE :filterName
AND species LIKE :filterSpecies
AND sex LIKE :filterSex
AND neutered LIKE :filterNeutered
AND birthdate LIKE :filterBirthdate
ORDER BY $order 
LIMIT :page, :limit;
");
$stmt->execute([
'page' => $page*$limit, 
'limit' => $limit,
'filterName' => $filter['name'],
'filterSpecies' => $filter['species'],
'filterSex' => $filter['sex'],
'filterNeutered' => $filter['neutered'],
'filterBirthdate' => $filter['birthdate']
]);
$result = $stmt->fetchAll();

$count = $pdo->prepare("
SELECT count(*) AS totalCount 
FROM exotics 
WHERE 
name LIKE :filterName
AND species LIKE :filterSpecies
AND sex LIKE :filterSex
AND neutered LIKE :filterNeutered
AND birthdate LIKE :filterBirthdate
");
$count->execute([
'filterName' => $filter['name'],
'filterSpecies' => $filter['species'],
'filterSex' => $filter['sex'],
'filterNeutered' => $filter['neutered'],
'filterBirthdate' => $filter['birthdate']
]);
$countResult = $count->fetch();


header('Content-Type: application/json');
echo json_encode(array($result,$countResult));

$pdo = null;
?>
