import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./DetailGP.css";
import Title from "../components/Title/Title";
import Combobox from "react-widgets/Combobox";
import { useNavigate, useLocation } from "react-router-dom";

export default function DetailGP() {
  const userId = localStorage.getItem("userId");
  const { state } = useLocation();
  const { id } = state;
  const navigate = useNavigate();

  const [practica, setPractica] = useState({});

  console.log(id);
  let universidad = [
    "Recien implementado",
    "En Actividad",
    "Exitosa",
    "En Espera",
  ];

  const [selectedEstado, setSelectedEstado] = useState("No Iniciado");

  const getPracticaData = async (practicaId) => {
    const response = await fetch(
      `https://api.practigti.net.pe/practicas/${practicaId}`
    );
    const data = await response.json();
    //console.log(data);
    setPractica(data[0]);
  };

  const getEstadoPractica = async () => {
    const response = await fetch(
      `https://api.practigti.net.pe/users/${userId}/practicas`
    );
    const data = await response.json();
    console.log(data);
    data.map((val) => {
      if (val.CPractica == id) setSelectedEstado(val.NPracticaEstado);
    });
    //setSelectedEstado(data[0]);
  };

  const updateEstado = (e) => {
    console.log(practica.CPractica, userId);
    console.log(selectedEstado);

    Axios.patch(
      `https://api.practigti.net.pe/practicas/${practica.CPractica}/users/${userId}`,
      {
        NPracticaEstado: selectedEstado,
      }
    ).then((res) => {
      console.log(res.status);
    });

    routeChange();
  };

  useEffect(() => {
    getPracticaData(id);
    getEstadoPractica();
  }, []);

  const routeChange = () => {
    navigate("/practices");
    window.scrollTo(0, 0);
    window.location.reload();
  };

  return (
    <div className="detail-container">
      <div className="titulo">
        <Title text="Buena Práctica" valueO={2} />
      </div>

      {practica != null ? (
        <div className="detail-content1">
          <h1>{practica.NPractica}</h1>
          <p>{practica.TPracticaDescripcion}</p>
          <div className="detail-content2">
            <h1>Instrucciones de las buenas practicas</h1>
            <p>{practica.TPracticaInstrucciones}</p>
          </div>
        </div>
      ) : null}

      <div className="detail-content3">
        <Combobox
          className="other"
          data={universidad}
          textField="Universidad"
          value={selectedEstado}
          //placeholder="No iniciado"
          filter="contains"
          onChange={(selectedEstado) => setSelectedEstado(selectedEstado)}
        />
      </div>

      <div className="submit-button-detail-container">
        <button className="submit-button-detail" onClick={updateEstado}>
          Guardar Estado
        </button>
      </div>
    </div>
  );
}
