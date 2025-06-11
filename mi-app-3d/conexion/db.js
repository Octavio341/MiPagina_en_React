const mongoose = require("mongoose");

mongoose
  .connect('mongodb+srv://adm:admin123@cluster0.lfslzpn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((error) => console.error("❌ Error al conectar a MongoDB Atlas:", error));
