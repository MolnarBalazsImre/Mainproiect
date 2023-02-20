import React, { useState, useEffect } from 'react';
import { StuffDetailContainer } from '../style';
import {Link, useLocation} from 'react-router-dom';
import placeholderimg from '../others/Placeholderimg.png';
import axios from 'axios';

const url = 'http://localhost:8000/stuffs/'

function Stuffdetail(){
    const location = useLocation()
    console.log(location);
    const userID = localStorage.getItem('userID');
    const [rate,setRate] = useState("0");
    const [stuffdata,setStuffdata] = useState({
        title: "",
        genre: "",
        type: "",
        describe: "",
        creatorID: "",
        createdAt: "",
        imglink: "placeholderimg",
        recommendedlinks: [],
        rate: []
    });
    useEffect(()=>{
            axios.post(url+"getstuffbyid",{targetID: location.state.id})
            .then((res)=>{
                console.log("Reseted");
                console.log(res)
                setStuffdata(res.data);
                console.log(location.state.id);
            })
            
    },[])
    function addrate(e){
        e.preventDefault();
            if(rate > 5){
                setRate("5")
            }else if(rate < 0){
                setRate("0")
            }else{
                const token = { 'headers': {Authorization: "Bearer " +localStorage.getItem('jwtoken')}}
                const data ={
                    targetID: location.state.id,
                    userid: userID,
                    rate: rate
                }
                axios.post(url+"addrate",data,token)
                .then((r)=>{
                    console.log(r);
                })
            }
    }
    //started to read ? see progress details/change progress : add to bookmarks
    
   return(
    <>
    <StuffDetailContainer>
        <button><Link type='button' to="../stuff">Back</Link></button>
        <section>
            <img src={stuffdata.imglink} alt="Image for stuff" />
            <h1>Title: {stuffdata.title}</h1> 
            <h4>Genre: {stuffdata.genre}</h4>
            <h4>Type: {stuffdata.type}</h4>
            <h4>Rate: 4</h4>
            <h4>Description: <br/> <p>&emsp;{stuffdata.describe}<a href="#">More information</a></p> </h4>
            <p>Created at: {stuffdata.createdAt}</p>
        </section>      
        <div>
        <form onSubmit={addrate}>
        <input type="number" value={rate} onChange={(e)=>{setRate(e.target.value)}}/><button type='submit' >Rate</button></form>
        </div>
    </StuffDetailContainer>
    </>
   )
}

export default Stuffdetail