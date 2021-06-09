<?php

$email = $_GET['email'];
$wachtwoord = $_GET['wachtwoord'];

$DB_HOST = "db.sinners.be";
$DB_USERNAME = "robbeh";
$DB_PASSWORD = "Vg2vvNEdeeoW";
$DB_DATABASE = 'robbeh_meventer';

// open connection to mysql
$connection = mysqli_connect($DB_HOST,$DB_USERNAME,$DB_PASSWORD,$DB_DATABASE) or die("Error in Connecting " . mysqli_error($connection));
mysqli_set_charset($connection, "utf8");

// DB query
$sql = "select * from robbeh_meventer.Gebruiker where email = '$email'";
$result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

// close the db connection
mysqli_close($connection);

// create array
$json = [];
if(mysqli_num_rows($result) != 0) {
    while($row = mysqli_fetch_assoc($result)) {
        if(password_verify($wachtwoord, $row["wachtwoord"])) {
            $json[] = ['gebruikerid' => $row['gebruikerid'],
                'naam' => $row['naam'],
                'email' => $row['email'],
                'land' => $row['land'],
                'gemeente' => $row['gemeente']];
        }
    }
    if(count($json) !== 1) {
        $json = ['result' => 'verkeerd wachtwoord'];
    }
} else {
    $json = ['result' => 'verkeerd e-mail adres'];
}

// send JSON to browser
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($json);