const express =require('express');
const Stuff = require('../Models/Stuff')
const User = require('../Models/Users');
const checkToken = require('./tokenAuth')
const search = express.Router();


search.post('/allusers',checkToken, async (req,res)=>{
    const result = await User.find({});
    res.send(result);
})
search.post('/allstuffs',checkToken, async (req,res)=>{
    const result = await Stuff.find({});
    res.send(result);
})
search.post('/getuser',checkToken, async (req,res)=>{
    console.log(req.body);
    const result = await User.find({"name": {$regex: req.body.name, $options: 'i'}})
    res.send(result)
})
search.post('/getstuff',checkToken, async (req,res)=>{
    console.log(req.body);
    const result = await Stuff.find({"title": {$regex: req.body.name, $options: 'i'}})
    res.send(result)
})
search.post('/getuserbyid',async (req,res)=>{
    console.log(req.body)
    const stuff = await User.findById(req.body.targetID);
    res.send(stuff); 
})
search.post('/addtomylist',checkToken, async (req,res)=>{
    console.log(req.body)
    const res2 = await User.findOne({_id: req.body.currentuser,'reads.id': req.body.targetid})
    if(res2){
        res.send("This is already on the list!")
    }else if(!res2)
    {
        const data = {
            id: req.body.targetid,
            title: req.body.targettitle
        }
        const res3 = await User.updateOne({_id: req.body.currentuser},{$push:{reads: data}})
        res.send("Added to the list");
    }})
search.post('/addfriend',checkToken, async (req,res)=>{
    console.log(req.body)
    const res2 = await User.findOne({_id: req.body.currentuser,'friends.id': req.body.targetid})
    if(res2){
        res.send("This is already on the list!")
    }else if(!res2)
    {
        const data = {
            id: req.body.targetid,
            name: req.body.name
        }
        const res3 = await User.updateOne({_id: req.body.currentuser},{$push:{friends: data}})
        res.send("Added to the list");
    }})
module.exports = search;