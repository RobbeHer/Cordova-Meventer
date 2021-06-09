<?php

$naam = $_GET['naam'];
$gebruikerid = $_GET['gebruikerid'];

$DB_HOST = "db.sinners.be";
$DB_USERNAME = "robbeh";
$DB_PASSWORD = "Vg2vvNEdeeoW";
$DB_DATABASE = 'robbeh_meventer';

// open connection to mysql
$connection = mysqli_connect($DB_HOST,$DB_USERNAME,$DB_PASSWORD,$DB_DATABASE) or die("Error in Connecting " . mysqli_error($connection));
mysqli_set_charset($connection, "utf8");

// DB query
$sql = "select gebruikerid as vriendid, naam from robbeh_meventer.Gebruiker " .
    "where lower(naam) like lower('$naam%') and gebruikerid != '$gebruikerid'";

$result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

// close the db connection
mysqli_close($connection);

// create array
$json = [];
if(mysqli_num_rows($result) != 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($json, $row);
    }
} else {
    $json = ['result' => 'geen mensen gevonden'];
}

// send JSON to browser
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($json);