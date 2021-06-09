<?php

$gebruikerid = $_GET['gebruikerid'];
$vriendid = $_GET['vriendid'];

// Set variables sql database
$DB_HOST = "db.sinners.be";
$DB_USERNAME = "robbeh";
$DB_PASSWORD = "Vg2vvNEdeeoW";
$DB_DATABASE = 'robbeh_meventer';

// open connection to mysql
$connection = mysqli_connect($DB_HOST,$DB_USERNAME,$DB_PASSWORD,$DB_DATABASE) or die("Error " . mysqli_error($connection));
mysqli_set_charset($connection, "utf8");

// DB query
$sql = "select c.kamerid from robbeh_meventer.Chatroom c join robbeh_meventer.Deelnemer d1 on d1.kamerid = c.kamerid " .
    "join robbeh_meventer.Deelnemer d2 on d2.kamerid = c.kamerid where d1.gebruikerid = '$gebruikerid' and d2.gebruikerid = '$vriendid'";
$result = mysqli_query($connection, $sql) or die("Error in Inserting " . mysqli_error($connection));
$row = mysqli_fetch_assoc($result);

$json = [];
array_push($json, $row);

// close the db connection
mysqli_close($connection);

// send JSON to browser
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($json);