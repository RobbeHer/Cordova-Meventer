<?php

$vriendid = $_GET['vriendid'];

$DB_HOST = "db.sinners.be";
$DB_USERNAME = "robbeh";
$DB_PASSWORD = "Vg2vvNEdeeoW";
$DB_DATABASE = 'robbeh_meventer';

// open connection to mysql
$connection = mysqli_connect($DB_HOST,$DB_USERNAME,$DB_PASSWORD,$DB_DATABASE) or die("Error in Connecting " . mysqli_error($connection));
mysqli_set_charset($connection, "utf8");

// DB query
$sql = "select naam from robbeh_meventer.Gebruiker where gebruikerid = '$vriendid'";
$result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));
$row = mysqli_fetch_assoc($result);

$json = [];
array_push($json, $row);

// DB query
$sql = "select evenementid, naam, startdatum, startuur, land, gemeente, straat, prijs from robbeh_meventer.Evenement where gebruikerid = '$vriendid'";
$result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));
// close the db connection
mysqli_close($connection);

// create array

if(mysqli_num_rows($result) != 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($json, $row);
    }
} else {
    $empty;
    array_push($json, json_encode($empty));
}

// send JSON to browser
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($json);