import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ListaReferidos from "../../../contenedores/listas/ListaReferidos/ListaReferidos";
import { buscarReferidos } from "../../../../redux/actions/referidosActions/referidosActions";

export default function VistaTodosReferidos() {

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

  function handlerBuscarReferidos() {
    dispatch(buscarReferidos(credenciales));
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
          <Link to="/nuevo-referido" >
            <button>
              Nuevo Referido
            </button>
          </Link>
        </div>
        <div class="col">
          <button
            onClick={() => handlerBuscarReferidos()}
          >
            Buscar
          </button>
        </div>
      </div>

      <div class="row">
        <h3>Todos los Referidos</h3>
      </div>

      <div class="row">
        <ListaReferidos />
      </div>

    </div>
  );
};