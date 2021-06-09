<?php

$id = $_GET['id'];

    header('Access-Control-Allow-Origin: *');
    $new_image_name = urldecode($_FILES["file"]["name"]).".jpg";
    move_uploaded_file($_FILES["file"]["tmp_name"], "fotos/".$new_image_name);

// Set variables sql database
$DB_HOST = "db.sinners.be";
$DB_USERNAME = "robbeh";
$DB_PASSWORD = "Vg2vvNEdeeoW";
$DB_DATABASE = 'robbeh_meventer';

// open connection to mysql
$connection = mysqli_connect($DB_HOST,$DB_USERNAME,$DB_PASSWORD,$DB_DATABASE) or die("Error " . mysqli_error($connection));
mysqli_set_charset($connection, "utf8");

// DB query
$sql = "update robbeh_meventer.Evenement set foto = '$new_image_name' where evenementid = '$id'";
$result = mysqli_query($connection, $sql) or die("Error in Inserting " . mysqli_error($connection));


// close the db connection
mysqli_close($connection);
