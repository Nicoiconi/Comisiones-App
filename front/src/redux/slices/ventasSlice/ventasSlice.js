import { createSlice } from "@reduxjs/toolkit";

export const ventasSlice = createSlice({
  name: "ventasSlice",
  initialState: {
    todasVentas: [],
    ventaIndividual: {},
    error: "",
  },
  reducers: {
    setVentas: (state, { payload }) => {
      state.todasVentas = payload;
    },
    setVentaPorId: (state, { payload }) => {
      state.ventaIndividual = payload;
    },
    setResetearEstadoVentas: (state) => {
      state.todasVentas = null;
      state.ventaIndividual = null;
    }
  }
});

export const {
  setVentas,
  setVentaPorId,
  setResetearEstadoVentas
} = ventasSlice.actions;
