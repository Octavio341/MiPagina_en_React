const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  nombre: { type: String, required: true },
  usuario: { type: String, required: true, unique: true },
  email: { type: String },
  rol: { type: String },
  activo: { type: Boolean, default: true },
  Perfil: { type: String },
  password: { type: String, required: true },
  fecha_creacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema,"Perfil");
