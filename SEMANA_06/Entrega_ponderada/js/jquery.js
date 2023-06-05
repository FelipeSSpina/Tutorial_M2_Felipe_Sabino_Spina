$(document).ready(() => {
    $('#botaoJquery').click(() => {
      $('#mensagem').text('Você clicou');
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