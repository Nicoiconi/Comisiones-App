Comisiones App

Una web app desarrollada con el conjunto de tecnologías MERN (Mongo, Express, React y Node).
Se puede crear Categorías, Productos (y asignarle una Categoría), Referidos, Proveedores, Usuarios y Pedidos.
Para crear un pedido, se eligen los productos y la cantidad (no puede superar el stock), se elige un referido y la comisión, que se calcula con porcentaje sobre el total del pedido. A los productos se les descuenta la cantidad y al referido se le suma la comisión.
Al eliminar un pedido se vuelve a sumar la cantidad de productos al stock y se descuenta la comisión al referido


Para comenzar:

-tener un archivo .env con:

TOKEN_KEY: llave para crear Token
TOKEN_EXPIRE_IN: tiempo que dura la validez del Token (ej: 30m son 30 minutos)
MONGODB_URI: conexión a la base de datos de MongoDB

-Crear un usuario:

front: en componente App comentar verificación del token para poder acceder a la ruta /signup
back: en el post de rutasUsuarios comentar la verificación de usuario y token y crear un Usuario (sólo es necesario para crear el primer usuario). Una vez creado descomentar la verificación.