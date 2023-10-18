import axios from "axios";
import { setPedidos } from "../../slices/pedidosSlice/pedidosSlice";

export function buscarPedidos(credenciales) {
  return async function (dispatch) {
    try {
      let pedidos = await axios.get("http://localhost:3001/pedidos", {
        params: credenciales,
      });
      return dispatch(setPedidos(pedidos.data));
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};