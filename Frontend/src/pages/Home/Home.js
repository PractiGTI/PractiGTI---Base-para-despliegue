import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  let navigate = useNavigate();

  const routeChange = () => {
    navigate("/table");
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 style={{ fontWeight: "normal", textAlign: "center" }}>
          Implementa buenas prácticas que traten los factores que influyen en el
          principio de responsabilidad del Gobierno TI en universidades
        </h1>
        <div className="btn-container" style={{ marginBottom: "50px" }}>
          <button className="btn-home" onClick={routeChange}>
            Consultar Factores
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ width: "45%" }}>
            <h2>Gobierno de TI</h2>
            <h4 style={{ textAlign: "justify" }}>
              Es una estructura de gestión empleada para evaluar, dirigir y
              monitorear los sistemas de información encargados de apoyar las
              necesidades de la empresa. Asimismo, se delega la autoridad del
              gobierno de TI mediante las normas, políticas, procesos, soporte,
              definición de roles y responsabilidades, prácticas y herramientas
              que ayuden a integrar el gobierno de TI con la unidad
              organizacional.
            </h4>
          </div>
          <div style={{ width: "45%", marginTop: "100px" }}>
            <h2>ISO/IEC 38500</h2>
            <h4 style={{ textAlign: "justify" }}>
              La norma ISO/IEC 38500 sirve de referencia para el diseño de
              buenas prácticas en la creación de modelos de Gobierno de TI.
              Además, se centra en tres principales actividades del gobierno
              tales como liderar, evaluar y monitorear. Estas se basan en los
              seis principios fundamentales, tales como el desempeño,
              responsabilidad, cumplimiento, estrategia, adquisición y factor
              humano.
            </h4>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ width: "45%" }}>
            <h2>Principio de Responsabilidad</h2>
            <h4 style={{ textAlign: "justify" }}>
              Es uno de los seis principios establecidos por la norma ISO 38500
              enfocado en la comprensión, entendimiento y aceptación de roles y
              responsabilidades tanto internas como externas por parte de cada
              uno de los individuos de la organización.
            </h4>
          </div>
          <div style={{ width: "45%", marginTop: "100px" }}>
            <h2>COBIT</h2>
            <h4 style={{ textAlign: "justify" }}>
              Es un marco que proporciona una visión global de la gobernanza de
              sistemas de información en las organizaciones. Además, tiene un
              alcance que cubre las áreas de gestión, control y gobierno de las
              TIC asegurando que se adecuen a las necesidades de los
              Stakeholders. Este marco añade pautas para la autoevaluación e
              indicadores de desempeño con el fin de alinearse con ITIL.{" "}
            </h4>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ width: "45%" }}>
            <h2>ITIL</h2>
            <h4 style={{ textAlign: "justify" }}>
              Es una guía que proporciona un marco integral para el ciclo de
              vida del servicio de TI. Este marco ofrece buenas prácticas que
              facilitan la entrega de servicios de TI. Además, permite una mejor
              alineación entre el negocio y el área de TI lo que causa un mejor
              entorno competitivo de las organizaciones.
            </h4>
          </div>
          <div style={{ width: "45%" }}></div>
        </div>
      </div>
    </div>
  );
}
