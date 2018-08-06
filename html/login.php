<?php
session_start();

if(isset($_SESSION['role'])) {
  header( 'Location: index.php' );
  exit();
}
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
    <title>Paws to Care</title>
</head>

<body class="text-left">
    <div class="container col-10">
    <?php 
        $currentNavPage = "Login";
        include "navigation.php"; 
    ?>   
       <div id="login" class="bg-dark p-5">
                            <h3 class="text-left text-light">Login</h3>
                            <div class="form-group w-50">
                                <label for="username" class="text-light">Username:</label><br>
                                <input type="text" name="username" id="username" class="form-control">
                            </div>
                            <div class="form-group w-50">
                                <label for="password" class="text-light">Password:</label><br>
                                <input type="password" name="password" id="password" class="form-control">
                            </div>
                            <div class="form-group">
                                <button id="login" class="btn btn-primary btn-md">Login</button>
                            </div>
    </div>
   <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js" integrity="sha384-o+RDsa0aLu++PJvFqy8fFScvbHFLtbvScb8AjopnFD+iEQ7wo/CG0xlczd+2O/em"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ramda/0.25.0/ramda.min.js" integrity="sha256-YN22NHB7zs5+LjcHWgk3zL0s+CRnzCQzDOFnndmUamY="
        crossorigin="anonymous"></script>
    <script src="js/login.js"></script>
</body>

</html>