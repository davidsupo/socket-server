const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

exports.crearUsuario = async (req,res) => {
  const { email } = req.body;
  try {
    const existeEmail = await Usuario.findOne({email})
    if(existeEmail){ return res.status(400).json({ok:false, msg: 'El correo ya está registrado'})}
    const usuario = new Usuario(req.body);
    await usuario.save();
    //Generar mi JwT
    const token = await generarJWT(usuario.id);
    res.json({ok:true,msg:'Crear usuario',usuario,token});
  }catch(err){
    console.log(error);
    res.status(500).json({ok:false,msg:'Error inesperado.'});
  }
}

exports.login = async (req,res)=>{
  try{
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({email});
    if( !usuario ) return res.status(404).json({ok:false,msg:'Email y/o contraseña incorrecta.'});
    if( !bcrypt.compareSync(password,usuario.password)) return res.status(404).json({ok:false,msg:'Email y/o contraseña incorrecta.'});
    //Generar token
    const token = await generarJWT(usuario.id);
    res.json({ok:true,msg:'Usuario logueado',usuario,token});
  }catch(err){
    console.log(error);
    res.status(500).json({ok:false,msg:'Error inesperado.'});
  }
}

exports.renewToken = async (req,res) => {
  try{
    const usuario = await Usuario.findById(req.uid)
    if(!usuario) return res.status(404).json({ok:false,msg:'Usuario no encontrado'});
    //Generar nuevo token
    const token = await generarJWT(usuario.id);
    res.json({ok:true,msg:'renew token',usuario,token});
  }catch( err ){
    console.log(error);
    res.status(500).json({ok:false,msg:'Error inesperado.'});
  }
}