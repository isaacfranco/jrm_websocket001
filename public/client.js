const ws = new WebSocket("ws://" + location.host);
        let msg;
        let chat;

        ws.onmessage = (event) => {        
            console.log(event.data);
            const json = JSON.parse(event.data);
            console.log('json', json);
            if (json.type == 'broadcast') {
                chat.innerText += `${json.message}\n`;
            }
        }

        function send() {
            
            ws.send(JSON.stringify({
                type: 'message', 
                message: msg.value
            }));
        }

        window.addEventListener('load', (e) => {
            console.log('load')
            msg = document.getElementById('message');
            chat = document.getElementById('chat');
<<<<<<< HEAD:public/client.js
        });
=======
        });
>>>>>>> f771d0334905366c056a8eddd6aa42d184103e00:cliente.html
