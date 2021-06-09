let VriendenInfoPagina = function () {

    $('#ga-naar-vrienden-pagina').click(function () {
        $('.spa').hide();
        VriendenPagina.showPagina();
        $('#vrienden-pagina').show();
    });

    let toonPagina = function () {
        $('.spa').hide();
        $('#vrienden-info-pagina').show();
    };

    let laadPagina = function (vriendid) {
        if( Netwerk.status() !== 'No network connection' ){
            $('#vip-evenementen').empty();
            let url = "https://robbeh.sinners.be/meventer/toon_info_vriend.php";

            $.getJSON(url, {vriendid: vriendid}).done(function (data) {
                console.log(data);

                for( let i = 0; data.length !== null && i < data.length; i++ ) {
                    if (i === 0) {
                        let naam = (data[i].naam).replace('/"/g', '');
                        $('#vip-naam').text(naam);

                    } else {
                        let evenementen = data[i];
                        if( evenementen !== "null" ) {
                            let evenementid = (data[i].evenementid).replace('/"/g', '');
                            let naam = (data[i].naam).replace('/"/g', '');
                            let straat = (data[i].straat).replace('/"/g', '');
                            let gemeente = (data[i].gemeente).replace('/"/g', '');
                            let landEvenement = (data[i].land).replace('/"/g', '');
                            let startDatum = (data[i].startdatum).replace('/"/g', '');
                            let startUur = (data[i].startuur).replace('/"/g', '');
                            let prijs = (data[i].prijs).replace('/"/g', '');

                            let locatie;
                            let landGebruiker = localStorage.getItem('land');
                            landGebruiker = landGebruiker.substring(1, landGebruiker.length - 1);
                            if (landEvenement === landGebruiker) {
                                locatie = straat + ', ' + gemeente;
                            } else {
                                locatie = straat + ', ' + gemeente + ', ' + landEvenement;
                            }
                            let datum = startDatum + 'vanaf ' + startUur;

                            let evenement = '<div class="evenement" data-show="' + evenementid + '">' +
                                '<h2>' + naam + '</h2>' +
                                '<p>' + locatie + '</p>' +
                                '<p>' + datum + '</p>' +
                                '<p>€' + prijs + '</p>' +
                                '</div>';
                            $('#vip-evenementen').append(evenement);
                        } else {
                            $('#vip-evenementen').append('<p>Deze persoon heeft nog geen evenementen gemaakt.</p>');
                        }
                    }
                }
                $('.evenement').click(function () {
                    let veld = $(this);
                    if (veld.hasClass('evenement')) {
                        let evenementid = parseInt(veld.data('show'));
                        InfoPagina.laadPagina(evenementid, 'vrienden-info-pagina');
                    }
                });
                toonPagina();
            }).fail(function (jqxhr, textStatus, error ) {
                console.log(jqxhr);
                let err = textStatus + ", " + error;
                console.log( "Request Failed: " + err );
                alert("Er ging iets fout bij het ophalen van het evenement.")
            });
        } else {
            alert('Er is geen netwerk verbinding')
        }
    };

    return {
        laadPagina: laadPagina
    };
}();