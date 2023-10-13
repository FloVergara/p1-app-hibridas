const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/gestor_biblioteca', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión a MongoDB establecida');
});

app.use(express.json());

// Rutas de las entidades
app.use('/api/libros', require('./routes/librosRoutes'));
app.use('/api/autores', require('./routes/autoresRoutes'));
app.use('/api/usuarios', require('./routes/usuariosRoutes'));
app.use('/api/prestamos', require('./routes/prestamosRoutes'));

app.listen(port, () => {
  console.log(`La aplicación está escuchando en el puerto ${port}`);
});
