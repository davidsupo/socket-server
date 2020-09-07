const jwt = require('jsonwebtoken');


exports.generarJWT = (uid) => {

  return new Promise((resolve,reject)=>{
    const payload = {uid};
    jwt.sign(payload,'MI_TOKEN_SECRETO',{
      expiresIn: '24h'
    }, (err, token) => {
      if ( err ) {
        reject('No se pudo generar el JWT');
      } else {
        resolve(token);
      }
    })
  })
}

exports.comprobarJWT = ( token ) => {
  if(!token) return [false,null];
  try{
    const { uid } = jwt.verify(token,'MI_TOKEN_SECRETO');
    return [ true, uid ];
  }catch(err){
    return [false, null];
  }
}
