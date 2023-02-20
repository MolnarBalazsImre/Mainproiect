import React, { useState, useEffect } from 'react';
import { ProfilContainer } from '../style';
import { useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import placeholder from '../others/Placeholderimg.png'

const url = 'http://localhost:8000/profile/'

function Userdetail(){
const navigate = useNavigate();
const Friendstable = (p)=>{

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
            <th><Link type='button' to='/user/details' state={{id: i.id}}><button>Details</button></Link></th>
          </tr>
        ))}
     </tbody>
   </table>
    </div>
    </>
   )
}
const Collectibletable = (c)=>{
  const x = c.data;
  console.log(x);
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
              <th>{i.process}</th>
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
  
  useEffect(()=>{
    const token = { 'headers': {Authorization: "Bearer " +localStorage.getItem('jwtoken')}}
    const id = {id: localStorage.getItem('userID')}
    axios.post("http://localhost:8000/profile/profileData",id,token)
    .then((res)=>{
      setUserdata(res.data);
      console.log(res)
    })
  },[])
  return(
    <>
    <div>
      <h1>Username: {userdata.name}</h1>
      <h2>Email: {userdata.email}</h2>
      <h5>Registered: {userdata.registered}</h5>
    </div>
    <div>
      
      <Friendstable data={userdata.friends}/>
    </div>
    <div>
    
      <Collectibletable data={userdata.reads}/>
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
export default Userdetail