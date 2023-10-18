import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { crearReferido } from "../../../../redux/actions/referidosActions/referidosActions";

export default function FormularioNuevoReferido() {

  const dispatch = useDispatch();

  const [nuevoReferido, setNuevoReferido] = useState();

  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);

  useEffect(() => {
    setNuevoReferido({
      ...nuevoReferido,
      acc: usuarioLogeado?.acc,
      token: usuarioLogeado?.token
    });
  }, [usuarioLogeado]);

  function handleChange(e) {
    setNuevoReferido({
      ...nuevoReferido,
      [e.target.name]: e.target.value
    });
  };

  function handleSubmit(e) {
    dispatch(crearReferido(nuevoReferido));
  };

  return (
    <div class="container-fluid text-center">
      <form onSubmit={(e) => handleSubmit(e)}>

        <div class="col">
          {
            nuevoReferido?.nombre
              ? <button type="submit">CREAR</button>
              : "Campos requeridos: Nombre"
          }
        </div>

        <hr />

        <div class="row">

          <div class="col">

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
                  value={nuevoReferido?.nombre}
                  onChange={(e) => handleChange(e)}
                  name="nombre"
                  type="text"
                  class="form-control"
                  id="inputNombre"
                  placeholder="Nombre"
                />
              </div>
            </div>

          </div>

        </div>
      </form>
    </div>
  );
};