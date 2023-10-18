import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { deslogearUsuario } from "../../../redux/actions/usuarioActions/usuarioActions";
import { setResetearEstadoCategorias } from "../../../redux/slices/categoriasSlice/categoriasSlice";
import { setResetearEstadoPedidos } from "../../../redux/slices/pedidosSlice/pedidosSlice";
import { setResetearEstadoProductos } from "../../../redux/slices/productosSlice/productosSlice";
import { setResetearEstadoProveedores } from "../../../redux/slices/proveedoresSlice/proveedoresSlice";
import { setResetearEstadoReferidos } from "../../../redux/slices/referidosSlice/referidosSlice";
import { setResetearEstadoUsuarios } from "../../../redux/slices/usuariosSlice/usuariosSlice";
import { setResetearEstadoVentas } from "../../../redux/slices/ventasSlice/ventasSlice";


export default function BarraLogIn() {

  const dispatch = useDispatch();

  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);

  const [switchHabilitarLogOut, setSwitchHabilitarLogOut] = useState(false);

  function switcharHabilitarLogOut() {
    if (switchHabilitarLogOut) setSwitchHabilitarLogOut(false);
    if (!switchHabilitarLogOut) setSwitchHabilitarLogOut(true);
  };

  function handlerBotonLogOut() {
    dispatch(deslogearUsuario(usuarioLogeado));
    dispatch(setResetearEstadoCategorias());
    dispatch(setResetearEstadoPedidos());
    dispatch(setResetearEstadoProductos());
    dispatch(setResetearEstadoProveedores());
    dispatch(setResetearEstadoReferidos());
    dispatch(setResetearEstadoUsuarios());
    dispatch(setResetearEstadoVentas());
  };


  return (
    <div class="container-fluid">
      {
        usuarioLogeado
          ? <div>
            <h2>Hola! {usuarioLogeado.nombre}</h2>
            <div>
              {
                !switchHabilitarLogOut
                  ? <div>
                    {"Log out -->"}
                    <input type="checkbox" name="habilitar-edicion" onClick={(e) => switcharHabilitarLogOut(e)} checked={switchHabilitarLogOut} />
                  </div>
                  : <div>
                    <Link to="/"><button
                      onClick={() => handlerBotonLogOut()}
                    >
                      Log Out
                    </button></Link>

                    <input type="checkbox" name="habilitar-edicion" onClick={(e) => switcharHabilitarLogOut(e)} checked={switchHabilitarLogOut} />
                  </div>
              }
            </div>
          </div>
          : <div>
            <h4>Bienvenide</h4>
          </div>
      }
      <hr />
    </div>
  );
};