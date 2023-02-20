const express = require('express')
const User = require('../Models/Users')
const checkToken = require('./tokenAuth')
const profile = express.Router();
//GET user data
profile.post('/profileData',checkToken, async (req,res)=>{
    const userData = await User.findById({ _id: req.body.id });
    console.log(userData)
    const datatosend = {
        name: userData.name,
        email: userData.email,
        registered: userData.Registered,
        friends: userData.friends,
        reads: userData.reads
    }
    if(userData<1) return res.send("User not finded!");
    res.send(datatosend);
})
//UPDATE user name
profile.post('/updateName', checkToken, async (req,res)=>{
    const email = req.body.email;
    const name = req.body.name;
    const dat = await User.findOneAndUpdate(email,name);
    console.log(dat); 
})
//UPDATE user password
profile.post('/updatePass',checkToken, async (req,res)=>{
    const email = req.body.email;
    const pass = req.body.pass;
    const dat = await User.findOneAndUpdate(email,pass);
    console.log(dat); 
})
//UPDATE user email
profile.post('/updateEmail',checkToken, async (req,res)=>{
    const email = req.body.email;
    const dat = await User.findOneAndUpdate(email,email);
    console.log(dat); 
})
//DELETE FRIEND
profile.post('/deleteFriend', checkToken, async (req,res)=>{
    const selfid = req.body.currentID;
    const deleteid = req.body.targetID;
    console.log(req.body);
    const response = await User.findByIdAndUpdate({_id: selfid},{$pull:{friends:{_id: deleteid}}})
    console.log(response);
    res.send("Deleted")
})
//GET ALL FRIEND
profile.get('/getAllFriend', checkToken, async (req,res)=>{
    const id = req.body.id;
    const allfriend = await User.findOne({_id: id})
    console.log(allfriend.friends)
})
//DELETE STUFF
profile.post('/deleteStuff', checkToken, async (req,res)=>{
    const selfid = req.body.currentID;
    const deleteid = req.body.targetID;
    console.log(req.body);
    const response = await User.findByIdAndUpdate({_id: selfid},{$pull:{reads:{_id: deleteid}}})
    console.log(response);
    res.send("Deleted")
})
profile.post('/changestatus',checkToken, async (req,res)=>{
    const selfid = req.body.currentID;
    const targetid = req.body.targetID;
    const status = req.body.status;
    console.log(req.body);
    const response = await User.updateOne({_id:  selfid ,"reads._id": targetid},{$set:{"reads.$.process": status}});
    console.log(response);
    res.send("Changed")
})
//GET ALL STUFF
profile.get('/getAllStuff', checkToken, async (req,res)=>{
    const id = req.body.id;
    const allfriend = await User.findOne({_id: id})
    console.log(allfriend.reads)
})

module.exports = profile;