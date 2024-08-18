// schema.js
const schemas = {
    "user": {
        name: { type: String },
        email: { type: String },
        createdOn: { type: String },
        updatedOn: { type: String },
        
    },
    "profile":{
        email: { type: String },
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
