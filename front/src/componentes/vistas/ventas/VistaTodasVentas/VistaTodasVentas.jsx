import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { buscarVentas } from "../../../../redux/actions/ventasActions/ventasActions";
import ListaVentas from "../../../contenedores/listas/ListaVentas/ListaVentas";

export default function VistaTodasVentass() {

  const dispatch = useDispatch();

  const [credenciales, setCredenciales] = useState();

  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);

  useEffect(() => {
    setCredenciales({
      ...credenciales,
      acc: usuarioLogeado?.acc,
      token: usuarioLogeado?.token
    });
  }, [usuarioLogeado]);

  function handlerBuscar() {
    dispatch(buscarVentas(credenciales));
  };

  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <Link to="/">Inicio</Link>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <Link to="/nueva-venta" >
            <button>
              Nueva Venta
            </button>
          </Link>
        </div>
        <div class="col">
          <button
            onClick={() => handlerBuscar()}
          >
            Buscar
          </button>
        </div>
      </div>

      <div class="row">
        <h3>Todas las Ventas</h3>
      </div>

      <div class="row">
        <ListaVentas />
      </div>
    </div>
  );
};