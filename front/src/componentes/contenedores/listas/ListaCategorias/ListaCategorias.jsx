import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { buscarCategoriaPorId } from "../../../../redux/actions/categoriasActions/categoriasActions";

export default function ListaCategorias() {

  const dispatch = useDispatch();

  const [credenciales, setCredenciales] = useState();

  const categorias = useSelector(state => state.categorias.todasCategorias);
  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);

  useEffect(() => {
    setCredenciales({
      acc: usuarioLogeado.acc,
      token: usuarioLogeado.token
    });
  }, []);

  function handlerBuscarPorId(e) {
    dispatch(buscarCategoriaPorId(e.target.value, credenciales));
  };
  
  return (
    <div class="container-fluid">

      {
        categorias?.map(c => {
          return (
            <div>
              <Link to={`/categorias/${c._id}`}>
                <button
                  value={c._id}
                  onClick={(e) => handlerBuscarPorId(e)}
                >
                  {c.nombre}
                </button>
              </Link>
            </div>
          )
        })
      }

    </div>
  );
};