import axios from "axios";

export function borrarPedido(id, credenciales) {
  return async function () {
    try {
      await axios.delete(`http://localhost:3001/pedidos/${id}`, {
        params: credenciales,
      });
      return
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};