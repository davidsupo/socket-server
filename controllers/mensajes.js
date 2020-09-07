const Mensaje = require('../models/mensaje');

exports.mensajesPersonales = async (req, res) => {
  const uid = req.uid;
  const to = req.params.to;
  const desde = Number( req.query.page ) || 0;
  const limit = Number( req.query.size ) || 20;
  try{

    const mensajes = await Mensaje.find({
      $or:[{from: uid ,to},{from: to ,to: uid}]
    })
    .sort({createdAt:'desc'})
    .skip(desde)
    .limit(limit);

    const total = await Mensaje.countDocuments({
      $or:[{from: uid ,to},{from: to ,to: uid}]
    });
    const continua = total > ( desde + 1 ) * limit;
    res.status(200).json({ok:true,msg:'Lista de mensajes',mensajes,pagina:desde,cantidad:limit,registros:total,continua})
  }catch(err){
    console.log(err);
    res.status(500).json({ok:false,msg:'Ocurrió un error inesperado',err});
  }
}