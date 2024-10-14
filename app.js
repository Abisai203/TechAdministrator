/*import express from 'express';
import refaccionController from './controllers/refaccion-controller.js'; // Asegúrate de que la ruta del archivo sea correcta

const app = express();

app.use(express.json());
app.use('/api', refaccionController); // Cambié 'heroController' a 'refaccionController'

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
*/

import express from 'express';
import cors from 'cors'; // Importa el paquete CORS
import refaccionController from './controllers/refaccion-controller.js'; // Controlador de refacciones
import authController from './controllers/authController.js'; // Controlador de autenticación
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configurar CORS para permitir todos los orígenes
app.use(cors());

// Alternativamente, puedes restringir el acceso a un dominio específico
// app.use(cors({ origin: 'http://frontend.com' }));

// Middleware para parsear el body de las peticiones como JSON
app.use(express.json());

// Middleware para registrar todas las solicitudes
app.use((req, res, next) => {
  console.log('Se recibió una solicitud');
  next(); // Pasa al siguiente middleware
});


// Rutas de autenticación (login)
app.use('/api', authController);

// Rutas de refacciones (protegidas por autenticación)
app.use('/api', refaccionController);

// Ruta adicional para probar CORS
app.get('/api/data', (req, res) => {
  res.json({ message: "Solicitud exitosa desde un origen diferente" });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Ocurrió un error en el servidor');
});

app.use((req, res, next) => {
  if (req.path.endsWith(".html")) {
    return res.status(403).send("El acceso a archivos .html está prohibido.");
  }
  next();
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/almacen", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});


// Puerto donde se ejecuta la aplicación
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
