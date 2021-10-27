const db                = require('./connect.js');
const envi              = process.env.MONGODB_URI || 'mongodb://localhost:27017/data';
const mongoose          = require('mongoose')
const infor             = require('../models/infor');
const User              = require('../models/user.js');
const bcrypt            = require('bcrypt');
const jwt               = require('jsonwebtoken');
var namePath            = __dirname;
const pathWeb           = namePath.slice(0, namePath.length - 7);

db.connect(envi);

class Controller {
    async findBestUser(req, res) {
        const key = await infor.find({});
        res.send({
            bestscore: key[key.length - 1].score,
            bestplayer: key[key.length - 1].name
        });
    }

    async getGuiness(req, res) {
        jwt.verify(req.cookies.token, "deptraioke2003khongnoinhieuakckjskskkjfoo", (err, decoded) => {
            if (err) res.status.json({
                username: "kẻ phá hoại"
            });
            const newGuiness = new infor({
                name: decoded.username,
                score: req.body.highestScore
            })
            newGuiness.save();
        });
    }

    async creatNewAccount(req, res, next) {
        // Check cheater
        if (!req.body.username || !req.body.password) {
            next({mess: "Invalid account"});
            return;
        }
        const user = User.findOne({ username: req.body.username });
        if (user) {
                res.send({ mess: "exist" });
                return;
        }

        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                    next({ error: err });
                    return;
            }
            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                hashpassword: hash
            });

            newUser.save();
            res.send({ mess: "sucess" });
        });
    }

    async verifyAccount(req, res, next) {
        if (!req.body.username || !req.body.password) {
            next({ mess: "Invalid account" })
            return;
        }

        const user = await User.findOne({ username: req.body.username });

        if (!result) {
            res.send({
                mess: "Wrong username"
            });
            return;
        }

        const check = await bcrypt.compare(req.body.password, result.hashpassword);

        if (!check) {
            res.send({ mess: "Wrong password" });
            return;
        }

        const token = await jwt.sign({
            username: req.body.username,
            userId: req.body._id
        },
        "deptraioke2003khongnoinhieuakckjskskkjfoo", {
            expiresIn: "1h"
        });

        res.cookie('token', token, { expires: new Date(Date.now() + 8 * 36000000) });
        res.send({ mess: "sucess" });
    }

    async getUserName(req, res) {
        jwt.verify(req.cookies.token, "deptraioke2003khongnoinhieuakckjskskkjfoo", (err, decoded) => res.send({ username: (err) ? "kẻ phá hoại" : decoded.username }));
    }

    async getGameCanhCut(req, res) {
        jwt.verify(req.cookies.token, "deptraioke2003khongnoinhieuakckjskskkjfoo", (err, decoded) => {
            if (err) res.status(200).send(`HÃY VÀO ĐÚNG LINK NÀO <a href="/"> Link</a>`);
            else res.sendFile(pathWeb + '/html/chimflap.html')
        })
    }
    
    async getWebChat(req, res) {
        jwt.verify(req.cookies.token, "deptraioke2003khongnoinhieuakckjskskkjfoo", (err, decoded) => {
            if (err) res.status(200).send(` Đừng hack web em :(  <a href="/"> Link đăng nhập</a>`);
            else res.sendFile(pathWeb + '/html/web.html')
        })
    }
}
module.exports = new Controller;
