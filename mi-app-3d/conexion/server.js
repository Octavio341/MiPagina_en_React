const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://adm:admin123@cluster0.lfslzpn.mongodb.net/Estancias?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.error('Error al conectar a MongoDB Atlas:', err));

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  usuario: { type: String, unique: true },
  email: String,
  rol: String,
  password: String,  // Aquí la contraseña estará en texto plano
  activo: Boolean,
  fecha_creacion: String,
  Perfil: String,
}, { collection: 'Perfil' });

const Usuario = mongoose.model('Perfil', usuarioSchema);

app.get('/', (req, res) => {
  res.send('Servidor funcionando en la raíz');
});

// Registrar usuario sin hash
app.post('/api/register', async (req, res) => {
  try {
    const { nombre, usuario, email, rol, password, activo, fecha_creacion, Perfil } = req.body;

    const existeUsuario = await Usuario.findOne({ usuario });
    if (existeUsuario) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const nuevoUsuario = new Usuario({
      nombre,
      usuario,
      email,
      rol,
      password,  // contraseña en texto plano
      activo,
      fecha_creacion,
      Perfil,
    });

    await nuevoUsuario.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente (sin hash)' });
  } catch (error) {
    console.error('Error en /api/register:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Login sin hash, compara texto plano
app.post('/api/login', async (req, res) => {
  try {
    const { usuario, password } = req.body;

    const usuarioEncontrado = await Usuario.findOne({ usuario });
    if (!usuarioEncontrado) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    // Compara directamente la contraseña sin hash
    if (password !== usuarioEncontrado.password) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const usuarioSeguro = {
      nombre: usuarioEncontrado.nombre,
      perfil: usuarioEncontrado.Perfil,
      usuario: usuarioEncontrado.usuario,
    };

    // ✅ Aquí se arregla el error
    usuarioEncontrado.activo = true;
    await usuarioEncontrado.save();

    res.json({ usuario: usuarioSeguro });
  } catch (error) {
    console.error('Error en /api/login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


app.get('/api/Admin', async (req, res) => {
  try {
    // Traemos usuarios sin contraseña para mayor seguridad
    const usuarios = await Usuario.find({}, '-password');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

app.get('/api/admin/:id', async (req, res) => {
  try {
   const perfilId = usuario.Perfil;

if (!mongoose.Types.ObjectId.isValid(perfilId)) {
  return res.status(400).json({ message: "ID de perfil inválido" });
}

const perfil = await Perfil.findById(perfilId);
if (!perfil) {
  return res.status(404).json({ message: "Perfil no encontrado" });
}

// continuar lógica


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
