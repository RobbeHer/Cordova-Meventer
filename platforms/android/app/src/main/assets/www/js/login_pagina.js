let Login =function (){

    let init = function (){
        console.log('Account gegevens nakijken');
        if (localStorage.getItem("gebruikerid") !== null) {
            ChatPagina.zetGebruikerId();
            toonStartpagina();
        } else {
            toonLoginpagina();
        }
    };

    let toonStartpagina = function (){
        $('.spa').hide();
        //$('#start-pagina').show();
        $('#zoek-pagina').show();
        $('#navigatie-balk').show();
    };

    let toonLoginpagina = function (){
        $('.spa').hide();
        $('#navigatie-balk').hide();
        $('#login-pagina').show();
    };

    $('#ga-naar-sign-up-pagina').click(function (){
        $('.spa').hide();
        $('#sign-up-pagina').show();
    });

    $('#login-knop').click(function (){
        $('#login-email').css("border-color", "white");
        $('#login-wachtwoord').css("border-color", "white");

        if( Netwerk.status() !== 'No network connection' ){
            let email = $('#login-email').val();
            let wachtwoord = $('#login-wachtwoord').val();

            if( !email ){
                $('#login-email').css("border-color", "red");
                alert('Uw e-mail is niet ingevuld');
            } else if ( !wachtwoord ){
                $('#login-wachtwoord').css("border-color", "red");
                alert('Uw wachtwoord is niet ingevuld')
            } else {
                login(email, wachtwoord);
            }
        } else {
            alert('Er is geen netwerk verbinding')
        }
    });

    let login = function (email, wachtwoord) {
        let url = "https://robbeh.sinners.be/meventer/login.php";

        $.getJSON(url, {email: email, wachtwoord: wachtwoord}).done(function (data) {
            console.log(data);

            if(data['result'] === 'verkeerd wachtwoord') {
                $('#login-wachtwoord').css("border-color", "red");
                alert("Uw wachtwoord is verkeerd.")
            } else if(data['result'] === 'verkeerd e-mail adres') {
                $('#login-email').css("border-color", "red");
                alert("Er is geen account gevonden met dit e-mail adres.")
            } else {
                localStorage.setItem('gebruikerid', JSON.stringify(data[0].gebruikerid));
                localStorage.setItem('naam', JSON.stringify(data[0].naam));
                localStorage.setItem('land', JSON.stringify(data[0].land));
                localStorage.setItem('gemeente', JSON.stringify(data[0].gemeente));

                localStorage.setItem('opgeslagen', '[]');
                OpgeslagenPagina.downloadOpgeslagen();
                localStorage.setItem('vrienden', '[]');
                VriendenPagina.downloadVrienden();
                ChatPagina.zetGebruikerId();
                localStorage.setItem('chatrooms', '[]');
                ChatPagina.downloadChatrooms();

                $('#login-email').val('');
                $('#login-wachtwoord').val('');
                toonStartpagina();
            }
        }).fail(function (jqxhr, textStatus, error ) {
            console.log(jqxhr);
            let err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
            alert("Er ging iets fout bij het controleren van uw gegevens.")
        });
    };

    return {
        init:init,
        login: login,
        toonStartPagina: toonStartpagina
    }
}();