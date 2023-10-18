import { createSlice } from "@reduxjs/toolkit";

export const usuariosSlice = createSlice({
  name: "usuariosSlice",
  initialState: {
    todosUsuarios: [],
    usuarioIndividual: {},
    usuarioLogeado: {}
  },
  reducers: {
    setUsuarios: (state, { payload }) => {
      state.todosUsuarios = payload;
    },
    setUsuarioPorId: (state, { payload }) => {
      state.usuarioIndividual = payload;
    },
    setUsuarioLogeado: (state, { payload }) => {
      state.usuarioLogeado = payload;
    },
    setResetearEstadoUsuarios: (state) => {
      state.todosUsuarios = null;
      state.usuarioIndividual = null;
      state.usuarioLogeado = null;
    }
  }
});

export const {
  setUsuarios,
  setUsuarioPorId,
  setUsuarioLogeado,
  setResetearEstadoUsuarios
} = usuariosSlice.actions;
