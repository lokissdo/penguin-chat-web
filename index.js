(function(){
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path')
const sockett=require('./router/sockett.js')
const infor=require('./models/infor')
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const db=require('./router/connect.js');
const envi=process.env.MONGODB_URI||'mongodb://localhost:27017/data';
db.connect(envi);
var arrIcons = [];
var arr = [];
var posArrI = 0;
require('./router/resource').init(arrIcons)
app.get('/flappycanhcut',(req,res)=>
{
    res.sendFile(__dirname + '/chimflap.html')
})
app.get('/input',(req,res)=>
{
    infor.find({})
     .then(key=>{
    res.send({bestscore:key[key.length-1].score,
              bestplayer:key[key.length-1].name});
               })
})
app.post('/guinness',(req,res)=>
{
    const newGuiness=new infor({name:req.body.username,score:req.body.highestScore})
    newGuiness.save();
    
})
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
sockett(io,arr,posArrI,arrIcons);
server.listen(process.env.PORT||3000, () => {
    console.log('listening on *: http://localhost:3000');
});
})()