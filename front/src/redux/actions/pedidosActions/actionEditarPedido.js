import axios from "axios";
import { setPedidoPorId } from "../../slices/pedidosSlice/pedidosSlice";

export function editarPedido(id, payload) {
  return async function (dispatch) {
    try {
      const pedidoEditado = await axios.put(`http://localhost:3001/pedidos/${id}`, payload);
      return dispatch(setPedidoPorId(pedidoEditado.data));
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};
