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

const Ficha = require('./Ficha');


/// PARA CONTACTO 
const nodemailer = require('nodemailer');


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
    _id: user._id,
    nombre: user.nombre,
    usuario: user.usuario,
    email: user.email,
    rol: user.rol,
    activo: user.activo,
    Perfil: user.Perfil,
    fecha_creacion: user.fecha_creacion,//
  },
});
    console.log(`Usuario ${user} ha iniciado sesión correctamente`);

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


/// servidor publicacion
app.post('/api/publicar-ficha', async (req, res) => {
  try {
    const nuevaFicha = new Ficha(req.body);
    console.log('Nueva ficha recibida:', nuevaFicha);
    await nuevaFicha.save();
    res.status(201).json({ mensaje: 'Ficha publicada correctamente y guardada en MongoDB' });
  } catch (err) {
    console.error('❌ Error al guardar la ficha:', err);
    res.status(500).json({ error: 'Error al guardar la ficha' });
  }
});

///////// OBTAENER TODAS LAS FICHAS 
// Obtener todas las fichas
app.get('/api/fichas', async (req, res) => {
  try {
    const fichas = await Ficha.find();
    res.json(fichas);
  } catch (error) {
    console.error('Error al obtener fichas:', error);
    res.status(500).json({ message: 'Error al obtener fichas', error: error.message });
  }
});

//=== PUERTO GENERAL 
//////

// Obtener ficha completa (o solo contar_vista) sin modificar nada
app.get('/api/fichas/:id', async (req, res) => {
  try {
    const ficha = await Ficha.findById(req.params.id);
    if (!ficha) {
      return res.status(404).json({ message: 'Ficha no encontrada' });
    }
    res.json(ficha);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener ficha' });
  }
});

/// para las vistas 
// Ejemplo en Express.js
// PUT /api/fichas/:id/vista
app.get('/api/fichas/:id/vista', async (req, res) => {
  try {
    const { id } = req.params;
    const ficha = await Ficha.findById(id);
    if (!ficha) return res.status(404).json({ mensaje: 'Ficha no encontrada' });
    res.json({ contar_vista: ficha.contar_vista || 0 });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener vista' });
  }
});

app.put('/api/fichas/:id/vista', async (req, res) => {
  try {
    const { id } = req.params;

    const ficha = await Ficha.findByIdAndUpdate(
      id,
      { $inc: { contar_vista: 1 } },
      { new: true }
    );

    if (!ficha) {
      return res.status(404).json({ message: 'Ficha no encontrada' });
    }

    res.json(ficha);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar vistas' });
  }
});

