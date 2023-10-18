import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { editarVenta } from "../../../../redux/actions/ventasActions/ventasActions";

export default function FormularioEditarVenta(props) {

  const { id } = useParams();

  const dispatch = useDispatch();

  const [ventaEditada, setVentaEditada] = useState();

  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);

  useEffect(() => {
    setVentaEditada({
      ...ventaEditada,
      acc: usuarioLogeado.acc,
      token: usuarioLogeado.token
    });
  }, []);

  function handleCambio(e) {
    setVentaEditada({
      ...ventaEditada,
      [e.target.name]: e.target.value
    });
  };

  function handleCambioEstado(e) {
    const value = e.target.checked ? e.target.value : props.estado;
    setVentaEditada({
      ...ventaEditada,
      estado: value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(editarVenta(id, ventaEditada));
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
              value={ventaEditada?.nombre}
              onChange={(e) => handleCambio(e)}
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