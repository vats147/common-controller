const mongoose = require('mongoose');

exports.connectToDatabase = async ()=>{

    try{
        await mongoose.connect(process.env.MONGO_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected');
    } catch (error) {
        console.error(`Failed to connect to MongoDB ${error}`)
    }
}