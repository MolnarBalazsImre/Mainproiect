import React, { useState } from 'react';
import axios from 'axios';
import { SearchContainer } from '../style';
import { useNavigate, Link} from 'react-router-dom';

const token = { 'headers': {Authorization: "Bearer " +localStorage.getItem('jwtoken')}}
const url = 'http://localhost:8000/search/'    

function Search(){
  const navigate = useNavigate();
const Result = (p) =>{
    function addtomylist(prop){
        const token = { 'headers': {Authorization: "Bearer " +localStorage.getItem('jwtoken')}}
        const currentuser = localStorage.getItem('userID')
        const data = {
            currentuser: currentuser,
            targetid: prop.id,
            targettitle: prop.title
        }
        axios.post(url+"addtomylist",data,token)
        .then((res)=>{
            console.log(res)
        })
    }
    function addfriend(prop){
        const token = { 'headers': {Authorization: "Bearer " +localStorage.getItem('jwtoken')}}
        const currentuser = localStorage.getItem('userID')
        const data = {
            currentuser: currentuser,
            targetid: prop.id,  
            name: prop.name  
        }
        axios.post(url+"addfriend",data,token)
        .then((res)=>{
            console.log(res)
        })
    }
    console.log(p.show)
    const mode = p.mode;
    const r = p.prop;
    if(p.show && mode === "stuff")
    {
    return(
        <>
        <table>
            <tbody>
                <tr>
                    <th>{p.mode}</th>
                    <th></th>
                    <th></th>
                </tr>
                {r.map((i,index)=>(
                    <tr key={index}>
                       <th>{i.title}</th>
                       <th><button onClick={()=>{addtomylist({id: i._id, title: i.title})}}>Add to my list</button></th>
                       <th><Link type='button' to='/stuff/details' state={{id: i._id}}><button>Details</button></Link></th>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )}else if(p.show && mode === "user")
    {
        return(
                <>
                <table>
                    <tbody>
                        <tr>
                            <th>{p.mode}</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {r.map((i,index)=>(
                            <tr key={index}>
                               <th>{i.name}</th>
                               <th><button onClick={()=>{addfriend({id: i._id, name: i.name})}}>Add friend</button></th>
                               <th><Link type='button' to='/user/details' state={{id: i._id}}><button>Details</button></Link></th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </>
            )}
    else{
        return(null)
    }
}

function Searchcore({navigate}){
const [mode,setMode] = useState("");
const [tempmode,setTempmode] = useState("user");
const [data,setData] = useState("");
const [result,setResult] = useState([{
    name: "no",
    id: "Sample id"
}]);
const [show,setShow] = useState(false);

const handlesubmit = (e)=>{
    e.preventDefault();
    const token = { 'headers': {Authorization: "Bearer " +localStorage.getItem('jwtoken')}}
    const s = {name: data}
    if(tempmode === "user")
    {
    axios.post(url+"getuser",s,token)
    .then((res)=>{
        console.log(res)
        setResult(res.data)
        setShow(true)
        setMode("user")
    })
    }else if(tempmode === "stuff")
    {
    axios.post(url+"getstuff",s,token)
    .then((res)=>{
        console.log(res)
        setResult(res.data)
        setShow(true)
        setMode("stuff")
    })}
}
    return(
        <>
        <form onSubmit={handlesubmit}>
            <select value={tempmode} onChange={(e)=>{setTempmode(e.target.value)}}>
                <option value="user">User</option>
                <option value="stuff">Entertainment</option>
            </select>
            <input type="text" placeholder='Search...' value={data} onChange={(e)=>{setData(e.target.value)}}></input>
            <button type='submit'>Submit</button>
        </form>
        <div>
        <Result show={show} prop={result} mode={mode} navigate={navigate}/>
        </div>
        </>
    )
}
return(
    <>
    <SearchContainer>
    <Searchcore navigate={navigate}/>
    </SearchContainer>
    </>
)}

export default Search