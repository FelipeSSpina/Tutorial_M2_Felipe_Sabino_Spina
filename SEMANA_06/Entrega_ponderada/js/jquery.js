

$(document).ready(() => {
    $('#botaoJquery').click(() => {
      $('#mensagem').text('FOI CLICADO');
    });
});




$(document).ready(() => {
    $('#botaoMostrar').click(() => {
      $('#elemento').show();
    });
    
    $('#botaoEsconder').click(() => {
      $('#elemento').hide();
    });
});