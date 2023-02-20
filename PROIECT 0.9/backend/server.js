const express = require('express');
const cors = require('cors');

const db = require('mongoose');
const auth = require('./Routes/auth');
const stuffs = require('./Routes/stuffs');
const profile = require('./Routes/profile');
const posts = require('./Routes/posts');
const search = require('./Routes/search');
require('dotenv').config();
//setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }))
db.connect(`${process.env.DB}`,(err)=>{
    if(err) throw err;
    console.log("Connected to the DB");
});

//home page
app.get('/',(req,res)=>{
    res.send("Home");
})

//Routes
app.use('/auth',auth);
app.use('/stuffs',stuffs);
app.use('/profile',profile);
app.use('/posts',posts);
app.use('/search',search);

app.listen(process.env.PORT,()=>{
    console.log(`Server run on port:${process.env.PORT}`);
});