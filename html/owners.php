<?php 
// error_reporting(E_ALL);
// ini_set('display_errors', 1);
session_start();

if($_SESSION['role'] !== 'admin') {
    header( 'Location: index.php' );
    exit();
}

include '/etc/pawsToCare.config.php';
include '/etc/webuser.password.php';

$pdo = new PDO($databaseDsn, $databaseUser, $databasePassword, $databaseOpt);

$orders = array('id', 'fname', 'lname', 'add1', 'add2', 'city', 'st', 'zip');
function addDescending($value) {
  return $value ." desc";
}
$orders = array_merge(array_map("addDescending",$orders),$orders);
$order = array_search($_GET['sort'],$orders) ? $_GET['sort'] : 'lname';
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

$count = $pdo->prepare("
SELECT count(*) AS 'rows'
FROM owners WHERE 
fname LIKE :filterFname
AND lname LIKE :filterLname
AND add1 LIKE :filterAdd1
AND IFNULL(add2,1) LIKE :filterAdd2
AND city LIKE :filterCity
AND st LIKE :filterSt
AND zip LIKE :filterZip;
");

$count->execute([ 
'filterFname' => $filter['fname'],
'filterLname' => $filter['lname'],
'filterAdd1' => $filter['add1'],
'filterAdd2' => $filter['add2'],
'filterCity' => $filter['city'],
'filterSt' => $filter['st'],
'filterZip' => $filter['zip']
]);

$totalCount = $count->fetch();

function sortLink($column) {
    $param = $_GET;
    if($param['sort'] === $column)  $param['sort'] .= " desc";
    else $param['sort'] = $column;
    $param['page'] = 1;
    return http_build_query($param);
}

function pageLink($numPages, $relative) {
    $param = $_GET;
    if(!isset($param['page'])) $param['page'] = 1;
    if($relative) $param['page'] += $numPages;
    else $param['page'] = $numPages;
    if($param['page'] < 1) return "";
    return http_build_query($param);
}

function showArrow($column) {
    $arrow = null;
    if($_GET['sort'] === $column) $arrow = '▲';
    if(preg_match("/^$column/", $_GET['sort']) === 1 && preg_match('/desc$/', $_GET['sort']) == 1 ) $arrow = "▼";
    if($arrow) return "<span class=\"d-inline float-right\">$arrow</span>";
}

$petsStmt = $pdo->prepare("
WITH pets(id, petType, name, sex, petSubType, birthdate) AS 
(
SELECT catsOwners.ownersFk, 'Cat', cats.name, cats.sex, cats.breed, cats.birthdate 
FROM cats JOIN catsOwners ON catsOwners.catsFk = cats.id
UNION ALL
SELECT dogsOwners.ownersFk, 'Dog', dogs.name, dogs.sex, dogs.breed, dogs.birthdate
FROM dogs JOIN dogsOwners ON dogsOwners.dogsFk = dogs.id
UNION ALL
SELECT exoticsOwners.ownersFk, 'Exotic', exotics.name, exotics.sex, exotics.species, exotics.birthdate
FROM exotics JOIN exoticsOwners ON exoticsOwners.exoticsFk = exotics.id
)

SELECT * FROM pets 
JOIN
(
    SELECT id FROM owners
    WHERE
    fname LIKE :filterFname
    AND lname LIKE :filterLname
    AND add1 LIKE :filterAdd1
    AND IFNULL(add2,1) LIKE :filterAdd2
    AND city LIKE :filterCity
    AND st LIKE :filterSt
    AND zip LIKE :filterZip 
    ORDER BY $order LIMIT :page, :limit
) owners ON owners.id = pets.id;
");


$petsStmt->execute(['page' => $page*$limit, 'limit' => $limit, 
'filterFname' => $filter['fname'],
'filterLname' => $filter['lname'],
'filterAdd1' => $filter['add1'],
'filterAdd2' => $filter['add2'],
'filterCity' => $filter['city'],
'filterSt' => $filter['st'],
'filterZip' => $filter['zip']
]);
$petResult = $petsStmt->fetchAll();

$pdo = null;
?>
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css" integrity="sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B"
        crossorigin="anonymous">
    <style>
        .clickable {
            cursor: pointer;
        }
    </style>
    <style>
 table { table-layout: fixed; }
 table th, table td { 
     overflow: hidden; 
     white-space: nowrap;  
    text-overflow: ellipsis;
}
</style>
    <title>Paws to Care</title>
</head>

<body class="text-left">
    <div class="container col-10">
    <table class="table table-striped table-bordered table-dark">
    <thead><tr>
    <?php 
        $currentNavPage = "Owners";
        include "navigation.php"; 
            echo "<td><a href=\"owners.php?" . sortLink("lname") . "\">Last Name" . showArrow("lname") . "</a></td>";
            echo "<td><a href=\"owners.php?" . sortLink("fname") . "\">First Name" . showArrow("fname") . "</a></td>";
            echo "<td><a href=\"owners.php?" . sortLink("add1") . "\">Address 1" . showArrow("add1") . "</a></td>";
            echo "<td><a href=\"owners.php?" . sortLink("add2") . "\">Address 2" . showArrow("add2") . "</a></td>";
            echo "<td><a href=\"owners.php?" . sortLink("city") . "\">City" . showArrow("city") . "</a></td>";
            echo "<td><a href=\"owners.php?" . sortLink("st") . "\">State" . showArrow("st") . "</a></td>";
            echo "<td><a href=\"owners.php?" . sortLink("zip") . "\">Zip" . showArrow("zip") . "</a></td>";
        echo "<td></td>";
        ?>
        </tr>
        <tr>
            <form method="GET" action="owners.php">
            <td><input type="text" class="form-control" name="filter-lname" placeHolder="Filter" value="<?php echo $_GET['filter-lname']; ?>"></td>
            <td><input type="text" class="form-control" name="filter-fname" placeHolder="Filter"  value="<?php echo $_GET['filter-fname']; ?>"></td>
            <td><input type="text" class="form-control" name="filter-add1" placeHolder="Filter"  value="<?php echo $_GET['filter-add1']; ?>"></td>
            <td><input type="text" class="form-control" name="filter-add2" placeHolder="Filter"  value="<?php echo $_GET['filter-add2']; ?>"></td>
            <td><input type="text" class="form-control" name="filter-city" placeHolder="Filter"  value="<?php echo $_GET['filter-city']; ?>"></td>
            <td><input type="text" class="form-control" name="filter-st" placeHolder="Filter"  value="<?php echo $_GET['filter-st']; ?>"></td>
            <td><input type="text" class="form-control" name="filter-zip" placeHolder="Filter"  value="<?php echo $_GET['filter-zip']; ?>"></td>
            <td>
            <button type="submit" class="btn">Filter Results</button>
            <input type="hidden" name="sort" value="<?php $_GET['sort'] ?>">
            <input type="hidden" name="page" value="<?php $_GET['page'] ?>">
            </td>
            </form>
        </tr>
        </thead>
        <tbody>
        <?php       
        foreach($result as $row) {
            echo "<tr>";
            echo "<td>" . $row['lname'] . "</td>";
            echo "<td>" . $row['fname'] . "</td>";
            echo "<td>" . $row['add1'] . "</td>";
            echo "<td>" . $row['add2'] . "</td>";
            echo "<td>" . $row['city'] . "</td>";
            echo "<td>" . $row['st'] . "</td>";
            echo "<td>" . $row['zip'] . "</td>";
            echo '<td><button class="btn" id="pets_' . $row['id'] . '" data-toggle="modal" data-target="#ownerModal-' . $row['id'] . '">Pets</button>';
            echo "</tr>";
        }
    ?>
    </tbody> 
    </table>
    <nav aria-label="Owners page navigation">
    <ul class="pagination pagination-dark">
    <?php
    if($totalCount['rows'] > 10) {
        $disabled = $page === 0 ? " disabled" : "";
        echo '<li class="page-item' .$disabled . '"><a class="page-link" href="owners.php?' . pageLink(-1, true) . '">Prev</a></li>';
        echo '<li class="page-item' .$disabled . '"><a class="page-link" href="owners.php?' . pageLink(1, false) . '">First</a></li>';
        for($p = ($page-10)*$limit <= 0 ? $limit : ($page-10) * $limit; $p <= round($totalCount['rows']/$limit)*$limit && $p <= ($page+10)*$limit; $p+=$limit) {
            $active = ($p/$limit) === ($page+1) ? " active" : "";
            echo '<li class="page-item' . $active . '"><a class="page-link" href="owners.php?' . pageLink($p/$limit, false) . '">' . $p/$limit . '</a></li>';
        }
        $disabled = $page == round($totalCount['rows']/$limit) - 1 ? " disabled" : "";
        echo '<li class="page-item' .$disabled . '"><a class="page-link" href="owners.php?' . pageLink(round($totalCount['rows']/$limit), false) . '">Last</a></li>';
        echo '<li class="page-item' . $disabled .'"><a class="page-link" href="owners.php?' . pageLink(1, true) . '">Next</a></li>';
        echo "</ul></nav>";
        echo "Showing <span class=\"badge badge-pill badge-secondary\">" . (($page * $limit) + 1) . "-" . ($page+1) * $limit . "</span> of ";
    } else { echo "Showing <span class=\"badge badge-pill badge-secondary\">" . $totalCount['rows'] . "</span> of "; }
        echo "<span class=\"badge badge-secondary\">" . $totalCount['rows'] . "</span><br>"; 

        //print_r($petResult);
    
        foreach($result as $row) {
        ?>

       <div class="modal fade" id="ownerModal-<?php echo $row['id']; ?>" tabindex="-1" role="dialog" 
       aria-labelledby="petsModalLabel-<?php echo $row['id']; ?>" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="petsModal-<?php echo $row['id']; echo '">' . $row['fname'] . ' ' . $row['lname']; ?> Pets</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <table class="table table-striped table-bordered table-dark">
                    <?php 
                        foreach($petResult as $pet) {
                            if($pet['id'] === $row['id']) {
                                echo "<tr>"; 
                                echo "<td>" . $pet['petType'] . "</td>";
                                echo "<td>" . $pet['petSubType'] . "</td>";
                                echo "<td>" . $pet['name'] . "</td>";
                                echo "<td>" . $pet['sex' ] . "</td>";
                                echo "<td>" . $pet['birthdate'] . "</td>";
                                echo "</tr>";
                            }
                        }
                    ?>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <?php } ?>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js" integrity="sha384-o+RDsa0aLu++PJvFqy8fFScvbHFLtbvScb8AjopnFD+iEQ7wo/CG0xlczd+2O/em"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ramda/0.25.0/ramda.min.js" integrity="sha256-YN22NHB7zs5+LjcHWgk3zL0s+CRnzCQzDOFnndmUamY="
        crossorigin="anonymous"></script>
</body>

</html>
