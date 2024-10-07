// schema.js
const schemas = {
   
    "data" :{
        dataId : { type: String },
        title: { type: String },
        summray: { type: String },
        Participants : [{ type : String }],
        date : { type :String },
        tags : [ { type : String }],
        link : { type :String },
        createdOn: { type: String,default :Date.now() },
       
    },
    "blog" :{
        title  : { type :String },
        description : { type : String}
    },
    "singup": {
        name: { type: String },
        email: { type: String },
    }
    // Add more schemas as needed
};

module.exports = schemas;
