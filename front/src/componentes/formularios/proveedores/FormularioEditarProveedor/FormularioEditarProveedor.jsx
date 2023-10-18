import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { editarProveedor } from "../../../../redux/actions/proveedoresActions/proveedoresActions";

export default function FormularioEditarProveedor(props) {

  const { id } = useParams();

  const dispatch = useDispatch();

  const [proveedorEditado, setProveedorEditado] = useState();

  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);

  useEffect(() => {
    setProveedorEditado({
      ...proveedorEditado,
      acc: usuarioLogeado.acc,
      token: usuarioLogeado.token
    });
  }, []);

  function handleCambio(e) {
    setProveedorEditado({
      ...proveedorEditado,
      [e.target.name]: e.target.value
    });
  };

  function handleCambioEstado(e) {
    const value = e.target.checked ? e.target.value : props.estado;
    setProveedorEditado({
      ...proveedorEditado,
      estado: value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(editarProveedor(id, proveedorEditado));
    props.setSwitchHabilitarEdicion(false);
  };

  return (
    <div class="container-fluid text-center d-flex align-item-center justify-content-center">
      <form onSubmit={(e) => handleSubmit(e)}>

        <div class="row">
          <div class="col">
            <button type="submit">EDITAR</button>
          </div>
        </div>

        <hr />

        <div class="row">
          <div class="col">
            Estado
          </div>
          <div class="col">
            {
              props?.estado === "Activo"
                ? <div class="row">
                  <div class="col">
                    <input type="checkbox" onClick={(e) => handleCambioEstado(e)} value="Pausado" name="estado" />Pausado
                  </div>
                </div>
                : props?.estado === "Pausado"
                  ? <div class="row">
                    <div class="col">
                      <input type="checkbox" onClick={(e) => handleCambioEstado(e)} value="Activo" name="estado" />Activo
                    </div>

                  </div>
                  : "no deberia haber otro estado..."
            }
          </div>
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
              value={proveedorEditado?.nombre}
              onChange={(e) => handleCambio(e)}
              name="nombre"
              type="text"
              class="form-control"
              id="inputNombre"
              placeholder="Nombre"
            />
          </div>
        </div>

        <hr />

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
              value={proveedorEditado?.email}
              onChange={(e) => handleCambio(e)}
              name="email"
              type="text"
              class="form-control"
              id="inputEmail"
              placeholder="Email"
            />
          </div>
        </div>

        <hr />

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
              value={proveedorEditado?.telefono}
              onChange={(e) => handleCambio(e)}
              name="telefono"
              type="number"
              class="form-control"
              id="inputTelefono"
              placeholder="Telefono"
            />
          </div>
        </div>

        <hr />

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
              value={proveedorEditado?.descripcion}
              onChange={(e) => handleCambio(e)}
              name="descripcion"
              type="text"
              class="form-control"
              id="inputDescripcion"
              placeholder="Descripcion"
            />
          </div>
        </div>

        <hr />
      </form>

    </div>
  );
};