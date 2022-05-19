const ws = new WebSocket("ws://" + location.host);
let msg;
let chat;
let username; // nome do usuário

ws.onmessage = (event) => {        
    console.log(event.data);
    const json = JSON.parse(event.data);
    console.log('json', json);
    if (json.type == 'broadcast') {
        // cria a mensagem na tela.
        const divMensagemLinha = document.createElement("DIV");
        const divMensagemNomePessoa = document.createElement("DIV");
        const divMensagemConteudo = document.createElement("DIV");
        
        divMensagemNomePessoa.className = "nome-pessoa";
        
        if (json.username == username.value) {
            divMensagemLinha.className = "mensagem-usuario";
            divMensagemNomePessoa.innerHTML = "Você: ";
        } else {
            divMensagemLinha.className = "mensagem-outro";
            divMensagemNomePessoa.innerHTML = `${json.username}: `;
        } 

        divMensagemConteudo.innerHTML = json.message;

        divMensagemLinha.appendChild(divMensagemNomePessoa);
        divMensagemLinha.appendChild(divMensagemConteudo);
        
        chat.appendChild(divMensagemLinha);        
    }
}

// Função para enviar mensagem que é executada quando se clica no botão
function send() {
    // verifica se o campo de texto da mensagem está vazio
    if (username.value == "") {
        alert("Por favor, digite um nome de usuário!");
        username.focus();
        return;
    }

    // verifica se a mensagem está vazia
    if (msg.value == "") {
        alert("Por favor, digite uma mensagem!");
        msg.focus();
        return;
    }

    // Envia o texto digitado para o servidor pelo WebSocket (Um objeto convertido para string)
    ws.send(JSON.stringify({
        type: 'message', 
        username: username.value,
        message: msg.value
    }));

    // Limpa o campo de texto da mensagem
    msg.value = '';
    // foca no campo de texto da mensagem para digitar a próxima
    msg.focus();
}

// Função para enviar mensagem que é executada quando se aperta Enter no campo de texto da mensagem
function pressionouTecla(event) {
    if (event.keyCode == 13) { // 13 é o código para a tecla Enter
        send(); // Envia a mensagem
    }
}

window.addEventListener('load', (e) => {
    console.log('load')
    username = document.getElementById('username');
    msg = document.getElementById('message');
    chat = document.getElementById('chat');
});

