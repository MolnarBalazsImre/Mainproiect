const mongoose = require('mongoose');

const stuffSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
        minlenght: 5
    },
    creatorID:{
        type: String,
        require: true,
        minlenght: 5
    },
    genre:{
        type: String,
        require: true,
        minlenght: 2
    },
    type:{
        type: String,
        require: true,
        minlenght: 3
    },
    describe:{
        type: String
    },
    imglink:{
        type: String
    },
    recommendedlinks: String,
    rate:[{
        userid: String,
        rate: Number
    }],
    comments:[{
        user: String,
        content: String,
        CreatedAt:{
            type: Date,
            default: Date.now()
        }
    }],
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Stuff',stuffSchema);