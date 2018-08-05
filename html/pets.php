<?php
session_start();

if(!isset($_SESSION['role'])) {
  header( 'Location: login.php' );
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
        <nav class="navbar navbar-expand navbar-dark bg-dark mb-5 mt-3">
            <a class="navbar-brand" href="#">🐾</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#adminNavBar" aria-controls="adminNavBar"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="adminNavBar">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="index.php">Home
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="cats.php">Cats
                            <span class="sr-only">(current)</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="dogs.php">Dogs
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="exotics.php">Exotics
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="about.php">About
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="contact.php">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
        <h1 class="invisible" data-label-for="catsTable">Cats</h1>        
        <table data-url="cats/?limit=1000&sort=name" class="table table-striped table-bordered table-dark" id="catsTable"></table>
        <h1 class="invisible" data-label-for="dogsTable">Dogs</h1>        
        <table data-url="dogs/?limit=1000&sort=name" class="table table-striped table-bordered table-dark" id="dogsTable"></table>
        <h1 class="invisible"  data-label-for="exoticsTable">Exotics</h1>        
        <table data-url="exotics/?limit=1000&sort=name" class="table table-striped table-bordered table-dark" id="exoticsTable"></table>
    </div>
    <div class="modal fade" id="ownersModal" tabindex="-1" role="dialog" aria-labelledby="ownersModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ownersModalLabel">Cat Owners</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Cat owners are not implemented.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="notesModal" tabindex="-1" role="dialog" aria-labelledby="notesModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="notesModalLabel">Cat Notes</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Cat notes are not implemented.
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
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
    <script src="js/controller.js"></script>
    <script src="js/view.js"></script>
</body>

</html>