import { useRef, useContext, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import logo from "../../assets/images/logo.png";
import { LoginContext } from "../../contexts/LoginContext";
import logout from "../../assets/images/logout.svg";
import userPGTI from "../../assets/images/user-practigti.png";
import { RotateLeft, RotateRight } from "@mui/icons-material";

function Navbar() {
  const navRef = useRef();
  const { userId, userName, setUserId, setUserName,userPicture,setUserPicture } = useContext(LoginContext);
  /* const [userId, setUserId] = useState([]); 
    const [userName, setUserName] = useState([]);  */

  const signOut = (e) => {
    localStorage.setItem("userId", 0);
    localStorage.setItem("userName", "");
  };

  /*     useEffect(() => {
           setUserId(localStorage.getItem('userId'));
           setUserName(localStorage.getItem('userName'));
           console.log(userId);
           console.log(userName)
          }, ); */

  let currentPath = window.location.pathname;

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <div className="div-logo">
        {/* <img className="logo-img" src={logo}/>
                <h3>PractiGTI</h3> */}

        {userId != 0 && userId != null ? (
          <>
            <img
              className="logo-img"
              src={logout}
              style={{ transform: "rotate(180deg)" }}
            />
            <a
              href="/#/login"
              onClick={signOut}
              className="signOutLink"
              style={{ paddingLeft: "15px" }}
            >
              Cerrar Sesión
            </a>
          </>
        ) : (
          <>
            <img className="logo-img" src={logo} />
            <h2>PractiGTI</h2>
          </>
        )}
      </div>
      <nav ref={navRef} >
        {/*                 {currentPath==="/login" &&
                (<>
                    <a href={`mailto:lhm2001@hotmail.com?subject=Restablecer Contraseña&body=`}>Restablecer Contraseña</a>
                    <a href="/register">Registarse</a>
                </>)}
               
                {userId!=0 &&
                (<>
                   <a href="/register">{userName}</a>
                </>)} */}

        {/*                 {userId!=0 && userId !=null?
                (<>
                 <a href="/register">{userName}</a>
                </>):
                (<>
                     
                     <a href="/login">Iniciar Sesión</a>
                     <a href="/register">Registarse</a>
                </>)
                } */}

        <a href="/#">Inicio</a>
        {userId != 0 && userId != null ? (
          <>
            <a href="/#/profile">{userName}</a>
            
            {userPicture ? (
              <img
                style={{
                  //position: "relative",
                  //width: "50%",
                  height: "50px",
                  borderRadius: "100px",
                  border: "none",
                  outline: "none",
                  
                }}
                src={userPicture}
              />
            ) : (
              <img
              style={{
                //position: "relative",
                //width: "50%",
                height: "50px",
                borderRadius: "100px",
                border: "none",
                outline: "none",
                
              }}
                src={userPGTI}
              />
            )}


          </>
        ) : currentPath === "/login" ? (
          <>
            <a
              href={`mailto:practigti@gmail.com?subject=Restablecer Contraseña&body=`}
            >
              Restablecer Contraseña
            </a>
            <a href="/#/register">Registarse</a>
          </>
        ) : (
          <>
            <a href="/#/login">Iniciar Sesión</a>
            <a href="/#/register">Registarse</a>
          </>
        )}

        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
