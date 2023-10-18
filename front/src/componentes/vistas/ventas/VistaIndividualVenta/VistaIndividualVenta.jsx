import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { borrarVenta, buscarVentaPorId, buscarVentas } from "../../../../redux/actions/ventasActions/ventasActions";
import { setVentaPorId } from "../../../../redux/slices/ventasSlice/ventasSlice";
import FormularioEditarVenta from "../../../formularios/ventas/FormularioEditarVenta/FormularioEditarVenta";

export default function VistaIndividualVenta() {

  const dispatch = useDispatch();

  const { id } = useParams();

  const [credenciales, setCredenciales] = useState();
  const [switchHabilitarEdicion, setSwitchHabilitarEdicion] = useState(false);
  const [switchHabilitarEliminar, setSwitchHabilitarEliminar] = useState(false);

  const venta = useSelector(state => state.ventas.ventaIndividual);
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
    dispatch(buscarVentaPorId(id, credenciales));
    dispatch(buscarVentas(credenciales));
  };

  function handleEliminar() {
    dispatch(borrarVenta(id, credenciales));
    dispatch(setVentaPorId(null));
    dispatch(buscarVentas(credenciales));
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
          <Link to="/nueva-venta" >
            <button>
              Nueva Venta
            </button>
          </Link>
        </div>

        <div class="col">
          <Link to="/todas-ventas" >
            <button>
              Ventas
            </button>
          </Link>
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
        <h3>Venta</h3>
      </div>

      {
        !venta
          ? <div>
            No hay venta
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
                    {venta?.criadero?.nombre}
                  </div>

                  <div class="col">
                    Importe: $ {venta?.total_a_pagar}
                  </div>

                  <div class="col">
                    Fecha de pago: {venta?.pago?.fecha_de_pago}
                  </div>

                  <div class="col">
                    Forma de pago: {venta?.pago?.forma_de_pago}
                  </div>

                  <div class="col">
                    Comprobante: {venta?.pago?.comprobante}
                  </div>

                  <div class="col">
                    Pedidos:
                    {
                      venta?.pedidos?.map(p => {
                        return (
                          <div>
                            {p?.codigo}
                          </div>
                        )
                      })
                    }
                  </div>

                  <hr />
                </div>

                {
                  switchHabilitarEdicion
                    ? <div class="col">
                      <FormularioEditarVenta
                        estado={venta.estado}
                        setSwitchHabilitarEdicion={setSwitchHabilitarEdicion}
                      />
                    </div>
                    : ""
                }

              </div>

            </div>

          </div>

      }
    </div>


  );
};