(function() {
    var socket = io();
    var messages = document.getElementById('messages');
    var form = document.getElementById('form');
    var input = document.getElementById('input');
    var tagCountUser = document.getElementsByClassName('Room__count--user')[0];
    var user = {};

    fetch('/inputuser', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            // get the response from the server GET request
            user.name = data.username;
            socket.emit("fakejoin", user.name);
            // add  submit event
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                if (input.value) {
                    socket.emit('chat message', {
                        icon: user.icon,
                        name: user.name,
                        message: input.value
                    });
                    input.value = '';
                }
            });
            
            // log user's message
            socket.on('chat message', function(key) {
                var item = document.createElement('li');
                item.classList.add('container--chat')
                item.innerHTML = `<div class="con__chat--icon"> <img src="icon/${key.icon}.png" class=" chat--icon"></div> <div class="con__chat--user"><h3 class="chat__user--name"> ${key.name}</div></h3> <span class="chat__content"> - ${key.message} </span>`;
                messages.appendChild(item);
                window.scrollTo(0, document.body.scrollHeight);
            });

            // log user being out
            socket.on('out', (key, { count }) => {
                var item = document.createElement('li');
                item.innerHTML = `${key.name}  da thoat`;
                tagCountUser.innerText = count;
                messages.appendChild(item);
                window.scrollTo(0, document.body.scrollHeight);
            });

            // notify new user and assign new user's id
            socket.on('join', (res, { count }) => {
                // here  comparing every user to check new user
                if (!user.id) {
                    user.id = socket.id;
                    user.icon = res.icon;
                    socket.emit('push', user);
                }

                let item = document.createElement('li');
                item.innerHTML = `${res.name} da vao room`;
                tagCountUser.innerText = `${count}`;
                messages.appendChild(item);
                window.scrollTo(0, document.body.scrollHeight);
            });
        });
}());
