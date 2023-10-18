import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { editarCategoria } from "../../../../redux/actions/categoriasActions/categoriasActions";


export default function FormularioEditarCategoria(props) {

  const { id } = useParams();

  const dispatch = useDispatch();

  const [categoriaEditada, setCategoriaEditada] = useState();
  const [credenciales, setCredenciales] = useState();

  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);

  useEffect(() => {
    setCategoriaEditada({
      ...categoriaEditada,
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
    setCategoriaEditada({
      ...categoriaEditada,
      [e.target.name]: e.target.value
    });
  };

  function handleCambioEstado(e) {
    const value = e.target.checked ? e.target.value : props.estado;
    setCategoriaEditada({
      ...categoriaEditada,
      estado: value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(editarCategoria(categoriaEditada, id));
    props.setSwitchHabilitarEdicion(false);
  };

  return (
    <div class="container-fluid text-center d-flex align-item-center justify-content-center">
      <form onSubmit={(e) => handleSubmit(e)}>
        
        <div class="row">

          <div class="col">
            <label
              for="inputNombre"
              class="form-label"
            >
              Nombre
            </label>
            <input
              value={categoriaEditada?.nombre}
              onChange={(e) => handleCambio(e)}
              name="nombre"
              type="text"
              class="form-control"
              id="inputNombre"
              placeholder="Nombre"
            />
          </div>
        </div>

        <div class="col">
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
        </div>

        <div class="col">
          <button type="submit">EDITAR</button>
        </div>
      </form>
    </div>
  );
};