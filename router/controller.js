const db=require('./connect.js');
const envi=process.env.MONGODB_URI||'mongodb://localhost:27017/data';
db.connect(envi);
const mongoose=require('mongoose')
const infor=require('../models/infor');
const User=require('../models/user.js');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
var namePath=__dirname;
const pathWeb=namePath.slice(0,namePath.length-7)
class Controller
{
   
   findBestUser(req,res)
   {
       infor.find({})
    .then(key=>{
          res.send({bestscore:key[key.length-1].score,
                   bestplayer:key[key.length-1].name});
              })
   }
   getGuiness(req,res)
   {
      jwt.verify(req.cookies.token,"deptraioke2003khongnoinhieuakckjskskkjfoo",(err,decoded)=>
      {
                   if (err)  res.status.json({username:"kẻ phá hoại"});
                   const newGuiness=new infor({name:decoded.username,score:req.body.highestScore})
                   newGuiness.save(); 
                   
      })
   
   }
   creatNewAccount(req,res,next)
   {
      // Check cheater
        if (!req.body.username || !req.body.password )
           next({mess:"Invalid account"})
       else{
          User.findOne({username:req.body.username})
          // check user's existence
          .then(key=>{if (key) {res.send({mess:"exist"}) }
              else
              {
            bcrypt.hash(req.body.password,10,(err,hash)=>{
            if (err)  next({error:err});
            else 
               {
               const newUser=new User({
                 _id: new mongoose.Types.ObjectId(),
                 username:req.body.username,
                 hashpassword:hash
               })
                 newUser.save();   
                 res.send({mess:"sucess"});
         
               }
            })
            }  
         })
    }
   }
    verifyAccount(req,res,next)
    {
    
      if (!req.body.username || !req.body.password )
      next({mess:"Invalid account"})
      else
      {
         User.findOne({username:req.body.username})
            .then(result=>
               {
                  
                  if (!result)  {res.send({mess:"Wrong username"});
                                 return;} 
                  else 
                  {
                     bcrypt.compare(req.body.password,result.hashpassword)
                     .then(check=>
                        {
                           if (check)
                           {
   
                              const token=jwt.sign({
                                 username:req.body.username,
                                 userId: req.body._id
                              },
                             "deptraioke2003khongnoinhieuakckjskskkjfoo",
                              {
                                 expiresIn:"1h"
                              }
                              );
                              res.cookie('token',token, {
                                 expires: new Date(Date.now() + 8 * 36000000) 
                               })
                              res.send({mess:"sucess"})
                           }
                           else 
                           {
                              res.send({mess:"Wrong password"});
                              
                              return;
                           }
                        })
                    .catch(err=>res.status(400).json({message:err}))
                  }
               })
          .catch(err=>res.status(400).json({message:err}))
               

      }
    }
    getUserName(req,res)
    {

       jwt.verify(req.cookies.token,"deptraioke2003khongnoinhieuakckjskskkjfoo",(err,decoded)=>
      {
                   if (err)  res.send({username:"kẻ phá hoại"});   
                   else
                  res.send({username:decoded.username});   
                   
      })
  
    }
    getGameCanhCut(req,res)
    {  
       jwt.verify(req.cookies.token,"deptraioke2003khongnoinhieuakckjskskkjfoo",(err,decoded)=>
    {
                 if (err)  res.status(200).send(`HÃY VÀO ĐÚNG LINK NÀO <a href="/"> Link</a>`);   
                 else
                 res.sendFile(pathWeb+'/html/chimflap.html')     
    })
    }
   getWebChat(req,res)
   {
      jwt.verify(req.cookies.token,"deptraioke2003khongnoinhieuakckjskskkjfoo",(err,decoded)=>
      {
                   if (err)  res.status(200).send(` Đừng hack web em :(  <a href="/"> Link đăng nhập</a>`);   
                   else
                   res.sendFile(pathWeb+'/html/web.html')     
      })
   }
}
module.exports=new Controller;