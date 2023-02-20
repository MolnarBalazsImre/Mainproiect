import React, { useEffect, useState } from 'react'
import { useNavigate , Link} from 'react-router-dom';
import {HeaderBody, Buttonh, HomeButton, NameContainer} from '../style';
import axios from 'axios';

function Header(prop) {
    const navigate = useNavigate();
    const state = prop.state
    const logout = prop.logout
  if(state === "unloged")
  {
  return (
    <>
    <HeaderBody>
    <Buttonh onClick={()=>navigate('/register',{replace: true})}>REGISTER</Buttonh>
    <HomeButton onClick={()=>navigate('/home',{replace: true})}>HOME</HomeButton>
    <Buttonh onClick={()=>navigate('/login',{replace: true})}>LOGIN</Buttonh>
    </HeaderBody>
    </>
  )}else if(state === "loged")
  {
    
    return(
    <>
    <HeaderBody> 
    <Buttonh><Link type='button' to="../home" onClick={logout}>LOGOUT</Link></Buttonh>
    <Buttonh onClick={()=>navigate('/search',{replace: true})}>SEARCH</Buttonh>
    <HomeButton onClick={()=>navigate('/posts',{replace: true})}>HOME</HomeButton>
    <Buttonh onClick={()=>navigate('/stuff',{replace: true})}>STUFF</Buttonh>
    <Buttonh onClick={()=>navigate('/profile',{replace: true})}>PROFILE</Buttonh>
    </HeaderBody>
    </>
    )
  }
}

export default Header