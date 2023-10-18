import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ListaPedidos from "../../../contenedores/listas/ListaPedidos/ListaPedidos";
import { buscarPedidos } from "../../../../redux/actions/pedidosActions/actionBuscarPedidos";

export default function VistaTodosPedidos() {

  const dispatch = useDispatch();

  const [credenciales, setCredenciales] = useState();
  const [pedidosPendientesDePago, setPedidosPendientesDePago] = useState();
  const [pedidosPagados, setPedidosPagados] = useState();

  const usuarioLogeado = useSelector(state => state.usuarios?.usuarioLogeado);
  const pedidos = useSelector(state => state.pedidos?.todosPedidos);

  useEffect(() => {
    setCredenciales({
      ...credenciales,
      acc: usuarioLogeado?.acc,
      token: usuarioLogeado?.token
    });
  }, [usuarioLogeado]);

  useEffect(() => {
    const pedidosPendientes = pedidos?.filter(pedido => pedido.estado === 'Pendiente de pago');
    const pedidosPagados = pedidos?.filter(pedido => pedido.estado === 'Pagado');

    setPedidosPendientesDePago(pedidosPendientes);
    setPedidosPagados(pedidosPagados);
  }, [pedidos]);

  function handlerBuscar() {
    dispatch(buscarPedidos(credenciales));
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
          <Link to="/nuevo-pedido" >
            <button>
              Nuevo Pedido
            </button>
          </Link>
        </div>
        <div class="col">
          <button
            onClick={() => handlerBuscar()}
          >
            Buscar
          </button>
        </div>
      </div>

      <div class="row">
        <h3>Todos los Pedidos</h3>
      </div>

      <div class="row">
        <ListaPedidos
          credenciales={credenciales}
          pedidosPagados={pedidosPagados}
          pedidosPendientesDePago={pedidosPendientesDePago}
        />
      </div>
    </div>
  );
};