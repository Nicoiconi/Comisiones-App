import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { borrarProveedor, buscarProveedorPorId, buscarProveedores } from "../../../../redux/actions/proveedoresActions/proveedoresActions";
import { setProveedorPorId } from "../../../../redux/slices/proveedoresSlice/proveedoresSlice";
import FormularioEditarProveedor from "../../../formularios/proveedores/FormularioEditarProveedor/FormularioEditarProveedor";

export default function VistaIndividualProveedor() {

  const dispatch = useDispatch();

  const { id } = useParams();

  const [credenciales, setCredenciales] = useState();
  const [switchHabilitarEdicion, setSwitchHabilitarEdicion] = useState(false);
  const [switchHabilitarEliminar, setSwitchHabilitarEliminar] = useState(false);

  const proveedor = useSelector(state => state.proveedores.proveedorIndividual);
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
    dispatch(buscarProveedorPorId(id, credenciales));
    dispatch(buscarProveedores(credenciales));
  };

  function handleEliminar() {
    dispatch(borrarProveedor(id, credenciales));
    dispatch(setProveedorPorId(null));
    dispatch(buscarProveedores(credenciales));
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
          <Link to="/nuevo-proveedor" >
            <button>
              Nuevo Proveedor
            </button>
          </Link>
        </div>

        <div class="col">
          <Link to="/todos-proveedores" >
            <button>
              Proveedores
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
        <h3>Proveedor</h3>
      </div>

      {
        !proveedor
          ? <div>
            No hay anillo
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
                    <h6>
                      {proveedor?.nombre}
                    </h6>
                  </div>

                  <div class="col">
                    Estado: {proveedor?.estado}
                  </div>

                  <div class="col">
                    Email: {proveedor?.email}
                  </div>

                  <div class="col">
                    Telefono: {proveedor?.telefono}
                  </div>

                  <div class="col">
                    Descripcion: {proveedor?.descripcion}
                  </div>

                </div>

                {
                  switchHabilitarEdicion
                    ? <div class="col">
                      <FormularioEditarProveedor
                        estado={proveedor.estado}
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