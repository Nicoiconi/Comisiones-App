import axios from "axios";
import { setProductoPorId, setProductos } from "../../slices/productosSlice/productosSlice";


export function buscarProductos(credenciales) {
  return async function (dispatch) {
    try {
      let productos = await axios.get("http://localhost:3001/productos", {
        params: credenciales,
      });
      return dispatch(setProductos(productos.data));
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function buscarProductoPorId(id, credenciales) {
  return async function (dispatch) {
    try {
      const producto = await axios.get(`http://localhost:3001/productos/${id}?acc=${credenciales?.acc}&token=${credenciales?.token}`);
      return dispatch(setProductoPorId(producto.data));
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function editarProducto(payload, id) {
  return async function (dispatch) {
    try {
      const productoEditado = await axios.put(`http://localhost:3001/productos/${id}`, payload);
      return dispatch(setProductoPorId(productoEditado.data));
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function crearProducto(payload) {
  return async function () {
    try {
      const nuevaProducto = await axios.post("http://localhost:3001/productos", payload);
      return nuevaProducto;
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function borrarProducto(id, credenciales) {
  return async function () {
    try {
      await axios.delete(`http://localhost:3001/productos/${id}`, {
        params: credenciales,
      });
      return true;
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};