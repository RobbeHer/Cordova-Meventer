<?php

$meldingid = $_GET['meldingid'];
$reactie = $_GET['reactie'];
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
$sql = "update robbeh_meventer.Vrienden set geaccepteerd = '$reactie' where meldingid = '$meldingid'";
$result = mysqli_query($connection, $sql) or die("Error in Inserting " . mysqli_error($connection));

//$json = [];
$json = ['result' => 'vriendschapsverzoek geupdate'];

$sql = "select d1.gebruikerid, d2.gebruikerid from robbeh_meventer.Deelnemer d1 " .
    "join robbeh_meventer.Deelnemer d2 on d1.kamerid = d2.kamerid " .
    "where d1.gebruikerid = '$gebruikerid' and d2.gebruikerid = '$vriendid'";
$result = mysqli_query($connection, $sql) or die("Error in Inserting " . mysqli_error($connection));

if(mysqli_num_rows($result) == 0) {
    $sql = "insert into robbeh_meventer.Chatroom (gebruikt, doorid) " .
        "values ('nee', '$gebruikerid')";
    $result = mysqli_query($connection, $sql) or die("Error in Inserting " . mysqli_error($connection));

    $sql = "select kamerid from robbeh_meventer.Chatroom where gebruikt = 'nee' and doorid = '$gebruikerid'";
    $result = mysqli_query($connection, $sql) or die("Error in Inserting " . mysqli_error($connection));
    $row = mysqli_fetch_assoc($result);

    $kamerid = $row['kamerid'];

    $sql = "update robbeh_meventer.Chatroom set gebruikt = 'ja' where kamerid = '$kamerid'";
    $result = mysqli_query($connection, $sql) or die("Error in Inserting " . mysqli_error($connection));

    $sql = "insert into robbeh_meventer.Deelnemer (gebruikerid, kamerid) " .
        "values ('$gebruikerid', '$kamerid')";
    $result = mysqli_query($connection, $sql) or die("Error in Inserting " . mysqli_error($connection));

    $sql = "insert into robbeh_meventer.Deelnemer (gebruikerid, kamerid) " .
        "values ('$vriendid', '$kamerid')";
    $result = mysqli_query($connection, $sql) or die("Error in Inserting " . mysqli_error($connection));

    $json = ['result' => "vriendschapsverzoek geupdate\nchatroom gemaakt"];
}


// close the db connection
mysqli_close($connection);

// send JSON to browser
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($json);