import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Title from "../components/Title/Title";
import Label from "../components/Label/Label";
import Input from "../components/Input/Input";
import Axios from "axios";
import logInImg from "../../assets/images/user-icon.svg";
import { LoginContext } from "../../contexts/LoginContext";
import userPGTI from "../../assets/images/user-practigti.png";

const Login = () => {
  const navigate = useNavigate();
  const { setUserId, setUserName,setUserPicture } = useContext(LoginContext);

  /* 
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState(''); */

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPassworderror] = useState(false);

  /*     useEffect(() => {
        console.log("pepe")
        
        localStorage.getItem('userId');
        localStorage.getItem('userName');
        console.log(localStorage.getItem('userId'))
        console.log(localStorage.getItem('userName'))
      }, [user]); */

  const postData = (e) => {
    Axios.post("https://api.practigti.net.pe/signin", {
      TUsuarioCorreo: user,
      TUsuarioContrasena: password,
    }).then((res) => {
      localStorage.setItem("userId", res.data.CUsuario);
      localStorage.setItem(
        "userName",
        res.data.NUsuario + " " + res.data.NUsuarioApellido
      );
      localStorage.setItem("userPicture",res.data.TUsuarioImagen);
      console.log(res);
      setUserId(res.data.CUsuario);
      setUserName(res.data.NUsuario + " " + res.data.NUsuarioApellido);
      setUserPicture(res.data.TUsuarioImagen);
      /*             console.log(res.data);
            setUserId(res.data.CUsuario);
            setUserName(res.data.NUsuario+" "+res.data.NUsuarioApellido); */

      navigate("/");
      //window.location.reload(false);
    });
  };

  function handleChange(name, value) {
    if (name === "usuario") {
      setUser(value);
    } else {
      if (value.length < 6) {
        setPassworderror(true);
      } else {
        setPassworderror(false);
        setPassword(value);
      }
    }
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="label-content-login">
          <div style={{ padding: "30px" }}>
            <Title text="Iniciar Sesión" valueO={1} />
          </div>

          <div
            style={{
              alignContent: "center",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              justifySelf: "center",
              justifyItems: "center",
            }}
          >
            <img className="title-img-login" src={userPGTI} />
          </div>
          <Label text="Usuario (Correo Electrónico)" />
          <Input
            attribute={{
              id: "usuario",
              name: "usuario",
              type: "text",
              placeholder: "Ingrese su usuario",
            }}
            handleChange={handleChange}
          />

          <Label text="Contraseña" />
          <Input
            attribute={{
              id: "contraseña",
              name: "contraseña",
              type: "password",
              placeholder: "Ingrese su contraseña",
            }}
            handleChange={handleChange}
            param={passwordError}
          />

          {passwordError && (
            <label className="label-error">
              Contraseña invalida o incompleta
            </label>
          )}
        </div>
      </div>
      <div className="submit-button-login-container">
        <button className="submit-button-login" onClick={postData}>
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

export default Login;
