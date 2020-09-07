const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new Schema({
  nombre:{
    type:String,
    required:true
  },
  email: {
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  online:{
    type:Boolean,
    default:false
  }
})

UsuarioSchema.method('toJSON',function(){
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

UsuarioSchema.pre('save', function(next){
  const user = this;
  if(!user.isModified('password')) return next();
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(user.password,salt);
  user.password = hash;
  next();
});

module.exports = model('Usuario',UsuarioSchema);