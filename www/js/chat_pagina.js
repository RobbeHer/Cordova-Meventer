import baseUrl from "./baseUrl";

let ChatPagina = function () {

    let kamerid = 0;
    let vriendid = 0;
    let gebruikerid = 0;
    let timestampEersteBericht = '';
    let vorigeZender;
    let aantalOudereBerichten = 0;

    $('#cp-ga-naar-vrienden-pagina').click(function () {
        verlaatKamer();
    });

    let verlaatKamer = function () {
        $('#navigatie-balk').show();
        kamerid = 0;
        vriendid = 0;
        timestampEersteBericht = '';
        aantalOudereBerichten = 0;
        VriendenPagina.showPagina();
        $('#vrienden-pagina').show();
    };

    let maakKamerId = function (id) {
        kamerid = id;
    };

    let maakVriendId = function (id) {
        vriendid = id;
    };

    let zetGebruikerId = function () {
        let id = localStorage.getItem('gebruikerid');
        gebruikerid = parseInt(id.substring(1, id.length-1));
        maakVorigeZender(gebruikerid);
    };

    let maakVorigeZender = function (zender) {
        vorigeZender = zender;
    };

    let toonPagina = function () {
        $('.spa').hide();
        $('#navigatie-balk').hide();
        $('#chat-pagina').show();
    };

    let downloadChatrooms = function () {
        if( Netwerk.status() !== 'No network connection' ) {
            let url = baseUrl + "/download_chatrooms.php";
            $.getJSON(url, {gebruikerid: gebruikerid}).done(function (data) {
                console.log('download_chatrooms');
                console.log(data);
                localStorage.setItem('chatrooms', '[]');

                if( data['result'] !== 'er zijn geen chatrooms beschikbaar' ) {
                    for (let i = 0; data.length !== null && i < data.length; i++) {
                        let kamerid = data[i].kamerid;
                        let timestamp = data[i].timestamp;
                        voegChatroomToeAanLocalstorage(kamerid, timestamp);
                    }
                }

            }).fail(function (jqxhr, textStatus, error) {
                console.log(jqxhr);
                let err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
                alert("Er ging iets fout met het downloaden van chatrooms")
            });
        } else {
            alert('Er is geen netwerk verbinding');
        }
    };

    let voegChatroomToeAanLocalstorage = function (kamerid, timestamp) {
        let chatrooms = localStorage.getItem('chatrooms');

        let nieuweChatroom = '{"kamerid" : "' + kamerid + '", "timestamp" : "' + timestamp + '"}';

        if( chatrooms !== '[]' ) {
            let alleChatrooms = chatrooms.substring(1, chatrooms.length-1);
            chatrooms = '[' + alleChatrooms + ', ' + nieuweChatroom + ']';
        } else {
            chatrooms = '[' + nieuweChatroom + ']';
        }

        localStorage.setItem('chatrooms', chatrooms);
        //console.log(JSON.parse(localStorage.getItem('chatrooms')));
    };

    let laadPagina = function (vriendid, naam) {
        $('#cp-chat').empty();
        zetGebruikerId();
        maakVriendId(vriendid);

        let url = baseUrl + "/krijg_chatroomid.php";
        $.getJSON(url, {gebruikerid: gebruikerid, vriendid: vriendid}).done(function (data) {
            console.log(data);
            maakKamerId(data[0].kamerid);
            $('#cp-naam').text(naam);

            let chatrooms = JSON.parse(localStorage.getItem('chatrooms'));

            for( let i = 0; i < chatrooms.length; i++ ) {
                if( chatrooms[i].kamerid === kamerid ) {
                    timestampEersteBericht = chatrooms[i].timestamp;
                    console.log('timestamp laatste bericht vorige sessie');
                    console.log(timestampEersteBericht);
                    break;
                }
            }

            toonOudereBerichten('bij start');
            toonPagina();

            //$( "#cp-chat" ).scrollTop( $("#cp-chat").height() );

        }).fail(function (jqxhr, textStatus, error) {
            console.log(jqxhr);
            let err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
            alert("Er ging iets fout bij het ophalen van de chatroom.")
        });
    };

    $('#cp-toon-oudere-berichten').click(function () {
        console.log('oudere berichten ophalen');
        console.log(timestampEersteBericht);
        toonOudereBerichten('bij knop');
    });

    let toonOudereBerichten = function (requestVan) {
        console.log(kamerid);
        console.log(aantalOudereBerichten);
        console.log(timestampEersteBericht);
        let url = baseUrl + "/krijg_oudere_berichten_bij_kamerid.php";
        $.getJSON(url, {request_van: requestVan, kamerid: kamerid, vanaf_bericht: aantalOudereBerichten, timestamp: timestampEersteBericht}).done(function (data) {
            console.log(data);

            if( data['result'] !== 'geen oudere berichten' ) {
                let naam;
                let timestamp;
                let tekst;
                let zender;
                let bericht;

                for (let i = 0; data.length !== null && i < data.length; i++) {
                    aantalOudereBerichten++;
                    naam = data[i].naam;
                    timestamp = data[i].timestamp;
                    tekst = data[i].tekst;
                    zender = data[i].gebruikerid;
                    if (zender != gebruikerid) {
                        bericht = maakBericht(zender, naam, timestamp, tekst, 'links');
                    } else {
                        bericht = maakBericht(zender, naam, timestamp, tekst, 'rechts');
                    }
                    $('#cp-chat').prepend(bericht);
                }
            }
        }).fail(function (jqxhr, textStatus, error) {
            console.log(jqxhr);
            let err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
            alert("Er ging iets fout bij het ophalen van de chatroom.")
        });
    };

    let checkVoorBerichten = function () {
        if( kamerid !== 0 && vriendid !== 0 ) {
            console.log('begin  ------------------------------------------------------------------------');
            let timestampLaatsteBericht;
            let chatrooms = JSON.parse(localStorage.getItem('chatrooms'));
            console.log('chatrooms');
            console.log(chatrooms);

            for( let i = 0; i < chatrooms.length; i++ ) {
                if( chatrooms[i].kamerid === kamerid ) {
                    timestampLaatsteBericht = chatrooms[i].timestamp;
                    console.log('timestamp laatste bericht');
                    console.log(timestampLaatsteBericht);
                    break;
                }
            }

            let url = baseUrl + "/krijg_berichten_van_kamerid.php";
            $.getJSON(url, {kamerid: kamerid, timestamp: timestampLaatsteBericht}).done(function (data) {
                console.log('data');
                console.log(data);

                if( data['result'] !== 'geen nieuwe berichten' ) {
                    let naam;
                    let timestamp;
                    let tekst;
                    let zender;
                    let bericht;

                    for (let i = 0; i < data.length; i++) {
                        naam = data[i].naam;
                        timestamp = data[i].timestamp;
                        if( timestampEersteBericht === '' ) {
                            timestampEersteBericht = timestamp;
                        }
                        tekst = data[i].tekst;
                        zender = data[i].gebruikerid;
                        console.log('maak bericht');
                        console.log(zender, naam, timestamp, tekst);
                        if (zender != gebruikerid) {
                            bericht = maakBericht(zender, naam, timestamp, tekst, 'links');
                        } else {
                            bericht = maakBericht(zender, naam, timestamp, tekst, 'rechts');
                        }
                        $('#cp-chat').append(bericht);
                    }

                    /////////////////////   vervang timestamp laatste bericht bij user local storage
                    for( let i = 0; i < chatrooms.length; i++) {
                        if( chatrooms[i].kamerid === kamerid ) {
                            let id = chatrooms[i].kamerid;
                            chatrooms.splice(i, 1);
                            chatrooms = JSON.stringify(chatrooms);
                            let nieuweroom = '{"kamerid" : "' + id + '", "timestamp" : "' + timestamp + '"}';

                            if( chatrooms !== '[]' ) {
                                let andererooms = chatrooms.substring(1, chatrooms.length-1);
                                chatrooms = '[' + nieuweroom + ', ' + andererooms + ']';
                            } else {
                                chatrooms = '[' + nieuweroom + ']';
                            }
                            localStorage.setItem('chatrooms', chatrooms);
                            break;
                        }
                    }
                }
                console.log('einde ------------------------------------------------------------------------');

            }).fail(function (jqxhr, textStatus, error) {
                console.log(jqxhr);
                let err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
                alert("Er ging iets fout bij het ophalen van de chatroom.")
            });
        }
    };

    let maakBericht = function (zender, naam, timestamp, tekst, kant) {
        let bericht = '<div class="chat-' + kant + '">';
        console.log(zender);
        console.log(vorigeZender);

        if (vorigeZender !== zender) {
            bericht += '<p class="cp-timestamp">' + naam + ' ' + timestamp + '</p>';
        } else {
            bericht += '<p class="cp-timestamp">' + timestamp + '</p>';
        }

        maakVorigeZender(zender);

        bericht += '<div class="bubbel">' +
            '<p>' + tekst + '</p>' +
            '</div>' +
            '</div>';
        console.log(bericht);

        return bericht;
    };



    $('#cp-stuur-bericht').click(function () {
        if( Netwerk.status() !== 'No network connection' ) {
            let tekst = $('#cp-bericht').val();
            let url = baseUrl + "/stuur_bericht.php";
            $.getJSON(url, {gebruikerid: gebruikerid, kamerid: kamerid, tekst: tekst}).done(function (data) {
                console.log(data);

                $('#cp-bericht').val('');

            }).fail(function (jqxhr, textStatus, error) {
                console.log(jqxhr);
                let err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
                alert("Er ging iets fout met het verzenden van het bericht")
            });
        } else {
            alert('Uw netwerk verbinding is verbroken');
            verlaatKamer();
        }
    });

    return {
        zetGebruikerId: zetGebruikerId,
        laadPagina: laadPagina,
        checkVoorBerichten: checkVoorBerichten,
        downloadChatrooms: downloadChatrooms,

}
}();