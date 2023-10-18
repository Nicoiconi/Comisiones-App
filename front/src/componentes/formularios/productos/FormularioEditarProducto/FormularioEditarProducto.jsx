import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { editarProducto } from "../../../../redux/actions/productosActions/productosActions";


export default function FormularioEditarProducto(props) {

  const { id } = useParams();

  const dispatch = useDispatch();

  const [productoEditado, setProductoEditado] = useState();
  const [credenciales, setCredenciales] = useState();

  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);

  useEffect(() => {
    setProductoEditado({
      ...productoEditado,
      acc: usuarioLogeado.acc,
      token: usuarioLogeado.token
    });
    setCredenciales({
      ...credenciales,
      acc: usuarioLogeado?.acc,
      token: usuarioLogeado?.token
    });
  }, []);

  function handleCambio(e) {
    setProductoEditado({
      ...productoEditado,
      [e.target.name]: e.target.value
    });
  };

  function handleCambioEstado(e) {
    const value = e.target.checked ? e.target.value : props.estado;
    setProductoEditado({
      ...productoEditado,
      estado: value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(editarProducto(productoEditado, id));
    props.setSwitchHabilitarEdicion(false);
  };

  return (
    <div class="container-fluid text-center d-flex align-item-center justify-content-center">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div class="row">
          <div class="col">
            <button type="submit">EDITAR</button>
          </div>

          {/* <div class="col">
            <h3>Estado</h3>
            {
              props?.estado === "Activa"
                ? <div class="row">
                  <div class="col">
                    <input type="checkbox" onClick={(e) => handleCambioEstado(e)} value="Pausada" name="estado" />Pausada
                  </div>
                </div>
                : props?.estado === "Pausada"
                  ? <div class="row">
                    <div class="col">
                      <input type="checkbox" onClick={(e) => handleCambioEstado(e)} value="Activa" name="estado" />Activa
                    </div>

                  </div>
                  : "no deberia haber otro estado..."
            }
          </div> */}

          <hr />

          <div class="col">
            <label
              for="inputNombre"
              class="form-label"
            >
              Nombre
            </label>
            <input
              value={productoEditado?.nombre}
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

        <div class="row">
          <div class="col">
            <label
              for="inputStock"
              class="form-label"
            >
              Stock
            </label>
          </div>
          <div class="col">
            <input
              value={productoEditado?.stock}
              onChange={(e) => handleCambio(e)}
              name="stock"
              type="number"
              class="form-control"
              id="inputStock"
              placeholder="Stock"
            />
          </div>
        </div>

        <hr />
      </form>
    </div>
  );
};