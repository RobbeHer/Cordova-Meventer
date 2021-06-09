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
$sql = "select meldingid from robbeh_meventer.Vrienden where gebruikerid1 = '$gebruikerid' and gebruikerid2 = '$vriendid' and geaccepteerd = 'nieuw'";
$result = mysqli_query($connection, $sql) or die("Error in Inserting " . mysqli_error($connection));

if(mysqli_num_rows($result) == 0) {
    $sql = "insert into robbeh_meventer.Vrienden (gebruikerid1, gebruikerid2, geaccepteerd) " .
        "values ('$gebruikerid', '$vriendid', 'nieuw')";
    $result = mysqli_query($connection, $sql) or die("Error in Inserting " . mysqli_error($connection));

    $json = ['result' => 'verzoek gestuurd'];
} else {
    $json = ['result' => 'er was al een verzoek gestuurd'];
}

// close the db connection
mysqli_close($connection);

// send JSON to browser
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($json);