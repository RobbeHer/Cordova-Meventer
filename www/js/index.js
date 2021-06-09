$(function(){
    document.addEventListener("deviceready", onDeviceReady, false);
});

function onDeviceReady() {
    Tijd.init();
    Netwerk.init();
    Login.init();
    console.log('Applicatie geladen.');
}