import React, { useState, useEffect, useRef } from "react";
import "./Profile.css";
import Title from "../components/Title/Title";
import Label from "../components/Label/Label";
import Input from "../components/Input/Input";
import InpuDark from "../components/Input/InputDark";
import "react-widgets/styles.css";
import Axios from "axios";
import userPGTI from "../../assets/images/user-practigti.png";

const Profile = () => {
  const fileInput = useRef(null);
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPassworderror] = useState(false);

  const [user, setUser] = useState({});
  const [universidad, setUniversidad] = useState("");

  const [image, setImage] = useState("");

  const userId = localStorage.getItem("userId");

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "practigti");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dlmk0auuy/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();

    //setImage(file.secure_url)
    setUser((user) => ({
      ...user,
      TUsuarioImagen: file.secure_url,
    }));
  };

  const deleteImage = () => {
    setImage("");
    setUser((user) => ({
      ...user,
      TUsuarioImagen: "",
    }));
  };

  async function getUserById() {
    const response = await fetch(`https://api.practigti.net.pe/users/${userId}`);
    const data = await response.json();

    setUser((user) => ({
      ...user,
      ...data[0],
    }));
    setName(data[0].NUsuario);
    setLastName(data[0].NUsuarioApellido);
    /* setImage(user.TUsuarioImagen)
        setPassword(user.TUsuarioContrasena) */

    return data[0].CUniversidad;
  }

  async function getUniversidadById(universidadId) {
    const response = await fetch(
      `https://api.practigti.net.pe/universidades/${universidadId}`
    );
    console.log(response);
    const data = await response.json();

    /* setUser(user => ({
            ...user,
            CUniversidad:"universidad"
        })); */

    setUniversidad(data[0].NUniversidad);
    // console.log(data)
    //return data[0];
  }

  const updateData = (e) => {
    console.log(
      user.CUniversidad,
      user.NUsuario,
      user.NUsuarioApellido,
      user.TUsuarioImagen,
      user.TUsuarioCorreo,
      user.TUsuarioContrasena,
      user.DUsuarioFechaUnion
    );

    Axios.put(`https://api.practigti.net.pe/users/${userId}`, {
      CUniversidad: user.CUniversidad,
      NUsuario: user.NUsuario,
      NUsuarioApellido: user.NUsuarioApellido,
      TUsuarioImagen: user.TUsuarioImagen,
      TUsuarioCorreo: user.TUsuarioCorreo,
      TUsuarioContrasena: user.TUsuarioContrasena,
      DUsuarioFechaUnion: user.DUsuarioFechaUnion.split("T")[0],
    }).then((res) => {
      console.log(res);
      window.location.reload(false);
    });
  };

  useEffect(() => {
    getUserById().then((res) => {
      console.log(res);

      getUniversidadById(res);
    });
  }, []);

  function handleChange(name, value) {
    if (name === "name") {
      //setName(value)
      setUser((user) => ({
        ...user,
        NUsuario: value,
      }));
    }
    if (name === "lastname") {
      // setLastName(value)
      setUser((user) => ({
        ...user,
        NUsuarioApellido: value,
      }));
    }

    if (name === "password") {
      //setPassword(value)
      setUser((user) => ({
        ...user,
        TUsuarioContrasena: value,
      }));
    }

    /*  else {
             if (value.length < 6) {
                 setPassworderror(true);
             }
             else {
                 setPassworderror(false);
                 setPassword(value);
             }
         } */
  }

  return (
    <div className="profile-container">
      <div style={{ padding: "30px" }}>
        <Title text="Configuración de Usuario" valueO={1} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <div style={{ minWidth: "500px" }}>
          <Label text="Nombres" />
          <InpuDark
            attribute={{
              id: "name",
              name: "name",
              type: "text",
              placeholder: `${name}`,
            }}
          />
          <Input
            attribute={{
              id: "nameI",
              name: "name",
              type: "text",
              value: `${user.NUsuario}`,
            }}
            handleChange={handleChange}
          />

          <Label text="Apellidos" />
          <InpuDark
            attribute={{
              id: "lastname",
              name: "lastname",
              type: "text",
              placeholder: `${lastname}`,
            }}
          />
          <Input
            attribute={{
              id: "lastnameI",
              name: "lastname",
              type: "text",
              value: `${user.NUsuarioApellido}`,
            }}
            handleChange={handleChange}
          />

          <Label text="Universidad" />
          <InpuDark
            attribute={{
              id: "university",
              name: "university",
              type: "text",
              placeholder: `${universidad}`,
            }}
            handleChange={handleChange}
          />

          <Label text="Email" />
          <InpuDark
            attribute={{
              id: "correo",
              name: "correo",
              type: "text",
              placeholder: `${user.TUsuarioCorreo}`,
            }}
            handleChange={handleChange}
          />
        </div>

        <div style={{ minWidth: "500px" }}>
          <Label text="Contraseña" />
          <InpuDark
            attribute={{
              id: "password",
              name: "password",
              type: "password",
              placeholder: "*********",
            }}
            handleChange={handleChange}
          />
          <Input
            attribute={{
              id: "passwordI",
              name: "password",
              type: "password",
              placeholder: "Nueva contraseña",
            }}
            handleChange={handleChange}
          />
          <Input
            attribute={{
              id: "passwordI2",
              name: "password",
              type: "password",
              placeholder: "Confirmar nueva contraseña",
            }}
            handleChange={handleChange}
          />

          <Label text="Agregar foto de perfil"></Label>

          <div
            style={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {user.TUsuarioImagen ? (
              <img
                style={{
                  position: "relative",
                  width: "30%",
                  height: "160px",
                  borderRadius: "100px",
                  border: "none",
                  outline: "none",
                }}
                src={user.TUsuarioImagen}
              />
            ) : (
              <img
                style={{ position: "relative", top: 0, left: 0 }}
                className="title-img"
                src={userPGTI}
              />
            )}
          </div>

          <div className="submit-button-profile-container">
            <div
              style={{
                width: "50%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <input
                type="file"
                name="file"
                placeholder="Agregar Imagen"
                onChange={uploadImage}
                style={{ display: "none" }}
                ref={fileInput}
              ></input>
              <button
                className="submit-button-profile"
                onClick={() => fileInput.current.click()}
              >
                Agregar
              </button>
            </div>

            <div
              style={{
                width: "50%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button className="submit-button-profile" onClick={deleteImage}>
                Eliminar
              </button>
            </div>
          </div>
        </div>

        <div className="submit-button-save-container">
          <button className="submit-button-save" onClick={updateData}>
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
