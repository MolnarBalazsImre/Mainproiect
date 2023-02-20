const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user:{
        type: String,
        require: true,
        minlenght: 4
    },
    content:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    like:[String],
    dislike:[String],
    comments:[{
        user: String,
        content:String,
        createdAt: {
            type:  Date,
            default: Date.now()
        }
    }]
})

module.exports = mongoose.model('Post',postSchema);