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
        $currentNavPage = "Contact";
        include "navigation.php"; 
    ?>   
 
        <section>
            <h2>Address</h2>
            1118 Canyon Creek Pkwy, Spanish Fork, UT 84660
            <div class="mapouter">
                <div class="gmap_canvas">
                    <iframe width="500" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=1118%20Canyon%20Creek%20Pkwy%2C%20Spanish%20Fork%2C%20UT%2084660&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                </div>
            </div>
        </section>
        <section>
            <h2>Phone Number</h2>
            888-555-7297
        </section>
        <section>
            <h2>Fax</h2>
            888-555-3647
        </section>
        <section>
            <h2>Email</h2>
            <a href="mailto:inquiry@pawstocare.com">inquiry@pawstocare.com</a>
        </section>
        <section class="mt-5">
            <h2>Office Hours</h2>
            <table class="table table-dark">
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Open</th>
                        <th>Close</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Monday</td>
                        <td>8:00 AM</td>
                        <td>5:30 PM</td>
                    </tr>
                    <tr>
                        <td>Tuesday</td>
                        <td>8:00 AM</td>
                        <td>5:30 PM</td>
                    </tr>
                    <tr>
                        <td>Wednesday</td>
                        <td>8:00 AM</td>
                        <td>5:30 PM</td>
                    </tr>
                    <tr>
                        <td>Thursday</td>
                        <td>8:00 AM</td>
                        <td>5:30 PM</td>
                    </tr>
                    <tr>
                        <td>Friday</td>
                        <td>8:00 AM</td>
                        <td>5:30 PM</td>
                    </tr>
                    <tr>
                        <td>Saturday</td>
                        <td>1:00 PM</td>
                        <td>5:00 PM</td>
                    </tr>
                    <tr>
                        <td>Sunday</td>
                        <td colspan="2" class="text-muted">Closed</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>


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