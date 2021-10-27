const express           = require('express');
const app               = express();
const server            = require('http').createServer(app);
const { Server }        = require("socket.io");
const io                = new Server(server);
const path              = require('path');
const sockett           = require('./router/sockett.js');
const Controller        = require('./router/controller.js');
const cookieParser      = require('cookie-parser');
const PORT              = process.env.PORT || 3000;

require('./router/resource').init(arrIcons);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// cookieParser middleware
var arrIcons    = [];
var arr         = [];
var posArrI     = 0;

app.get('/', (req, res) => res.sendFile(__dirname + '/html/login.html'));
app.post('/', Controller.getWebChat);

app.get('/flappycanhcut', Controller.getGameCanhCut);

app.get('/input', Controller.findBestUser);
app.get('/inputuser', Controller.getUserName);

app.post('/guinness', Controller.getGuiness);

app.post('/api/signin', Controller.verifyAccount);
app.post('/api/signup', Controller.creatNewAccount);

sockett(io,arr,posArrI,arrIcons);

app.use((err,req,res,next) => {
    if (err) res.status(400).send(`${err} <br> Quay về trang chủ nào <a href="/">HERE </a> `);
});

app.use('/',(req,res,next) => res.status(404).send(`Sai đường dẫn rồi <br> Quay về trang chủ nào <a href="/">HERE </a>`))

server.listen(PORT, () => console.log(`listening on *: http://localhost:${PORT}`));
