import { createSlice } from "@reduxjs/toolkit";

export const pedidosSlice = createSlice({
  name: "pedidosSlice",
  initialState: {
    todosPedidos: [],
    pedidoIndividual: {},
    error: "",
  },
  reducers: {
    setPedidos: (state, { payload }) => {
      state.todosPedidos = payload;
    },
    setPedidoPorId: (state, { payload }) => {
      state.pedidoIndividual = payload;
    },
    setResetearEstadoPedidos: (state) => {
      state.todosPedidos = null;
      state.pedidoIndividual = null;
    },
  },
});

export const {
  setPedidos,
  setPedidoPorId,
  setResetearEstadoPedidos
} = pedidosSlice.actions;
