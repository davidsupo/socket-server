const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');

exports.usuarioConectado = async ( uid ) => {
  const usuario = await Usuario.findById(uid);
  usuario.online = true;
  await usuario.save();
  return usuario;
}

exports.usuarioDesconectado = async ( uid ) => {
  const usuario = await Usuario.findById(uid);
  usuario.online = false;
  await usuario.save();
  return usuario;
}

exports.grabarMensaje = async ( payload ) => {
  console.log('entro');
  try{
    const mensaje = new Mensaje(payload);
    await mensaje.save();
    return true;
  }catch(err){
    console.log(err);
    return false;
  }
}