let ZoekPagina = function () {

    $('#ga-naar-maak-evenement-pagina').click(function () {
        $('.spa').hide();
        let land = localStorage.getItem('land');
        land = land.substring(1, land.length-1);
        $('#mep-land').val(land);
        $('#maak-evenement-pagina').show();
    });

    $('#zp-knop').click(function () {
        if( Netwerk.status() !== 'No network connection' ){
            let naam = $('#zp-zoekbalk').val();
            if( naam !== '' ) {
                $('#zp-resultaten').empty();
                let url = "https://robbeh.sinners.be/meventer/zoek_evenementen.php";

                $.getJSON(url, {naam: naam}).done(function (data) {
                    console.log(data);

                    if (data['result'] !== 'geen evenementen gevonden') {
                        for (let i = 0; data.length !== null && i < data.length; i++) {
                            let evenementid = (data[i].evenementid).replace('/"/g', '');
                            let naam = (data[i].naam).replace('/"/g', '');
                            let straat = (data[i].straat).replace('/"/g', '');
                            let gemeente = (data[i].gemeente).replace('/"/g', '');
                            let landEvenement = (data[i].land).replace('/"/g', '');
                            let startDatum = (data[i].startdatum).replace('/"/g', '');
                            let startUur = (data[i].startuur).replace('/"/g', '');
                            let prijs = (data[i].prijs).replace('/"/g', '');

                            let locatie = straat + ', ' + gemeente + ', ' + landEvenement;
                            let datum = startDatum + ' vanaf ' + startUur;

                            let evenement = '<div class="evenement" data-show="' + evenementid + '">' +
                                '<h3>' + naam + '</h3>' +
                                '<hr>' +
                                '<table>' +
                                '    <tr>' +
                                '        <td><p class="vet">locatie:  </p></td>' +
                                '        <td><p>' + locatie + '</p></td>' +
                                '    </tr>' +
                                '    <tr>' +
                                '        <td><p class="vet">datum:  </p></td>' +
                                '        <td><p>' + datum + '</p></td>' +
                                '    </tr>' +
                                '    <tr>\n' +
                                '        <td><p class="vet">prijs:  </p></td>' +
                                '        <td><p>€ ' + prijs + '</p></td>' +
                                '    </tr>\n' +
                                '</table>' +
                                '</div>';
                            $('#zp-resultaten').append(evenement);
                        }

                        $('.evenement').click(function () {
                            let veld = $(this);
                            if (veld.hasClass('evenement')) {
                                let evenementid = parseInt(veld.data('show'));
                                InfoPagina.laadPagina(evenementid, 'zoek-pagina');
                            }
                        });
                    }

                }).fail(function (jqxhr, textStatus, error) {
                    console.log(jqxhr);
                    let err = textStatus + ", " + error;
                    console.log("Request Failed: " + err);
                    alert("Er ging iets fout bij het ophalen van het evenement.")
                });
            }
        } else {
            alert('Er is geen netwerk verbinding')
        }
    });

    return {
    };
}();