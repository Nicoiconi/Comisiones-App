import { Link } from "react-router-dom/cjs/react-router-dom.min";
import FormularioNuevoProveedor from "../../../formularios/proveedores/FormularioNuevoProveedor/FormularioNuevoProveedor";

export default function VistaNuevoProveedor() {

  return (
    <div class="container-fluid">

      <div class="row">
        <div class="col">
          <Link to="/">Inicio</Link>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <Link to="/todos-proveedores" >
            <button>
              Proveedores
            </button>
          </Link>
        </div>
      </div>

      <div class="row">
        <h3>Nuevo Proveedor</h3>
      </div>

      <div class="row">
        <FormularioNuevoProveedor />
      </div>
    </div>
  );
};