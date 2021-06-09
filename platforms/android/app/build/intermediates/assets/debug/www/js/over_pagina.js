$('#log-out').click(function () {
    localStorage.clear();
    $('.spa').hide();
    $('#navigatie-balk').hide();
    $('#login-pagina').show();
});

$('#bekijk-eigen-account').click(function () {
    let gebruikerid = localStorage.getItem('gebruikerid');
    gebruikerid = gebruikerid.substring(1, gebruikerid.length-1);
    VriendenInfoPagina.laadPagina(gebruikerid);
});