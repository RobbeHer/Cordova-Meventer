$('.navigatie-knop').click(function () {
    $('.spa').hide();
    let pagina = $(this).data('show');
    if( pagina === 'opgeslagen-pagina' ) {
        OpgeslagenPagina.toonOpgeslagenEvenementen();
    } else if( pagina === 'vrienden-pagina' ) {
        VriendenPagina.showPagina();
    }
    $('#' + pagina).show();
});