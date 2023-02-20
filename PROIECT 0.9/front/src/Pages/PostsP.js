import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {PostsCont} from '../style';

const token = { 'headers': {Authorization: "Bearer " +localStorage.getItem('jwtoken')}}
const usernameG = localStorage.getItem("userName");
const url = 'http://localhost:8000/posts/'
//Comment
function CommentContainer(prop){
  const [newcomment,setNewcomment] = useState("");
  const [comments,setComments] = useState([{
    id: "",
    user: "",
    content: ""
  }])
  const [reset,setReset] = useState(false);
  function resetlist(){
    setReset(!reset) 
    console.log("RESET comments")
  }
  //run when mount or when reset
  useEffect(()=>{
     axios.post(url+"getComments",prop)
     .then((res)=>{
      setComments(res.data.reverse());
    })
  },[reset])
  //Add new comment to the list and refresh
  function submithandler(e)
  {
    e.preventDefault(); 
    const data = {
      id: prop.prop,
      user: localStorage.getItem("userName"),
      content: newcomment
    }
    const token = { 'headers': {Authorization: "Bearer " +localStorage.getItem('jwtoken')}}
    axios.post(url+"addComment",data,token)
    .then((res)=>{
      console.log(res);
      resetlist();
    })    
  }
  function deletecomment(prop){
    console.log(prop)
    const user = prop.username;
    const currentUser = localStorage.getItem('userName');
    const token = { 'headers': {Authorization: "Bearer " +localStorage.getItem('jwtoken')}}
    if(user !== currentUser) alert("U are not supposed to to this!");
    else{
      axios.post(url+"deleteComment",prop,token)
      .then((res)=>{
        console.log(res)
        prop.func.resetlist();
      })
    }
  }
  return(
     <>
     <form style={{"textAlign": "left", padding: "20px"}} onSubmit={submithandler}>
      <input type="text" value={newcomment} onChange={(e)=>{setNewcomment(e.target.value)}} style={{width: "30vw"}}></input>
      <button type='submit'>Add Comment</button>
     </form>
    <ul style={{background: "#aaaaaa"}}>
       {comments.map((i, index)=>(
          <li style={{"listStyle": "none", "textAlign": "left", background: "#dddddd"}} key={index}><div style={{"maxWidth": "200px","borderRadius": "8px", padding: "4px", margin: "3px"}}>{i.user}:</div> {i.content}<br/>
          <button style={{padding: "3px", "borderRadius": "6px"}} onClick={()=>{deletecomment({postid: prop.prop,id: i._id,username: i.user,func: {resetlist}})}}>Delete</button></li>
       ))}
    </ul></>)}
//----------------------------------------------------------
//
//-----------------------------------------------------------
function PostC(data){
    var item = data.data
    //delete post
    function deletepost(prop){
      const token = { 'headers': {Authorization: "Bearer " +localStorage.getItem('jwtoken')}}
        console.log(prop)
        const data = {
          targetID: prop.targetID,
          userID: localStorage.getItem('userID')
        }   
        axios.post(url+"deletePost",data,token).then((r)=>{
          if(r.data.status === "DELETED"){
            prop.func.resetlist();
            console.log(prop.func);
          }
        })
    }
    //function to like/dislike
    function likedislike(prop){
      const token = { 'headers': {Authorization: "Bearer " +localStorage.getItem('jwtoken')}}
      console.log(prop);
      if(prop.ld === "like")
      {
        const data = {
          userID: localStorage.getItem('userID'),
          want: "like",
          targetID: prop.id
      } 
        console.log(data)
        axios.post(url+"like",data,token).then((res)=>{
          console.log(res)
          prop.func.resetlist();
        })
      }
      else if(prop.ld === "dislike"){
        const data = {
          userID: localStorage.getItem('userID'),
          want: "dislike",
          targetID: prop.id
      } 
        console.log(data)
        axios.post(url+"dislike",data,token).then((res)=>{
          console.log(res)
          prop.func.resetlist();
        })
      }
    }
    const [comm,setComm] = useState(false)
      return(
        <>
        <li>
          <div className='contentContainer'>
          <h4> {item.user}: <p style={{float: "right"}}>{item.createdAt}</p></h4> 
          <p style={{padding: "6px"}}>{item.content}</p>
          <p>Likes: {item.like?.length || 0}  Dislikes: {item.dislike?.length || 0}</p></div>
          <div style={{"textAlign": "left"}}>
            <button onClick={()=>{likedislike({ld: "like",id: item._id, func: data})}}>LIKE</button>
            <button onClick={()=>{likedislike({ld: "dislike",id: item._id, func: data})}}>Dislike</button>
            <button onClick={()=>{setComm(!comm);}}>Comments</button>
            <button onClick={()=>{deletepost({targetID: item._id, func: data})}}>Delete</button>
          </div>
          {comm ? <CommentContainer prop={item._id}/> : null}
        </li>
      </>)}
//----------------------------------------------------------
//
//-----------------------------------------------------------
function FormContainer({reset}){
  const [content,setContent] = useState("");
  const sendpost = (e)=>{
      e.preventDefault(); 
      console.log(content)
      const data = {
        user: localStorage.getItem("userName"),
        content: content
      }

      console.log(data)
      axios.post(url+"addPost",data,token)
      .then((res)=>{
        console.log(res)
        reset()
        setContent("")
      })}
  return(<>
  <div>
  <b/>
    <form onSubmit={sendpost}>
      <textarea placeholder='Write something!' value={content} onChange={(e)=>{setContent(e.target.value)}} style={{padding: "5px",margin: "6px"}} rows="6" cols="50"/>
      <input style={{position: "relative", top: "-52px"}} type="submit"/>
    </form>
    </div>
    </>)}
//----------------------------------------------------------
//
//-----------------------------------------------------------
const PostsContainer = ()=>{
  const [addpost,setAddpost] = useState(false)
  const [buttontext, setButtontext] = useState("Add Post")
  const [reset,setReset] = useState(false);
  const [allpost,setAllpost] = useState([{}]);
    useEffect(()=>{
      axios.get(url+"allposts",token)
      .then((response)=>{
        console.log(response.data)
        setAllpost(response.data.reverse())
      })
    },[reset])
  function resetlist(){
    console.log("RESET");
    setReset(!reset);
  }  
  return(
  <>
    <button onClick={()=>{setAddpost(!addpost); !addpost ? setButtontext("Hide Add Post") : setButtontext("Add Post")}}>{buttontext}</button>
    {addpost ? <FormContainer reset={resetlist}/> : null}
    <div>
      <ul>
      {allpost.map((p, index)=>(
        <PostC key={index} data={p} resetlist={resetlist}/>
        ))} 
      </ul>  
    </div>
  </>
)
}
//----------------------------------------------------------
//
//-----------------------------------------------------------
function Posts(){ 
return(
    <>
    <PostsCont>
    <h1>POSTS</h1>
    <PostsContainer/>
    </PostsCont>
    </>
)
}


export default Posts