require('dotenv').config();
const express=require('express');
const mongo = require('./service/mongooseConnection');
const authRouter = require('./router/authRouter');


const PORT=process.env.PORT || 3000;
const app=express();

app.use(express.json())
app.use(express.urlencoded(true))
mongo.connectToDatabase();
// Authentication routes
app.use('/auth', authRouter);

app.get('/api/status',(req,res)=>{
    res.json({status: "API is up and running"})
})

app.use("/api",require('./router/route'))

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})