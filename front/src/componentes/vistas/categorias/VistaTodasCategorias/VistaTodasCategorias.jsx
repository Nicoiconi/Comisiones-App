import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { buscarCategorias } from "../../../../redux/actions/categoriasActions/categoriasActions";
import ListaCategorias from "../../../contenedores/listas/ListaCategorias/ListaCategorias";

export default function VistaTodasCategorias() {

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

  function handlerBuscarCategorias(e) {
    dispatch(buscarCategorias(credenciales));
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
          <Link to="/nueva-categoria" >
            <button>
              Nueva Categoria
            </button>
          </Link>
        </div>

        <div class="col">
          <button
            onClick={() => handlerBuscarCategorias()}
          >
            Buscar
          </button>
        </div>
      </div>

      <div class="row">
        <h3>Todas las Categorias</h3>
      </div>

      <div class="row">
        <ListaCategorias />
      </div>

    </div>
  );
};