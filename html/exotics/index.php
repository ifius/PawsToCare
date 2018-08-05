<?php 
session_start();

if(!isset($_SESSION['role'])) {
  header("HTTP/1.1 401 Unauthorized");
  exit();
}

$rowFilter = "JOIN exoticsOwners ON exoticsOwners.exoticsFk = exotics.id AND 2 = 1";

if($_SESSION['role'] === 'admin') $rowFilter = "JOIN exoticsOwners ON exoticsOwners.exoticsFk = exotics.id AND 1 = 1";
else if(isset($_SESSION['user'])) $rowFilter = ("JOIN exoticsOwners ON exoticsOwners.exoticsFk = exotics.id AND exoticsOwners.ownersFk = " . $_SESSION['user']);

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
SELECT exotics.id, name, species, sex, neutered,
FLOOR(DATEDIFF(NOW(),birthdate)/365) AS age,
(SELECT COUNT(*) FROM exoticsOwners WHERE exoticsFk = exotics.id) AS ownersCount,
(SELECT COUNT(*) FROM exoticNotes WHERE exoticsFk = exotics.id) AS notesCount
FROM exotics 
$rowFilter
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
$rowFilter
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
