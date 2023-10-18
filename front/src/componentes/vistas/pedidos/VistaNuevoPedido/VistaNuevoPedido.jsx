import { Link } from "react-router-dom/cjs/react-router-dom.min";
import FormularioNuevoPedido from "../../../formularios/pedidos/FormularioNuevoPedido/FormularioNuevoPedido";

export default function VistaNuevoPedido() {

  return (
    <div class="container-fluid">

      <div class="row">
        <div class="col">
          <Link to="/">Inicio</Link>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <Link to="/todos-pedidos" >
            <button>
              Pedidos
            </button>
          </Link>
        </div>
      </div>

      <div class="row">
        <h3>Nuevo Pedido</h3>
      </div>

      <div class="row">
        <FormularioNuevoPedido />
      </div>
    </div>
  );
};