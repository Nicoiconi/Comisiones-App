import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { categoriasSlice } from "../slices/categoriasSlice/categoriasSlice";
import { productosSlice } from "../slices/productosSlice/productosSlice";
import { proveedoresSlice } from "../slices/proveedoresSlice/proveedoresSlice";
import { referidosSlice } from "../slices/referidosSlice/referidosSlice";
import { usuariosSlice } from "../slices/usuariosSlice/usuariosSlice";
import { ventasSlice } from "../slices/ventasSlice/ventasSlice";
import { pedidosSlice } from "../slices/pedidosSlice/pedidosSlice";


const persistConfigReferidos = {
  key: "ReferidosKey",
  storage,
  blacklist: ["auth"],
};

const persistConfigCategorias = {
  key: "CategoriasKet",
  storage,
  blacklist: ["auth"],
};

const persistConfigProductos = {
  key: "ProductosKey",
  storage,
  blacklist: ["auth"],
};

const persistConfigPedidos = {
  key: "PedidosKey",
  storage,
  blacklist: ["auth"],
};

const persistConfigProveedores = {
  key: "ProveedoresKey",
  storage,
  blacklist: ["auth"],
};

const persistConfigUsuarios = {
  key: "UsuariosKey",
  storage,
  blacklist: ["auth"],
};

const persistConfigVentas = {
  key: "VentasKey",
  storage,
  blacklist: ["auth"],
};

const persistedCategorias = persistReducer(persistConfigCategorias, categoriasSlice.reducer);
const persistedProductos = persistReducer(persistConfigProductos, productosSlice.reducer);
const persistedPedidos = persistReducer(persistConfigPedidos, pedidosSlice.reducer);
const persistedProveedores = persistReducer(persistConfigProveedores, proveedoresSlice.reducer);
const persistedReferidos = persistReducer(persistConfigReferidos, referidosSlice.reducer);
const persistedUsuarios = persistReducer(persistConfigUsuarios, usuariosSlice.reducer);
const persistedVentas = persistReducer(persistConfigVentas, ventasSlice.reducer);


export const store = configureStore({
  reducer: {
    categorias: persistedCategorias,
    productos: persistedProductos,
    pedidos: persistedPedidos,
    proveedores: persistedProveedores,
    referidos: persistedReferidos,
    usuarios: persistedUsuarios,
    ventas: persistedVentas
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export const resetGlobalState = (store) => {
  store.replaceReducer({
    categorias: referidosSlice.reducer,
    productos: usuariosSlice.reducer,
    proveedores: referidosSlice.reducer,
    referidos: usuariosSlice.reducer,
    usuarios: referidosSlice.reducer,
    ventas: usuariosSlice.reducer
  });
};