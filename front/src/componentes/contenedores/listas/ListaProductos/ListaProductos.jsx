import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { buscarProductoPorId } from "../../../../redux/actions/productosActions/productosActions";

export default function ListaProductos() {

  const dispatch = useDispatch();

  const [credenciales, setCredenciales] = useState();

  const productos = useSelector(state => state.productos.todosProductos);
  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);

  useEffect(() => {
    setCredenciales({
      acc: usuarioLogeado.acc,
      token: usuarioLogeado.token
    });
  }, []);

  function handlerBuscarPorId(e) {
    dispatch(buscarProductoPorId(e.target.value, credenciales));
  };

  return (
    <div class="container-fluid">

      {
        productos?.map(r => {
          return (
            <div>
              <Link to={`/productos/${r._id}`}>
                <button
                  value={r._id}
                  onClick={(e) => handlerBuscarPorId(e)}
                >
                  {r.nombre}
                </button>
              </Link>
            </div>
          )
        })
      }

    </div>
  );
};