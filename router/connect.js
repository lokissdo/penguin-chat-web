const mongoose=require('mongoose');
async function connect()
{   
    try {
        await mongoose.connect(process.env.MONGODB_URI,
        {
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("mongo succeeded")
    } catch (error) {
        console.log("fail")
    }
    
}
module.exports={connect}