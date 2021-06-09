<?php

$request_van = $_GET['request_van'];
$kamerid = $_GET['kamerid'];
$tot_aan_bericht = $_GET['timestamp'];
$vanaf_bericht = $_GET['vanaf_bericht'];
$aantal_terug_te_sturen = 20;

// Set variables sql database
$DB_HOST = "db.sinners.be";
$DB_USERNAME = "robbeh";
$DB_PASSWORD = "Vg2vvNEdeeoW";
$DB_DATABASE = 'robbeh_meventer';

// open connection to mysql
$connection = mysqli_connect($DB_HOST,$DB_USERNAME,$DB_PASSWORD,$DB_DATABASE) or die("Error " . mysqli_error($connection));
mysqli_set_charset($connection, "utf8");

// DB query
if( $request_van == 'bij start' ) {
    $sql = "select b.berichtid, b.gebruikerid, g.naam, b.timestamp, b.tekst from robbeh_meventer.Bericht b " .
        "join robbeh_meventer.Gebruiker g on g.gebruikerid = b.gebruikerid " .
        "where b.kamerid = '$kamerid' and timestamp < STR_TO_DATE('$tot_aan_bericht', '%Y-%m-%d %H:%i:%s') " .
        "or timestamp = '$tot_aan_bericht' " .
        "order by b.berichtid desc";
} else {
    $sql = "select b.berichtid, b.gebruikerid, g.naam, b.timestamp, b.tekst from robbeh_meventer.Bericht b " .
        "join robbeh_meventer.Gebruiker g on g.gebruikerid = b.gebruikerid " .
        "where b.kamerid = '$kamerid' and timestamp < STR_TO_DATE('$tot_aan_bericht', '%Y-%m-%d %H:%i:%s')" .
        "order by b.berichtid desc";
}
$result = mysqli_query($connection, $sql) or die("Error in Inserting " . mysqli_error($connection));

$json = [];
if(mysqli_num_rows($result) != 0) {
    while ($vanaf_bericht != 0) {
        $row = mysqli_fetch_assoc($result);
        $vanaf_bericht--;
    }
    while ($aantal_terug_te_sturen != 0) {
        $aantal_terug_te_sturen--;
        if($row = mysqli_fetch_assoc($result)) {
            array_push($json, $row);
        }
    }
} else {
    $json = ['result' => 'geen oudere berichten'];
}

// close the db connection
mysqli_close($connection);

// send JSON to browser
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($json);