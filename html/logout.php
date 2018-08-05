<?php

session_start(); 
if(isset($_SESSION['user'])) unset($_SESSION['user']);
if(isset($_SESSION['role'])) unset($_SESSION['role']);
header( 'Location: index.php' );
exit();

?>