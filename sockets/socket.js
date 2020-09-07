const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');

io.on('connection', client => {
  const [ valido, uid ] = comprobarJWT( client.handshake.headers['x-token'] );
  if ( !valido ) { return client.disconnect(); }

  usuarioConectado( uid );

  // Ingresar al usuario a una sala en particular
  client.join( uid );

  //Escuchar del cliente el mensaje-personal
  client.on('mensaje-personal', async ( payload ) => {
    console.log( payload );
    await grabarMensaje(payload);
    io.to( payload.to ).emit('mensaje-personal', payload);
  });

  client.on('disconnect', () => {
    usuarioDesconectado(uid);
  });
})