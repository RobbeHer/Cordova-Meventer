<?php

$evenementid = $_GET['evenementid'];

$DB_HOST = "db.sinners.be";
$DB_USERNAME = "robbeh";
$DB_PASSWORD = "Vg2vvNEdeeoW";
$DB_DATABASE = 'robbeh_meventer';

// open connection to mysql
$connection = mysqli_connect($DB_HOST,$DB_USERNAME,$DB_PASSWORD,$DB_DATABASE) or die("Error in Connecting " . mysqli_error($connection));
mysqli_set_charset($connection, "utf8");

// DB query
$sql = "select e.foto, e.naam, g.naam as organisator, e.land, e.gemeente, e.straat, e.startdatum, e.einddatum, e.startuur, e.einduur,
        e.prijs, e.details from robbeh_meventer.Evenement e join robbeh_meventer.Gebruiker g on e.gebruikerid = g.gebruikerid 
        where e.evenementid = '$evenementid'";
$result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));
$row = mysqli_fetch_assoc($result);

// close the db connection
mysqli_close($connection);

// create array
$json = [];
$json[] = $row;

// send JSON to browser
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($json);