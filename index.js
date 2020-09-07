const express = require('express');
const path = require('path');

const { dbConnection } = require('./database/config');
dbConnection();

const app = express();

// Lectura y parseo del body
app.use(express.json());


const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

const publicPath = path.resolve(__dirname,'public');
app.use(express.static(publicPath));

// Mis rutas
app.use('/api/login', require('./routes/auth'));
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/mensajes',require('./routes/mensajes'));

server.listen(3000,(err)=>{
  if ( err ) throw new Error('Error al iniciar servidor ', err);
  console.log('Server on port 3000');
})