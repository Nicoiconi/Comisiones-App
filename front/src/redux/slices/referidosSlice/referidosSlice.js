import { createSlice } from "@reduxjs/toolkit";

export const referidosSlice = createSlice({
  name: "referidosSlice",
  initialState: {
    todosReferidos: [],
    referidoIndividual: {}
  },
  reducers: {
    setReferidos: (state, { payload }) => {
      state.todosReferidos = payload;
    },
    setReferidoPorId: (state, { payload }) => {
      state.referidoIndividual = payload;
    },
    setResetearEstadoReferidos: (state) => {
      state.todosReferidos = null;
      state.referidoIndividual = null;
    }
  }
});

export const {
  setReferidos,
  setReferidoPorId,
  setResetearEstadoReferidos
} = referidosSlice.actions;
