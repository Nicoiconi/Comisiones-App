import axios from "axios";

export function crearPedido(payload) {
  return async function () {
    try {
      const nuevoPedido = await axios.post("http://localhost:3001/pedidos", payload);
      // hacer set en Slice para ultimo creado
      return nuevoPedido;
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};