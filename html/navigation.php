<?php
    $navItems = [
        "Home" => ["url" => "index.php"],
        "Cats" => ["role" => "admin", "url" => "cats.php"],
        "Dogs" => ["role" => "admin", "url" => "dogs.php"],
        "Exotics" => ["role" => "admin", "url" => "exotics.php"],
        "Owners" => ["role" => "admin", "url" => "owners.php"],
        "Pets" => ["role" => "owner", "url" => "pets.php"],
        "About" => ["url" => "about.php"],
        "Contact" => ["url" => "contact.php"],
    ];
    session_start();
    if(isset($_SESSION['username'])) $username = $_SESSION['username'];
?>

<nav class="navbar navbar-expand navbar-dark bg-dark mb-5 mt-3">
    <a class="navbar-brand" href="#">🐾</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#adminNavBar" aria-controls="adminNavBar"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="adminNavBar">
        <ul class="navbar-nav mr-auto">
        <?php 
            $role = $_SESSION['role'];
            foreach($navItems as $title => $navItem) {
                if(!isset($navItem['role']) || $role===$navItem['role']) {
                    $url = $navItem['url'];
                    $active = $currentNavPage === $title ? "active" : "";
                    echo "<li class=\"nav-item\">";
                    echo "<a class=\"nav-link $active\" href=\"$url\">$title</a>";
                    if($active === "active") echo '<span class="sr-only">(current)</span>';
                    echo "</li>";
                }  
            }
            $active = $currentNavPage === "Login" ? " active" : "";
            if(!isset($role)) echo '<li class="nav-item"><a class="nav-link' . $active . '" href="login.php">Login</a></li>';
            else echo '<li class="nav-item"><a class="nav-link" href="logout.php">Logout</a></li>';
        ?>
        </ul>
    </div>
    <?php if(isset($username)) echo "<span class=\"text-right text-light\">$username</span>"; ?>
</nav>
