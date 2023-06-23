import React, { useState, useEffect, useRef } from "react";
import "./Table.css";
import Title from "../components/Title/Title";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/images/arrow.png";
import { useTour, TourProvider } from '@reactour/tour'
import { steps } from "../../utils/step"

export default function Table() {
  let navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const [hasDiagnostic, setHasDiagnostico] = useState(false);
  const [buttonColor1, setButtonColor1] = useState("#66b2ff");
  const [buttonState1, setButtonState1] = useState(false);
  const [buttonState2, setButtonState2] = useState(true);
  const [buttonColor2, setButtonColor2] = useState("grey");
  const { setIsOpen } = useTour()

  const routeChange = (e) => {
    if (e === 1) navigate("/form");
    if (e === 2) navigate("/factors");
    if (e === 3) navigate("/practices");
    if (e === 4) navigate("/model");
  };

  async function getDiagnosticoByUserId() {
    const response = await fetch(`https://api.practigti.net.pe/users/${userId}/diagnostico`);
    const data = await response.json();

    if(data.length>0){
     // setHasDiagnostico(true)
      setButtonColor1("grey")
      setButtonColor2("#66b2ff")
      setButtonState1(true)
      setButtonState2(false)
    }
  }

  useEffect(() => {
    getDiagnosticoByUserId();
    setIsOpen(true);   
  }, []);

  return (
    
    <div className="tableGTI-container">
      <div style={{ padding: "30px" }}>
        <Title text="Tablero GTI" valueO={1} />
      </div>

      <div className="button-tableGTI-container">
        <div className="submit-button-tableGTI-container1">
         {/*  {
            hasDiagnostic?
            <button
            className="submit-button-table1"
            style={{ background: "grey"}}
            onClick={(e) => routeChange(1)}
          >
            Análisis
          </button>
          :
          <button
          className="submit-button-table1"
          style={{ background: "#66b2ff"}}
          onClick={(e) => routeChange(1)}
        >
          Análisis
        </button>
          } */}

          <button
            className="submit-button-table1"
            disabled={buttonState1}
            style={{ background: buttonColor1}}
            onClick={(e) => routeChange(1)}
          >
            Análisis
          </button>
         
        </div>

        <img className="flecha1" src={arrow} />

        <div className="submit-button-tableGTI-container2">
          <button
            className="submit-button-table2"
            disabled={buttonState2}
            style={{ background: buttonColor2}}
            onClick={(e) => routeChange(2)}
          >
            Factores
          </button>
        </div>

        <img className="flecha2" src={arrow} />

        <div className="submit-button-tableGTI-container3">
          <button
            className="submit-button-table3"
            disabled={buttonState2}
            style={{ background: buttonColor2}}
            onClick={(e) => routeChange(3)}
          >
            Buenas Practicas
          </button>
        </div>

        <img className="flecha3" src={arrow} />

        <div className="submit-button-tableGTI-container4">
          <button
            className="submit-button-table4"
            disabled={buttonState2}
            style={{ background: buttonColor2}}
            onClick={(e) => routeChange(4)}
          >
            Modelo Factor-Practica
          </button>
        </div>
      </div>
    </div>
    
  );
}
