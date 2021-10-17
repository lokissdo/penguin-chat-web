const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var arrIcons = [];
var posArrI = 0;
arrIcons.push("dog");
arrIcons.push("hippo");
arrIcons.push("paw");
arrIcons.push("otter");
arrIcons.push("kiwi-bird");
arrIcons.push("horse-head");
arrIcons.push("spider");
arrIcons.push("horse");
arrIcons.push("crow");
arrIcons.push("dragon");
arrIcons.push("cat");
var arr = [];
var bestscore=0;
var  bestplayer="chủ game";
app.get('/flappycanhcut',(req,res)=>
{
    res.sendFile(__dirname + '/chimflap.html')
})
app.post('/guinness',(req,res)=>
{
     bestscore=req.body.highestScore;
     bestplayer=req.body.username;    
})
app.get('/input',(req,res)=>
{
    res.send({bestscore,bestplayer});
})
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
//setInterval(()=>{console.log(io.engine.clientsCount)},3000);
// emit message to all users
io.on('connection', (socket) => {
    socket.on('chat message', (key) => {
        io.emit('chat message', key);
    });
    socket.on('disconnect', () => {
            var res = arr.find(e => e.id === socket.id);
            io.emit('out', res,{count:io.engine.clientsCount})
        })
        /// push new user after assign id
    socket.on('push', (key) => {
            arr.push(key)

        })
        /// recall join to assign socket.id to new user
    socket.on('fakejoin', (name) => {
        io.emit('join', {
            name: name,
            icon: arrIcons[posArrI]
        },{count:io.engine.clientsCount})
        if (posArrI == arrIcons.length - 1) posArrI = 0;
        else posArrI++;
    
    })
    socket.on('request best-score',()=>{
        console.log("đã nghe");
        io.emit('best-score',{bestscore,bestplayer});
    })
    // không cần real-tỉme
    // socket.on("guinness",({highestScore,username})=>{
    //     bestscore=highestScore;
    //      bestplayer=username});
});

server.listen(process.env.PORT||3000, () => {
    console.log('listening on *: http://localhost:3000');
});
