import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { crearVenta } from "../../../../redux/actions/ventasActions/ventasActions";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { buscarPedidos } from "../../../../redux/actions/actionPedidos/actionBuscarPedidos";
import { buscarCriaderos } from "../../../../redux/actions/criaderosActions/criaderosActions";
import { buscarSucursales } from "../../../../redux/actions/sucursalesActions/sucursalesActions";

export default function FormularioNuevaVenta() {

  const dispatch = useDispatch();

  const [credenciales, setCredenciales] = useState();
  const [nuevaVenta, setNuevaVenta] = useState({
    pedidos: [],
    total_pedidos: 0
  });
  const [pedidosAMostrar, setPedidosAMostrar] = useState([]);
  const [entregaPedido, setEntregaPedido] = useState([]);

  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);
  const pedidos = useSelector(state => state.pedidos.todosPedidos);
  const criaderos = useSelector(state => state.criaderos.todosCriaderos);
  const sucursales = useSelector(state => state.sucursales.todasSucursales);

  useEffect(() => {
    setNuevaVenta({
      ...nuevaVenta,
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

  function handleChangeCriadero(e) {
    const { name, value } = e.target;
    setNuevaVenta({
      ...nuevaVenta,
      [name]: value,
      pedidos: []
    });
    setPedidosAMostrar(pedidos?.filter(p => (p.criadero._id.toString() === value.toString() && p.estado === "Pendiente de pago")))
  };

  function handleChangePedidos(e) {
    const { id, value, checked } = e.target;
    if (checked) {

      setNuevaVenta({
        ...nuevaVenta,
        total_pedidos: Number(nuevaVenta?.total_pedidos) + Number(value),
        pedidos: [
          ...nuevaVenta.pedidos,
          id
        ]
      });
      console.log(nuevaVenta?.total_pedidos)
    } else {

      setNuevaVenta({
        ...nuevaVenta,
        total_pedidos: Number(nuevaVenta?.total_pedidos) - Number(value),
        pedidos: nuevaVenta?.pedidos?.filter(p => p !== id)
      });

    }

  };

  function handlerBuscarCriaderos(e) {
    e.preventDefault();
    dispatch(buscarCriaderos(credenciales))
  };

  function handlerBuscarPedidos(e) {
    e.preventDefault();
    dispatch(buscarPedidos(credenciales));
  };

  function handlerBuscarSucursales(e) {
    e.preventDefault();
    dispatch(buscarSucursales(credenciales));
  };

  function handleSubmit(e) {
    dispatch(crearVenta(nuevaVenta));
  };

  // 

  function handleChangePago(e) {
    const { name, value } = e.target;
    setNuevaVenta({
      ...nuevaVenta,
      pago: {
        ...nuevaVenta.pago,
        [name]: value
      }
    });
  };

  function handleChangeEntrega(e) {
    const { value } = e.target;
    setEntregaPedido(value);
    if (value === "Envio a domicilio") {
      setNuevaVenta({
        ...nuevaVenta,
        entrega: value,
        direccion: {
          sucursal: null
        }
      });
    } if (value === "Retira por sucursal") {
      setNuevaVenta({
        ...nuevaVenta,
        entrega: value,
        direccion: null
      });
    }
  };

  function handleDireccionEntrega(e) {
    const { id, name, value } = e.target;
    if (name === "costo_envio") {
      setNuevaVenta({
        ...nuevaVenta,
        direccion: {
          ...nuevaVenta?.direccion,
          [name]: Number(value)
        },
        total_a_pagar: Number(nuevaVenta?.total_pedidos) + Number(value)
      });
    } else if (name === "sucursal") {
      setNuevaVenta({
        ...nuevaVenta,
        direccion: id,
        total_a_pagar: Number(nuevaVenta?.total_pedidos) + Number(value)
      });
    } else {
      setNuevaVenta({
        ...nuevaVenta,
        direccion: {
          ...nuevaVenta?.direccion,
          [name]: value
        }
      });
    }
  };

  return (
    <div class="container-fluid text-center">
      <div class="row">
        <form onSubmit={(e) => handleSubmit(e)}>

          {
            nuevaVenta?.criadero && nuevaVenta?.pedidos?.length > 0 && nuevaVenta?.entrega && nuevaVenta?.pago?.forma_de_pago
              ? <div class="row">
                <div class="col">
                  <button type="submit">CREAR</button>
                </div>
              </div>
              : "Campos requeridos: criadero, 1 o más pedidos, entrega y forma de pago"
          }

          <div class="row">

            <div class="col">

              <div class="col lista-pedidos-venta">
                <div class="row">
                  <div class="col">
                    <h5>
                      Criaderos
                    </h5>
                  </div>
                  <div class="col">
                    <Link to="/todos-pedidos">ver criaderos</Link>
                  </div>
                  <div class="col">
                    <button
                      onClick={(e) => handlerBuscarCriaderos(e)}
                    >
                      Buscar
                    </button>
                  </div>
                </div>

                <div class="col">
                  {
                    criaderos?.map(c => {

                      // const cantidadActual = nuevoPedido?.pedido?.find(p => p.anillo === a._id)?.cantidad;

                      return (
                        <div class="row">

                          {/* <div class="row"> */}

                          <div class="col">
                            <input
                              type="radio"
                              name="criadero"
                              value={c?._id}
                              onChange={(e) => handleChangeCriadero(e)}
                              id={c?._id}
                            />
                            {c?.nombre}
                          </div>

                          {/* </div> */}

                        </div>

                      )
                    })
                  }

                  <hr />
                </div>
              </div>

              <div class="col lista-pedidos-venta">
                <div class="row">
                  <div class="col">
                    <h5>
                      Pedidos
                    </h5>
                  </div>
                  <div class="col">
                    <Link to="/todos-pedidos">ver pedidos</Link>
                  </div>
                  <div class="col">
                    <button
                      onClick={(e) => handlerBuscarPedidos(e)}
                    >
                      Buscar
                    </button>
                  </div>
                </div>

                <div class="col">
                  {
                    pedidosAMostrar?.map(p => {

                      // const cantidadActual = nuevoPedido?.pedido?.find(p => p.anillo === a._id)?.cantidad;

                      return (
                        <div class="row">

                          <div class="row">

                            <div class="col">
                              <input
                                type="checkbox"
                                name="pedido"
                                value={p?.subTotalPedido}
                                onChange={(e) => handleChangePedidos(e)}
                                id={p?._id}
                              />
                              {p?.criadero?.nombre}
                            </div>

                            <div class="col">
                              {p?.fecha_solicitud}
                            </div>

                            <div class="col">
                              $ {p?.subTotalPedido}
                            </div>

                          </div>

                          <div class="row">

                            {
                              p.pedido.map(p => {
                                return (
                                  <div>
                                    {p.anillo.nombre} - {p.cantidad}u.
                                  </div>
                                )
                              })
                            }

                          </div>

                        </div>

                      )
                    })
                  }

                  <hr />
                </div>
              </div>

            </div>

            {/*  */}

            <div class="col">

              <hr />

              <div class="row">
                <div class="col-3">
                  <div class="row">
                    <label
                      for="inputEntrega"
                      class="form-label"
                    >
                      Entrega
                    </label>
                  </div>
                </div>
                <div class="col">
                  <div class="col">
                    <input
                      type="radio"
                      name="entrega"
                      onChange={(e) => handleChangeEntrega(e)}
                      id="inputEnvioADomicilio"
                      value="Envio a domicilio"
                    />Envío a domicilio
                    <div class="col">
                      <input
                        type="radio"
                        name="entrega"
                        onChange={(e) => handleChangeEntrega(e)}
                        id="inputRetiraPorSucursal"
                        value="Retira por sucursal"
                      />Retira por sucursal
                    </div>
                  </div>
                </div>
              </div>

              {
                entregaPedido === "Envio a domicilio"
                  ? <div class="col">
                    <hr />
                    <div class="row">
                      <div class="col">
                        <label htmlFor="">
                          Destinatario
                        </label>
                      </div>
                      <div class="col">
                        <input
                          name="destinatario"
                          onChange={(e) => handleDireccionEntrega(e)}
                          type="text"
                          value={nuevaVenta?.direccion?.destinatario}
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <label htmlFor="">
                          Calle
                        </label>
                      </div>
                      <div class="col">
                        <input
                          name="calle"
                          onChange={(e) => handleDireccionEntrega(e)}
                          type="text"
                          value={nuevaVenta?.direccion?.calle}
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <label htmlFor="">
                          Altura
                        </label>
                      </div>
                      <div class="col">
                        <input
                          name="altura"
                          onChange={(e) => handleDireccionEntrega(e)}
                          type="number"
                          value={nuevaVenta?.direccion?.altura}
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <label htmlFor="">
                          Ciudad
                        </label>
                      </div>
                      <div class="col">
                        <input
                          name="ciudad"
                          onChange={(e) => handleDireccionEntrega(e)}
                          type="text"
                          value={nuevaVenta?.direccion?.ciudad}
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <label htmlFor="">
                          Provincia
                        </label>
                      </div>
                      <div class="col">
                        <input
                          name="provincia"
                          onChange={(e) => handleDireccionEntrega(e)}
                          type="text"
                          value={nuevaVenta?.direccion?.provincia}
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <label htmlFor="">
                          Código Postal
                        </label>
                      </div>
                      <div class="col">
                        <input
                          name="codigo_postal"
                          onChange={(e) => handleDireccionEntrega(e)}
                          type="number"
                          value={nuevaVenta?.direccion?.codigo_postal}
                        />
                      </div>
                    </div>
                  </div>
                  : entregaPedido === "Retira por sucursal"
                    ? <div class="col">
                      <hr />
                      <div class="row">
                        <div class="col">
                          <h5>
                            Sucursales
                          </h5>
                        </div>
                        <div class="col">
                          <Link to="/todas-sucursales">ver sucursales</Link>
                        </div>
                        <div class="col">
                          <button
                            onClick={(e) => handlerBuscarSucursales(e)}
                          >
                            Buscar
                          </button>
                        </div>
                      </div>
                      {
                        sucursales?.map(s => {
                          return (
                            <div>
                              <input
                                onChange={(e) => handleDireccionEntrega(e)}
                                type="radio"
                                name="sucursal"
                                value={0}
                                id={s?._id}
                              />
                              {s?.nombre}
                            </div>
                          )
                        })
                      }
                    </div>
                    : ""
              }

              <hr />

              {
                entregaPedido === "Envio a domicilio"
                  ? <div class="row">
                    <div class="col">
                      Costo envío:
                    </div>
                    <div class="col">
                      <input
                        name="costo_envio"
                        onChange={(e) => handleDireccionEntrega(e)}
                        type="number"
                        value={nuevaVenta?.direccion?.costo_envio}
                      />
                    </div>
                  </div>
                  : entregaPedido === "Retira por sucursal"
                    ? <div class="row">
                      <div class="col">
                        Costo envío:
                      </div>
                      <div class="col">
                        <label htmlFor="">Bonificado</label>
                      </div>
                    </div>
                    : ""
              }
              <div class="row">
                <div class="col">
                  Total pedidos:
                </div>
                <div class="col">
                  {nuevaVenta?.total_pedidos.toLocaleString()}
                </div>
              </div>

              <hr />

              <div class="row">
                <div class="col">
                  Total a pagar:
                </div>
                <div class="col">
                  {/* $ {(Number(nuevaVenta?.total_pedidos) + Number(nuevaVenta?.direccion?.costo_envio)).toLocaleString()} */}
                  {
                    nuevaVenta?.total_pedidos && nuevaVenta?.direccion?.costo_envio
                      ? `$ ${(Number(nuevaVenta?.total_pedidos) + Number(nuevaVenta?.direccion?.costo_envio)).toLocaleString()}`
                      : `$ ${Number(nuevaVenta?.total_pedidos)}`
                  }
                </div>
              </div>

              <hr />

              <div class="row">
                <div class="col">
                  Fecha de pago: (defaut: fecha del dia)
                </div>
                <div class="col">
                  <input
                    name="fecha_de_pago"
                    onChange={(e) => handleChangePago(e)}
                    type="date"
                  />
                </div>
              </div>

              <hr />

              <div class="row">
                <div class="col">
                  <label
                    for="inputFormaDePago"
                    class="form-label"
                  >
                    Forma de pago
                  </label>
                  <div class="col">
                    <ul>
                      <li>
                        <input
                          type="radio"
                          name="forma_de_pago"
                          onChange={(e) => handleChangePago(e)}
                          id="inputFormaDePago"
                          value="Efectivo"
                        />Efectivo
                      </li>

                      <li>
                        <input
                          type="radio"
                          name="forma_de_pago"
                          onChange={(e) => handleChangePago(e)}
                          id="inputFormaDePago"
                          value="Banco"
                        />Banco
                      </li>
                      <li>

                        <input
                          type="radio"
                          name="forma_de_pago"
                          onChange={(e) => handleChangePago(e)}
                          id="inputFormaDePago"
                          value="Virtual"
                        />Virtual
                      </li>
                    </ul>
                  </div>
                </div>
              </div>


              <hr />

              <div class="row">
                <div class="col-3">
                  <div class="row">
                    <label
                      for="inputComprobante"
                      class="form-label"
                    >
                      Comprobante
                    </label>
                  </div>
                </div>
                <div class="col">
                  <input
                    value={nuevaVenta?.pago?.comprobante}
                    onChange={(e) => handleChangePago(e)}
                    name="comprobante"
                    type="text"
                    class="form-control"
                    id="inputComprobante"
                  />
                </div>
              </div>


              <hr />
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};