import { Link } from "react-router-dom";


export default function Inicio() {

  return (
    <div class="container">

      <div class="row">

        <div class="col">

          <div class="row">

            <div>
              <Link to="/nueva-categoria" >
                <button>
                  Nueva Categoria
                </button>
              </Link>
            </div>

            <div>
              <Link to="/todas-categorias" >
                <button>
                  Categorias
                </button>
              </Link>
            </div>

          </div>

          <hr />


          <div class="row">

            <div>
              <Link to="/nuevo-pedido" >
                <button>
                  Nuevo Pedido
                </button>
              </Link>
            </div>
            <div>
              <Link to="/todos-pedidos" >
                <button>
                  Pedidos
                </button>
              </Link>
            </div>

          </div>

          <hr />

          <div class="row">

            <div>
              <Link to="/nuevo-producto" >
                <button>
                  Nuevo Producto
                </button>
              </Link>
            </div>
            <div>
              <Link to="/todos-productos" >
                <button>
                  Productos
                </button>
              </Link>
            </div>

          </div>

          <hr />

        </div>

        {/* mitad */}

        <div class="col">

          <div class="row">

            <div>
              <Link to="/nuevo-proveedor" >
                <button>
                  Nuevo Proveedor
                </button>
              </Link>
            </div>

            <div>
              <Link to="/todos-proveedores" >
                <button>
                  Proveedores
                </button>
              </Link>
            </div>

          </div>

          <hr />

          <div class="row">

            <div>
              <Link to="/nuevo-referido" >
                <button>
                  Nuevo Referido
                </button>
              </Link>
            </div>
            <div>
              <Link to="/todos-referidos" >
                <button>
                  Referidos
                </button>
              </Link>
            </div>

          </div>

          <hr />

          <div class="row">

            <div>
              <Link to="/nuevo-usuario" >
                <button>
                  Nuevo Usuario
                </button>
              </Link>
            </div>
            <div>
              <Link to="/todos-usuarios" >
                <button>
                  Usuarios
                </button>
              </Link>
            </div>

          </div>

          <hr />
        </div>

        <hr />
      </div>

    </div >
  );
};