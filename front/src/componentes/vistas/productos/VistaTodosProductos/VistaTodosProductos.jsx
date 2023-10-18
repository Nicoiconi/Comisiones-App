import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { buscarProductos } from "../../../../redux/actions/productosActions/productosActions";
import ListaProductos from "../../../contenedores/listas/ListaProductos/ListaProductos";

export default function VistaTodosProductos() {

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
    dispatch(buscarProductos(credenciales));
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
          <Link to="/nuevo-producto" >
            <button>
              Nuevo Producto
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
        <h3>Todos los Productos</h3>
      </div>

      <div class="row">
        <ListaProductos />
      </div>
    </div>
  );
};