import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { editarPedido } from "../../../../redux/actions/pedidosActions/actionEditarPedido";

export default function FormularioEditarPedido(props) {

  const { id } = useParams();

  const dispatch = useDispatch();

  const [pedidoEditado, setPedidoEditado] = useState();

  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);

  useEffect(() => {
    setPedidoEditado({
      ...pedidoEditado,
      acc: usuarioLogeado.acc,
      token: usuarioLogeado.token
    });
  }, []);

  function handleCambio(e) {
    setPedidoEditado({
      ...pedidoEditado,
      [e.target.name]: e.target.value
    });
  };

  function handleCambioEstado(e) {
    const value = e.target.checked ? e.target.value : props.estado;
    setPedidoEditado({
      ...pedidoEditado,
      estado: value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(editarPedido(id, pedidoEditado));
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
              props?.estado === "Pendiente de pago"
                ? <div class="row">
                  <div>
                    <input type="checkbox" onClick={(e) => handleCambioEstado(e)} value="Pagado" name="estado" />Pagado
                  </div>
                  <div>
                    <input type="checkbox" onClick={(e) => handleCambioEstado(e)} value="Despachado" name="estado" />Despachado
                  </div>
                  <div>
                    <input type="checkbox" onClick={(e) => handleCambioEstado(e)} value="Entregado" name="estado" />Entregado
                  </div>
                </div>
                : props?.estado === "Pagado"
                  ? <div class="row">
                    <div>
                      <input type="checkbox" onClick={(e) => handleCambioEstado(e)} value="Despachado" name="estado" />Despachado
                    </div>
                    <div>
                      <input type="checkbox" onClick={(e) => handleCambioEstado(e)} value="Entregado" name="estado" />Entregado
                    </div>
                  </div>
                  : props?.estado === "Despachado"
                    ? <div class="row">
                      <div >
                        <input type="checkbox" onClick={(e) => handleCambioEstado(e)} value="Pagado" name="estado" />Pagado
                      </div>
                      <div>
                        <input type="checkbox" onClick={(e) => handleCambioEstado(e)} value="Entregado" name="estado" />Entregado
                      </div>
                    </div>
                    : props?.estado === "Entregado"
                      ? <div class="row">
                        <div>
                          <input type="checkbox" onClick={(e) => handleCambioEstado(e)} value="Pagado" name="estado" />Pagado
                        </div>
                        <div>
                          <input type="checkbox" onClick={(e) => handleCambioEstado(e)} value="Despachado" name="estado" />Despachado
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
              value={pedidoEditado?.nombre}
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

      </form>

    </div>
  );
};