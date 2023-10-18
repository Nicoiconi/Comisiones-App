import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import FormularioEditarPedido from "../../../formularios/pedidos/FormularioEditarPedido/FormularioEditarPedido";
import { borrarPedido } from "../../../../redux/actions/pedidosActions/actionBorrarPedido";
import { buscarPedidos } from "../../../../redux/actions/pedidosActions/actionBuscarPedidos";
import { setPedidoPorId } from "../../../../redux/slices/pedidosSlice/pedidosSlice";
import { buscarPedidoPorId } from "../../../../redux/actions/pedidosActions/actionBuscarPedidoPorId";

export default function VistaIndividualPedido() {

  const dispatch = useDispatch();

  const { id } = useParams();

  const [credenciales, setCredenciales] = useState();
  const [switchHabilitarEdicion, setSwitchHabilitarEdicion] = useState(false);
  const [switchHabilitarEliminar, setSwitchHabilitarEliminar] = useState(false);

  const pedido = useSelector(state => state.pedidos.pedidoIndividual);
  console.log(pedido);
  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);

  useEffect(() => {
    setCredenciales({
      acc: usuarioLogeado.acc,
      token: usuarioLogeado.token
    });
  }, []);

  function switcharHabilitarEdicion() {
    setSwitchHabilitarEliminar(false);
    if (switchHabilitarEdicion) setSwitchHabilitarEdicion(false);
    if (!switchHabilitarEdicion) setSwitchHabilitarEdicion(true);
  };

  function switcharHabilitarEliminar() {
    setSwitchHabilitarEdicion(false);
    if (switchHabilitarEliminar) setSwitchHabilitarEliminar(false);
    if (!switchHabilitarEliminar) setSwitchHabilitarEliminar(true);
  };

  function handleRefresh() {
    dispatch(buscarPedidoPorId(id, credenciales));
    dispatch(buscarPedidos(credenciales));
  };

  function handleEliminar() {
    dispatch(borrarPedido(id, credenciales));
    dispatch(setPedidoPorId(null));
    dispatch(buscarPedidos(credenciales));
    if (switchHabilitarEliminar) setSwitchHabilitarEliminar(false);
  };

  return (
    <div class="container-fluid">

      <div class="row">
        <div class="col">
          <Link to="/">Inicio</Link>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <Link to="/nuevo-pedido" ><button>
            Nuevo Pedido
          </button></Link>
        </div>

        <div class="col">
          <Link to="/todos-pedidos" ><button>
            Pedidos
          </button></Link>
        </div>

        <div class="col">
          <button
            onClick={() => handleRefresh()}
          >
            Refresh
          </button>
        </div>
      </div>

      <div class="row">
        <h3>Pedido</h3>
      </div>

      {
        !pedido
          ? <div>
            No hay pedido
          </div>
          : <div class="container-fluid">

            <div class="row">

              <div class="col">
                {"Eliminar -->"}
                <input type="checkbox" name="habilitar-eliminar" onClick={(e) => switcharHabilitarEliminar(e)} checked={switchHabilitarEliminar} />
              </div>

              {
                switchHabilitarEliminar
                  ? <div class="col">
                    <button
                      onClick={() => handleEliminar()}
                    >
                      Eliminar
                    </button>
                  </div>
                  : ""
              }

              <div class="col">
                <input type="checkbox" name="habilitar-edicion" onClick={(e) => switcharHabilitarEdicion(e)} checked={switchHabilitarEdicion} /> {"<-- Editar"}
              </div>

              <hr />

              <div class="row">

                <div class="col">
                  <div class="col">
                    Criadero: {pedido?.criadero?.nombre}
                  </div>
                  <div class="col">
                    Código: {pedido?.codigo}
                  </div>
                  <div class="col">
                    Fecha solicitud: {pedido?.fecha_solicitud}
                  </div>
                  <div class="col">
                    Estado: {pedido?.estado}
                  </div>
                  <div class="col">
                    subTotal: $ {pedido?.subTotalPedido}
                  </div>

                  <hr />

                  <div class="col">
                    Pedido: {pedido?.pedido?.length}
                  </div>
                  <div class="col">
                    {
                      pedido?.pedido?.map(p => {
                        return (
                          <div class="col">
                            <div class="col">
                              <Link to={`/productos/${p?.producto?._id}`}>{p?.producto?.nombre}</Link>: {p?.cantidad} u. - $ {p?.total}
                            </div>

                          </div>
                        )
                      })
                    }
                  </div>

                </div>

                {
                  switchHabilitarEdicion
                    ? <div class="col">
                      <FormularioEditarPedido
                        estado={pedido.estado}
                        setSwitchHabilitarEdicion={setSwitchHabilitarEdicion}
                      />
                    </div>
                    : ""
                }

              </div>

              <hr />

            </div>

          </div>

      }
    </div >
  );
};