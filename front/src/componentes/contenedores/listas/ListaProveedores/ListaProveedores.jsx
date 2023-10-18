import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { buscarProveedorPorId } from "../../../../redux/actions/proveedoresActions/proveedoresActions";

export default function ListaProveedores() {

  const dispatch = useDispatch();

  const [credenciales, setCredenciales] = useState();

  const proveedores = useSelector(state => state.proveedores.todosProveedores);
  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);

  useEffect(() => {
    setCredenciales({
      acc: usuarioLogeado.acc,
      token: usuarioLogeado.token
    });
  }, []);

  function handlerBuscarPorId(e) {
    dispatch(buscarProveedorPorId(e.target.value, credenciales));
  };

  return (
    <div class="container-fluid">
      {
        proveedores?.map(p => {
          return (
            <div>
              <Link to={`/proveedores/${p._id}`}>
                <button
                  value={p._id}
                  onClick={(e) => handlerBuscarPorId(e)}
                >
                  {p.nombre}
                </button>
              </Link>
            </div>
          )
        })
      }

    </div>
  );
};