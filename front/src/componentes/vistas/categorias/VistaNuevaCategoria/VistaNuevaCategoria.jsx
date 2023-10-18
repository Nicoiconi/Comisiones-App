import { Link } from "react-router-dom";
import FormularioNuevaCategoria from "../../../formularios/categorias/FormularioNuevaCategoria/FormularioNuevaCategoria";

export default function VistaNuevaCategoria() {

  return (
    <div class="container-fluid">

      <div class="row">
        <div class="col">
          <Link to="/">Inicio</Link>
        </div>
      </div>


      <div class="row">
        <div class="col">
          <Link to="/todas-categorias" ><button>
            Categorias
          </button></Link>
        </div>
      </div>

      <div class="row">
        <h3>Nueva Categoria</h3>
      </div>

      <div class="row">
        <FormularioNuevaCategoria />
      </div>

    </div>
  );
};