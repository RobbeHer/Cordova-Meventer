let Tijd = function () {

    let datum = new Date();
    let dd;
    let MM;
    let yyyy;

    let init = function () {
        datum = new Date();
    };

    let resetDatum = function () {
        dd = datum.getDate();
        MM = datum.getMonth();
        yyyy = datum.getFullYear();
    };

    let timestampVorigeDag = function (mysqlDate) {
        let t = mysqlDate.split(/[- :]/);
        let timestamp = new Date(t[0], t[1] - 1, t[2], t[3]);
        timestamp.setDate(timestamp.getDate() - 1);
        console.log('nieuwe vorige dag');
        console.log(timestamp);
        return timestamp;
    };

    let datumVandaag = function () {
        resetDatum();
        return yyyy + "-" +(MM+1) + "-" + dd;
    };

    let datumMorgen = function () {
        resetDatum();
        return yyyy + "-" +(MM+1) + "-" + (dd+1);
    };

    let uurNu = function () {
        resetDatum();
        return datum.getHours() + ':' + datum.getMinutes();
    };

    return {
        init: init,
        timestampVorigeDag: timestampVorigeDag
    }
}();