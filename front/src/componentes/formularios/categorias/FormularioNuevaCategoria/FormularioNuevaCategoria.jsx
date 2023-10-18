import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { crearCategoria } from "../../../../redux/actions/categoriasActions/categoriasActions";

export default function FormularioNuevaCategoria() {

  const dispatch = useDispatch();

  const [nuevaCategoria, setNuevaCategoria] = useState();

  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);

  useEffect(() => {
    setNuevaCategoria({
      ...nuevaCategoria,
      acc: usuarioLogeado?.acc,
      token: usuarioLogeado?.token
    });
  }, [usuarioLogeado]);

  function handleChange(e) {
    setNuevaCategoria({
      ...nuevaCategoria,
      [e.target.name]: e.target.value
    });
  };

  function handleSubmit(e) {
    dispatch(crearCategoria(nuevaCategoria));
  };

  return (
    <div class="container-fluid text-center">
      <form onSubmit={(e) => handleSubmit(e)}>

        <div class="col">
          {
            nuevaCategoria?.nombre
              ? <button type="submit">CREAR</button>
              : "Campos requeridos: Nombre"
          }
        </div>

        <hr />

        <div class="row">

          <div class="col">
            <label
              for="inputNombre"
              class="form-label"
            >
              Nombre
            </label>
          </div>
          <div class="col">
            <input
              value={nuevaCategoria?.nombre}
              onChange={(e) => handleChange(e)}
              name="nombre"
              type="text"
              class="form-control"
              id="inputNombre"
              placeholder="Nombre"
            />
          </div>

        </div>
      </form>
    </div>
  );
};