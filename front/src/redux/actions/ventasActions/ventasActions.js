import axios from "axios";
import { setVentaPorId, setVentas } from "../../slices/ventasSlice/ventasSlice";

export function buscarVentas(credenciales) {
  return async function (dispatch) {
    try {
      let ventas = await axios.get("http://localhost:27017/ventas", {
        params: credenciales,
      });
      return dispatch(setVentas(ventas.data));
    } catch (error) {
      // console.log(error);
      return false
    }
  };
};

export function buscarVentaPorId(id, credenciales) {
  return async function (dispatch) {
    try {
      const venta = await axios.get(`http://localhost:27017/ventas/${id}?acc=${credenciales?.acc}&token=${credenciales?.token}`);
      return dispatch(setVentaPorId(venta.data));
    } catch (error) {
      // console.log(error);
      return false
    }
  };
};

export function editarVenta(id, payload) {
  return async function (dispatch) {
    try {
      const ventaEditada = await axios.put(`http://localhost:27017/ventas/${id}`, payload);
      return dispatch(setVentaPorId(ventaEditada.data));
    } catch (error) {
      // console.log(error);
      return false
    }
  };
};

export function crearVenta(payload) {
  return async function () {
    try {
      const nuevaVenta = await axios.post("http://localhost:27017/ventas", payload);
      return nuevaVenta;
    } catch (error) {
      // console.log(error);
      return false
    }
  };
};

export function borrarVenta(id, credenciales) {
  return async function () {
    try {
      await axios.delete(`http://localhost:27017/ventas/${id}`, {
        params: credenciales,
      });
      return
    } catch (error) {
      // console.log(error);
      return false
    }
  };
};