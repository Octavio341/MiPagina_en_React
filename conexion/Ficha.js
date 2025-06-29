const mongoose = require('mongoose');
const { Schema } = mongoose;

const fichaSchema = new Schema({
  titulo: {
    type: String,
    required: true
  },
  imagenPortada: String,
  fecha: String,
  calificacion: Number,

  contar_vista: { type: Number, default: 0 },
  contenidoGeneral: {
    titulo: String,
    imagen: String,
    descripciones: [String],
    fechaPublicacion: String
  },

  contactoInformacion: {
    titulo: String,
    descripcion: String,
    telefono: String,
    email: String,
    sitioWeb: String,
    mapa: {
      coordinates: {
        type: [Number], // [longitud, latitud]
        required: true
      }
    }
  },

  recomendaciones: {
    titulo: String,
    imagen: String,
    descripcion: String,
    linkDescargaPDF: String,
    contador_descargas: {
      type: Number,
      default: 0
    }
  },

  fecha_creacion: {
    type: Date,
    default: Date.now
  }
});

// Índice geoespacial para consultas por ubicación
fichaSchema.index({ 'contactoInformacion.mapa.coordinates': '2dsphere' });

// Virtual para agregar "id" que será string del _id
fichaSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Para incluir los virtuales en toJSON (y también en toObject si quieres)
fichaSchema.set('toJSON', {
  virtuals: true,
});
fichaSchema.set('toObject', {
  virtuals: true,
});

module.exports = mongoose.model('Ficha', fichaSchema);
