<?php 
session_start();

if(!isset($_SESSION['role'])) {
  header("HTTP/1.1 401 Unauthorized");
  exit();
}

$rowFilter = "AND 2 = 1";
if($_SESSION['role'] === 'admin') $rowFilter = "AND 1 = 1";
else if(isset($_SESSION['user'])) $rowFilter = ("AND id IN (SELECT dogsFk FROM dogsOwners WHERE ownersFk = " . $_SESSION['user'] . ")");

include '/etc/pawsToCare.config.php';
include '/etc/webuser.password.php';

$pdo = new PDO($databaseDsn, $databaseUser, $databasePassword, $databaseOpt);

$orders = array('id', 'name', 'breed', 'sex', 'shots', 'licensed', 'neutered', 'birthdate', 'weight');
function addDescending($value) {
  return $value ." desc";
}
$orders = array_merge(array_map("addDescending",$orders),$orders);
$order = array_search($_GET['sort'],$orders) ? $_GET['sort'] : 'name';

$page = $_GET['page']?:1;
$page = $page - 1;
$limit = $_GET['limit']?:10;

$filter['name'] = $_GET['filter-name'] . "%" ?: "%";
$filter['breed'] = $_GET['filter-breed'] . "%" ?: "%";
$filter['sex'] = $_GET['filter-sex'] . "%" ?: "%";
$filter['shots'] = $_GET['filter-shots'] . "%" ?: "%";
$filter['licensed'] = $_GET['filter-licensed'] . "%" ?: "%";
$filter['neutered'] = $_GET['filter-neutered'] . "%" ?: "%";
$filter['birthdate'] = $_GET['filter-birthdate'] . "%" ?: "%";
$filter['weight-start'] = $_GET['filter-weight-start'] ?: 0;
$filter['weight-end'] = $_GET['filter-weight-end'] ?: 1000;


$stmt = $pdo->prepare("
SELECT dogs.id, name, breed, sex, shots, licensed, neutered, 
FLOOR(DATEDIFF(NOW(),birthdate)/365) AS age,
weight,
(SELECT COUNT(*) FROM dogsOwners WHERE dogsFk = dogs.id) AS ownersCount,
(SELECT COUNT(*) FROM dogNotes WHERE dogsFK = dogs.id) AS notesCount
FROM dogs 
WHERE 
name LIKE :filterName
AND breed LIKE :filterBreed
AND sex LIKE :filterSex
AND shots LIKE :filterShots
AND licensed LIKE :filterLicensed
AND neutered LIKE :filterNeutered
AND birthdate LIKE :filterBirthdate
AND weight BETWEEN :filterWeightStart AND :filterWeightEnd
$rowFilter
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
'filterLicensed' => $filter['licensed'],
'filterNeutered' => $filter['neutered'],
'filterBirthdate' => $filter['birthdate'],
'filterWeightStart' => $filter['weight-start'],
'filterWeightEnd' => $filter['weight-end']
]);
$result = $stmt->fetchAll();

$count = $pdo->prepare("
SELECT count(*) AS totalCount 
FROM dogs 
WHERE 
name LIKE :filterName
AND breed LIKE :filterBreed
AND sex LIKE :filterSex
AND shots LIKE :filterShots
AND licensed LIKE :filterLicensed
AND neutered LIKE :filterNeutered
AND birthdate LIKE :filterBirthdate
AND weight BETWEEN :filterWeightStart AND :filterWeightEnd
$rowFilter
");
$count->execute([
'filterName' => $filter['name'],
'filterBreed' => $filter['breed'],
'filterSex' => $filter['sex'],
'filterShots' => $filter['shots'],
'filterLicensed' => $filter['licensed'],
'filterNeutered' => $filter['neutered'],
'filterBirthdate' => $filter['birthdate'],
'filterWeightStart' => $filter['weight-start'],
'filterWeightEnd' => $filter['weight-end']
]);
$countResult = $count->fetch();

header('Content-Type: application/json');
echo json_encode(array($result,$countResult));

$pdo = null;
?>
