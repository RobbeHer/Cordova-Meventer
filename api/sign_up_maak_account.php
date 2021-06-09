<?php

$email = $_GET['email'];
$naam = $_GET['naam'];
$wachtwoord = $_GET['wachtwoord'];
$land = $_GET['land'];
$gemeente = $_GET('gemeente');
$gecodeerd_wachtwoord = false;

while ($gecodeerd_wachtwoord === false) {
    $gecodeerd_wachtwoord = password_hash($wachtwoord, PASSWORD_BCRYPT);
}


// Set variables sql database
$DB_HOST = "db.sinners.be";
$DB_USERNAME = "robbeh";
$DB_PASSWORD = "Vg2vvNEdeeoW";
$DB_DATABASE = 'robbeh_meventer';

// open connection to mysql
$connection = mysqli_connect($DB_HOST,$DB_USERNAME,$DB_PASSWORD,$DB_DATABASE) or die("Error " . mysqli_error($connection));
mysqli_set_charset($connection, "utf8");

// DB query
$sql = "insert into robbeh_meventer.Gebruiker (naam, land, gemeente, email, wachtwoord) values ('$naam', '$land', '$gemeente', '$email', '$gecodeerd_wachtwoord')";
$result = mysqli_query($connection, $sql) or die("Error in Inserting " . mysqli_error($connection));

// close the db connection
mysqli_close($connection);

$json = ['result' => 'account succesvol aangemaakt'];

// send JSON to browser
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($json);