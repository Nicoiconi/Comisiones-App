import { useState } from "react";
import { useDispatch } from "react-redux";
import { logearUsuario } from "../../../../redux/actions/usuarioActions/usuarioActions";

export default function LogIn() {

  const dispatch = useDispatch();

  const [credencialesUsuario, setCredencialesUsuario] = useState();

  function handlerCredenciales(e) {
    const { name, value } = e.target;

    setCredencialesUsuario({
      ...credencialesUsuario,
      [name]: value
    });
  };

  function handlerBotonLogIn() {
    dispatch(logearUsuario(credencialesUsuario));
  };

  return (
    <div class="container-fluid">
      <div>
        <div>
          <label htmlFor="inputAcc">
            acc
          </label>
        </div>
        <div>
          <input
            id="inputAcc"
            name="acc"
            type="text"
            onChange={(e) => handlerCredenciales(e)}
            value={credencialesUsuario?.acc}
          />
        </div>

      </div>
      <div>
        <div>
          <label htmlFor="inputPass">
            pass
          </label>
        </div>
        <div>
          <input
            id="inputPass"
            name="pass"
            type="password"
            // type="text"
            onChange={(e) => handlerCredenciales(e)}
            value={credencialesUsuario?.pass}
          />
        </div>

      </div>

      <div>
        {/* <Link to="/inicio"> */}
        <button
          onClick={() => handlerBotonLogIn()}
        >
          Log In
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};