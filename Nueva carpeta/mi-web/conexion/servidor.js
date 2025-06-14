const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./User');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/Estancias', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB local'))
.catch(err => console.error('❌ Error conectando a MongoDB local:', err));


// Registro de usuario
app.post('/api/register', async (req, res) => {
  try {
    const { nombre, usuario, email, rol, password, activo, Perfil } = req.body;

    if (!password) {
      return res.status(400).json({ mensaje: 'La contraseña es obligatoria' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      nombre,
      usuario,
      email,
      rol,
      password: hashedPassword,
      activo,
      fecha_creacion: new Date(),
      Perfil,
    });

    await newUser.save();
    res.status(201).json({ mensaje: 'Usuario creado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});
// Login de usuario
app.post('/api/login', async (req, res) => {
  try {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
      return res.status(400).json({ mensaje: 'Usuario y contraseña son requeridos' });
    }

    const user = await User.findOne({ usuario });

    // ✅ Primero verifica si existe el usuario
    if (!user) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    // ✅ Ahora sí puedes acceder con seguridad a sus propiedades
    console.log(`Usuario ${user.usuario} activo: ${user.activo}`);

    user.activo = true;
    await user.save();

    // Verificar si la contraseña no está hasheada
    if (!user.password || user.password.length < 30) {
      if (password !== user.password) {
        return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();
      console.log(`Contraseña de usuario ${user.usuario} actualizada con hash.`);
    } else {
      const passwordCorrecta = await bcrypt.compare(password, user.password);
      if (!passwordCorrecta) {
        return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
      }
    }

    res.json({
      mensaje: 'Login exitoso',
      usuario: {
        nombre: user.nombre,
        usuario: user.usuario,
        email: user.email,
        rol: user.rol,
        activo: user.activo,
        Perfil: user.Perfil,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el login' });
  }
});


// Buscar usuario por ID con validación de ObjectId
app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ mensaje: 'ID inválido' });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error buscando usuario' });
  }
});


/////////// para cerrar sesion 
app.post('/api/logout', async (req, res) => {
  try {
    const { usuario } = req.body; // recibe el nombre de usuario o _id

    if (!usuario) {
      return res.status(400).json({ mensaje: 'Usuario es requerido' });
    }

    const user = await User.findOne({ usuario });
    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    user.activo = false;
    await user.save();

    res.json({ mensaje: 'Sesión cerrada correctamente' });
    console.log(`Sesión cerrada para el usuario: ${usuario}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al cerrar sesión' });
  }
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
