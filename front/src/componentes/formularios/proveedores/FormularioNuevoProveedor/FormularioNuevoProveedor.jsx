import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { crearProveedor } from "../../../../redux/actions/proveedoresActions/proveedoresActions";

export default function FormularioNuevoProveedor() {

  const dispatch = useDispatch();

  const [nuevoProveedor, setNuevoProveedor] = useState();

  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);

  useEffect(() => {
    setNuevoProveedor({
      ...nuevoProveedor,
      acc: usuarioLogeado?.acc,
      token: usuarioLogeado?.token
    });
  }, []);

  function handleChange(e) {
    setNuevoProveedor({
      ...nuevoProveedor,
      [e.target.name]: e.target.value
    });
  };

  function handleSubmit(e) {
    dispatch(crearProveedor(nuevoProveedor));
  };

  return (
    <div class="container-fluid text-center d-flex align-item-center justify-content-center">
      <div class="row">
        <form onSubmit={(e) => handleSubmit(e)}>

          {
            nuevoProveedor?.nombre
              ? <div class="row">
                <div class="col">
                  <button type="submit">CREAR</button>
                </div>
              </div>
              : "Campos requeridos: Nombre"
          }

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
                    value={nuevoProveedor?.nombre}
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

            <hr />

            <div class="col">
              <div class="row">
                <div class="col">
                  <label
                    for="inputTelefono"
                    class="form-label"
                  >
                    Telefono
                  </label>
                </div>
                <div class="col">
                  <input
                    value={nuevoProveedor?.telefono}
                    onChange={(e) => handleChange(e)}
                    name="telefono"
                    type="number"
                    class="form-control"
                    id="inputTelefono"
                    placeholder="Telefono"
                  />
                </div>
              </div>
            </div>

            <hr />

            <div class="col">
              <div class="row">
                <div class="col">
                  <label
                    for="inputEmail"
                    class="form-label"
                  >
                    Email
                  </label>
                </div>
                <div class="col">
                  <input
                    value={nuevoProveedor?.email}
                    onChange={(e) => handleChange(e)}
                    name="email"
                    type="email"
                    class="form-control"
                    id="inputEmail"
                    placeholder="Email"
                  />
                </div>
              </div>
            </div>

            <hr />

            <div class="col">
              <div class="row">
                <div class="col">
                  <label
                    for="inputDescripcion"
                    class="form-label"
                  >
                    Descripcion
                  </label>
                </div>
                <div class="col">
                  <input
                    value={nuevoProveedor?.descripcion}
                    onChange={(e) => handleChange(e)}
                    name="descripcion"
                    type="text"
                    class="form-control"
                    id="inputDescripcion"
                    placeholder="Descripcion"
                  />
                </div>
              </div>
            </div>

            <hr />

          </div>
        </form>
      </div>
    </div>
  );
};