import React, { useState, useEffect } from 'react';
import { ProfilContainer } from '../style';
import { useNavigate, Link} from 'react-router-dom';
import axios from 'axios';

const url = 'http://localhost:8000/profile/'

function Profile(){
const navigate = useNavigate();
//Friends
const Friendstable = (p)=>{
const removefriend = (p)=>{
  const token = { 'headers': {Authorization: "Bearer " +localStorage.getItem('jwtoken')}}
  const currentid = localStorage.getItem('userID')
  console.log(p);
  const data = {
    currentID: currentid,
    targetID: p.targetid
  }
  console.log(data)
  axios.post(url+"deleteFriend",data,token)
  .then((res)=>{
     console.log(res)
     p.func();
  })
}
  const z = p.data;
  console.log(z)
  return(
    <>
    <h1>Friends</h1>
    <div>
   <table>
     <tbody>
        <tr>
          <th>Name</th>
          <th></th>
          <th></th>
        </tr>
        {z?.map((i,index)=>(
          <tr key={index}>
            <th>{i.name}</th> 
            <th><button onClick={()=>{removefriend({targetid: i._id,func: p.function})}}>Remove</button></th>
            <th><Link type='button' to='/user/details' state={{id: i.id}}><button>Details</button></Link></th>
          </tr>
        ))}
     </tbody>
   </table>
    </div>
    </>
   )
}
///COLLECTIBLE
const Collectibletable = (c)=>{
  const x = c.data;
  const [progress,setProgress] = useState("Not yet started");
  const handleselect = (p)=>{
    console.log(p);
    const token = { 'headers': {Authorization: "Bearer " +localStorage.getItem('jwtoken')}}
    const currentid = localStorage.getItem('userID');
    const data = {
      currentID: currentid,
      targetID: p.id,
      status: p.status
    }
    axios.post(url+"changestatus",data,token)
    .then((res)=>{
      console.log(res)
      
    }) 
  }
  const remStuff = (p)=>{
    console.log(p);
    const token = { 'headers': {Authorization: "Bearer " +localStorage.getItem('jwtoken')}}
    const currentid = localStorage.getItem('userID');
    const targetID = p.targetid;
    const data = {
      currentID: currentid,
      targetID: targetID
    }
    axios.post(url+"deleteStuff",data,token)
    .then((res)=>{
      console.log(res);
      p.func();
    })
  }
   return(
    <>
    <h1>Collectible</h1>
    <div>
   <table>
     <tbody>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th></th>
          <th></th>
        </tr>
        {x?.map((i,index)=>(
          <tr key={index}>
              <th>{i.title}</th>
              <th><select onChange={(e)=>{handleselect({status: e.target.value,id: i._id})}}>
                      <option value="none" selected disabled hidden>{i.process}</option>
                      <option value="Not yet started">Not yet started</option>
                      <option value="In progress">In progress</option>
                      <option value="Terminated">Terminated</option>
                  </select>
              </th>
              <th><button onClick={()=>{remStuff({targetid: i._id,func: c.function})}}>Remove</button></th> 
              <th><Link type='button' to='/stuff/details' state={{id: i.id}}><button>Details</button></Link></th> 
          </tr>
        ))}
     </tbody>
   </table>
    </div>
    </>
   )
}


const Userdata = ({navigate})=>{

  const [userdata,setUserdata] = useState({});
  const [reset,setReset] = useState(true);
  
  useEffect(()=>{
    const token = { 'headers': {Authorization: "Bearer " +localStorage.getItem('jwtoken')}}
    const id = {id: localStorage.getItem('userID')}
    axios.post("http://localhost:8000/profile/profileData",id,token)
    .then((res)=>{
      setUserdata(res.data);
      console.log(res)
    })
  },[reset])
  const resetall = () =>{
     setReset(!reset);
  }
  return(
    <>
    <div>
      <h1>Username: {userdata.name}</h1>
      <h2>Email: {userdata.email}</h2>
      <h5>Registered: {userdata.registered}</h5>
    </div>
    <div>
      <Friendstable data={userdata.friends} function={resetall}/>
    </div>
    <div>
      <Collectibletable data={userdata.reads} function={resetall}/>
    </div>
    </>
  )

}
   

return(
    <>
    <ProfilContainer>
      <h1>PROFILE</h1>
      <Userdata navigate={navigate}/>
    </ProfilContainer>
    </>
)}
export default Profile