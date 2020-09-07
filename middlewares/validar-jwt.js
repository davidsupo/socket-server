const jwt = require('jsonwebtoken');

exports.validarJWT = (req,res,next) => {
  // Leer token;
  const token = req.header('x-token');

  if(!token) return res.status(401).json({ok:false,msg: 'No hay token en la petición'});
  try{
    const { uid } = jwt.verify(token,'MI_TOKEN_SECRETO');
    req.uid = uid;
    next();
  }catch(err){
    return res.status(401).json({ok:false,msg:'Token no válido'});
  }
  
}