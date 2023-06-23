import React, { useRef, useState, useEffect } from "react";
import "./Practices.css";
import Title from "../components/Title/Title";
import book from "../../assets/images/libro.png";
import { useNavigate, withRouter  } from "react-router-dom";

export default function Practices() {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const [factores, setFactores] = useState([]);
  const [practicas, setPracticas] = useState([]);
  const [estados, setEstados] = useState([]);

  const [val, setVal] = useState();

  let cont = 0;
  const [dts, setDts] = useState([]);
//  const { history } = props

    const getPracticasByUserId = async () => {
    const response = await fetch(
      `https://api.practigti.net.pe/users/${userId}/practicas`
    );
    const data = await response.json();
    //console.log(data);
    // setPracticas(data);
    return data;
  };

  const getPracticaData = async (practicaId) => {
    const response = await fetch(
      `https://api.practigti.net.pe/practicas/${practicaId}`
    );
    const data = await response.json();
    //console.log(data);
    setPracticas((oldPracticas) => [...oldPracticas, data[0]]);
    //console.log(factores)
  };

  const getAllFactoresByPracticaIdAndUserId = async (practicaId) => {
    const response = await fetch(
      `https://api.practigti.net.pe/practicas/${practicaId}/users/${userId}/factores`
    );
    const data = await response.json();
    // console.log(data);
    /* setPracticas(oldPracticas=>[...oldPracticas,data]);
        console.log(practicas) */
    let factor = "";
    data.map((f, i, arr) => {
      if (arr.length - 1 === i) {
        factor += "Factor " + f.CFactor + ".";
      } else factor += "Factor " + f.CFactor + ", ";
      //  console.log(factor);
    });

    setFactores((oldFactores) => [...oldFactores, factor]);
    /*  setFactores(data);
         return data; */
  };

  useEffect(() => {
    getPracticasByUserId().then(async (res) => {
      //console.log(res);
      /* res.map((el) => {
        getPracticaData(el.CPractica);
      }); */
      //console.log(res)

      for (let el of res) {
        estados.push(el.NPracticaEstado);
        //console.log(estados);
        await getPracticaData(el.CPractica);
      }

      for (let elem of res) {
        await getAllFactoresByPracticaIdAndUserId(elem.CPractica);
      }

      setVal(1);

      /* res.map((elem) => {
        getAllFactoresByPracticaIdAndUserId(elem.CPractica);
      }); */
    });
  }, []);

  useEffect(() => {
    console.log("entro");

    for (let p of practicas) {
      console.log("entro al arreglo");
      //console.log(cont)

      const data = {
        CPracticaId: practicas[cont].CPractica,
        CPracticaNombre: practicas[cont].NPractica,
        CFactores: factores[cont],
        CEstado: estados[cont],
      };
      console.log(data);

      setDts((old) => [...old, data]);
      //dts.push(data);

      /*         console.log(dts[cont].CEstado)
        console.log(cont) */

      cont++;
      /*       console.log(dts)
        console.log(dts.length) */

      /*         console.log(dts[0])
        console.log(dts[1].CPracticaId) */
    }
  }, [val]);

  const navDetail = (id) => {
    navigate("/details", { state: { id: id } });
  };

  const routeChange = () => {
    
    navigate("/model");    
    window.scrollTo(0, 0);
    window.location.reload();
    //history.push('/model')
  };

  return (
    <div className="practicespr-container">
      <div class="titulo">
        <Title text="Buenas Prácticas" valueO={2} />
      </div>

      <div className="tablepr-container">
        <table>
          <thead>
            <th>BUENAS PRÁCTICAS</th>
            <th>NOMBRE</th>
            <th>FACTORES</th>
            <th>ESTADO</th>
            <th>INSTRUCCIONES</th>
          </thead>

          <tbody>
            {dts.map((item) => (
              <tr key={item.CPracticaId}>
                <td data-label="Buenas Practicas">
                  Buena Práctica {item.CPracticaId}
                </td>
                <td data-label="Nombre">{item.CPracticaNombre}</td>
                <td data-label="Factores">{item.CFactores}</td>
                <td data-label="Estado">{item.CEstado}</td>
                <td data-label="Instrucciones">
                  <a href="" onClick={() => navDetail(item.CPracticaId)}>
                    <img className="logo-img" src={book} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>    
        </table>
      </div>

      <div className="submit-button-modelpr-container">
        <button className="submit-button-modelpr" onClick={routeChange}>
          Modelo Factor-Práctica
        </button>
      </div>
    </div>
  );
}
