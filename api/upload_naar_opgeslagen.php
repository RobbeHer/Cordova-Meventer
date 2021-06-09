<?php

$evenement = $_GET['evenementid'];
$gebruikerid = $_GET['gebruikerid'];

// Set variables sql database
$DB_HOST = "db.sinners.be";
$DB_USERNAME = "robbeh";
$DB_PASSWORD = "Vg2vvNEdeeoW";
$DB_DATABASE = 'robbeh_meventer';

// open connection to mysql
$connection = mysqli_connect($DB_HOST,$DB_USERNAME,$DB_PASSWORD,$DB_DATABASE) or die("Error " . mysqli_error($connection));
mysqli_set_charset($connection, "utf8");

// DB query
$sql = "insert into robbeh_meventer.Opgeslagen (evenementid, gebruikerid) values ('$evenement', '$gebruikerid')";
$result = mysqli_query($connection, $sql) or die("Error in Inserting " . mysqli_error($connection));
$row = mysqli_fetch_assoc($result);

$json = [ 'result' => 'evenement is opgeslagen' ];

// close the db connection
mysqli_close($connection);

// send JSON to browser
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($json);