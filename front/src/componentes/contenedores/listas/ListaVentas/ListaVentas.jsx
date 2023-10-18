import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { buscarVentaPorId } from "../../../../redux/actions/ventasActions/ventasActions";

export default function ListaVentas() {

  const dispatch = useDispatch();

  const [credenciales, setCredenciales] = useState();

  const ventas = useSelector(state => state.ventas.todasVentas);
  const usuarioLogeado = useSelector(state => state.usuarios.usuarioLogeado);

  useEffect(() => {
    setCredenciales({
      acc: usuarioLogeado?.acc,
      token: usuarioLogeado?.token
    });
  }, []);

  function handlerBuscarPorId(e) {
    dispatch(buscarVentaPorId(e.target.value, credenciales));
  };

  return (
    <div class="container-fluid">
      {
        ventas?.map(v => {
          return (
            <div>
              <Link to={`/ventas/${v._id}`}>
                <button
                  value={v._id}
                  onClick={(e) => handlerBuscarPorId(e)}
                >
                  {v?.criadero?.nombre} - $ {v?.pago?.importe} - {v?.pago?.fecha_de_pago} - {v?.entrega}
                </button>
              </Link>
            </div>
          )
        })
      }
    </div>
  );
};