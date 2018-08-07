<?php 
//error_reporting(E_ALL);
//ini_set('display_errors', 1);
session_start();

if(!isset($_SESSION['role'])) {
  header("HTTP/1.1 401 Unauthorized");
  exit();
}

$rowFilter = "AND 2 = 1";
if($_SESSION['role'] === 'admin') $rowFilter = "AND 1 = 1";
else if(isset($_SESSION['user'])) $rowFilter = ("AND id IN (SELECT catsFk FROM catsOwners WHERE ownersFk = " . $_SESSION['user'] .")");

include '/etc/pawsToCare.config.php';
include '/etc/webuser.password.php';

$pdo = new PDO($databaseDsn, $databaseUser, $databasePassword, $databaseOpt);

$orders = array('id', 'name', 'breed', 'sex', 'shots', 'declawed', 'neutered', 'birthdate');
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
$filter['declawed'] = $_GET['filter-declawed'] . "%" ?: "%";
$filter['neutered'] = $_GET['filter-neutered'] . "%" ?: "%";
$filter['birthdate'] = $_GET['filter-birthdate'] . "%" ?: "%";


$stmt = $pdo->prepare("
SELECT cats.id, name, breed, sex, shots, declawed, neutered,
FLOOR(DATEDIFF(NOW(),birthdate)/365) AS age,
(SELECT COUNT(*) FROM catsOwners WHERE catsFk = cats.id) AS ownersCount,
(SELECT COUNT(*) FROM catNotes WHERE catsFk = cats.id) AS notesCount
FROM cats 
WHERE 
name LIKE :filterName
AND breed LIKE :filterBreed
AND sex LIKE :filterSex
AND shots LIKE :filterShots
AND declawed LIKE :filterDeclawed
AND neutered LIKE :filterNeutered
AND birthdate LIKE :filterBirthdate
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
$rowFilter
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
