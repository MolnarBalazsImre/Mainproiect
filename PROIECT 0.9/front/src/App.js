import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Error from './Pages/Error';
import Header from './Components/Header';
import Search from './Pages/Search';
import Posts from './Pages/PostsP';
import Profile from './Pages/ProfileP';
import Stuff from './Pages/Stuff';
import Stuffdetails from './Pages/StuffDetail';
import Userdetails from './Pages/UserDetails';
import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
     *{
       padding: 0;
       margin: 0;
       background-color: #a0a0a0;
     }
     body{
       min-width: 400px;
     }
    
     
`
function App() {

  const [status,setStatus] = useState("unloged");
  function login(){
    setStatus("loged");
  }
  //check the token on every refresh
  useEffect(()=>{
     const d = localStorage.getItem('jwtoken');
     d ? setStatus("loged") : setStatus("unloged")
  },[])
  function logout(){
    setStatus("unloged");
    localStorage.removeItem('userID');
    localStorage.removeItem('jwtoken');
    localStorage.removeItem('userName');
  }
  return (
    <>
    
    <GlobalStyle/>
    <Router>
    <Header state={status} logout={logout}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<Login login={login}/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/posts' element={<Posts/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/stuff' element={<Stuff/>}/>
        <Route path='/stuff/details' element={<Stuffdetails/>}/>
        <Route path='/user/details' element={<Userdetails/>}/> 
        <Route path='*' element={<Error/>}/>
      </Routes>
    </Router>
    
    </>
  );
}

export default App;
