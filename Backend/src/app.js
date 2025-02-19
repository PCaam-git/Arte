const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware básico
app.use(express.json());
app.use(cors());

// Configuración de carpeta uploads
const uploadsPath = path.join(__dirname, "../../uploads");
console.log("Ruta absoluta de uploads:", uploadsPath);
app.use("/uploads", express.static(uploadsPath));

// Configuración para servir archivos estáticos del frontend
const frontendPath = path.join(__dirname, "../../frontend/src");
console.log("Ruta absoluta del frontend:", frontendPath);
app.use(express.static(frontendPath));

// Array temporal de usuarios (en una aplicación real, esto estaría en una base de datos)
const users = [{ usuario: "admin", contraseña: "admin123" }];

// Importar y usar rutas
const arteRoutes = require("./route/arte");
const authRoutes = require("./route/auth");

app.use("/api/arte", arteRoutes);
app.use("/api", authRoutes);

// Ruta para servir admin.html
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/src/admin.html"));
});

// Endpoint para login
app.post("/api/login", (req, res) => {
    const { usuario, contraseña } = req.body;
    const user = users.find(
        (u) => u.usuario === usuario && u.contraseña === contraseña
    );

    if (user) {
        const token = jwt.sign({ usuario }, "secreto", { expiresIn: "1h" });
        res.json({ token });
    } else {
        res.status(401).json({ message: "Credenciales incorrectas" });
    }
});

// Endpoint para registro
app.post("/api/register", async (req, res) => {
    const { nombre, email, usuario, contraseña } = req.body;

    if (!nombre || !email || !usuario || !contraseña) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const userExists = users.find((u) => u.usuario === usuario);
    if (userExists) {
        return res.status(409).json({ message: "El usuario ya existe" });
    }

    users.push({ usuario: usuario, contraseña: contraseña });
    res.status(201).json({ message: "Usuario registrado exitosamente" });
});

// Logging de rutas disponibles para debugging
console.log(
    "Rutas de arte:",
    arteRoutes.stack.map((layer) => layer.route?.path)
);
console.log(
    "Rutas de autenticación:",
    authRoutes.stack.map((layer) => layer.route?.path)
);

// Iniciar el servidor
app.listen(8090, () => {
    console.log("Iniciando el backend en el puerto 8090");
});