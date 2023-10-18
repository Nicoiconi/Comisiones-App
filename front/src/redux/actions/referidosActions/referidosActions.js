import axios from "axios";
import {
  setReferidos,
  setReferidoPorId
} from "../../slices/referidosSlice/referidosSlice";

export function buscarReferidos(credenciales) {
  return async function (dispatch) {
    try {
      let referidos = await axios.get("http://localhost:3001/referidos", {
        params: credenciales,
      });
      return dispatch(setReferidos(referidos.data));
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function buscarReferidoPorId(id, credenciales) {
  return async function (dispatch) {
    try {
      const referido = await axios.get(`http://localhost:3001/referidos/${id}?acc=${credenciales?.acc}&token=${credenciales?.token}`);
      return dispatch(setReferidoPorId(referido.data));
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function editarReferido(payload, id) {
  return async function (dispatch) {
    try {
      const referidoEditado = await axios.put(`http://localhost:3001/referidos/${id}`, payload);
      return dispatch(setReferidoPorId(referidoEditado.data));
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function crearReferido(payload) {
  return async function () {
    try {
      const nuevaReferido = await axios.post("http://localhost:3001/referidos", payload);
      return nuevaReferido;
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function borrarReferido(id, credenciales) {
  return async function () {
    try {
      await axios.delete(`http://localhost:3001/referidos/${id}`, {
        params: credenciales,
      });
      return true;
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};