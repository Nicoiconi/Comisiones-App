import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buscarUsuarioPorId } from "../../../../redux/actions/usuarioActions/usuarioActions";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function ListaUsuarios() {

  const dispatch = useDispatch();

  const [credenciales, setCredenciales] = useState();

  const usuarios = useSelector(state => state.usuarios.todosUsuarios);
  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);

  useEffect(() => {
    setCredenciales({
      acc: usuarioLogeado.acc,
      token: usuarioLogeado.token
    });
  }, []);

  function handlerBuscarPorId(e) {
    dispatch(buscarUsuarioPorId(e.target.value, credenciales));
  };

  return (
    <div class="container-fluid">

      {
        usuarios?.map(u => {
          return (
            <div>
              <Link to={`/usuarios/${u._id}`}>
                <button
                  value={u._id}
                  onClick={(e) => handlerBuscarPorId(e)}
                >
                  {u.nombre}
                </button>
              </Link>
            </div>
          )
        })
      }
    </div>
  );
};