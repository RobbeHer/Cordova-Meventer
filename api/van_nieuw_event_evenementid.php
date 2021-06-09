<?php

$naam = $_GET['naam'];
$gebruikerid = $_GET['gebruikerid'];
$land = $_GET['land'];
$gemeente = $_GET['gemeente'];
$straat = $_GET['straat'];
$startdatum = $_GET['startdatum'];
$startuur = $_GET['startuur'];
$einddatum = $_GET['einddatum'];
$einduur = $_GET['einduur'];
$prijs = $_GET['prijs'];
$details = $_GET['details'];

// Set variables sql database
$DB_HOST = "db.sinners.be";
$DB_USERNAME = "robbeh";
$DB_PASSWORD = "Vg2vvNEdeeoW";
$DB_DATABASE = 'robbeh_meventer';

// open connection to mysql
$connection = mysqli_connect($DB_HOST,$DB_USERNAME,$DB_PASSWORD,$DB_DATABASE) or die("Error " . mysqli_error($connection));
mysqli_set_charset($connection, "utf8");

// DB query
$sql = "select evenementid from robbeh_meventer.Evenement where naam = '$naam', gebruikerid = '$gebruikerid', " .
	"land = '$land', gemeente = '$gemeente', straat = '$straat', startdatum = '$startdatum', " .
        "startuur = '$startuur', einddatum = '$einddatum', einduur = '$einduur', prijs = '$prijs', details = '$details'";
$result = mysqli_query($connection, $sql) or die("Error in Inserting " . mysqli_error($connection));
$row = mysqli_fetch_assoc($result);

$json = [];
$json = $row;

// close the db connection
mysqli_close($connection);

// send JSON to browser
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($json);
