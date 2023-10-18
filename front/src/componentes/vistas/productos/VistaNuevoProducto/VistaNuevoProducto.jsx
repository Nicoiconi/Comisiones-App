import { Link } from "react-router-dom/cjs/react-router-dom.min";
import FormularioNuevoProducto from "../../../formularios/productos/FormularioNuevoProducto/FormularioNuevoProducto";

export default function VistaNuevoProducto() {

  return (
    <div class="container-fluid">

      <div class="row">
        <div class="col">
          <Link to="/">Inicio</Link>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <Link to="/todos-productos" >
            <button>
              Productos
            </button>
          </Link>
        </div>
      </div>

      <div class="row">
        <h3>Nuevo Producto</h3>
      </div>

      <div class="row">
        <FormularioNuevoProducto />
      </div>
    </div>
  );
};