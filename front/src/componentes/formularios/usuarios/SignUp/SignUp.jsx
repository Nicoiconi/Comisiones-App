import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { crearUsuario } from "../../../../redux/actions/usuarioActions/usuarioActions";

export default function SignUp() {

  const dispatch = useDispatch();

  const [nuevoUsuario, setNuevoUsuario] = useState();

  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);

  useEffect(() => {
    setNuevoUsuario({
      ...nuevoUsuario,
      acc: usuarioLogeado?.acc,
      token: usuarioLogeado?.token
    });
  }, [usuarioLogeado]);

  function handlerCredenciales(e) {
    const { name, value } = e.target;

    setNuevoUsuario({
      ...nuevoUsuario,
      [name]: value
    });
  };

  function handleSubmit() {
    dispatch(crearUsuario(nuevoUsuario));
  };

  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <Link to="/">Inicio</Link>
        </div>
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>

        <div>
          <div>
            <label htmlFor="inputNombre">
              nombre
            </label>
          </div>
          <div>
            <input
              id="inputNombre"
              name="nombre"
              type="text"
              onChange={(e) => handlerCredenciales(e)}
              value={nuevoUsuario?.nombre}
            />
          </div>

        </div>
        <div>
          <div>
            <label htmlFor="inputAcc">
              acc
            </label>
          </div>
          <div>
            <input
              id="inputAcc"
              name="nuevaAcc"
              type="text"
              onChange={(e) => handlerCredenciales(e)}
              value={nuevoUsuario?.nuevaAcc}
            />
          </div>

        </div>
        <div>
          <div>
            <label htmlFor="inputPass">
              pass
            </label>
          </div>
          <div>
            <input
              id="inputPass"
              name="nuevaPass"
              type="password"
              onChange={(e) => handlerCredenciales(e)}
              value={nuevoUsuario?.nuevaPass}
            />
          </div>

        </div>

        <div>
          <button>
            Crear
          </button>
        </div>

      </form>

    </div>
  );
};