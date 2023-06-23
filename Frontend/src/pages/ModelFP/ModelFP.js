import React, { useRef, useState, useEffect } from "react";
import "./ModelFP.css";
import Title from "../components/Title/Title";
import book from "../../assets/images/libro.png";
import exportAsImage from "../../utils/exportAsImage";
import { elementTypeAcceptingRef } from "@mui/utils";

export default function ModelFP() {
  const exportRef = useRef();
  const userId = localStorage.getItem("userId");

  const [factores, setFactores] = useState([]);
  const [factoresHeader, setFactoresHeader] = useState([]);
  const [factoresByPractica, setFactoresByPractica] = useState([]);
  const [practicas, setPracticas] = useState([]);
  const [estados, setEstados] = useState([]);
  const [arrayTable, setArrayTable] = useState([]);
  //const [arrayTable2, setArrayTable2] = useState([]);

  const [val, setVal] = useState();

  let cont = 0;
  let arrayTable2 = [];
  const [dts, setDts] = useState([]);

  const getPracticasByUserId = async () => {
    const response = await fetch(
      `https://api.practigti.net.pe/users/${userId}/practicas`
    );
    const data = await response.json();
    //console.log(data);
    //
    console.log(data);
    setPracticas(data);
    return data;
  };

  const getFactoresByUserId = async () => {
    const response = await fetch(
      `https://api.practigti.net.pe/users/${userId}/factores`
    );
    const data = await response.json();
    //console.log(data);
    // console.log(data);
    data.map((el) => {
      setFactores((oldFactores) => [...oldFactores, el]);
      setFactoresHeader((old) => [...old, el]);
    });

    setVal(1);

    // console.log(factores);
    return data;
  };

  const getAllFactoresByPracticaIdAndUserId = async (practicaId) => {
    const response = await fetch(
      `https://api.practigti.net.pe/practicas/${practicaId}/users/${userId}/factores/2`
    );
    const data = await response.json();
    // console.log(data);
    /* setPracticas(oldPracticas=>[...oldPracticas,data]);
        console.log(practicas) */

    console.log(data);

    setFactoresByPractica((oldFactores) => [...oldFactores, data]);
    // console.log(factoresByPractica);
    /*  setFactores(data);
         return data; */
  };

  useEffect(() => {
    getPracticasByUserId().then(async (res) => {
      setFactoresHeader((old) => [...old, "Practicas x Factor"]);

      for (let elem of res) {
        await getAllFactoresByPracticaIdAndUserId(elem.CPractica);
      }

      getFactoresByUserId();
    });
  }, []);

  useEffect(() => {
    // console.log("entro")

    //console.log(practicas);
    //console.log(factores);
    //console.log(factoresByPractica);

    /* for(let i=0;i<factoresByPractica.length;i++){ //3
      for(let j=0;j<factores.length;j++){ //2
       // console.log(i,j)
       for(let k=0;k<factoresByPractica[i].length;k++){

        //console.log(i,j,k)
        if(factores[j]===factoresByPractica[i][k].CFactor){

          console.log("factores[j]",factores[j])
          console.log("factoresByPractica[i][k].CFactor",factoresByPractica[i][k].CFactor)
          
          arrayTable2.push("X")
          
        }
        else{
          console.log("factores[j]",factores[j])
          console.log("factoresByPractica[i][k].CFactor",factoresByPractica[i][k].CFactor)
          arrayTable2.push("")
        }
       }
      }
      arrayTable.push(arrayTable2);
    } */

    /* factoresByPractica.map(elem=>{
    arrayTable2.length=0;
      elem.map(el=>{
        console.log(el)
        if(factores.includes(el.CFactor)){
          arrayTable2.push("X")
        }
        else
          arrayTable2.push("")
      })
      
      arrayTable.push(arrayTable2);
      console.log(arrayTable2)
      
   }) */

    /* factoresByPractica.map((elem,index)=>{
    arrayTable2.length=0;
    console.log(arrayTable2)
    
    arrayTable2.push("Buena Práctica " + practicas[index].CPractica )
      
      factores.map(el=>{
      
        
          if(elem.includes(el)){
            console.log("SI")
            arrayTable2.push("X")
          }
          else{
            console.log("NO")
            arrayTable2.push("")
          }
          
      })
 
      
     // setArrayTable((old) => [...old, arrayTable2]);
      arrayTable.push(arrayTable2);
      console.log(arrayTable2)
      console.log(arrayTable)
     
      
   }) */

    for (let elem of factoresByPractica) {
      const arrayPrueba = [];
      //arrayTable2.length=0;

      arrayPrueba.push("Buena Práctica " + practicas[cont].CPractica);

      for (let el of factores) {
        if (elem.includes(el)) {
          //console.log("SI")
          arrayPrueba.push("X");
        } else {
          //console.log("NO")
          arrayPrueba.push("");
        }
      }

      setArrayTable((old) => [...old, arrayPrueba]);
      // arrayTable.push(arrayPrueba);
      console.log(arrayPrueba);
      console.log(arrayTable);

      cont++;
    }

    console.log(arrayTable);
  }, [val]);

  return (
    <div className="modelfp-container">
      <div class="titulo">
        <Title text="Modelo Factor - Practica" valueO={2} />
      </div>

      <div className="tablefp-container" ref={exportRef}>
        <table className="tablefp-container-fp">
          {arrayTable.length != 0 ? (
            <thead>
              <tr>
                {factoresHeader.map((item, index) =>
                  index == 0 ? <th>{item}</th> : <th>Factor {item}</th>
                )}
              </tr>
            </thead>
          ) : null}

          <tbody>
            {arrayTable.map((item) => (
              <tr>
                {item.map((el) => (
                  <td>{el}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="submit-button-modelfp-container">
        <button
          className="submit-button-modelfp"
          onClick={() =>
            exportAsImage(exportRef.current, "ModeloFactorPractica")
          }
        >
          Descargar
        </button>
      </div>
    </div>
  );
}
