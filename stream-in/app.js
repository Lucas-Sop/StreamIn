// Cargar variables de entorno desde el archivo .env
require('dotenv').config();

// Importar dependencias necesarias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');

// Crear una instancia de Express
const app = express();

// Middlewares
app.use(cors()); // Permitir solicitudes de cualquier origen (ajusta según sea necesario)
app.use(helmet()); // Seguridad básica para HTTP headers
app.use(morgan('dev')); // Registro de solicitudes HTTP en consola
app.use(express.json()); // Parseo de solicitudes JSON
app.use(express.urlencoded({ extended: true })); // Parseo de solicitudes con datos codificados

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conexión a MongoDB establecida'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));


// Servir archivos estáticos si se usa un frontend (React, Vue, Angular, etc.)
app.use(express.static(path.join(__dirname, 'views')));

// Ruta base para verificar el estado del servidor
app.get('/', (req, res) => {
  res.render('index');
});

// Manejo de errores de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ message: 'Recurso no encontrado' });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error en el servidor' });
});

// Definir el puerto y comenzar a escuchar
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


// const express = require('express');
// // Importar los módulos necesarios
// const app = express();
// // Remove the second declaration of app
// const session = require('express-session');
// const flash = require('connect-flash');
// require('dotenv').config();
// const connectDB = require('./server/db/conexion')

// const userRouter = require('./routes/userRouter');
// const errRouter = require('./routes/errRouter');
// const path = require('path');

// // index productos
// const { getAllProduct } = require('./server/controllers/products')
// const layouts = require('express-ejs-layouts')
// const cookieParser = require('cookie-parser')
// app.use(express.json())
// app.use(cookieParser());

// app.use(express.urlencoded({ extended: true }))
// const db = process.env.MONGO_URL
// const unPuerto = process.env.PUERTO
// const secretSession = process.env.SECRET_SESSION
// const secretPassport = process.env.SECRET_PASSPORT
// const passport = require('passport')
// // para uso de archivos estáticos
// app.use(express.static('views'))

// // para uso de ejs
// app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, 'views'));

// // conectamos con la base de datos y el puerto a través de dotenv
// const iniciar = async () => {
//     try {
//          await connectDB(db)
//          app.listen(unPuerto, console.log(`el servidor se inició ${unPuerto}`))
//     } catch (error) {
//          console.log(error)
//     }
// }
// app.use(session({
//     secret: secretSession,
//     resave: false,
//     saveUninitialized: true,
// }));


// app.use(flash());

// app.use(passport.initialize())
// app.use(passport.session({
//      secret: secretPassport,
//      resave: false,
//      saveUninitialized: true,
//      cookie: { maxAge: 24 * 60 * 60 * 1000 }
// }))


// // para layouts
// app.set('layout', './layouts/layout')
// app.use(layouts)

// // Configurar las rutas
// app.use('/user', userRouter);
// app.use('/err', errRouter);


// // Iniciar el servidor
// const port = 3000;
// app.listen(port, () => {
//     console.log(`Servidor iniciado en el puerto ${port}`);
// });
// iniciar();