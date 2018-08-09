<?php
session_start();

if($_SESSION['role']!=='admin') {
  header( 'Location: /' );
  exit();
}
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Paws To Care - Jasmine Tests</title>

  <link rel="shortcut icon" type="image/png" href="lib/jasmine-3.1.0/jasmine_favicon.png">
  <link rel="stylesheet" href="lib/jasmine-3.1.0/jasmine.css">

  <script src="lib/jasmine-3.1.0/jasmine.js"></script>
  <script src="lib/jasmine-3.1.0/jasmine-html.js"></script>
  <script src="lib/jasmine-3.1.0/boot.js"></script>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js" integrity="sha384-o+RDsa0aLu++PJvFqy8fFScvbHFLtbvScb8AjopnFD+iEQ7wo/CG0xlczd+2O/em"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ramda/0.25.0/ramda.min.js" integrity="sha256-YN22NHB7zs5+LjcHWgk3zL0s+CRnzCQzDOFnndmUamY="
        crossorigin="anonymous"></script>
    <script src="../js/model.js"></script>
    <script src="../js/controller.js"></script>

  <!-- include spec files here... -->
  <script src="spec/spec.js"></script>
</head>

<body>
<div id="uiContent"></div>
</body>
</html>
