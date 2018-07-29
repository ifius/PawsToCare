<?php

$databaseHost    = 'localhost';
$database        = 'pawsToCare';
$databaseUser    = 'webuser';
$databaseCharset = 'utf8mb4';

$databaseDsn = "mysql:host=$databaseHost;dbname=$database;charset=$databaseCharset";
$databaseOpt = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];
?>
