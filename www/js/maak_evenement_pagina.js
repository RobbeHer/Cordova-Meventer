import baseUrl from "./baseUrl";

let eventid;

$('#maak-evenement-knop').click(function () {
    $('#mep-naam').css("border-color", "white");
    $('#mep-straat').css("border-color", "white");
    $('#mep-gemeente').css("border-color", "white");
    $('#mep-start-datum').css("border-color", "white");
    $('#mep-start-uur').css("border-color", "white");
    $('#mep-eind-datum').css("border-color", "white");
    $('#mep-eind-uur').css("border-color", "white");
    $('#mep-prijs').css("border-color", "white");
    $('#mep-details').css("border-color", "white");
    controleerVelden();
});

let controleerVelden = function () {
    let naam = $('#mep-naam').val();
    let gebruikerid = localStorage.getItem('gebruikerid');
    gebruikerid = gebruikerid.substring(1, gebruikerid.length-1);
    let straat = $('#mep-straat').val();
    let gemeente = $('#mep-gemeente').val();
    let land = $('#mep-land').val();
    let startDatum = $('#mep-start-datum').val();
    let startUur = $('#mep-start-uur').val();
    let eindDatum = $('#mep-eind-datum').val();
    let eindUur = $('#mep-eind-uur').val();
    let prijs = $('#mep-prijs').val();
    let details = $('#mep-details').val();

    if( !naam ) {
        $('#mep-naam').css("border-color", "red");
        alert('Er is geen naam opgegeven.')
    } else if( !straat ) {
        $('#mep-straat').css("border-color", "red");
        alert('Er is geen straat opgegeven.')
    } else if( !gemeente ) {
        $('#mep-gemeente').css("border-color", "red");
        alert('Er is geen gemeente opgegeven.')
    } else if( !startDatum ) {
        $('#mep-start-datum').css("border-color", "red");
        alert('Er is geen start datum opgegeven.')
    } else if( !startUur ) {
        $('#mep-start-uur').css("border-color", "red");
        alert('Er is geen start uur opgegeven.')
    } else if( !eindDatum ) {
        $('#mep-eind-datum').css("border-color", "red");
        alert('Er is geen eind datum opgegeven.')
    } else if( !eindUur ) {
        $('#mep-eind-uur').css("border-color", "red");
        alert('Er is geen eind uur opgegeven.')
    } else if( !prijs ) {
        $('#mep-prijs').css("border-color", "red");
        alert('Er is geen prijs opgegeven.')
    } else if( !details ) {
        $('#mep-details').css("border-color", "red");
        alert('Er zijn geen details opgegeven.')
    } else {
        maakEvenement(naam, gebruikerid, straat, gemeente, land, startDatum, startUur, eindDatum, eindUur, prijs, details)
    }
};

let maakEvenement = function(naam, gebruikerid, straat, gemeente, land, startDatum, startUur, eindDatum, eindUur, prijs, details) {
    if( Netwerk.status() !== 'No network connection' ){
        let url = baseUrl + "/maak_evenement_aan.php";

        $.getJSON(url, {naam: naam, gebruikerid: gebruikerid, straat: straat, gemeente: gemeente, land: land, startdatum: startDatum,
                        startuur: startUur, einddatum: eindDatum, einduur: eindUur, prijs: prijs, details: details}).done(function (data) {
            console.log(data);

            let organisator = localStorage.getItem('naam');
            organisator = organisator.substring(1, organisator.length-1);

            let locatie = straat + ', ' + gemeente + ', ' + land;

            console.log(data['result']);
            let evenementid = parseInt(data['result']);
            console.log(evenementid);
            eventid = evenementid;
            stuurFoto();
            OpgeslagenPagina.uploadNaarOpgeslagen(evenementid, naam, organisator, locatie, startDatum,
                startUur, eindDatum, eindUur, prijs, details);

            alert('evenement succesvol gemaakt');
            $('.spa').hide();
            $('#zoek-pagina').show();

        }).fail(function (jqxhr, textStatus, error ) {
            console.log(jqxhr);
            let err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
            alert("Er ging iets fout bij het aanmaken van uw evenement. We raden u aan om uw beschrijving in te korten")
        });
    } else {
        alert('Er is geen netwerk verbinding')
    }
};

/*

   <plugin name="cordova-plugin-camera" spec="^4.1.0">
        <variable name="ANDROID_SUPPORT_V4_VERSION" value="27.+" />
    </plugin>

    */

let stuurFoto = function () {
    alert('De volgende foto die u kiest gaat direct naar de server!');
    navigator.camera.getPicture(uploadPhoto, function(message) {
        alert('get picture failed');
    }, {
        quality: 100,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
    });
};

let camearaOptions = {
    quality: 100,
    destinationType: navigator.camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
};

let getImage = function () {
    navigator.camera.getPicture(uploadPhoto, onError, camearaOptions);
};

let onError = function (err) {
    alert(error);
};

function uploadPhoto(imageURI) {
    let options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    let ft = new FileTransfer();
    let url = baseUrl + "/upload_foto.php?id=" + eventid;
    ft.upload(imageURI, url,
        function(result) {
            console.log(JSON.stringify(result));
        },
        function(error) {
            console.log(JSON.stringify(error));
        }, options);
}