<?php

$kamerid = $_GET['kamerid'];
$timestamp = $_GET['timestamp'];

// Set variables sql database
$DB_HOST = "db.sinners.be";
$DB_USERNAME = "robbeh";
$DB_PASSWORD = "Vg2vvNEdeeoW";
$DB_DATABASE = 'robbeh_meventer';

// open connection to mysql
$connection = mysqli_connect($DB_HOST,$DB_USERNAME,$DB_PASSWORD,$DB_DATABASE) or die("Error " . mysqli_error($connection));
mysqli_set_charset($connection, "utf8");

// DB query
$sql = "select b.gebruikerid, g.naam, b.timestamp, b.tekst from robbeh_meventer.Bericht b " .
    "join robbeh_meventer.Gebruiker g on g.gebruikerid = b.gebruikerid " .
    "where b.kamerid = '$kamerid' and b.timestamp > STR_TO_DATE('$timestamp', '%Y/%m/%d')";
$result = mysqli_query($connection, $sql) or die("Error in Inserting " . mysqli_error($connection));

$json = [];
if(mysqli_num_rows($result) != 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($json, $row);
    }
} else {
    $json = ['result' => 'geen nieuwe berichten'];
}

// close the db connection
mysqli_close($connection);

// send JSON to browser
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($json);