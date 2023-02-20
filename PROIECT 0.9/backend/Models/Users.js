const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength:50,
        minlenght:3
    },
    email:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50  
    },
    pass:{
        type: String,
        required: true,
        maxlength: 50,
        minlength: 5 
    },
    friends:[{
        id: String,
        name: String
    }],
    reads:[{
        id: String,
        title: String,
        process: {
            type: String,
            default: "Not yet started"
        },
        created:{
            type: Date,
            default: Date.now()
        }}],
    status:{
        type: String,
        default: "Offline"
    },
    Registered:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("User",userSchema);