const mongoose = require('mongoose');
const { Schema } = mongoose;  // <--- EXTRAER Schema para usar Types.ObjectId

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

module.exports = mongoose.model('Ficha', fichaSchema);

