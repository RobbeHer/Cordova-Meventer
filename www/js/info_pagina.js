import baseUrl from "./baseUrl";

let InfoPagina = function () {

    let evenementid;
    let foto;
    let naam;
    let organisator;
    let straat;
    let gemeente;
    let land;
    let startDatum;
    let eindDatum;
    let startUur;
    let eindUur;
    let prijs;
    let details;
    let locatie;
    let pagina = '';

    let maakPagina = function (tekst) {
        pagina = tekst
    };

    $('.ga-naar-zoek-pagina').click(function () {
        $('.spa').hide();
        $('#' + pagina).show();
    });

    $('#ip-toon-meer-informatie').click(function() {
        $(this).hide();
        $('#ip-verberg-informatie').show();
        $('#ip-beschrijving').css("height", "auto");
        $('#ip-details').removeClass('pullquote extra');
    });

    $('#ip-verberg-informatie').click(function() {
        $(this).hide();
        $('#ip-toon-meer-informatie').show();
        $('#ip-beschrijving').css("height", "150px");
        $('#ip-details').addClass('pullquote extra');
    });

    $('#ip-opslaan').click(function () {
        if( $(this).text() === '+ opslaan' ) {
            OpgeslagenPagina.uploadNaarOpgeslagen(evenementid, naam, organisator, locatie, startDatum, startUur, eindDatum, eindUur, prijs, details);
        } else {
            OpgeslagenPagina.verwijderVanOpgeslagen(evenementid);
        }
    });

    let laadPagina = function (id, pagina) {
        if( Netwerk.status() !== 'No network connection' ){
            maakPagina(pagina);
            let url = baseUrl + "/info_evenement.php";

            $.getJSON(url, {evenementid: id}).done(function (data) {
                console.log(data);

                evenementid = id;
                foto = (data[0].foto).replace('/"/g', '');
                naam = (data[0].naam).replace('/"/g', '');
                organisator = (data[0].organisator).replace('/"/g', '');
                straat = (data[0].straat).replace('/"/g', '');
                gemeente = (data[0].gemeente).replace('/"/g', '');
                land = (data[0].land).replace('/"/g', '');
                startDatum = (data[0].startdatum).replace('/"/g', '');
                eindDatum = (data[0].einddatum).replace('/"/g', '');
                startUur = (data[0].startuur).replace('/"/g', '');
                eindUur = (data[0].einduur).replace('/"/g', '');
                prijs = (data[0].prijs).replace('/"/g', '');
                details = (data[0].details).replace('/"^/', '').replace('/"$/', '');

                if( land === localStorage.getItem('land').replace('/"/g', '')) {
                    locatie = straat + ', ' + gemeente;
                } else {
                    locatie = straat + ', ' + gemeente + ', ' + land;
                }
                let datumStart = startDatum + ' vanaf ' + startUur;
                let datumEinde = eindDatum + ' : ' + eindUur;

                bouwPagina(datumStart, datumEinde);

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
    
    let bouwPagina = function (datumStart, datumEinde) {
        $('#ip-foto').css("background-image", "url(" + baseUrl + "/fotos/" + foto);
        $('#ip-verberg-informatie').hide();
        $('#ip-naam').text(naam);
        $('#ip-organisator').text('Georganiseerd door ' + organisator);
        $('#ip-prijs').text('Inkom: €' + prijs);
        $('#ip-datum-start').text(datumStart);
        $('#ip-datum-einde').text(datumEinde);
        $('#ip-locatie').text(locatie);
        $('#ip-details').text(details);
        $('#ip-opslaan').text('+ opslaan');

        // check if evenement is in localstorage
        let opgeslagen = JSON.parse(localStorage.getItem('opgeslagen'));
        for( let i = 0; i < opgeslagen.length; i++ ) {
            if ((opgeslagen[i].evenementid) == evenementid) {
                $('#ip-opslaan').text('- verwijder');
                break;
            }
        }

        $('.spa').hide();
        $('#info-pagina').show();
    };

    return {
        laadPagina: laadPagina
    };
}();