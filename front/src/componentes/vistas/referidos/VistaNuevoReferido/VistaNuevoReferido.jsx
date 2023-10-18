import { Link } from "react-router-dom";
import FormularioNuevoReferido from "../../../formularios/referidos/FormularioNuevoReferido/FormularioNuevoReferido";

export default function VistaNuevoReferido() {

  return (
    <div class="container-fluid">

      <div class="row">
        <div class="col">
          <Link to="/">Inicio</Link>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <Link to="/todos-referidos" ><button>
            Referidos
          </button></Link>
        </div>
      </div>

      <div class="row">
        <h3>Nuevo Referido</h3>
      </div>

      <div class="row">
        <FormularioNuevoReferido />
      </div>
    </div>
  );
};