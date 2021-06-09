<?php

$gebruikerid = $_GET['gebruikerid'];
$kamerid = $_GET['kamerid'];
$tekst = $_GET['tekst'];

// Set variables sql database
$DB_HOST = "db.sinners.be";
$DB_USERNAME = "robbeh";
$DB_PASSWORD = "Vg2vvNEdeeoW";
$DB_DATABASE = 'robbeh_meventer';

// open connection to mysql
$connection = mysqli_connect($DB_HOST,$DB_USERNAME,$DB_PASSWORD,$DB_DATABASE) or die("Error " . mysqli_error($connection));
mysqli_set_charset($connection, "utf8");

$sql = "insert into robbeh_meventer.Bericht (gebruikerid, kamerid, tekst) " .
    "values ('$gebruikerid', '$kamerid', '$tekst')";
$result = mysqli_query($connection, $sql) or die("Error in Inserting " . mysqli_error($connection));


$json = ['result' => "bericht verzonden"];

// close the db connection
mysqli_close($connection);

// send JSON to browser
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($json);