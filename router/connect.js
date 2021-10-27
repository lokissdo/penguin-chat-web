const mongoose = require('mongoose');

async function connect(envi) {
    try {
        await mongoose.connect(envi, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("mongo succeeded");
    } catch (error) {
        console.log("fail");
    }
}

module.exports = {
    connect
};
