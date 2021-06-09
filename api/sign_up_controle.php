<?php

$email = $_GET['email'];
$wachtwoord = $_GET['wachtwoord'];
$naam = $_GET['naam'];
$land = $_GET['land'];
$gemeente = $_GET['gemeente'];
$gecodeerd_wachtwoord = false;
$bestaat = false;

// Set variables sql database
$DB_HOST = "db.sinners.be";
$DB_USERNAME = "robbeh";
$DB_PASSWORD = "Vg2vvNEdeeoW";
$DB_DATABASE = 'robbeh_meventer';

// open connection to mysql
$connection = mysqli_connect($DB_HOST,$DB_USERNAME,$DB_PASSWORD,$DB_DATABASE) or die("Error in Connecting " . mysqli_error($connection));
mysqli_set_charset($connection, "utf8");

// DB query
$sql = "select naam, email, wachtwoord from robbeh_meventer.Gebruiker where email = '$email'";
$result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

$json = [];
if(mysqli_num_rows($result) >= 1) {
    while($row = mysqli_fetch_assoc($result)){
        if( $email ==  $row['email'] ) {
            if( $naam ==  $row['naam'] ){
                $json = ['result' => 'account bestaat al bij naam'];
                $bestaat = true;
            } elseif ( password_verify($wachtwoord, $row['wachtwoord']) ) {
                $json = ['result' => 'account bestaat al bij wachtwoord'];
                $bestaat = true;
            }
        }
    }
}

if( !$bestaat ) {
    while ($gecodeerd_wachtwoord === false) {
        $gecodeerd_wachtwoord = password_hash($wachtwoord, PASSWORD_BCRYPT);
    }
    $sql = "insert into robbeh_meventer.Gebruiker (naam, land, gemeente, email, wachtwoord) " .
        "values ('$naam', '$land', '$gemeente', '$email', '$gecodeerd_wachtwoord')";
    $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));
    $json = ['result' => 'account aangemaakt'];
}

// close the db connection
mysqli_close($connection);

// send JSON to browser
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($json);
