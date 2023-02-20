const express =require('express');
const Stuff = require('../Models/Stuff')
const User = require('../Models/Users');
const checkToken = require('./tokenAuth')
const reads = express.Router();

//no check token
reads.post('/allstuff',async (req,res)=>{
    const allStuff = await Stuff.find({creatorID: req.body.targetID});
    res.send(allStuff);
})//no check token
reads.post('/addStuff', async (req,res)=>{
    console.log(req.body);
    const data ={
        title: req.body.stuffData.title,
        creatorID: req.body.id,
        genre: req.body.stuffData.genre,
        type: req.body.stuffData.type,
        describe: req.body.stuffData.describe,
        imglink: req.body.stuffData.imglink,
        recommendedlinks: req.body.stuffData.recommendedlink
    }
    console.log(data)
    const istitle = await Stuff.findOne({title: data.title})
    {istitle ? console.log("Exist") : console.log("Not exist")}
    if(istitle){
        res.send({status: "ERROR",message: "This title is already exist!"})
    }else if(!istitle){
        const newStuff = new Stuff(data)
        await newStuff.save()
        console.log(newStuff)
        res.send({status: "REGISTERED", message: "Stuff was registered!",newStuff})
    }
})
reads.post('/deleteStuff',checkToken,async (req,res)=>{
    console.log(req.body)
    const deleteReport = await Stuff.findByIdAndDelete(req.body.targetID);
    console.log(deleteReport)
    res.send(deleteReport);
})
reads.post('/getstuffbyid',async (req,res)=>{
    console.log(req.body)
    const stuff = await Stuff.findById(req.body.targetID);
    res.send(stuff); 
})
reads.post('/addrate', checkToken, async (req,res)=>{
    const target = req.body;
    const res2 = await Stuff.findOne({_id: target.targetID,'rate.userid': target.userid})
    if(res2){
        res.send("U already rate this!")
    }else if(!res2){
    const data = {
         userid: target.userid,
         rate: target.rate
    }
    const res3 = await Stuff.updateOne({_id: target.targetID},{$push:{rate: data}})
    res.send("U rated it!")
    }
})
module.exports = reads;