// jQUERY

$(document).ready(function() {
    $('#formacao').click( function() {
        $('.formacao div').slideToggle();
    })

            
})



$(document).ready(function(){
    $('#experiencia').click( function() {
        $('.experiencia div').hide();
    })

    $('#experiencia').click( function() {
        $('.experiencia div').slideToggle();
    })
})


// Início da variável

let id = 4;

// AJAX . AQUI REALIZEI A UTILIZAÇÃO DO AJAX

// CAMINHO E O MÉTODO

$.ajax({
    url: `atualizaPessoas?id=${id}`,
    method: 'get'
}).done(data => {
    console.log(data);
    data.map(user => {
        $('#userName').text(user.NomePessoas);
        $('#userCargo').text(user.Cargo);
        $('#endereco').text(user.Endereco);
        $('#telefone').text(user.Telefone);
        $('#email').text(user.Email);
        $("#descricao-sobre-mim").text(user.Descricao);
    })
})


// DADOS DE FORMAÇÃO
$.get('/formacao', {id: id}, (res) => {
    // console.log(res);
    for (i = 0; i < res.length; i++) {
        console.log()
        $(`#curso${i}`).text(res[i].Curso);
        $(`#datas${i}`).text(res[i].DataInicio+" - "+res[i].DataFim);
        $(`#descricao-formacao${i}`).text(res[i].Descricao);
    }
    
}, 'json')


// DADOS DE EXPERIÊNCIA
$.get('/experiencia', {id: id}, (res) => {
    // console.log(res);
    for (i = 0; i < res.length; i++) {
        $(`#nome-experiencia${i}`).text(res[i].Empresa);
        $(`#datas-experiencia${i}`).text(res[i].DataInicio+" - "+res[i].DataFim);
        $(`#cargo-experiencia${i}`).text(res[i].Cargo);
        $(`#descrição-experiencia${i}`).text(res[i].Descricao);
    }
}, 'json')

// DADOS DE HABILIDADE
$.get('/habilidades', {id: id}, (res) => {
    // console.log(res);
    for (i = 0; i < res.length; i++) {
        $(`#li-habilidade${i}`).text(res[i].Título);
    }
}, 'json')

// DADOS DE PERSONALIDADE
$.get('/personalidade', {id: id}, (res) => {
    // console.log(res);
    for (i = 0; i < res.length; i++) {
        $(`#li-personalidade${i}`).text(res[i].Título);
    }
}, 'json')

// DADOS DE REALIZAÇÕES
$.get('/realizacoes', {id: id}, (res) => {
    // console.log(res);
    for (i = 0; i < res.length; i++) {
        $(`#nome-realizacao${i}`).text(res[i].Título);
        $(`#data-realizacao${i}`).text(res[i].Data);
        $(`#descricao-realizacao${i}`).text(res[i].Descricao);
    }
}, 'json')