import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { buscarProveedores } from "../../../../redux/actions/proveedoresActions/proveedoresActions";
import ListaProveedores from "../../../contenedores/listas/ListaProveedores/ListaProveedores";

export default function VistaTodosProveedores() {

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
    dispatch(buscarProveedores(credenciales));
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
          <Link to="/nuevo-proveedor" >
            <button>
              Nuevo Proveedor
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
        <h3>Todos los Proveedores</h3>
      </div>

      <div class="row">
        <ListaProveedores />
      </div>
    </div>
  );
};