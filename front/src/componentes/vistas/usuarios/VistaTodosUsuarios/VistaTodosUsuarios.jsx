import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buscarUsuarios } from "../../../../redux/actions/usuarioActions/usuarioActions";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ListaUsuarios from "../../../contenedores/listas/ListaUsuarios/ListaUsuarios"

export default function VistaTodosUsuarios() {

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
    dispatch(buscarUsuarios(credenciales));
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
          <Link to="/signup" >
            <button>
              Nuevo Usuario
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
        <h3>Todos los Usuarios</h3>
      </div>

      <div class="row">
        <ListaUsuarios />
      </div>

    </div>
  );
};