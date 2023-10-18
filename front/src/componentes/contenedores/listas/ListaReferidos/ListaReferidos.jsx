import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { buscarReferidoPorId } from "../../../../redux/actions/referidosActions/referidosActions";

export default function ListaReferidos() {

  const dispatch = useDispatch();

  const [credenciales, setCredenciales] = useState();

  const referidos = useSelector(state => state.referidos.todosReferidos);
  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);

  useEffect(() => {
    setCredenciales({
      acc: usuarioLogeado.acc,
      token: usuarioLogeado.token
    });
  }, []);

  function handlerBuscarPorId(e) {
    dispatch(buscarReferidoPorId(e.target.value, credenciales));
  };

  return (
    <div class="container-fluid">

      {
        referidos?.map(r => {
          return (
            <div>
              <Link to={`/referidos/${r._id}`}>
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