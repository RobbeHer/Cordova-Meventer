<?php

$gebruikerid = $_GET['gebruikerid'];

$DB_HOST = "db.sinners.be";
$DB_USERNAME = "robbeh";
$DB_PASSWORD = "Vg2vvNEdeeoW";
$DB_DATABASE = 'robbeh_meventer';

// open connection to mysql
$connection = mysqli_connect($DB_HOST,$DB_USERNAME,$DB_PASSWORD,$DB_DATABASE) or die("Error in Connecting " . mysqli_error($connection));
mysqli_set_charset($connection, "utf8");

// DB query
$sql = "select e.evenementid, e.naam, g.naam as organisator, e.land, e.gemeente, e.straat, e.startdatum, e.einddatum, e.startuur, e.einduur, ".
        "e.prijs, e.details " .
        "from robbeh_meventer.Opgeslagen o " .
        "join robbeh_meventer.Evenement e on e.evenementid = o.evenementid " .
        "join robbeh_meventer.Gebruiker g on g.gebruikerid = o.gebruikerid " .
        "where o.gebruikerid = '$gebruikerid'" .
        "order by e.startdatum";
$result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));


// create array
$json = [];
if(mysqli_num_rows($result) != 0) {
    while($row = mysqli_fetch_assoc($result)) {
        array_push($json, $row);
    }
} else {
    $json = ['result' => 'geen opgeslagen'];
}

// close the db connection
mysqli_close($connection);

// send JSON to browser
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($json);