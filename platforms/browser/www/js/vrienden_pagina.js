let VriendenPagina =function (){

    let rijenAfgedrukt = 0;

    $('#vp-tab-vrienden').click(function () {
        $('#vp-meldingen').hide();
        $('#vp-tab-vrienden').css("border-bottom", "4px solid #0088ee");
        $('#vp-tab-meldingen').css("border-bottom", "1px solid #0088ee");
        $('#vp-vrienden').show();
        toonVrienden();
    });

    let showPagina = function () {
        $('.spa').hide();
        VriendenPagina.toonVrienden();
        $('#vp-zoekbalk').val('');
        $('#vp-div-resultaten').hide();
        $('#vp-div-vrienden-meldingen').show();
        $('#vp-vrienden').show();
        $('#vp-tab-vrienden').css("border-bottom", "4px solid #0088ee");
        $('#vp-meldingen').hide();
        Melding.toonMeldingen();
    };

    let toonVrienden = function () {
        $('#vp-vrienden').empty();
        let vrienden = JSON.parse(localStorage.getItem('vrienden'));

        for( let i = 0; vrienden !== '[]' && i < vrienden.length; i++ ) {
            console.log('toon vrienden');

            let vriendid = (vrienden[i].vriendid).replace('/"/g', '');
            let naam = (vrienden[i].naam);

            let vriend = '<div class="open-chat" data-show="' + vriendid + '">' +
                '<h2>' + naam + '</h2>' +
                '</div>';

            $('#vp-vrienden').append(vriend);
        }
        $('.open-chat').click(function () {
            if( Netwerk.status() !== 'No network connection' ) {
                let vriendid = $(this).data('show');
                let naam = $(this).children('h2').text();
                ChatPagina.laadPagina(vriendid, naam);
            } else {
                alert('De chat is enkel beschikbaar met een netwerk verbinding')
            }
        });
    };

    $('#vp-download-vrienden').click(function () {
        if( Netwerk.status() !== 'No network connection' ) {
            downloadVrienden();
            Melding.toonMeldingen();
            ChatPagina.downloadChatrooms();
        }
    });

    let downloadVrienden = function () {
        if( Netwerk.status() !== 'No network connection' ){
            let gebruikerid = localStorage.getItem('gebruikerid');
            gebruikerid = gebruikerid.substring(1, gebruikerid.length-1);
            let url = "https://robbeh.sinners.be/meventer/download_vrienden.php";

            $.getJSON(url, {gebruikerid: gebruikerid}).done(function (data) {
                localStorage.setItem('vrienden', '[]');
                console.log('download_vrienden');
                console.log(data);

                if(data['result'] !== 'geen bevriend') {
                    for( let i = 0; i < data.length; i++ ) {
                        let vriendid = (data[i].vriendid).replace('/"/g', '');
                        let naam = (data[i].naam).replace('/"/g', '');

                        voegNieuweVriendenToeAanLocalStorage(vriendid, naam);
                    }
                    toonVrienden();
                }
            }).fail(function (jqxhr, textStatus, error ) {
                console.log(jqxhr);
                let err = textStatus + ", " + error;
                console.log( "Request Failed: " + err );
                alert("Er konden geen vrienden gedownload worden.")
            });
        }
    };

    let voegNieuweVriendenToeAanLocalStorage = function (vriendid, naam) {
        let vrienden = localStorage.getItem('vrienden');

        let nieuweVriend = '{"vriendid" : "' + vriendid + '", "naam" : "' + naam + '"}';

        if( vrienden !== '[]' ) {
            let alleVrienden = vrienden.substring(1, vrienden.length-1);
            vrienden = '[' + alleVrienden + ', ' + nieuweVriend + ']';
        } else {
            vrienden = '[' + nieuweVriend + ']';
        }

        localStorage.setItem('vrienden', vrienden);
    };

    let verwijderVriend = function (vriendid, volgKnop) {
        if( Netwerk.status() !== 'No network connection' ) {
            let gebruikerid = localStorage.getItem('gebruikerid');
            gebruikerid = gebruikerid.substring(1, gebruikerid.length-1);
            let url = "https://robbeh.sinners.be/meventer/verwijder_vriend.php";

            $.getJSON(url, {gebruikerid: gebruikerid, vriendid: vriendid}).done(function (data) {
                console.log(data);

                let vrienden = JSON.parse(localStorage.getItem('vrienden'));
                for (let i = 0; i < vrienden.length; i++) {
                    if ((vrienden[i].vriendid) == vriendid) {
                        vrienden.splice(i, 1);
                        console.log(vrienden);
                        localStorage.setItem('vrienden', JSON.stringify(vrienden));
                        break;
                    }
                }
                volgKnop.text('Volgen').removeClass("gevolgd").addClass("ongevolgd");
                toonVrienden();

            }).fail(function (jqxhr, textStatus, error) {
                console.log(jqxhr);
                let err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
                alert("Er ging iets fout bij het verwijderen vrienden.")
            });
        }
    };

    $('#vp-sluit-resultaten').click(function () {
        $('#vp-div-resultaten').hide();
        $('#vp-div-vrienden-meldingen').show();
    });

    $('#vp-zoek-knop').click(function () {
        $('#vp-resultaten').empty();
        rijenAfgedrukt = 0;
        zoekVrienden();
    });

    let zoekVrienden = function () {
        if( Netwerk.status() !== 'No network connection' ){
            let naam = $('#vp-zoekbalk').val();
            if( naam !== '' ) {
                let gebruikerid = localStorage.getItem('gebruikerid');
                gebruikerid = gebruikerid.substring(1, gebruikerid.length-1);
                let url = "https://robbeh.sinners.be/meventer/zoek_vrienden.php";

                $.getJSON(url, {naam: naam, gebruikerid: gebruikerid}).done(function (data) {
                    console.log(data);

                    if( data['result'] !== 'geen mensen gevonden' ) {
                        for (let i = 0; data.length !== null && i < data.length; i++) {

                            let vriendid = (data[i].vriendid).replace('/"/g', '');
                            let naam = (data[i].naam).replace('/"/g', '');
                            //let aantalVolgers = (data[i].aantalVolgers).replace('/"/g', '');
                            //let aantalVolgend = (data[i].aantalVolgend).replace('/"/g', '');

                            let volgKnopText = 'Volgen';
                            let klas = "ongevolgd";
                            let vrienden = JSON.parse(localStorage.getItem('vrienden'));
                            for (let i = 0; i < vrienden.length; i++) {
                                if ((vrienden[i].vriendid) == vriendid) {
                                    volgKnopText = 'Ontvolgen';
                                    klas = "gevolgd";
                                    break;
                                }
                            }
                            let resultaat = '<div class="vp-zoek-result" data-show="' + vriendid + '">' +
                                '<p class="volg-nieuwe-vriend ' + klas + '">' + volgKnopText + '</p>' +
                                '<h2 class="bekijk-vriend">' + naam + '</h2>' +
                                //'<p>Volgers: ' + aantalVolgers + '        ' + aantalVolgend + '</p>' +
                                '</div>';
                            $('#vp-resultaten').append(resultaat);
                        }

                        // knoppen
                        $('.bekijk-vriend').click(function () {
                            let vriendid = $(this).parent().data('show');
                            VriendenInfoPagina.laadPagina(vriendid);          /////////////////////
                        });
                        $('.volg-nieuwe-vriend').click(function () {
                            let volgKnop = $(this);
                            let vriendid = volgKnop.parent().data('show');
                            if (volgKnop.text() === 'Volgen') {
                                Melding.checkVoorVriendschapsverzoeken(vriendid, volgKnop);
                            } else {
                                verwijderVriend(vriendid, volgKnop);
                            }
                        });
                    }
                    $('#vp-div-vrienden-meldingen').hide();
                    $('#vp-div-resultaten').show();
                }).fail(function (jqxhr, textStatus, error) {
                    console.log(jqxhr);
                    let err = textStatus + ", " + error;
                    console.log("Request Failed: " + err);
                    alert("he")
                });
            }
        } else {
            alert('Er is geen netwerk verbinding')
        }
    };

    return {
        voegNieuweVriendenToeAanLocalStorage: voegNieuweVriendenToeAanLocalStorage,
        showPagina: showPagina,
        downloadVrienden: downloadVrienden,
        toonVrienden: toonVrienden,
        verwijderVriend: verwijderVriend
    }
}();