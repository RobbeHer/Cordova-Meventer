<?php

$eigenid = $_GET['gebruikerid'];

$DB_HOST = "db.sinners.be";
$DB_USERNAME = "robbeh";
$DB_PASSWORD = "Vg2vvNEdeeoW";
$DB_DATABASE = 'robbeh_meventer';

// open connection to mysql
$connection = mysqli_connect($DB_HOST,$DB_USERNAME,$DB_PASSWORD,$DB_DATABASE) or die("Error in Connecting " . mysqli_error($connection));
mysqli_set_charset($connection, "utf8");

// DB query
$sql = "select v1.gebruikerid2 as vriendid, g1.naam as naam from robbeh_meventer.Vrienden v1 " .
    "join robbeh_meventer.Gebruiker g1 on g1.gebruikerid = v1.gebruikerid2 " .
    "where v1.gebruikerid1 = '$eigenid' and v1.geaccepteerd = 'true' " .
    "union " .
    "select v2.gebruikerid1 as vriendid, g2.naam as naam from robbeh_meventer.Vrienden v2 " .
    "join robbeh_meventer.Gebruiker g2 on g2.gebruikerid = v2.gebruikerid1 " .
    "where v2.gebruikerid2 = '$eigenid' and v2.geaccepteerd = 'true' "/* .
    "order by g1.naam and g2.naam"*/;
$result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

// close the db connection
mysqli_close($connection);

// create array
$json = [];
if(mysqli_num_rows($result) != 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($json, $row);
    }
} else {
    $json = ['result' => 'geen bevriend'];
}

// send JSON to browser
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($json);