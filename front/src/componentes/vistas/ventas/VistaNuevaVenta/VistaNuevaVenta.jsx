import { Link } from "react-router-dom/cjs/react-router-dom.min";
import FormularioNuevaVenta from "../../../formularios/ventas/FormularioNuevaVenta/FormularioNuevaVenta";

export default function VistaNuevaVenta() {

  return (
    <div class="container-fluid">

      <div class="row">
        <div class="col">
          <Link to="/">Inicio</Link>
        </div>
      </div>


      <div class="row">
        <div class="col">
          <Link to="/todas-ventas" >
            <button>
              Ventas
            </button>
          </Link>
        </div>
      </div>

      <div class="row">
        <h3>Nueva Venta</h3>
      </div>

      <div class="row">
        <FormularioNuevaVenta />
      </div>


    </div>
  );
};