import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Form.css";
import Title from "../components/Title/Title";
import Label from "../components/Label/Label";
import SegmentControl from "../components/SegmentControl/SegmentControl";

const Form = () => {
  const [selectedValue1, setSelectedValue1] = useState("no");
  const [selectedValue2, setSelectedValue2] = useState("no");
  const [selectedValue3, setSelectedValue3] = useState("no");
  const [selectedValue4, setSelectedValue4] = useState("no");
  const [selectedValue5, setSelectedValue5] = useState("no");
  const [selectedValue6, setSelectedValue6] = useState("no");
  const [selectedValue7, setSelectedValue7] = useState("no");
  const [selectedValue8, setSelectedValue8] = useState("no");
  const [selectedValue9, setSelectedValue9] = useState("no");
  const [selectedValue10, setSelectedValue10] = useState("no");
  const [selectedValue11, setSelectedValue11] = useState("no");
  const [selectedValue12, setSelectedValue12] = useState("no");
  const [selectedValue13, setSelectedValue13] = useState("no");

  const [factores, setFactores] = useState([]);

  const [hasDiagnostic, setHasDiagnostico] = useState(false);

  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  let selectedFactores = [];

  const analyze = async (e) => {
    console.log("entro diagnos")
    if (selectedValue1 == "si") selectedFactores.push(1);

    if (selectedValue2 == "si") selectedFactores.push(2);

    if (selectedValue3 == "si") selectedFactores.push(3);

    if (selectedValue4 == "si") selectedFactores.push(4);

    if (selectedValue5 == "si") selectedFactores.push(5);

    if (selectedValue6 == "si") selectedFactores.push(6);

    if (selectedValue7 == "si") selectedFactores.push(7);

    if (selectedValue8 == "si") selectedFactores.push(8);

    if (selectedValue9 == "si") selectedFactores.push(9);

    if (selectedValue10 == "si") selectedFactores.push(10);

    if (selectedValue11 == "si") selectedFactores.push(11);

    if (selectedValue12 == "si") selectedFactores.push(12);

    if (selectedValue13 == "si") selectedFactores.push(13);

    console.log(selectedFactores);

    /* selectedFactores.map((el)=>{
            getPracticasByFactorId(el);
        }) */

    for (let el of selectedFactores) {
      await getPracticasByFactorId(el);
    }

    console.log("fin");

    //CAMBIA ESTO   /factors
    navigate("/table");
  };

  /*     const getFactores =  () => {
            Axios.get('https://api.practigti.net.pe/factores')
                .then(res => {                
                    console.log(res.data[0].TFactorPregunta)
                    setFactores(res.data[0].TFactorPregunta)
                    console.log(res.data[0].TFactorPregunta)
                });
        } */

  const postDiagnostic = (factorId, practicaId) => {
    console.log(factorId, practicaId);
    Axios.post("https://api.practigti.net.pe/diagnosticos", {
      CUsuario: localStorage.getItem("userId"),
      CFactor: factorId,
      CPractica: practicaId,
      NPracticaEstado: "No Iniciado",
    }).then((res) => {
      console.log(res);
    });
  };

  const getPracticasByFactorId = async (factorId) => {
    console.log(factorId);
    const response = await fetch(
      `https://api.practigti.net.pe/tratamientos/factores/${factorId}/practicas`
    );
    const data = await response.json();
    console.log(data);

    data.map((el) => {
      postDiagnostic(factorId, el.CPractica);
    });
  };

  const getFactores = async () => {
    const response = await fetch("https://api.practigti.net.pe/factores");
    const data = await response.json();
    setFactores(data);
    console.log(data);
    console.log(data[0].TFactorPregunta);
  };

  const deletePrevDiagnosis = async () => {
    Axios.delete(`https://api.practigti.net.pe/users/${userId}/diagnostico`)
      .then((res) => {
      console.log(res);
      analyze();
    });
  };

  async function getDiagnosticoByUserId() {
    const response = await fetch(`https://api.practigti.net.pe/users/${userId}/diagnostico`);
    const data = await response.json();

    if(data.length>0){
     //setHasDiagnostico(true)
     console.log(userId);
     deletePrevDiagnosis();
    }
    else{
      analyze();
    }
  }


  useEffect(() => {
    getFactores();
  }, []);

  return (
    <div className="form-container">
      <div class="titulo">
        <Title text="Formulario de Factores" valueO={2} />
      </div>
      <div className="form-content">
        <div className="label-content">
          <Label text="PREGUNTA 01" />
          <div className="preguntas-content">
            {factores?.length > 0 ? (
              <Label text={factores[0].TFactorPregunta} />
            ) : null}
            <SegmentControl
              name="group-1"
              callback={(val) => setSelectedValue1(val)}
              controlRef={useRef()}
              segments={[
                {
                  label: "SI",
                  value: "si",
                  ref: useRef(),
                },
                {
                  label: "NO",
                  value: "no",
                  ref: useRef(),
                },
              ]}
            />
           {/*  <h2>{selectedValue1}</h2> */}
          </div>
        </div>

        <div className="label-content">
          <Label text="PREGUNTA 02" />
          <div className="preguntas-content">
            {factores?.length > 0 ? (
              <Label text={factores[1].TFactorPregunta} />
            ) : null}
            <SegmentControl
              name="group-1"
              callback={(val) => setSelectedValue2(val)}
              controlRef={useRef()}
              segments={[
                {
                  label: "SI",
                  value: "si",
                  ref: useRef(),
                },
                {
                  label: "NO",
                  value: "no",
                  ref: useRef(),
                },
              ]}
            />
          </div>
        </div>

        <div className="label-content">
          <Label text="PREGUNTA 03" />
          <div className="preguntas-content">
            {factores?.length > 0 ? (
              <Label text={factores[2].TFactorPregunta} />
            ) : (
              <Label text="" />
            )}
            <SegmentControl
              name="group-1"
              callback={(val) => setSelectedValue3(val)}
              controlRef={useRef()}
              segments={[
                {
                  label: "SI",
                  value: "si",
                  ref: useRef(),
                },
                {
                  label: "NO",
                  value: "no",
                  ref: useRef(),
                },
              ]}
            />
          </div>
        </div>

        <div className="label-content">
          <Label text="PREGUNTA 04" />
          <div className="preguntas-content">
            {factores?.length > 0 ? (
              <Label text={factores[3].TFactorPregunta} />
            ) : (
              <Label text="" />
            )}
            <SegmentControl
              name="group-1"
              callback={(val) => setSelectedValue4(val)}
              controlRef={useRef()}
              segments={[
                {
                  label: "SI",
                  value: "si",
                  ref: useRef(),
                },
                {
                  label: "NO",
                  value: "no",
                  ref: useRef(),
                },
              ]}
            />
          </div>
        </div>

        <div className="label-content">
          <Label text="PREGUNTA 05" />
          <div className="preguntas-content">
            {factores?.length > 0 ? (
              <Label text={factores[4].TFactorPregunta} />
            ) : (
              <Label text="" />
            )}
            <SegmentControl
              name="group-1"
              callback={(val) => setSelectedValue5(val)}
              controlRef={useRef()}
              segments={[
                {
                  label: "SI",
                  value: "si",
                  ref: useRef(),
                },
                {
                  label: "NO",
                  value: "no",
                  ref: useRef(),
                },
              ]}
            />
          </div>
        </div>

        <div className="label-content">
          <Label text="PREGUNTA 06" />
          <div className="preguntas-content">
            {factores?.length > 0 ? (
              <Label text={factores[5].TFactorPregunta} />
            ) : (
              <Label text="" />
            )}
            <SegmentControl
              name="group-1"
              callback={(val) => setSelectedValue6(val)}
              controlRef={useRef()}
              segments={[
                {
                  label: "SI",
                  value: "si",
                  ref: useRef(),
                },
                {
                  label: "NO",
                  value: "no",
                  ref: useRef(),
                },
              ]}
            />
          </div>
        </div>

        <div className="label-content">
          <Label text="PREGUNTA 07" />
          <div className="preguntas-content">
            {factores?.length > 0 ? (
              <Label text={factores[6].TFactorPregunta} />
            ) : (
              <Label text="" />
            )}
            <SegmentControl
              name="group-1"
              callback={(val) => setSelectedValue7(val)}
              controlRef={useRef()}
              segments={[
                {
                  label: "SI",
                  value: "si",
                  ref: useRef(),
                },
                {
                  label: "NO",
                  value: "no",
                  ref: useRef(),
                },
              ]}
            />
          </div>
        </div>

        <div className="label-content">
          <Label text="PREGUNTA 08" />
          <div className="preguntas-content">
            {factores?.length > 0 ? (
              <Label text={factores[7].TFactorPregunta} />
            ) : (
              <Label text="" />
            )}
            <SegmentControl
              name="group-1"
              callback={(val) => setSelectedValue8(val)}
              controlRef={useRef()}
              segments={[
                {
                  label: "SI",
                  value: "si",
                  ref: useRef(),
                },
                {
                  label: "NO",
                  value: "no",
                  ref: useRef(),
                },
              ]}
            />
          </div>
        </div>

        <div className="label-content">
          <Label text="PREGUNTA 09" />
          <div className="preguntas-content">
            {factores?.length > 0 ? (
              <Label text={factores[8].TFactorPregunta} />
            ) : (
              <Label text="" />
            )}
            <SegmentControl
              name="group-1"
              callback={(val) => setSelectedValue9(val)}
              controlRef={useRef()}
              segments={[
                {
                  label: "SI",
                  value: "si",
                  ref: useRef(),
                },
                {
                  label: "NO",
                  value: "no",
                  ref: useRef(),
                },
              ]}
            />
          </div>
        </div>

        <div className="label-content">
          <Label text="PREGUNTA 10" />
          <div className="preguntas-content">
            {factores?.length > 0 ? (
              <Label text={factores[9].TFactorPregunta} />
            ) : (
              <Label text="" />
            )}
            <SegmentControl
              name="group-1"
              callback={(val) => setSelectedValue10(val)}
              controlRef={useRef()}
              segments={[
                {
                  label: "SI",
                  value: "si",
                  ref: useRef(),
                },
                {
                  label: "NO",
                  value: "no",
                  ref: useRef(),
                },
              ]}
            />
          </div>
        </div>

        <div className="label-content">
          <Label text="PREGUNTA 11" />
          <div className="preguntas-content">
            {factores?.length > 0 ? (
              <Label text={factores[10].TFactorPregunta} />
            ) : (
              <Label text="" />
            )}
            <SegmentControl
              name="group-1"
              callback={(val) => setSelectedValue11(val)}
              controlRef={useRef()}
              segments={[
                {
                  label: "SI",
                  value: "si",
                  ref: useRef(),
                },
                {
                  label: "NO",
                  value: "no",
                  ref: useRef(),
                },
              ]}
            />
          </div>
        </div>

        <div className="label-content">
          <Label text="PREGUNTA 12" />
          <div className="preguntas-content">
            {factores?.length > 0 ? (
              <Label text={factores[11].TFactorPregunta} />
            ) : (
              <Label text="" />
            )}
            <SegmentControl
              name="group-1"
              callback={(val) => setSelectedValue12(val)}
              controlRef={useRef()}
              segments={[
                {
                  label: "SI",
                  value: "si",
                  ref: useRef(),
                },
                {
                  label: "NO",
                  value: "no",
                  ref: useRef(),
                },
              ]}
            />
          </div>
        </div>

        <div className="label-content">
          <Label text="PREGUNTA 13" />
          <div className="preguntas-content">
            {factores?.length > 0 ? (
              <Label text={factores[12].TFactorPregunta} />
            ) : (
              <Label text="" />
            )}
            <SegmentControl
              name="group-1"
              callback={(val) => setSelectedValue13(val)}
              controlRef={useRef()}
              segments={[
                {
                  label: "SI",
                  value: "si",
                  ref: useRef(),
                },
                {
                  label: "NO",
                  value: "no",
                  ref: useRef(),
                },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="submit-button-form-container">
        <button className="submit-button-form" onClick={getDiagnosticoByUserId}>
          Analizar
        </button>
      </div>
    </div>
  );
};

const ColorUpdate = (value) => {
  this.setState({ color: value });
};

export default Form;