// Ruta GET para obtener el contador de descargas de una ficha
app.get('/api/fichas/:id/descargas', async (req, res) => {
  try {
    const ficha = await Ficha.findById(req.params.id, 'recomendaciones.contador_descargas');
    if (!ficha) {
      return res.status(404).json({ message: 'Ficha no encontrada' });
    }

    const contador = ficha.recomendaciones?.contador_descargas || 0;
    res.json({ contador_descargas: contador });
  } catch (error) {
    console.error('Error al obtener contador de descargas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


app.put('/api/fichas/:id/descarga', async (req, res) => {
  try {
    const ficha = await Ficha.findById(req.params.id);
    if (!ficha) {
      console.log('Ficha no encontrada'); // 👈 imprime en consola
      return res.status(404).json({ message: 'Ficha no encontrada' });
    }

    ficha.recomendaciones = ficha.recomendaciones || {};
    ficha.recomendaciones.contador_descargas = (ficha.recomendaciones.contador_descargas || 0) + 1;

    console.log('Contador actualizado:', ficha.recomendaciones.contador_descargas); // 👈 imprime en consola

    await ficha.save();

    res.json({ contador_descargas: ficha.recomendaciones.contador_descargas });
  } catch (error) {
    console.error('Error al registrar descarga:', error); // 👈 error en consola
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


/// ELEMINAR 
app.delete('/api/fichas/:id/delete', async (req, res) => {
  const { id } = req.params;

  try {
    const fichaEliminada = await Ficha.findByIdAndDelete(id);

    if (!fichaEliminada) {
      return res.status(404).json({ mensaje: 'Ficha no encontrada' });
    }

    res.json({ mensaje: 'Ficha eliminada correctamente', ficha: fichaEliminada });
  } catch (error) {
    console.error('Error al eliminar ficha:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});


///// DUPLICAR 

// Ruta para duplicar ficha
app.post('/api/fichas/:id/duplicar', async (req, res) => {
  try {
    const fichaOriginal = await Ficha.findById(req.params.id);
    if (!fichaOriginal) {
      return res.status(404).json({ mensaje: 'Ficha no encontrada' });
    }

    const nuevaFichaData = fichaOriginal.toObject();
    delete nuevaFichaData._id;
    nuevaFichaData.titulo = nuevaFichaData.titulo + ' (Copia)';
    nuevaFichaData.fecha = new Date().toISOString();

    const fichaDuplicada = new Ficha(nuevaFichaData);
    await fichaDuplicada.save();

    res.status(201).json({
      mensaje: 'Ficha duplicada con éxito',
      ficha: fichaDuplicada,
    });
  } catch (error) {
    console.error('Error duplicando ficha:', error);
    res.status(500).json({ mensaje: 'Error interno al duplicar ficha' });
  }
});

app.put('/api/fichas/:id/actualizar', async (req, res) => {
  try {
    const { id } = req.params;
    const ficha = await Ficha.findById(id);
    if (!ficha) {
      return res.status(404).json({ mensaje: 'Ficha no encontrada' });
    }

    const actualizaciones = {};

    if (req.body.titulo && req.body.titulo !== ficha.titulo) {
      ficha.titulo = req.body.titulo;
      actualizaciones.titulo = req.body.titulo;
    }

    if (req.body.imagenPortada && req.body.imagenPortada !== ficha.imagenPortada) {
      ficha.imagenPortada = req.body.imagenPortada;
      actualizaciones.imagenPortada = req.body.imagenPortada;
    }

    if (req.body.fecha && req.body.fecha !== ficha.fecha) {
      ficha.fecha = req.body.fecha;
      actualizaciones.fecha = req.body.fecha;
    }

    if (req.body.calificacion !== undefined && req.body.calificacion !== ficha.calificacion) {
      ficha.calificacion = req.body.calificacion;
      actualizaciones.calificacion = req.body.calificacion;
    }

    if (typeof req.body.contar_vista === 'number' && req.body.contar_vista >= 0) {
      ficha.contar_vista = req.body.contar_vista;
      actualizaciones.contar_vista = req.body.contar_vista;
    }

    // ✅ CORRECTA actualización de contador_descargas
    if (typeof req.body.recomendaciones?.contador_descargas === 'number' && req.body.recomendaciones.contador_descargas >= 0) {
      if (!ficha.recomendaciones) ficha.recomendaciones = {};
      ficha.recomendaciones.contador_descargas = req.body.recomendaciones.contador_descargas;
      actualizaciones.contador_descargas = req.body.recomendaciones.contador_descargas;
    }

    // ✅ Ahora sí actualizamos el resto de recomendaciones sin pisar el contador
    ficha.recomendaciones = {
      ...ficha.recomendaciones,
      ...req.body.recomendaciones,
      contador_descargas: ficha.recomendaciones.contador_descargas, // asegurar que se conserve
    };

    // ✅ Contenido General
    ficha.contenidoGeneral = {
      ...ficha.contenidoGeneral,
      ...req.body.contenidoGeneral,
    };
    if (req.body.contenidoGeneral) {
      actualizaciones.contenidoGeneral = req.body.contenidoGeneral;
    }

    // ✅ Contacto e Información
    ficha.contactoInformacion = {
      ...ficha.contactoInformacion,
      ...req.body.contactoInformacion,
    };
    if (req.body.contactoInformacion) {
      actualizaciones.contactoInformacion = req.body.contactoInformacion;
    }

    // ✅ Mostrar en consola los cambios aplicados
    console.log('🔄 Actualizaciones realizadas:', actualizaciones);

    await ficha.save();
    res.json({ mensaje: 'Ficha actualizada correctamente', ficha });
  } catch (error) {
    console.error('❌ Error al actualizar la ficha:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});


// PARA CONTACTO 

app.post("/api/contacto", async (req, res) => {
  const { nombre, email, asunto, mensaje } = req.body;

  // Configura el transporter con tu cuenta y contraseña de aplicación
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "li_octavio@unca.edu.mx",
      pass: "bawv gtrr qrsk xhkb", // Usa tu app password si tienes 2FA
    },
  });

  // Opciones del correo
  const mailOptions = {
    from: '"Tu Web" <li_octavio@unca.edu.mx>',  // Siempre tu correo aquí
    to: "li_octavio@unca.edu.mx",               // Correo que recibe los mensajes
    replyTo: email,                             // Para que puedas responder al remitente
    subject: asunto || `Nuevo mensaje de ${nombre}`,  // Usa el asunto ingresado o un predeterminado
    text: `
Nombre: ${nombre}
Correo del remitente: ${email}

Mensaje:
${mensaje}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Correo enviado con éxito" });
  } catch (err) {
    console.error("Error al enviar:", err);
    res.status(500).json({ success: false, message: "Error al enviar el correo" });
  }
});

///////
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
