// jquery para interações com a página
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


// Iniciando variável de id
let id = 4;

// Iniciando ajax
// Colocando caminho, método. OBS: Se eu utilizasse o post deveria colocar uma opção de data com um objeto
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

// Pegando dados de formação da pessoa
$.get('/formacao', {id: id}, (res) => {
    // console.log(res);
    for (i = 0; i < res.length; i++) {
        console.log()
        $(`#curso${i}`).text(res[i].Curso);
        $(`#datas${i}`).text(res[i].DataInicio+" - "+res[i].DataFim);
        $(`#descricao-formacao${i}`).text(res[i].Descricao);
    }
    
}, 'json')

// Pegando dados de experiência da pessoa
$.get('/experiencia', {id: id}, (res) => {
    // console.log(res);
    for (i = 0; i < res.length; i++) {
        $(`#nome-experiencia${i}`).text(res[i].Empresa);
        $(`#datas-experiencia${i}`).text(res[i].DataInicio+" - "+res[i].DataFim);
        $(`#cargo-experiencia${i}`).text(res[i].Cargo);
        $(`#descrição-experiencia${i}`).text(res[i].Descricao);
    }
}, 'json')

// Pegando dados de habilidades da pessoa
$.get('/habilidades', {id: id}, (res) => {
    // console.log(res);
    for (i = 0; i < res.length; i++) {
        $(`#li-habilidade${i}`).text(res[i].Título);
    }
}, 'json')

// Pegando dados de personalidade da pessoa
$.get('/personalidade', {id: id}, (res) => {
    // console.log(res);
    for (i = 0; i < res.length; i++) {
        $(`#li-personalidade${i}`).text(res[i].Título);
    }
}, 'json')

// Pegando dados de realizações da pessoa
$.get('/realizacoes', {id: id}, (res) => {
    // console.log(res);
    for (i = 0; i < res.length; i++) {
        $(`#nome-realizacao${i}`).text(res[i].Título);
        $(`#data-realizacao${i}`).text(res[i].Data);
        $(`#descricao-realizacao${i}`).text(res[i].Descricao);
    }
}, 'json')