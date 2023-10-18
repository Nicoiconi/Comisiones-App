import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { editarUsuario } from "../../../../redux/actions/usuarioActions/usuarioActions";

export default function FormularioEditarUsuario(props) {

  const { id } = useParams();

  const dispatch = useDispatch();

  const [usuarioEditado, setUsuarioEditado] = useState();

  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);

  useEffect(() => {
    setUsuarioEditado({
      ...usuarioEditado,
      acc: usuarioLogeado.acc,
      token: usuarioLogeado.token
    });
  }, []);

  function handleCambio(e) {
    setUsuarioEditado({
      ...usuarioEditado,
      [e.target.name]: e.target.value
    });
  };

  function handleCambioEstado(e) {
    const value = e.target.checked ? e.target.value : props.estado;
    setUsuarioEditado({
      ...usuarioEditado,
      estado: value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(editarUsuario(usuarioEditado, id));
    props.setSwitchHabilitarEdicion(false);
  };

  return (
    <div class="container-fluid text-center d-flex align-item-center justify-content-center">
      <form onSubmit={(e) => handleSubmit(e)}>

        <div class="col">
          <label
            for="inputNombre"
            class="form-label"
          >
            Nombre
          </label>
          <input
            value={usuarioEditado?.nombre}
            onChange={(e) => handleCambio(e)}
            name="nombre"
            type="text"
            class="form-control"
            id="inputNombre"
            placeholder="Nombre"
          />
        </div>

        <div class="col">
          <label
            for="inputAcc"
            class="form-label"
          >
            Acc
          </label>
          <input
            value={usuarioEditado?.nuevaAcc}
            onChange={(e) => handleCambio(e)}
            name="nuevaAcc"
            type="text"
            class="form-control"
            id="inputAcc"
            placeholder="Acc"
          />
        </div>

        <div class="col">
          <label
            for="inputPass"
            class="form-label"
          >
            Pass
          </label>
          <input
            value={usuarioEditado?.pass}
            onChange={(e) => handleCambio(e)}
            name="pass"
            type="text"
            class="form-control"
            id="inputPass"
            placeholder="Password"
          />
        </div>

        <div class="col">
          <h3>Estado</h3>
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

        <div class="col">
          <button type="submit">EDITAR</button>
        </div>
      </form>

    </div>
  );
};