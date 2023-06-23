import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Factor.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Title from "../components/Title/Title";

const Factor = () => {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const [factores, setFactores] = useState([]);
  const [practicas, setPracticas] = useState([]);

  const routeChange = () => {
    navigate("/form");
    window.scrollTo(0, 0);
    window.location.reload();
  };

  const getFactoresByUserId = async () => {
    const response = await fetch(
      `https://api.practigti.net.pe/users/${userId}/factores`
    );
    const data = await response.json();
    //console.log(data);
    //setFactores(data);
    return data;
  };

  const getFactorData = async (factorId) => {
    const response = await fetch(`https://api.practigti.net.pe/factores/${factorId}`);
    const data = await response.json();
    console.log(data[0]);
    setFactores((oldFactores) => [...oldFactores, data[0]]);
    //console.log(factores)
  };

  const getAllPracticasByFactorIdAndUserId = async (factorId) => {
    const response = await fetch(
      `https://api.practigti.net.pe/factores/${factorId}/users/${userId}/practicas`
    );
    const data = await response.json();
    console.log(data);
    /* setPracticas(oldPracticas=>[...oldPracticas,data]);
        console.log(practicas) */
    let practica = "";
    data.map((bp, i, arr) => {
      if (arr.length - 1 === i) {
        practica += "Buena Práctica " + bp.CPractica + ".";
      } else practica += "Buena Práctica " + bp.CPractica + ", ";
      console.log(practica);
    });

    setPracticas((oldPracticas) => [...oldPracticas, practica]);
    /*  setFactores(data);
         return data; */
  };

  useEffect(() => {
    getFactoresByUserId().then((res) => {
      console.log(res);
      res.map((el) => {
        getFactorData(el);
      });
      res.map((elem) => {
        getAllPracticasByFactorIdAndUserId(elem);
      });
    });
  }, []);

  return (
    <div className="factors-container">
      <div class="titulo">
        <Title text="Factores Influyentes" valueO={2} />
      </div>

      <div
        style={{ paddingTop: "1% ", paddingRight: "10%", paddingLeft: "10%" }}
      >
        {factores.length === 0 ? (
          <h3>Cargando...</h3>
        ) : (
          factores.map((el, i) => (
            <Accordion key={el.CFactor}>
              <AccordionSummary
                sx={{ backgroundColor: "#67AFFD" }}
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography sx={{ color: "white" }}>
                  Factor {el.CFactor} ({el.NFactor})
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "#ADD5FA" }}>
                <Typography>{el.TFactorDescripcion}</Typography>
                <hr />
                <Typography>
                  Las Buenas Prácticas que tratan a este factor son:{" "}
                  {practicas[i]}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </div>
      <div className="submit-button-factor-container">
        <button className="btn-factor" onClick={routeChange}>
          Volver a analizar
        </button>
      </div>
    </div>
  );
};

export default Factor;
