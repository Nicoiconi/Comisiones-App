import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { borrarProducto, buscarProductoPorId, buscarProductos } from "../../../../redux/actions/productosActions/productosActions";
import { setProductoPorId } from "../../../../redux/slices/productosSlice/productosSlice";
import FormularioEditarProducto from "../../../formularios/productos/FormularioEditarProducto/FormularioEditarProducto";

export default function VistaIndividualProducto() {

  const dispatch = useDispatch();

  const { id } = useParams();

  const [credenciales, setCredenciales] = useState();
  const [switchHabilitarEdicion, setSwitchHabilitarEdicion] = useState(false);
  const [switchHabilitarEliminar, setSwitchHabilitarEliminar] = useState(false);

  const producto = useSelector(state => state.productos.productoIndividual);
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
    dispatch(buscarProductoPorId(id, credenciales));
    dispatch(buscarProductos(credenciales));
  };

  function handleEliminar() {
    dispatch(borrarProducto(id, credenciales));
    dispatch(setProductoPorId(null));
    dispatch(buscarProductos(credenciales));
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
          <Link to="/nuevo-producto" >
            <button>
              Nuevo Producto
            </button>
          </Link>
        </div>

        <div class="col">
          <Link to="/todos-productos" >
            <button>
              Productos
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
        <h3>Producto</h3>
      </div>

      {
        !producto
          ? <div>
            No hay producto
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
                    Estado: {producto?.estado}
                  </div>


                  <div class="col">
                    <h6>
                      {producto?.nombre}
                    </h6>
                  </div>

                  <div class="col">
                    Precio: $ {producto?.precio}
                  </div>

                  <div class="col">
                    Stock: {producto?.stock}
                  </div>

                  <div class="col">
                    Categoria: {producto?.categoria?.nombre}
                  </div>


                  <div class="col">
                    Email: {producto?.email}
                  </div>

                  <div class="col">
                    Telefono: {producto?.telefono}
                  </div>

                  <div class="col">
                    Descripcion: {producto?.descripcion}
                  </div>

                </div>

                {
                  switchHabilitarEdicion
                    ? <div class="col">
                      <FormularioEditarProducto
                        estado={producto.estado}
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