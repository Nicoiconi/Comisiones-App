import axios from "axios";
import { setPedidoPorId } from "../../slices/pedidosSlice/pedidosSlice";


export function buscarPedidoPorId(id, credenciales) {
  return async function (dispatch) {
    try {
      const pedido = await axios.get(`http://localhost:3001/pedidos/${id}?acc=${credenciales?.acc}&token=${credenciales?.token}`);
      return dispatch(setPedidoPorId(pedido.data));
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};
