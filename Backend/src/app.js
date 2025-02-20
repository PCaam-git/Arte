// Importar las dependencias necesarias
const express = require("express");        // Framework web para Node.js
const jwt = require("jsonwebtoken");       // Para manejar tokens JWT de autenticación
const cors = require("cors");              // Middleware para habilitar CORS
const path = require("path");              // Para manejar rutas de archivos

// Crear la aplicación Express
const app = express();

// Middleware básico
app.use(express.json());                   // Para parsear JSON en las peticiones
app.use(cors());                          // Habilitar CORS para peticiones cross-origin

// Configuración de la carpeta uploads para servir archivos subidos
const uploadsPath = path.join(__dirname, "../../uploads");
console.log("Ruta absoluta de uploads:", uploadsPath);
app.use("/uploads", express.static(uploadsPath));  // Servir archivos estáticos desde /uploads

// Configuración para servir archivos del frontend
const frontendPath = path.join(__dirname, "../../frontend/src");
console.log("Ruta absoluta del frontend:", frontendPath);
app.use(express.static(frontendPath));    // Servir archivos estáticos del frontend

// Array temporal para almacenar usuarios (simulando una base de datos)
const users = [{ usuario: "admin", contraseña: "admin123" }];

// Importar rutas modulares
const arteRoutes = require("./route/arte");    // Rutas para gestionar obras de arte
const authRoutes = require("./route/auth");    // Rutas de autenticación

// Montar las rutas en sus respectivos endpoints
app.use("/api/arte", arteRoutes);         // Todas las rutas de arte bajo /api/arte
app.use("/api", authRoutes);              // Rutas de autenticación bajo /api

// Ruta específica para el panel de administración
app.get('/admin', (req, res) => {
   res.sendFile(path.join(__dirname, "../../frontend/src/admin.html"));
});

// Endpoint de login: verifica credenciales y genera token JWT
app.post("/api/login", (req, res) => {
   const { usuario, contraseña } = req.body;
   const user = users.find(
       (u) => u.usuario === usuario && u.contraseña === contraseña
   );

   if (user) {
       // Si las credenciales son correctas, generar token JWT
       const token = jwt.sign({ usuario }, "secreto", { expiresIn: "1h" });
       res.json({ token });
   } else {
       // Si las credenciales son incorrectas, devolver error
       res.status(401).json({ message: "Credenciales incorrectas" });
   }
});

// Endpoint de registro: crea nuevos usuarios
app.post("/api/register", async (req, res) => {
   const { nombre, email, usuario, contraseña } = req.body;

   // Validar que todos los campos estén presentes
   if (!nombre || !email || !usuario || !contraseña) {
       return res.status(400).json({ message: "Todos los campos son obligatorios" });
   }

   // Verificar si el usuario ya existe
   const userExists = users.find((u) => u.usuario === usuario);
   if (userExists) {
       return res.status(409).json({ message: "El usuario ya existe" });
   }

   // Crear nuevo usuario
   users.push({ usuario: usuario, contraseña: contraseña });
   res.status(201).json({ message: "Usuario registrado exitosamente" });
});

// Mostrar rutas disponibles para debugging
console.log(
   "Rutas de arte:",
   arteRoutes.stack.map((layer) => layer.route?.path)
);
console.log(
   "Rutas de autenticación:",
   authRoutes.stack.map((layer) => layer.route?.path)
);

// Iniciar el servidor en el puerto 8090
app.listen(8090, () => {
   console.log("Iniciando el backend en el puerto 8090");
});