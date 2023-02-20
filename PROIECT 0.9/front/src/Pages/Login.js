import React, { useState } from 'react';
import { Container } from '../style';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Messcon(prop){
  return(
    <div>{prop.message}</div>
  )
}

function Login({login}) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [message,setMessage] = useState("");
  let navigate = useNavigate();

  function submitHandler(e){
    
    e.preventDefault();
    console.log(email);
    console.log(pass);
    const data = {
      email: email,
      password: pass
    }
    axios.post('http://localhost:8000/auth/login',data)
    .then((res)=>{
        console.log(res.data);
        if(res.data.status === "LOGIN")
        {
        localStorage.setItem('jwtoken',res.data.accessToken);
        localStorage.setItem('userID' , res.data.userID);
        localStorage.setItem('userName', res.data.username);
        const asd = localStorage.getItem('userID')
        console.log(asd)
        login();
        navigate("../stuff", { replace: true });
        }else{
          console.log(res.data)
          setMessage(res.data.message)
        }
    });  
  }
  
  return (
    <>
    <Container>
      {message ? Messcon({message}) : null}
    <form onSubmit={submitHandler}>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email..."/><br></br>
      <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password..."/><br></br>
      <button type='submit'>LOGIN</button>
    </form>
    </Container>
    </>
  )
}

export default Login