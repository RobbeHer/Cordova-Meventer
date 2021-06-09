let OpgeslagenPagina = function () {

    let toonOpgeslagenEvenementen = function(){
        $('#opgeslagen-pagina').empty();
        let opgeslagen = JSON.parse(localStorage.getItem('opgeslagen'));

        for( let i = 0; opgeslagen !== '[]' && i < opgeslagen.length; i++ ) {
            console.log('toon evenement');

            let evenementid = (opgeslagen[i].evenementid).replace('/"/g', '');
            let naam = (opgeslagen[i].naam);
            let organisator = (opgeslagen[i].organisator);
            let locatie = (opgeslagen[i].locatie);
            let startDatum = (opgeslagen[i].startdatum);
            let startUur = (opgeslagen[i].startuur);
            //let eindDatum = (opgeslagen[i].einddatum).replace('/"/g', '');
            //let eindUur = (opgeslagen[i].einduur).replace('/"/g', '');
            let beginDatum = startDatum + ' vanaf ' + startUur;
            let prijs = (opgeslagen[i].prijs);
            let details = (opgeslagen[i].details);

            let evenement = '<div class="opgeslagen">' +
                                '<p class="op-verwijderen" data-show="' + evenementid + '">verwijderen</p>' +
                                '<h3 class="op-toon-alle-info" data-show="' + evenementid + '">' + naam + "\t" +
                                    '<img src="img/info-icon.svg" alt="Info: " width="12px" height="12px"></h3>' +
                                '<p><img src="img/clock-icon.svg" alt="Datum: " width="20px" height="20px">     ' + beginDatum + '</p>' +
                                '<p class="op-toggle-div-meer">Toon meer</p>' +
                                '<div class="op-div-meer">' +
                                    '<p><img src="img/compass-icon.svg" alt="Locatie: " width="20px" height="20px">     ' + locatie + '</p>' +
                                    '<table><tr><td><p>Door:</p>' +
                                    '</td><td><p>' + organisator + '</p>' +
                                    '</td></tr><tr><td><p>Inkom:</p>' +
                                    '</td><td><p>€' + prijs + '</p>' +
                                    '</td></tr></table>' +
                                    '<p class="op-toggle-details">Toon details</p>' +
                                    '<p class="op-details">' + details + '</p>' +
                                    '<p class="op-sluiten">Sluiten</p>' +
                                '</div>' +
                            '</div>';

            $('#opgeslagen-pagina').append(evenement);

        }

        // knoppen

        $('.op-div-meer').toggle();
        $('.op-details').toggle();

        $('.op-toon-alle-info').click(function () {
            if( Netwerk.status !== 'No network connection' ) {
                let evenementid = $(this).data('show');
                InfoPagina.laadPagina(evenementid, 'opgeslagen-pagina');
            } else {
                alert('U kunt de INFO PAGINA enkel bezoeken met een internet verbinding.')
            }
        });

        $('.op-verwijderen').click(function () {
            let evenementid = $(this).data('show');
            verwijderVanOpgeslagen(evenementid);
        });
        $('.op-toggle-div-meer').click(function () {
            if( $(this).text() === 'Toon meer' ) {
                $(this).text('Toon minder');
            } else {
                $(this).text('Toon meer');
            }
            $(this).siblings( ".op-div-meer" ).toggle();
        });
        $('.op-toggle-details').click(function () {
            if( $(this).text() === 'Toon details' ) {
                $(this).text('Verberg details');
            } else {
                $(this).text('Toon details');
            }
            $(this).siblings( ".op-details" ).toggle();
        });
        $('.op-sluiten').click(function () {
            let div = $(this).parent();
            let knop = div.siblings('.op-toggle-div-meer');
            if( knop.text() === 'Toon meer' ) {
                knop.text('Verberg details');
            } else {
                knop.text('Toon details');
            }
            div.toggle();
        });
    };


    // voeg evenement toe aan localstorage

    let voegToeAanOpgeslagen = function (evenementid, naam, organisator, locatie, startDatum,
                                         startUur, eindDatum, eindUur, prijs, details) {

        let opgeslagen = localStorage.getItem('opgeslagen');
        console.log(opgeslagen);

        let nieuwEvenement = '{"evenementid" : "' + evenementid + '", "naam" : "' + naam + '", "organisator" : "' + organisator + '", "locatie" : "' + locatie + '", "startuur": "' + startUur + '", "startdatum": "' + startDatum + '", "einduur": "' + eindUur + '", "einddatum": "' + eindDatum + '", "prijs": "' + prijs + '", "details": "' + details + '"}';

        if( opgeslagen !== '[]' ) {
            let alleEvenementen = opgeslagen.substring(1, opgeslagen.length-1);
            opgeslagen = '[' + alleEvenementen + ', ' + nieuwEvenement + ']';
        } else {
            opgeslagen = '[' + nieuwEvenement + ']';
        }

        console.log(opgeslagen);
        localStorage.setItem('opgeslagen', opgeslagen);
        console.log(JSON.parse(localStorage.getItem('opgeslagen')));

    };

    let verwijderVanOpgeslagen = function (evenementid) {
        if( confirm('Bent u zeker dat u dit evenement wilt verwijderen?') ) {
            if( Netwerk.status() !== 'No network connection' ){

                let gebruikerid = localStorage.getItem('gebruikerid');
                gebruikerid = gebruikerid.substring(1, gebruikerid.length-1);
                let url = "https://robbeh.sinners.be/meventer/verwijder_van_opgeslagen.php";

                $.getJSON(url, {evenementid: evenementid, gebruikerid: gebruikerid}).done(function (data) {
                    console.log(data);

                    let opgeslagen = JSON.parse(localStorage.getItem('opgeslagen'));
                    for( let i = 0; i < opgeslagen.length; i++ ) {
                        if ((opgeslagen[i].evenementid) == evenementid) {
                            opgeslagen.splice(i, 1);
                            console.log(opgeslagen);
                            localStorage.setItem('opgeslagen', JSON.stringify(opgeslagen));
                            $('#ip-opslaan').text('+ opslaan');
                            break;
                        }
                    }
                    toonOpgeslagenEvenementen();
                }).fail(function (jqxhr, textStatus, error ) {
                    console.log(jqxhr);
                    let err = textStatus + ", " + error;
                    console.log( "Request Failed: " + err );
                    alert("Er konden geen evnement verwijderd worden.");
                });
            } else {
                alert('Er is geen netwerk verbinding');
            }
        }
    };

    // download opgeslagen van server, daarna voeg toe aan localstorage

    let downloadOpgeslagen = function () {
        if( Netwerk.status() !== 'No network connection' ){
            let gebruikerid = localStorage.getItem('gebruikerid');
            gebruikerid = gebruikerid.substring(1, gebruikerid.length-1);
            let url = "https://robbeh.sinners.be/meventer/download_opgeslagen.php";

            $.getJSON(url, {gebruikerid: gebruikerid}).done(function (data) {
                localStorage.setItem('opgeslagen', '[]');
                console.log('download_opgeslagen');
                console.log(data);

                if(data['result'] !== 'geen opgeslagen') {
                    for( let i = 0; i < data.length; i++ ) {
                        let evenementid = (data[i].evenementid).replace('/"/g', '');
                        let naam = (data[i].naam).replace('/"/g', '');
                        let organisator = (data[i].organisator).replace('/"/g', '');
                        let straat = (data[i].straat).replace('/"/g', '');
                        let gemeente = (data[i].gemeente).replace('/"/g', '');
                        let land = (data[i].land).replace('/"/g', '');
                        let startDatum = (data[i].startdatum).replace('/"/g', '');
                        let eindDatum = (data[i].einddatum).replace('/"/g', '');
                        let startUur = (data[i].startuur).replace('/"/g', '');
                        let eindUur = (data[i].einduur).replace('/"/g', '');
                        let prijs = (data[i].prijs).replace('/"/g', '');
                        let details = (data[i].details).replace('/"^/', '').replace('/"$/', '');

                        let locatie;
                        if (land === localStorage.getItem('land').replace('/"/g', '')) {
                            locatie = straat + ', ' + gemeente;
                        } else {
                            locatie = straat + ', ' + gemeente + ', ' + land;
                        }

                        OpgeslagenPagina.voegToeAanOpgeslagen(evenementid, naam, organisator, locatie, startDatum,
                            startUur, eindDatum, eindUur, prijs, details);
                    }
                }


            }).fail(function (jqxhr, textStatus, error ) {
                console.log(jqxhr);
                let err = textStatus + ", " + error;
                console.log( "Request Failed: " + err );
                alert("Er konden geen evnementen gedownload worden.")
            });
        } else {
            alert('Er is geen netwerk verbinding')
        }
    };

    // upload evenementid naar server voor op te slagen, daarna voeg toe aan localstorage

    let uploadNaarOpgeslagen = function (evenementid, naam, organisator, locatie, startDatum, startUur, eindDatum, eindUur, prijs, details) {
        if( Netwerk.status() !== 'No network connection' ){
            let gebruikerid = localStorage.getItem('gebruikerid');
            gebruikerid = gebruikerid.substring(1, gebruikerid.length-1);
            let url = "https://robbeh.sinners.be/meventer/upload_naar_opgeslagen.php";

            $.getJSON(url, {evenementid: evenementid, gebruikerid: gebruikerid}).done(function (data) {
                console.log(data);

                voegToeAanOpgeslagen(evenementid, naam, organisator, locatie, startDatum, startUur, eindDatum, eindUur, prijs, details);
                $('#ip-opslaan').text('- verwijder');

            }).fail(function (jqxhr, textStatus, error ) {
                console.log(jqxhr);
                let err = textStatus + ", " + error;
                console.log( "Request Failed: " + err );
                alert("Er ging iets fout bij het opslagen van het evenement op de server.  We raden u aan om uw beschrijving in te korten");
            });
        } else {
            alert('Er is geen netwerk verbinding');
        }
    };

    return {
        toonOpgeslagenEvenementen: toonOpgeslagenEvenementen,
        voegToeAanOpgeslagen: voegToeAanOpgeslagen,
        verwijderVanOpgeslagen: verwijderVanOpgeslagen,
        downloadOpgeslagen: downloadOpgeslagen,
        uploadNaarOpgeslagen: uploadNaarOpgeslagen
    };
}();