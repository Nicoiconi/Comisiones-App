import { createSlice } from "@reduxjs/toolkit";

export const proveedoresSlice = createSlice({
  name: "proveedoresSlice",
  initialState: {
    todosProveedores: [],
    proveedorIndividual: {},
    error: "",
  },
  reducers: {
    setProveedores: (state, { payload }) => {
      state.todosProveedores = payload;
    },
    setProveedorPorId: (state, { payload }) => {
      state.proveedorIndividual = payload;
    },
    setResetearEstadoProveedores: (state) => {
      state.todosProveedores = null;
      state.proveedorIndividual = null;
    }
  }
});

export const {
  setProveedores,
  setProveedorPorId,
  setResetearEstadoProveedores
} = proveedoresSlice.actions;
