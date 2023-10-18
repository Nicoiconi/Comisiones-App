import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { borrarUsuario, buscarUsuarioPorId, buscarUsuarios } from "../../../../redux/actions/usuarioActions/usuarioActions";
import { setUsuarioPorId } from "../../../../redux/slices/usuariosSlice/usuariosSlice";
import FormularioEditarUsuario from "../../../formularios/usuarios/FormularioEditarUsuario/FormularioEditarUsuario";

export default function VistaUsuarioIndividual() {

  const dispatch = useDispatch();

  const { id } = useParams();

  const [credenciales, setCredenciales] = useState();
  const [switchHabilitarEdicion, setSwitchHabilitarEdicion] = useState(false);
  const [switchHabilitarEliminar, setSwitchHabilitarEliminar] = useState(false);

  const usuario = useSelector(state => state.usuarios.usuarioIndividual);
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
    dispatch(buscarUsuarioPorId(id, credenciales));
    dispatch(buscarUsuarios(credenciales));
  };

  function handleEliminar() {
    dispatch(borrarUsuario(id, credenciales));
    dispatch(setUsuarioPorId(null));
    dispatch(buscarUsuarios(credenciales));
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
          <Link to="/signup" ><button>
            Nuevo Usuario
          </button></Link>
        </div>

        <div class="col">
          <Link to="/todos-usuarios" ><button>
            Usuarios
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
        <h3>Usuario</h3>
      </div>

      {
        !usuario
          ? <div>
            No hay usuario
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
              {usuario?.nombre} - {usuario?.estado}
            </div>

            <hr />

            <div class="col">
              {
                switchHabilitarEdicion
                  ? <FormularioEditarUsuario
                    estado={usuario.estado}
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