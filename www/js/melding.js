import baseUrl from "./baseUrl";

let Melding = function () {

    $('#vp-tab-meldingen').click(function () {
        $('#vp-vrienden').hide();
        $('#vp-tab-vrienden').css("border-bottom", "1px solid #0088ee");
        $('#vp-tab-meldingen').css("border-bottom", "4px solid #0088ee");
        $('#vp-meldingen').show();
    });

    let toonMeldingen = function () {
        $('#vp-meldingen').empty();
        if( Netwerk.status() !== 'No network connection' ){
            let gebruikerid = localStorage.getItem('gebruikerid');
            gebruikerid = gebruikerid.substring(1, gebruikerid.length-1);

            let url = baseUrl + "/check_voor_meldingen.php";

            $.getJSON(url, {gebruikerid: gebruikerid}).done(function (data) {
                console.log(data);

                if( data['result'] !== 'geen meldingen gevonden' ) {

                    $('#vp-tab-meldingen').text('Nieuwe meldingen');

                    for (let i = 0; i < data.length; i++) {
                        let meldingid = (data[i].meldingid).replace('/"/g', '');
                        let vriendid = (data[i].vriendid).replace('/"/g', '');
                        let naamvriend = (data[i].naamvriend).replace('/"/g', '');

                        let melding = '<div class="melding" data-show="' + meldingid + '">' +
                            '<h3 class="text" data-show="' + vriendid + '" data-show2="' + naamvriend + '">' + naamvriend + ' wilt jou toevoegen als vriend.</h3>' +
                            '<div class="nav-knoppen">' +
                            '<p class="melding-knop accepteer-vv-verzoek">Accepteer</p>' +
                            '<p class="melding-knop bekijk-account">Bekijk account</p>' +
                            '<p class="melding-knop weiger-vv-verzoek">Weiger</p>' +
                            '</div>' +
                            '</div>';
                        $('#vp-meldingen').append(melding);
                    }

                    // knoppen
                    $('.accepteer-vv-verzoek').click(function () {
                        let meldingid = $(this).parent().parent().data('show');
                        let vriendid = $(this).parent().siblings('.text').data('show');
                        let naamvriend = $(this).parent().siblings('.text').data('show2');
                        beantwoordVriendschapsverzoek(meldingid, vriendid, naamvriend, 'geaccepteerd');
                        ChatPagina.downloadChatrooms();
                    });
                    $('.weiger-vv-verzoek').click(function () {
                        let meldingid = $(this).parent().parent().data('show');
                        let vriendid = $(this).parent().siblings('.text').data('show');
                        let naamvriend = $(this).parent().siblings('.text').data('show2');
                        beantwoordVriendschapsverzoek(meldingid, vriendid, naamvriend, 'geweigerd');
                    });
                    $('.bekijk-account').click(function () {
                        let vriendid = $(this).parent().siblings('.text').data('show');
                        VriendenInfoPagina.laadPagina(vriendid);
                    });
                    $('.melding-knop').click(function () {
                        $('#vp-tab-meldingen').text('Meldingen');
                        let melding = $(this).parent().parent();
                        melding.remove();
                    });
                }


            }).fail(function (jqxhr, textStatus, error) {
                console.log(jqxhr);
                let err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
                //alert("Er ging iets fout bij het ophalen van mogelijke meldingen.")
            });
        }
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////

    let stuurVriendschapsverzoek = function (vriendid, volgKnop) {
        if( Netwerk.status() !== 'No network connection' ) {
            let gebruikerid = localStorage.getItem('gebruikerid');
            gebruikerid = gebruikerid.substring(1, gebruikerid.length-1);
            let url = baseUrl + "/stuur_vriendschapsverzoek.php";

            $.getJSON(url, {gebruikerid: gebruikerid, vriendid: vriendid}).done(function (data) {
                console.log(data);

                volgKnop.text('Ontvolgen').removeClass("ongevolgd").addClass("gevolgd");

            }).fail(function (jqxhr, textStatus, error) {
                console.log(jqxhr);
                let err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
                alert("Er ging iets fout bij het sturen van vv")
            });
        }
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////

    let checkVoorVriendschapsverzoeken = function (vriendid, volgKnop) {
        if( Netwerk.status() !== 'No network connection' ) {
            let gebruikerid = localStorage.getItem('gebruikerid');
            gebruikerid = gebruikerid.substring(1, gebruikerid.length-1);
            let url = baseUrl + "/check_voor_vriendschapsverzoek.php";

            $.getJSON(url, {vriendid: vriendid, gebruikerid: gebruikerid}).done(function (data) {
                console.log(data);

                if( data['result'] !== 'geen vriendschapsverzoek gevonden' ){
                    volgKnop.text('Ontvolgen').removeClass("ongevolgd").addClass("gevolgd");
                    let naam = data[0].naam;
                    beantwoordVriendschapsverzoek(data[0].meldingid, vriendid, naam, 'geaccepteerd');
                } else {
                    stuurVriendschapsverzoek(vriendid, volgKnop);
                }

            }).fail(function (jqxhr, textStatus, error) {
                console.log(jqxhr);
                let err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
                alert("Er ging iets fout bij het check van vv")
            });
        }
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////

    let beantwoordVriendschapsverzoek = function (meldingid, vriendid, naam, knop) {
        if( Netwerk.status() !== 'No network connection' ) {
            let gebruikerid = localStorage.getItem('gebruikerid');
            gebruikerid = gebruikerid.substring(1, gebruikerid.length-1);

            let reactie;
            if( knop === 'geaccepteerd' ) {
                reactie = 'true';
                VriendenPagina.voegNieuweVriendenToeAanLocalStorage(vriendid, naam);
            } else {
                reactie = 'false';
            }

            let url = baseUrl + "/beantwoord_vriendschapsverzoek.php";

            $.getJSON(url, {meldingid: meldingid, reactie: reactie, vriendid: vriendid, gebruikerid: gebruikerid}).done(function (data) {
                console.log(data);

                VriendenPagina.toonVrienden();

            }).fail(function (jqxhr, textStatus, error) {
                console.log(jqxhr);
                let err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
                alert("Er ging iets fout bij het antwoorden")
            });
        }
    };

    return {
        checkVoorVriendschapsverzoeken: checkVoorVriendschapsverzoeken,
        toonMeldingen: toonMeldingen,
        stuurVriendschapsverzoek: stuurVriendschapsverzoek
    };
}();