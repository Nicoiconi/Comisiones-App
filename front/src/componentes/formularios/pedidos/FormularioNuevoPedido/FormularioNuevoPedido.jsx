import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./FormularioNuevoPedido.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { buscarProductos } from "../../../../redux/actions/productosActions/productosActions";
import { crearPedido } from "../../../../redux/actions/pedidosActions/actionCrearPedido";
import { buscarReferidos } from "../../../../redux/actions/referidosActions/referidosActions";

export default function FormularioNuevoPedido() {

  const dispatch = useDispatch();

  const [credenciales, setCredenciales] = useState();
  const [nuevoPedido, setNuevoPedido] = useState({ pedido: [] });
  const [productosPedido, setProductosPedido] = useState([]);
  const [cantidadProductoHabilitado, setCantidadProductoHabilitado] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [errorCantidad, setErrorCantidad] = useState([]);

  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);
  const productos = useSelector(state => state.productos.todosProductos);
  const referidos = useSelector(state => state.referidos.todosReferidos);

  useEffect(() => {
    setNuevoPedido({
      ...nuevoPedido,
      acc: usuarioLogeado?.acc,
      token: usuarioLogeado?.token,
    });
  }, []);

  useEffect(() => {
    setCredenciales({
      acc: usuarioLogeado?.acc,
      token: usuarioLogeado?.token
    });
  }, []);

  function handleProductosPedido(e) {
    const { id, value, checked } = e.target;

    if (checked) {
      setCantidadProductoHabilitado({
        ...cantidadProductoHabilitado,
        [id]: true
      });
      setNuevoPedido({
        ...nuevoPedido,
        pedido: [
          ...nuevoPedido.pedido,
          {
            producto: id,
            precio: Number(value),
            cantidad: 0,
            total: 0
          }
        ]
      });

    } else {
      setCantidadProductoHabilitado({
        ...cantidadProductoHabilitado,
        [id]: false
      });

      setNuevoPedido({
        ...nuevoPedido,
        pedido: nuevoPedido.pedido.filter((item) => item.producto !== id)
      });

    }
  };

  function handleCantidadPedido(e) {
    const { id, value } = e.target;

    const producto = productos.find(p => p._id.toString() === id.toString());
    const existeError = errorCantidad.some(e => e.id === id);

    if (value > producto.stock) {
      if (existeError) {
        return
      } else {
        setErrorCantidad(prevState => {
          return [
            ...prevState,
            {
              id: id,
              error: "cantidiad supera stock"
            }
          ]
        })
      }
    } else {
      if (existeError) {
        setErrorCantidad(prevState => {
          return prevState.filter(e => e.id !== id)
        })
      }
    }

    setNuevoPedido({
      ...nuevoPedido,
      pedido: nuevoPedido.pedido.map((item) =>
        item.producto === id
          ? {
            ...item,
            cantidad: Number(value),
            total: (Number(item.precio) * Number(value))
          }
          : item
      )
    });

    setProductosPedido((prevPedido) =>
      prevPedido.map((item) =>
        item.producto === id
          ? {
            ...item,
            cantidad: Number(value),
            total: (Number(item.precio) * Number(value))
          }
          : item
      )
    );
  };

  function handleTotalesPedido(e) {
    const { value } = e.target;
    setSubTotal((subTotal + value));
  };

  useEffect(() => {
    const sumaTotal = nuevoPedido?.pedido?.reduce((acc, item) => acc + item.total, 0);
    setSubTotal(sumaTotal);
  }, [productosPedido]);

  function handleReferido(e) {
    const { value, name } = e.target;
    if (name === "referido") {
      setNuevoPedido({
        ...nuevoPedido,
        [name]: value,
        porcentaje_referido: 0
      });
    } else if (name === "porcentaje_referido") {
      setNuevoPedido({
        ...nuevoPedido,
        [name]: Number(value),
      });
    }
  };

  function handleFechaSolicitud(e) {
    const { value } = e.target;
    setNuevoPedido({
      ...nuevoPedido,
      fecha_solicitud: value
    });
  };

  function handleSubmit(e) {
    // e.preventDefault();
    dispatch(crearPedido(nuevoPedido));
  };
  console.log(nuevoPedido);

  function handlerBuscarProductos(e) {
    e.preventDefault();
    dispatch(buscarProductos(credenciales));
  };

  function handlerBuscarReferidos(e) {
    e.preventDefault();
    dispatch(buscarReferidos(credenciales));
  };

  return (
    <div class="container-fluid text-center">
      <form onSubmit={(e) => handleSubmit(e)}>

        <div class="col">
          {
            errorCantidad?.length > 0
              ? "Hay un error con las cantidades"
              : <button type="submit">CREAR</button>
          }
        </div>

        <hr />

        <div class="row">

          <div class="col">

            <div class="row">
              <div class="col">
                Fecha solicitud: (defaut: fecha del dia)
              </div>
              <div class="col">
                <input
                  onChange={(e) => handleFechaSolicitud(e)}
                  type="date"
                />
              </div>
            </div>


            <div class="col lista-productos-pedido">
              <div class="row">
                <div class="col">
                  <h5>
                    Productos
                  </h5>
                </div>
                <div class="col">
                  <Link to="/todos-productos">ver productos</Link>
                </div>
                <div class="col">
                  <button
                    onClick={(e) => handlerBuscarProductos(e)}
                  >
                    Buscar
                  </button>
                </div>
              </div>

              <hr />

              <div class="container">
                {
                  productos?.map(prod => {
                    const cantidadActual = nuevoPedido?.pedido?.find(p => p.producto === prod._id)?.cantidad;
                    const hayErrorCantidad = errorCantidad?.find(e => e?.id === prod?._id.toString())?.error

                    return (
                      <div class="row border">
                        <div class="col">
                          {
                            prod?.stock === 0
                              ? ""
                              : <input
                                type="checkbox"
                                name="producto"
                                value={prod?.precio}
                                onChange={(e) => handleProductosPedido(e)}
                                id={prod?._id}
                              />
                          }

                          {prod?.nombre}
                        </div>

                        <div class="col">
                          stock: {prod?.stock}
                        </div>

                        <div class="col">
                          {
                            prod?.stock === 0
                              ? "Sin stock"
                              : <input
                                class="input-cantidad-productos-pedido"
                                id={prod?._id}
                                name="cantidadProducto"
                                type="number"
                                onChange={(e) => handleCantidadPedido(e)}
                                disabled={!cantidadProductoHabilitado[prod?._id]}
                                value={cantidadActual}
                              />
                          }
                        </div>

                        <div class="col">
                          $ {prod?.precio} c/u
                        </div>

                        <div class="col">
                          $
                          <label
                            class="input-precio-productos-cantidad"
                            name="labelTotal"
                            id={prod?._id}
                            onChange={(e) => handleTotalesPedido(e)}
                            value={Number(prod?.precio) * Number(cantidadActual)}
                          >
                            {(Number(prod?.precio) * Number(cantidadActual)).toLocaleString()}
                          </label>
                        </div>

                        {
                          !hayErrorCantidad
                            ? ""
                            : <div class="error-cantidad">
                              {hayErrorCantidad}
                            </div>
                        }
                      </div>

                    )
                  })
                }
              </div>
            </div>
            <hr />

          </div>

          {/*  */}

          <div class="col">

            <div class="col">
              <div class="row">
                <div class="col">
                  <h5>
                    Referido
                  </h5>
                </div>
                <div class="col">
                  <Link to="/todas-referidos">ver referidos</Link>
                </div>
                <div class="col">
                  <button
                    onClick={(e) => handlerBuscarReferidos(e)}
                  >
                    Buscar
                  </button>
                </div>
              </div>
              {
                referidos?.map(c => {
                  const habilitarInput = nuevoPedido?.referido === c?._id.toString() ? true : false
                  return (
                    <div class="row">
                      <div class="col">
                        <input
                          type="radio"
                          name="referido"
                          value={c?._id}
                          onClick={(e) => handleReferido(e)}
                          id={c?._id}
                        />
                        <label htmlFor={c?._id}>
                          {c?.nombre}
                        </label>
                      </div>
                      <div class="col">
                        <input
                          onChange={(e) => handleReferido(e)}
                          name="porcentaje_referido"
                          class="input-porcentaje-referido"
                          type="number"
                          disabled={!habilitarInput}
                        />%
                      </div>
                    </div>
                  )
                })
              }
              <div class="col">
                Comisión: $
                <label htmlFor="">
                  {((nuevoPedido?.porcentaje_referido * subTotal) / 100)}
                </label>

              </div>
            </div>

            <hr />

            <div class="col">
              <div class="row">
                <div class="col">
                  SubTotal:
                </div>
                <div class="col">
                  $ {subTotal.toLocaleString()}
                </div>

              </div>

            </div>

          </div>

        </div>
      </form >
    </div >
  );
};