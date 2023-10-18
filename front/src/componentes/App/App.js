import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import "./App.css";
import Inicio from '../vistas/Inicio/Inicio';
import { deslogearUsuario, verificarTokenUsuario } from '../../redux/actions/usuarioActions/usuarioActions';

import VistaTodosUsuarios from '../vistas/usuarios/VistaTodosUsuarios/VistaTodosUsuarios';
import VistaUsuarioIndividual from '../vistas/usuarios/VistaUsuarioIndividual/VistaUsuarioIndividual';
import BarraLogIn from '../barras/BarraLogIn/BarraLogIn';
import VistaLogIn from '../vistas/usuarios/VistaLogIn/VistaLogIn';
import VistaIndividualCategoria from '../vistas/categorias/VistaIndividualCategoria/VistaIndividualCategoria';
import VistaNuevaCategoria from '../vistas/categorias/VistaNuevaCategoria/VistaNuevaCategoria';
import VistaTodasCategorias from '../vistas/categorias/VistaTodasCategorias/VistaTodasCategorias';
import VistaIndividualPedido from '../vistas/pedidos/VistaIndividualPedido/VistaIndividualPedido';
import VistaNuevoPedido from '../vistas/pedidos/VistaNuevoPedido/VistaNuevoPedido';
import VistaTodosPedidos from '../vistas/pedidos/VistaTodosPedidos/VistaTodosPedidos';
import VistaIndividualProducto from '../vistas/productos/VistaIndividualProducto/VistaIndividualProducto';
import VistaNuevoProducto from '../vistas/productos/VistaNuevoProducto/VistaNuevoProducto';
import VistaTodosProductos from '../vistas/productos/VistaTodosProductos/VistaTodosProductos';
import VistaIndividualProveedor from '../vistas/proveedores/VistaIndividualProveedor/VistaIndividualProveedor';
import VistaNuevoProveedor from '../vistas/proveedores/VistaNuevoProveedor/VistaNuevoProveedor';
import VistaTodosProveedores from '../vistas/proveedores/VistaTodosProveedores/VistaTodosProveedores';
import VistaIndividualReferido from '../vistas/referidos/VistaIndividualReferido/VistaIndividualReferido';
import VistaNuevoReferido from '../vistas/referidos/VistaNuevoReferido/VistaNuevoReferido';
import VistaTodosReferidos from '../vistas/referidos/VistaTodosReferidos/VistaTodosReferidos';
import SignUp from '../formularios/usuarios/SignUp/SignUp';


function App() {

  const dispatch = useDispatch();

  const [tokenVerificado, setTokenVerificado] = useState();

  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);
  // console.log(usuarioLogeado);

  useEffect(() => {
    async function verificarToken() {
      try {
        const token = await verificarTokenUsuario(usuarioLogeado);
        setTokenVerificado(token);

      } catch (error) {
        console.error(error);
      }
    }

    verificarToken();
    // console.log(tokenVerificado);
  }, [tokenVerificado, usuarioLogeado]);


  return (
    <div class="container-fluid text-center App">

      <Router>

        {
          !tokenVerificado
            ? <VistaLogIn />
            :
            <div>

              <Route path='/' component={BarraLogIn} />
              <Switch>

                <Route exact path='/' component={Inicio} />

                <Route exact path='/categorias/:id' component={VistaIndividualCategoria} />
                <Route exact path='/pedidos/:id' component={VistaIndividualPedido} />
                <Route exact path='/productos/:id' component={VistaIndividualProducto} />
                <Route exact path='/proveedores/:id' component={VistaIndividualProveedor} />
                <Route exact path='/referidos/:id' component={VistaIndividualReferido} />
                <Route exact path='/usuarios/:id' component={VistaUsuarioIndividual} />

                <Route exact path='/nueva-categoria' component={VistaNuevaCategoria} />
                <Route exact path='/nuevo-pedido' component={VistaNuevoPedido} />
                <Route exact path='/nuevo-producto' component={VistaNuevoProducto} />
                <Route exact path='/nuevo-proveedor' component={VistaNuevoProveedor} />
                <Route exact path='/nuevo-referido' component={VistaNuevoReferido} />
                <Route exact path='/signup' component={SignUp} />

                <Route exact path='/todas-categorias' component={VistaTodasCategorias} />
                <Route exact path='/todos-pedidos' component={VistaTodosPedidos} />
                <Route exact path='/todos-productos' component={VistaTodosProductos} />
                <Route exact path='/todos-proveedores' component={VistaTodosProveedores} />
                <Route exact path='/todos-referidos' component={VistaTodosReferidos} />
                <Route exact path='/todos-usuarios' component={VistaTodosUsuarios} />

              </Switch>

            </div>

        }
      </Router >
    </div >
  );
}

export default App;
