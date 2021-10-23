const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const infor= new Schema(
    {
       name:{type: String},
       score:{type: Number},
       date: {type: Date, default: Date.now}
    }
);
module.exports=mongoose.model('guinness', infor)