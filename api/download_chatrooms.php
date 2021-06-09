<?php

$gebruikerid = $_GET['gebruikerid'];
$default_timestamp = '0000-00-00 00:00:00.000000';

// Set variables sql database
$DB_HOST = "db.sinners.be";
$DB_USERNAME = "robbeh";
$DB_PASSWORD = "Vg2vvNEdeeoW";
$DB_DATABASE = 'robbeh_meventer';

// open connection to mysql
$connection = mysqli_connect($DB_HOST,$DB_USERNAME,$DB_PASSWORD,$DB_DATABASE) or die("Error " . mysqli_error($connection));
mysqli_set_charset($connection, "utf8");

// DB query

$sql = "select c.kamerid from robbeh_meventer.Chatroom c " .
    "join robbeh_meventer.Deelnemer d on d.kamerid = c.kamerid " .
    "where d.gebruikerid = '$gebruikerid' " .
    "group by c.kamerid";
$result1 = mysqli_query($connection, $sql) or die("Error in Inserting " . mysqli_error($connection));

$json = [];
if (mysqli_num_rows($result1) != 0) {
    while ($row1 = mysqli_fetch_assoc($result1)) {
        $kamerid = $row1['kamerid'];

        $sql = "select max(timestamp) as timestamp from robbeh_meventer.Bericht " .
            "where kamerid = '$kamerid' ";
        $result2 = mysqli_query($connection, $sql) or die("Error in Inserting " . mysqli_error($connection));

        if (mysqli_num_rows($result2) != 0) {
            $row2 = mysqli_fetch_assoc($result2);
            $row3 = ['kamerid' => $kamerid, 'timestamp' => $row2['timestamp']];
        } else {
            $row3 = ['kamerid' => $kamerid, 'timestamp' => $default_timestamp];
        }
        array_push($json, $row3);
    }
} else {
    $json = ['result' => 'er zijn geen chatrooms beschikbaar'];
}

// close the db connection
mysqli_close($connection);

// send JSON to browser
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($json);