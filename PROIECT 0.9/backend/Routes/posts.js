const express = require('express')
const checkToken = require('./tokenAuth')
const Post = require('../Models/Post');
const User = require('../Models/Users')
const { post } = require('./auth');
const authenticateToken = require('./tokenAuth');
const posts = express.Router();
//no check token
posts.get('/allposts', async (req,res)=>{
    const allPost = await Post.find({})
    res.send(allPost);
})
//Adding a post
posts.post('/addPost',checkToken, async (req,res)=>{
    const data = {
        user: req.body.user,
        content: req.body.content
    }
    console.log(data)
    const newPost = new Post(data)
    await newPost.save()
    console.log(newPost)
    res.send(newPost)  
})
//GET ONE POST'S COMMENTS
posts.post('/getComments',async (req,res)=>{
    const id = req.body.prop;
    const d = await Post.findOne({_id: id})
    res.send(d.comments)
})
//ADD COMMENT
posts.post('/addComment',checkToken,async (req,res)=>{
    const postID = req.body.id
    const data ={
        user: req.body.user,
        content: req.body.content
    }
   const d = await Post.findOne({_id: postID})
   console.log(d)
    await Post.updateOne({_id: postID},{$push: {comments: data}})
    res.send("Added?")
})
//delete comment
posts.post('/deleteComment',checkToken,async (req,res)=>{
    console.log(req.body);
    const r = await Post.findById(req.body.postid);
    console.log(r);
    if(r.user === req.body.username) 
    {
        const f = await Post.findByIdAndUpdate({_id: req.body.postid},{
        $pull:{
            comments: {_id: req.body.id}
        },
    })
    if(f) res.send({status: "DELETED", message: "Te item was deleted"});
    }else{
        res.send({status: "ERROR", message: "This user not have the right to delete this"})
    }
})
//delete post
posts.post('/deletePost',checkToken, async (req,res)=>{
    console.log(req.body.userID);
    const find = await Post.findOne({_id: req.body.targetID})
    if(!find){ res.send({status: "ERROR", message: "The post is not exist!"}) }
    const findcurrentuser = await User.findOne({_id: req.body.userID})
    if(!findcurrentuser){ res.send({status: "ERROR", message: "The user is not exist!"}) }
    if(find.user !== findcurrentuser.name)
    { 
        res.send({status: "ERROR", message: "U not have the right to do this!"})
    }else{
        const deleteRep = await Post.findByIdAndRemove(req.body.targetID)
        console.log(deleteRep)
        res.send({status:  "DELETED", message: "The post was deleted!"})
    }
})
//like 
posts.post('/like',checkToken, async (req,res)=>{
    console.log(req.body);
    const data =  req.body.userID
    const likes = await Post.findOne({like: data , _id: req.body.targetID}) 
    console.log(likes) 
    const dislikes = await Post.findOne({dislike: data, _id: req.body.targetID})
    if(likes){res.send({status: "ERROR",message: "U already liked it"})}
    //if not find in likes but dislikes
    else if(!likes && dislikes){
        //delete from dislike
        const f = await Post.findByIdAndUpdate({_id: req.body.targetID},{
            $pull:{
                dislike: data
            }})
        //likeing
        const r = await Post.updateOne({_id: req.body.targetID},{$push:{like: data}})
        console.log(r)
        res.send({status: "LIKED",message: "U liked it instead of dislike"})
    }
    //like first time
    else if(!likes && !dislikes){
    const r = await Post.updateOne({_id: req.body.targetID},{$push:{like: data}})
    console.log(r)
    res.send({status: "LIKED",message: "U liked it"})
        }  
})
//dislike
posts.post('/dislike',checkToken, async (req,res)=>{
    console.log(req.body);
    const data =  req.body.userID
    const likes = await Post.findOne({like: data, _id: req.body.targetID})  
    const dislikes = await Post.findOne({dislike: data, _id: req.body.targetID})
    if(dislikes){res.send({status: "ERROR",message: "U already disliked it"})}
    //if not find in dislikes but likes
    else if(likes && !dislikes){
        //delete from like
        const f = await Post.findByIdAndUpdate({_id: req.body.targetID},{
            $pull:{
                like: data
            }})
        //dislikeing
        const r = await Post.updateOne({_id: req.body.targetID},{$push:{dislike: data}})
        console.log(r)
        res.send({status: "DISLIKED",message: "U disliked it instead of like"})
    }
    //like first time
    else if(!likes && !dislikes){
    const r = await Post.updateOne({_id: req.body.targetID},{$push:{like: data}})
    console.log(r)
    res.send({status: "DISLIKED",message: "U disliked it"})
        }  
})
module.exports = posts;