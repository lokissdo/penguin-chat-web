var socket = io();
        var messages = document.getElementById('messages');
        var form = document.getElementById('form');
        var input = document.getElementById('input');
        var tagCountUser=document.getElementsByClassName('Room__count--user')[0];
        var user = {};
        user.name = prompt("Nhap ten cua ban");
        if (!user.name) user.name = "người ẩn danh"
            /// fake participation
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
            item.innerHTML = `<div class="con__chat--icon"> <i class="fas fa-${key.icon}  chat--icon"></i></div> <div class="con__chat--user"><h3 class="chat__user--name"> ${key.name}</div></h3> <h4 class="chat__content"> - ${key.message} </h4>`;
            messages.appendChild(item);
           
        });
        /// log user being out
        socket.on('out', (key,{count}) => {
                var item = document.createElement('li');
                item.innerHTML = `${key.name}  da thoat`;
                tagCountUser.innerText=count;
                messages.appendChild(item);
            })
            /// notify new user and assign new user's id
        socket.on('join', (res,{count}) => {

            if (user.id == undefined) /// here  comparing every user to check new user
            {
                user.id = socket.id;
                user.icon = res.icon;
                socket.emit('push', user)
            }
            var item = document.createElement('li');
            item.innerHTML = `${res.name} da vao room`;
            tagCountUser.innerText=`${count}`;
            messages.appendChild(item);
        })