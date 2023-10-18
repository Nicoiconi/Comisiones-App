import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { buscarPedidoPorId } from "../../../../redux/actions/pedidosActions/actionBuscarPedidoPorId";


export default function ListaPedidos(props) {

  const {credenciales, pedidosPendientesDePago, pedidosPagados} = props;

  const dispatch = useDispatch();

  function handlerBuscarPorId(e) {
    dispatch(buscarPedidoPorId(e.target.value, credenciales));
  };

  return (
    <div class="container-fluid">

      <div class="row">

        <div class="col">
          Pendientes de pago
          <hr />
          {
            pedidosPendientesDePago?.map(p => {
              return (
                <div>
                  <Link to={`/pedidos/${p._id}`}>
                    <button
                      value={p._id}
                      onClick={(e) => handlerBuscarPorId(e)}
                    >
                      {p?.referido?.nombre} - {p?.fecha_solicitud}
                    </button>
                  </Link>
                </div>
              )
            })
          }
        </div>

        <div class="col">
          Pagados
          <hr />
          {
            pedidosPagados?.map(p => {
              return (
                <div>
                  <Link to={`/pedidos/${p._id}`}>
                    <button
                      value={p._id}
                      onClick={(e) => handlerBuscarPorId(e)}
                    >
                      {p?.referido?.nombre} - {p?.fecha_solicitud}
                    </button>
                  </Link>
                </div>
              )
            })
          }
        </div>

      </div>
    </div>
  );
};