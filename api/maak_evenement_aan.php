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
$sql = "insert into robbeh_meventer.Evenement (naam, gebruikerid, land, gemeente, straat, startdatum, " .
        "startuur, einddatum, einduur, prijs, details) " .
        "values ('$naam', '$gebruikerid', '$land', '$gemeente', '$straat', '$startdatum', '$startuur', " .
        "'$einddatum', '$einduur', '$prijs', '$details')";
$result = mysqli_query($connection, $sql) or die("Error in Inserting " . mysqli_error($connection));


//$json = ['result' => 'nieuw evenement aangemaakt'];

// DB query
$sql = "select evenementid from robbeh_meventer.Evenement where naam = '$naam' and gebruikerid = '$gebruikerid' and " .
	"land = '$land' and gemeente = '$gemeente' and straat = '$straat' and startdatum = '$startdatum' and " .
        "startuur = '$startuur' and einddatum = '$einddatum' and einduur = '$einduur' and prijs = '$prijs' and details = '$details'";
$result = mysqli_query($connection, $sql) or die("Error in Inserting " . mysqli_error($connection));
$row = mysqli_fetch_assoc($result);

//$json = [];
$json = ['result' => $row['evenementid']];//$row;



// close the db connection
mysqli_close($connection);

// send JSON to browser
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($json);