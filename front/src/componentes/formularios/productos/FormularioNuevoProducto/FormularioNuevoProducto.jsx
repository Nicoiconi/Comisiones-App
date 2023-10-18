import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { crearProducto } from "../../../../redux/actions/productosActions/productosActions";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { buscarCategorias } from "../../../../redux/actions/categoriasActions/categoriasActions";

export default function FormularioNuevoProducto() {

  const dispatch = useDispatch();

  const [credenciales, setCredenciales] = useState();
  const [nuevoProducto, setNuevoProducto] = useState();

  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);
  const categorias = useSelector(state => state.categorias.todasCategorias);

  useEffect(() => {
    setNuevoProducto({
      ...nuevoProducto,
      acc: usuarioLogeado?.acc,
      token: usuarioLogeado?.token
    });
  }, [usuarioLogeado]);

  useEffect(() => {
    setCredenciales({
      acc: usuarioLogeado?.acc,
      token: usuarioLogeado?.token
    });
  }, []);

  function handleChange(e) {
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]: e.target.value
    });
  };

  function handlerBuscarCategorias(e) {
    e.preventDefault();
    dispatch(buscarCategorias(credenciales));
  };

  function handleSubmit(e) {
    dispatch(crearProducto(nuevoProducto));
  };

  return (
    <div class="container-fluid text-center">
      <form onSubmit={(e) => handleSubmit(e)}>

        <div class="col">
          {
            nuevoProducto?.nombre && nuevoProducto?.precio && nuevoProducto?.categoria
              ? <button type="submit">CREAR</button>
              : "Campos requeridos: Nombre, Precio y Categoria"
          }
        </div>

        <hr />

        <div class="row">

          <div class="col">

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
                  value={nuevoProducto?.nombre}
                  onChange={(e) => handleChange(e)}
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
                  for="inputPrecio"
                  class="form-label"
                >
                  Precio
                </label>
              </div>
              <div class="col">
                <input
                  value={nuevoProducto?.precio}
                  onChange={(e) => handleChange(e)}
                  name="precio"
                  type="number"
                  class="form-control"
                  id="inputPrecio"
                  placeholder="Precio"
                />
              </div>
            </div>

            <hr />

            <div class="row">
              <div class="col">
                <label
                  for="inputStockInicial"
                  class="form-label"
                >
                  Stock inicial
                </label>
              </div>
              <div class="col">
                <input
                  value={nuevoProducto?.stock}
                  onChange={(e) => handleChange(e)}
                  name="stock"
                  type="number"
                  class="form-control"
                  id="inputStockInicial"
                  placeholder="Stock inicial"
                />
              </div>
            </div>

            <hr />

            <div class="row">
              <div class="col">
                <label
                  for="inputDescripcion"
                  class="form-label"
                >
                  Descripcion
                </label>
              </div>
              <div class="col">
                <input
                  value={nuevoProducto?.descripcion}
                  onChange={(e) => handleChange(e)}
                  name="descripcion"
                  type="text"
                  class="form-control"
                  id="inputDescripcion"
                  placeholder="Descripcion"
                />
              </div>
            </div>

            <hr />

            <div class="row">
              <div class="col">
                <label
                  for="inputComentarios"
                  class="form-label"
                >
                  Comentarios
                </label>
              </div>
              <div class="col">
                <input
                  value={nuevoProducto?.comentarios}
                  onChange={(e) => handleChange(e)}
                  name="comentarios"
                  type="text"
                  class="form-control"
                  id="inputComentarios"
                  placeholder="Comentarios"
                />
              </div>
            </div>

          </div>

          {/*  */}

          <div class="col">

            <div class="col">
              <div class="row">
                <div class="col">
                  <h5>
                    Categoria
                  </h5>
                </div>
                <div class="col">
                  <Link to="/todas-categorias">ver categorias</Link>
                </div>
                <div class="col">
                  <button
                    onClick={(e) => handlerBuscarCategorias(e)}
                  >
                    Buscar
                  </button>
                </div>
              </div>
              {
                categorias?.map(c => {
                  return (
                    <div class="col">
                      <input
                        type="radio"
                        name="categoria"
                        value={c?._id}
                        onClick={(e) => handleChange(e)}
                        id="inputCategoria"
                      />
                      {c?.nombre}
                    </div>
                  )
                })
              }
            </div>
          </div>

        </div>

        <hr />
      </form>
    </div>
  );
};