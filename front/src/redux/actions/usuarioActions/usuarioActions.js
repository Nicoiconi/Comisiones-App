import axios from "axios";
import {
  setUsuarioPorId,
  setUsuarios,
  setUsuarioLogeado
} from "../../slices/usuariosSlice/usuariosSlice";



export function buscarUsuarios(credenciales) {
  return async function (dispatch) {
    try {
      let usuarios = await axios.get("http://localhost:3001/usuarios", {
        params: credenciales,
      });
      return dispatch(setUsuarios(usuarios.data));
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function buscarUsuarioPorId(id, credenciales) {
  return async function (dispatch) {
    try {
      const usuario = await axios.get(`http://localhost:3001/usuarios/${id}?acc=${credenciales?.acc}&token=${credenciales?.token}`);
      return dispatch(setUsuarioPorId(usuario.data));
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function editarUsuario(payload, id) {
  return async function (dispatch) {
    try {
      const usuarioEditado = await axios.put(`http://localhost:3001/usuarios/${id}`, payload);
      return dispatch(setUsuarioPorId(usuarioEditado.data));
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function crearUsuario(payload) {
  return async function () {
    try {
      const nuevoUsuario = await axios.post("http://localhost:3001/usuarios", payload);
      return nuevoUsuario;
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function logearUsuario(credenciales) {
  return async function (dispatch) {
    try {
      const usuarioLogeado = await axios.post(`http://localhost:3001/usuarios/login`, credenciales);
      return dispatch(setUsuarioLogeado(usuarioLogeado.data));
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export async function verificarTokenUsuario(usuario) {
  try {
    const tokenVerificado = await axios.post(`http://localhost:3001/usuarios/verificar-token`, usuario);
    return tokenVerificado.data;
  } catch (error) {
    // console.log(error);
    return false;
  };
};

export function deslogearUsuario(usuario) {
  return async function (dispatch) {
    try {
      const usuarioEditado = await axios.put(`http://localhost:3001/usuarios/logout/${usuario._id}`, usuario);
      return dispatch(setUsuarioLogeado(null));
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function borrarUsuario(id, credenciales) {
  return async function () {
    try {
      await axios.delete(`http://localhost:3001/usuarios/${id}`, {
        params: credenciales,
      });
      return true;
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};