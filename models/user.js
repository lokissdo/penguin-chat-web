const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const user = new Schema({
    _id: mongoose.Types.ObjectId,
    username: String,
    hashpassword: String,
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('User', user)
