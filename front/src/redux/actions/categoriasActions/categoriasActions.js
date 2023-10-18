import axios from "axios";
import { setCategoriaPorId, setCategorias } from "../../slices/categoriasSlice/categoriasSlice";


export function buscarCategorias(credenciales) {
  return async function (dispatch) {
    try {
      let categorias = await axios.get("http://localhost:3001/categorias", {
        params: credenciales,
      });
      return dispatch(setCategorias(categorias.data));
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function buscarCategoriaPorId(id, credenciales) {
  return async function (dispatch) {
    try {
      const categoria = await axios.get(`http://localhost:3001/categorias/${id}?acc=${credenciales?.acc}&token=${credenciales?.token}`);
      return dispatch(setCategoriaPorId(categoria.data));
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function editarCategoria(payload, id) {
  return async function (dispatch) {
    try {
      const categoriaEditada = await axios.put(`http://localhost:3001/categorias/${id}`, payload);
      return dispatch(setCategoriaPorId(categoriaEditada.data));
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function crearCategoria(payload) {
  return async function () {
    try {
      const nuevaCategoria = await axios.post("http://localhost:3001/categorias", payload);
      return nuevaCategoria;
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};

export function borrarCategoria(id, credenciales) {
  return async function () {
    try {
      await axios.delete(`http://localhost:3001/categorias/${id}`, {
        params: credenciales,
      });
      return
    } catch (error) {
      // console.log(error);
      return false;
    }
  };
};
