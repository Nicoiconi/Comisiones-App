import { createSlice } from "@reduxjs/toolkit";

export const categoriasSlice = createSlice({
  name: "categoriasSlice",
  initialState: {
    todasCategorias: [],
    categoriaIndividual: {}
  },
  reducers: {
    setCategorias: (state, { payload }) => {
      state.todasCategorias = payload;
    },
    setCategoriaPorId: (state, { payload }) => {
      state.categoriaIndividual = payload;
    },
    setResetearEstadoCategorias: (state) => {
      state.todasCategorias = null;
      state.categoriaIndividual = null;
    }
  }
});

export const {
  setCategorias,
  setCategoriaPorId,
  setResetearEstadoCategorias
} = categoriasSlice.actions;
