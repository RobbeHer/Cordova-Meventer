$('#ga-naar-login-pagina').click(function (){
    $('.spa').hide();
    $('#login-pagina').show();
});

$('#sign-up-knop').click(function (){
    $('#sign-up-naam').css("border-color", "white");
    $('#sign-up-land').css("border-color", "white");
    $('#sign-up-gemeente').css("border-color", "white");
    $('#sign-up-email').css("border-color", "white");
    $('#sign-up-wachtwoord-1').css("border-color", "white");
    $('#sign-up-wachtwoord-2').css("border-color", "white");

    if( Netwerk.status() !== 'No network connection' ) {
        let naam = $('#sign-up-naam').val();
        let land = $('#sign-up-land').val();
        let gemeente = $('#sign-up-gemeente').val();
        let email = $('#sign-up-email').val();
        let wachtwoord = $('#sign-up-wachtwoord-1').val();
        let wachtwoord2 = $('#sign-up-wachtwoord-2').val();

        if ( !naam ){
            $('#sign-up-naam').css("border-color", "red");
            alert('Uw naam is niet ingevuld');
        } else if ( land === '--' ){
            $('#sign-up-land').css("border-color", "red");
            alert('Uw land is niet geselecteerd');
        } else if ( !gemeente ) {
            $('#sign-up-gemeente').css("border-color", "red");
            alert('Uw gemeente is niet ingevuld');
        } else if( !email ){
            $('#sign-up-email').css("border-color", "red");
            alert('Uw e-mail is niet ingevuld');
        } else if ( !wachtwoord ){
            alert('Uw eerste wachtwoord is niet ingevuld');
            $('#sign-up-wachtwoord-1').css("border-color", "red");
        } else if ( !wachtwoord2 ){
            alert('Uw tweede wachtwoord is niet ingevuld');
            $('#sign-up-wachtwoord-2').css("border-color", "red");
        } else if ( wachtwoord !== wachtwoord2 ) {
            $('#sign-up-wachtwoord-1').css("border-color", "red");
            $('#sign-up-wachtwoord-2').css("border-color", "red");
            alert('Uw wachtwoorden zijn niet hetzelfde.');
        } else {
            let url = "https://robbeh.sinners.be/meventer/sign_up_controle.php";

            $.getJSON(url, {email: email, wachtwoord: wachtwoord, naam: naam, land: land, gemeente: gemeente}).done(function (data) {
                console.log(data);

                if(data['result'] === 'account bestaat al bij wachtwoord') {
                    $('#sign-up-wachtwoord-1').css("border-color", "red");
                    $('#sign-up-wachtwoord-2').css("border-color", "red");
                    alert("Uw moet uw WACHTWOORD wijzigen wilt u nog een account maken onder dit e-mail adres.");
                } else if(data['result'] === 'account bestaat al bij naam') {
                    $('#sign-up-naam').css("border-color", "red");
                    alert("Uw moet uw NAAM wijzigen wilt u nog een account maken onder dit e-mail adres.");
                } else {
                    Login.login(email, wachtwoord);
                }
            }).fail(function (jqxhr, textStatus, error ) {
                console.log(jqxhr);
                let err = textStatus + ", " + error;
                console.log( "Request Failed: " + err );
                alert('Er ging iets fout tijdens het controleren van alreeds bestaande accounts.');
            });
        }
    } else {
        alert('Er is geen netwerk verbinding')
    }
});