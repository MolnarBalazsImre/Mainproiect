import React, { useState, useEffect } from 'react';
import { StuffContainer } from '../style';
import axios from 'axios';
import { useNavigate , Link} from 'react-router-dom';
const url = 'http://localhost:8000/stuffs/';

function Stufflist({navigate}){
  const [listofstuff,setListofstuff] = useState([{}]);
  const [reset,setReset] = useState(true);
  const data = {targetID: localStorage.getItem("userID")}
  console.log(data)
  useEffect(()=>{
    axios.post(url+"allstuff",data)
    .then((res)=>{
      console.log(res)
      setListofstuff(res.data);
      
    })
  },[reset])
  function resetall(){
      setReset(!reset);
  }
  //function for delete Stuff
  function deleteStuff(prop){
    const token = { 'headers': {Authorization: "Bearer " +localStorage.getItem('jwtoken')}}
    const userid = localStorage.getItem("userID");
    console.log(prop)
    const targetID = {targetID: prop.id, userID: userid};
    axios.post(url+"deleteStuff",targetID,token)
    .then((res)=>{
      console.log(res);
      prop.func();
    })
  }
  return(<>
     <div>
     <Staffform func={resetall}/>
     </div>
     <table>
      <tbody>
        <tr>
          <th>Title</th>
          <th>Type</th>
          <th>Genre</th>
          <th></th>
          <th></th>
        </tr>
        {listofstuff.map((i,index)=>(
          <tr key={index}>
          <th>{i.title}</th>
          <th>{i.type}</th> 
          <th>{i.genre}</th>
          <th><button onClick={()=>{deleteStuff({id: i._id, func: resetall})}}>Delete</button></th>
          <th><Link type='button' to='/stuff/details' state={{id: i._id}}><button>Details</button></Link></th>
          </tr>
        ))}
        </tbody>
     </table>
  </>)
}

function Messcon(prop){
  return(
    <div>{prop.message}</div>
  )
}

const Staffform = ({func}) => {
  const [state,setState] = useState(false);
  const [message, setMessage] = useState("");
  //for all input
  const [stuffData,setStuffdata] = useState({});
  //for handle changes
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setStuffdata(values => ({...values, [name]: value}))
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    const token = { 'headers': {Authorization: "Bearer " +localStorage.getItem('jwtoken')}}
    const id = localStorage.getItem('userID');
    console.log(stuffData)
    const data = {
      stuffData: stuffData,
      id: id
    }
    axios.post(url+"addStuff",data,token)
    .then((response)=>{
          console.log(response)
          setMessage(response.data.message);
          func();
    })
  }
  if(state === false){return(
  <>
    <button onClick={()=>{setState(!state)}}>Add Stuff</button>
  </>)
  }else if(state === true){
  return(
  <>
    {message ? Messcon({message}) : null}
      <form onSubmit={handleSubmit}>
    <input type="text" name="title" placeholder='Title...' value={stuffData.title || ""} onChange={handleChange}/>
    <input name="describe" placeholder='Describe...' type="text" value={stuffData.describe || ""} onChange={handleChange}/>
    <input name="recommendedlink" placeholder='Link for more information...' type="text" value={stuffData.recommendedlink || ""} onChange={handleChange}/>
    <select name="genre" value={stuffData.genre || ""} onChange={handleChange}>
  <option value="Not selected">Not selected</option>
  <option value="Action">Action</option>
  <option value="Comedy">Comedy</option>
  <option value="Drama">Drama</option>
  <option value="Fantasy">Fantasy</option>
  <option value="Horror">Horror</option>
  <option value="Mystery">Mystery</option>
  <option value="Romance">Romance</option>
  <option value="Thriller">Thriller</option>
      </select>
    <select name="type" value={stuffData.type || ""} onChange={handleChange}>
  <option value="Not selected">Not selected</option>
  <option value="Book">Movie</option>
  <option value="Movie">Movie</option>
  <option value="Series">Series</option>
  <option value="Manga">Manga</option>
  <option value="Comic">Comic</option>
      </select>
    <button type="submit">Submit</button>  <button onClick={()=>{setState(!state)}}>Back</button>
      </form>
  </>   
  )}
}
function Stuff(){
  const navigate = useNavigate();
return(
    <>
    <StuffContainer>
    <Stufflist navigate={navigate}/>
    </StuffContainer>
    </>
)}

export default Stuff