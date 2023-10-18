import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { borrarReferido, buscarReferidoPorId, buscarReferidos } from "../../../../redux/actions/referidosActions/referidosActions";
import FormularioEditarReferido from "../../../formularios/referidos/FormularioEditarReferido/FormularioEditarReferido";
import { setReferidoPorId } from "../../../../redux/slices/referidosSlice/referidosSlice";

export default function VistaIndividualReferido() {

  const dispatch = useDispatch();

  const { id } = useParams();

  const [credenciales, setCredenciales] = useState();
  const [switchHabilitarEdicion, setSwitchHabilitarEdicion] = useState(false);
  const [switchHabilitarEliminar, setSwitchHabilitarEliminar] = useState(false);

  const referido = useSelector(state => state.referidos.referidoIndividual);
  console.log(referido)
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
    dispatch(buscarReferidoPorId(id, credenciales));
    dispatch(buscarReferidos(credenciales));
  };

  function handleEliminar() {
    dispatch(borrarReferido(id, credenciales));
    dispatch(setReferidoPorId(null));
    dispatch(buscarReferidos(credenciales));
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
          <Link to="/nuevo-referido" ><button>
            Nuevo Referido
          </button></Link>
        </div>

        <div class="col">
          <Link to="/todos-referidos" ><button>
            Referidos
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
        <h3>Referido</h3>
      </div>

      {
        !referido
          ? <div>
            No hay referido
          </div>
          : <div>

            <div class="col">
              <input type="checkbox" name="habilitar-edicion" onClick={(e) => switcharHabilitarEdicion(e)} checked={switchHabilitarEdicion} /> {"<-- Editar"}
            </div>

            <div class="col">
              {"Eliminar -->"}
              <input type="checkbox" name="habilitar-eliminar" onClick={(e) => switcharHabilitarEliminar(e)} checked={switchHabilitarEliminar} />
            </div>

            <div class="col">
              {referido?.nombre} - {referido?.estado}
            </div>

            <div class="col">
              Comision: $ {(referido?.comision).toLocaleString()}
            </div>

            <div class="col">
              registrada: {referido?.created_at} - modificada: {referido?.modified_at}
            </div>

            <hr />

            <div class="col">
              {
                switchHabilitarEdicion
                  ? <FormularioEditarReferido
                    estado={referido.estado}
                    setSwitchHabilitarEdicion={setSwitchHabilitarEdicion}
                  />
                  : ""
              }
            </div>

            <div class="row">
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
            </div>
          </div>
      }
    </div>
  );
};