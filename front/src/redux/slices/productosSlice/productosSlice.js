import { createSlice } from "@reduxjs/toolkit";

export const productosSlice = createSlice({
  name: "productosSlice",
  initialState: {
    todosProductos: [],
    productoIndividual: {}
  },
  reducers: {
    setProductos: (state, { payload }) => {
      state.todosProductos = payload;
    },
    setProductoPorId: (state, { payload }) => {
      state.productoIndividual = payload;
    },
    setResetearEstadoProductos: (state) => {
      state.todosProductos = null;
      state.productoIndividual = null;
    }
  }
});

export const {
  setProductos,
  setProductoPorId,
  setResetearEstadoProductos
} = productosSlice.actions;
