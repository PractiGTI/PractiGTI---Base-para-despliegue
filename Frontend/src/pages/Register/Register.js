import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Title from "../components/Title/Title";
import Label from "../components/Label/Label";
import Input from "../components/Input/Input";
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";
import userPGTI from "../../assets/images/user-practigti.png";
import Axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  let universidad = ["UPC", "USIL", "ULIMA"];

  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const [universidades, setUniversidades] = useState([]);

  const [nameError, setNameerror] = useState(false);
  const [lastnameError, setLastNameerror] = useState(false);
  const [correoError, setCorreoerror] = useState(false);
  const [passwordError, setPassworderror] = useState(false);
  const [selectedUniversidad, setSelectedUniversidad] = useState("");

  const postData = (e) => {
    e.preventDefault();
    console.log(selectedUniversidad.CUniversidad);

    Axios.post("https://api.practigti.net.pe/signup", {
      NUsuario: name,
      NUsuarioApellido: lastname,
      TUsuarioCorreo: correo,
      TUsuarioContrasena: password,
      DUsuarioFechaUnion: "2022-01-01",
      CUniversidad: selectedUniversidad.CUniversidad,
    })
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        if (err.response.status == 403) {
          alert("Ya existe una cuenta con este correo.");
        }
        console.log(err.response.status);
      });
  };

  const getUniversidadesList = async () => {
    const response = await fetch("https://api.practigti.net.pe/universidades");
    const data = await response.json();
    console.log(data);
    setUniversidades(data);
    //setPractica(data[0]);
  };

  function handleChange(name, value) {
    if (name === "name") {
      setName(value);
    }

    if (name === "lastname") {
      console.log(value);
      setLastName(value);
    }

    if (name === "correo") {
      console.log(value);
      setCorreo(value);
    }

    if (name === "password") {
      setPassword(value);
    }
  }

  useEffect(() => {
    getUniversidadesList();
  }, []);

  return (
    <div className="register-container">
      <div className="register-content">
        <div className="label-content-register">
          <div style={{ padding: "30px" }}>
            <Title text="Registrarse" valueO={1} />
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
            <img className="title-img" src={userPGTI} />
          </div>

          <Label text="Nombres" />
          <Input
            attribute={{
              id: "name",
              name: "name",
              type: "text",
              placeholder: "Ingrese su nombre",
            }}
            handleChange={handleChange}
          />

          <Label text="Apellidos" />
          <Input
            attribute={{
              id: "lastname",
              name: "lastname",
              type: "text",
              placeholder: "Ingrese su Apellido",
            }}
            handleChange={handleChange}
          />

          <Label text="Universidad" />

          <Combobox
            className="otro"
            data={universidades}
            textField="NUniversidad"
            filter="contains"
            onChange={(selectedUniversidad) =>
              setSelectedUniversidad(selectedUniversidad)
            }
          />

          <Label text="Correo Electrónico" />
          <Input
            attribute={{
              id: "correo",
              name: "correo",
              type: "text",
              placeholder: "Ingrese su correo",
            }}
            handleChange={handleChange}
            param={correoError}
          />

          {correoError && (
            <label className="label-error">
              El correo no es valido o está incompleto
            </label>
          )}

          <Label text="Contraseña" />
          <Input
            attribute={{
              id: "password",
              name: "password",
              type: "password",
              placeholder: "Ingrese su contraseña",
            }}
            handleChange={handleChange}
          />

          <Label text="Confirmar contraseña" />
          <Input
            attribute={{
              id: "reppassword",
              name: "reppassword",
              type: "password",
              placeholder: "Repita su contraseña",
            }}
          />
        </div>
      </div>
      <div className="submit-button-register-container">
        <button className="submit-button-register" onClick={postData}>
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default Register;
