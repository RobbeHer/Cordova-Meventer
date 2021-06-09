<?php

$gebruikerid = $_GET['gebruikerid'];
$vriendid = $_GET['vriendid'];

$DB_HOST = "db.sinners.be";
$DB_USERNAME = "robbeh";
$DB_PASSWORD = "Vg2vvNEdeeoW";
$DB_DATABASE = 'robbeh_meventer';

// open connection to mysql
$connection = mysqli_connect($DB_HOST,$DB_USERNAME,$DB_PASSWORD,$DB_DATABASE) or die("Error in Connecting " . mysqli_error($connection));
mysqli_set_charset($connection, "utf8");

// DB query
$sql = "DELETE FROM robbeh_meventer.Vrienden where (gebruikerid1 = '$gebruikerid' and gebruikerid2 = '$vriendid') " .
    "or (gebruikerid2 = '$gebruikerid' and gebruikerid1 = '$vriendid')";
$result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

// close the db connection
mysqli_close($connection);

// create array
$json = ['result' => 'vriend verwijderd'];

// send JSON to browser
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($json);