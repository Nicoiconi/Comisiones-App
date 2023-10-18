import axios from "axios";
import { setProveedorPorId, setProveedores } from "../../slices/proveedoresSlice/proveedoresSlice";

export function buscarProveedores(credenciales) {
  return async function (dispatch) {
    try {
      let proveedores = await axios.get("http://localhost:3001/proveedores", {
        params: credenciales,
      });
      return dispatch(setProveedores(proveedores.data));
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function buscarProveedorPorId(id, credenciales) {
  return async function (dispatch) {
    try {
      const proveedor = await axios.get(`http://localhost:3001/proveedores/${id}?acc=${credenciales?.acc}&token=${credenciales?.token}`);
      return dispatch(setProveedorPorId(proveedor.data));
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function editarProveedor(id, payload) {
  return async function (dispatch) {
    try {
      const proveedorEditado = await axios.put(`http://localhost:3001/proveedores/${id}`, payload);
      return dispatch(setProveedorPorId(proveedorEditado.data));
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function crearProveedor(payload) {
  return async function () {
    try {
      const nuevoProveedor = await axios.post("http://localhost:3001/proveedores", payload);
      return nuevoProveedor;
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function borrarProveedor(id, credenciales) {
  return async function () {
    try {
      await axios.delete(`http://localhost:3001/proveedores/${id}`, {
        params: credenciales,
      });
      return
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};