import axios from 'axios';
import React, { useState } from 'react';
import { Container } from '../style';

function Messcon(prop){
  return(
    <div>{prop.message}</div>
  )
}

function Register() {
  const [name, setName] = useState("");
  const [email,setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [message,setMessage] = useState("");

function submitHandler(e){
  e.preventDefault();
  const data = {
    name: name,
    email: email,
    pass: pass
  }
  axios.post('http://localhost:8000/auth/register',data)
    .then((res)=>{
        console.log(res);
        if(res.data.status === "REGISTERED")
        {
          setMessage(res.data.message)
          setName("");
          setEmail("");
          setPass("");
        }
        setMessage(res.data.message);
    })
    .catch((error)=> {
      if (error.response) {
       
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }}
    )
}

  return (
    <>
    <Container>
      {message ? Messcon({message}) : null}
    <form onSubmit={submitHandler}>
      <input type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder="Name..."/><br></br>
      <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="E-mail..."/><br></br>
      <input type="password" value={pass} onChange={(e)=> setPass(e.target.value)} placeholder="Password..."/><br></br>
      <button type='submit'>REGISTRATION</button>
    </form>
    </Container>
    </>
  )
}

export default Register