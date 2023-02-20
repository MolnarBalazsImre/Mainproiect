const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../Models/Users');
const nodemailer = require('nodemailer');
const auth = express.Router();
//need admin login
auth.post('/login', async (req,res)=>{
    const account = await User.findOne({ email: req.body.email })
    console.log(account)
    if(!account || account.email.lenght<1) return res.send({status: "ERROR", message:"There no user like this"})
    const pass = req.body.password;
    console.log(pass)
    if(!account || account.pass != pass) return res.send({status: "ERROR", message:"Login error!"})
    const accessToken = jwt.sign(account.email,process.env.SECRET)
    res.json({
        status: "LOGIN",
        accessToken: accessToken, 
        userID: account._id, 
        useremail: account.email,
        username: account.name
    })
})
//REGISTRATION error handled
auth.post('/register',async (req,res)=>{
    const data = {
        name: req.body.name,
        email: req.body.email,
        pass: req.body.pass
    }
    console.log(data)
    const isemail = await User.findOne({ email: data.email })
    console.log(isemail)
    if(isemail && isemail.email.length>0) return res.send({status: "ERROR", message: "Email is already exist!"})
    const isname = await User.findOne({ name: data.name })
    if(isname && isname.name.length>0) return res.send({status: "ERROR", message: "Name is already exist!"})
    const newUser = new User(data)
    newUser.save()
    res.send({ status: "REGISTERED", message: "The registration success"})
})
//not completed/tested
auth.post('/password', async (req,res)=>{
    //not tried out
    const user = await User.findOne({ email: req.body.email })
    if(user.pass<1) return res.send("User dosnt exist!");
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'email@gmail.com',
            pass: 'password'
        }
    })
    var mail = {
        from: 'email@gmail.com',
        to: 'other@gmail.com',profileData,
        subject: 'subject',
        text: 'text'
    }
    transporter.sendMail(mail,(error, info)=>{
        if (error) return console.log(error);
        console.log('Email sent:'+info.response);
    })
})
//just for developing
auth.get('/allUser', async (req,res)=>{
    const data = await User.find({})
    console.log(data)
})

module.exports = auth;