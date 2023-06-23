import React, { useState,useEffect } from 'react';
import './App.css';
import AppRouter from './routers/AppRouter';
import { LoginContext } from "./contexts/LoginContext.js";
import Navbar from './pages/Navbar/Navbar';
import Footer from './pages/Footer/Footer'

function App() {

  const [userId,setUserId]=useState(localStorage.getItem('userId'));
  const [userName,setUserName]=useState(localStorage.getItem('userName'));
  const [userPicture,setUserPicture]=useState(localStorage.getItem('userPicture'));

  
  useEffect(() => {
   /*  setUserId(localStorage.getItem('userId'));
    setUserName(localStorage.getItem('userName')); */
    console.log(userId);
    console.log(userName)
   }, );

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <LoginContext.Provider value={{userId,setUserId,userName,setUserName,userPicture,setUserPicture}}>
        <Navbar/>

          <div style={{display: "flex", flexDirection:"column", minHeight:"100%",marginTop: "70px", }}>          
            <AppRouter />          
          </div>
          
        <Footer/>
      </LoginContext.Provider>
    </div>
  );
}

export default App;