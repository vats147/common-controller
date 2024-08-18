const mongoose = require('mongoose');
const Schema = require('../schema/schema.js')
const uuid = require('uuid')

insert()


exports.insert = async (req,res,next) =>{
    const indexName = req.params.indexName;
    const data =new Object(req.body);

    data.referenceId == uuid.v1();


    data[`${indexName}Id`] = uuid.v1();

    data.createdOn = new Date().toISOString();
    data.updatedOn = new Date().toISOString();
    console.log(data)
    try{
        
        const Model = mongoose.models[`${indexName}Model`] || mongoose.model(`${indexName}Model`, Schema[indexName], `${indexName}s`);
                
        const document =Model(data);
        

        document.save()
        .then(async data => {
            console.log(`data saved: ${data}`)
            res.json(data)
        })

    }catch (err) {
        console.log(err)
        res.status(500).send({error : err})
    }

}


exports.update = async (req,res,next) =>{
    const indexName = req.params.indexName;
    const data =new Object(req.body);

    data.referenceId == uuid.v1();


    data[`${indexName}Id`] = uuid.v1();
    // data[`orderId`] = uuid.v1();

    data.createdOn = new Date().toISOString();
    data.updatedOn = new Date().toISOString();
    console.log(data)
    try{
        
        const Model = mongoose.models[`${indexName}Model`] || mongoose.model(`${indexName}Model`, Schema[indexName], `${indexName}s`);
                Model.findOne()
        const document =Model(data);
        

        document.save()
        .then(async data => {
            console.log(`data saved: ${data}`)
            res.json(data)
        })

    }catch (err) {
        console.log(err)
        res.status(500).send({error : err})
    }

}