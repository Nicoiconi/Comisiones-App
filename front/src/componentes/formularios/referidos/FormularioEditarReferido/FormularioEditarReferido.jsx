import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { editarReferido } from "../../../../redux/actions/referidosActions/referidosActions";

export default function FormularioEditarReferido(props) {

  const { id } = useParams();

  const dispatch = useDispatch();

  const [referidoEditado, setReferidoEditado] = useState();

  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);

  useEffect(() => {
    setReferidoEditado({
      ...referidoEditado,
      acc: usuarioLogeado.acc,
      token: usuarioLogeado.token
    });
  }, []);

  function handleCambio(e) {
    setReferidoEditado({
      ...referidoEditado,
      [e.target.name]: e.target.value
    });
  };

  function handleCambioEstado(e) {
    const value = e.target.checked ? e.target.value : props.estado;
    setReferidoEditado({
      ...referidoEditado,
      estado: value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(editarReferido(referidoEditado, id));
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
            value={referidoEditado?.nombre}
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
            for="inputComision"
            class="form-label"
          >
            Comision
          </label>
          <input
            value={referidoEditado?.comision}
            onChange={(e) => handleCambio(e)}
            name="comision"
            type="number"
            class="form-control"
            id="inputComision"
            placeholder="Comision"
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