const Usuario = require('../models/usuario');

exports.getUsuarios = async ( req, res ) => {
  const uid = req.uid;
  const desde = Number( req.query.page ) || 0;
  const limit = Number( req.query.size ) || 20;
  try{
    const usuarios = await Usuario.find({_id:{$ne:uid}}).sort('-online').skip(desde).limit(limit);
    const total = await Usuario.countDocuments({_id:{$ne:uid}});
    const continua = total > ( desde + 1 ) * limit;
    return res.status(200).json({ok:true,msg:'Lista de usuarios',usuarios,pagina:desde,cantidad:limit,registros:total,continua});
  }catch(err){
    console.log(err);
    res.status(500).json({ok:false,msg:'Error inesperado.'});
  }
}