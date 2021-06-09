let Netwerk = function () {

    let init = function(){
        setInterval(controleerVerbinding, 3000);
    };

    let status = function(){
        let networkState = navigator.connection.type;
        let states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';
        return states[networkState];
    };

    let controleerVerbinding = function(){
        if (status() === "No network connection") {
            console.error('Geen netwerk.');
            $('#netwerk-fout').show();
        } else {
            if( localStorage.getItem('vrienden') !== null || localStorage.getItem('vrienden') === '[]' ) {
                ChatPagina.checkVoorBerichten();
            }
            $('#netwerk-fout').hide();
        }
    };

    return {
        init: init,
        status: status
    };
}();