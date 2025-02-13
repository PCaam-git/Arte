const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); // Servir archivos estáticos desde la carpeta 'uploads'

const arteRoutes = require('./route/arte'); 
app.use('/api/arte', arteRoutes); 
const users = [{ usuario: 'admin', contraseña: 'admin123' }];

const authRoutes = require('./route/auth');
app.use('/api', authRoutes);

// Configurar almacenamiento de imágenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Guardar imágenes en la carpeta 'uploads'
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único
    }
});

const upload = multer({ storage: storage });

// Ruta para agregar una nueva obra con imagen
app.post('/api/obras', upload.single('imagen'), async (req, res) => {
    const { descripcion, fecha, precio, subdisciplina_id } = req.body;
    const imagen = req.file ? `/uploads/${req.file.filename}` : null;

    if (!descripcion || !fecha || !precio || !imagen) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // Guardar en la base de datos (esto depende de cómo estés almacenando los datos)
    // Aquí se usa un array temporal 'obras' para almacenar las obras
    obras.push({ id: Date.now(), descripcion, fecha, precio, imagen, subdisciplina_id });
    res.status(201).json({ message: "Obra agregada correctamente", imagen });
});

app.post('/api/login', (req, res) => {
    const { usuario, contraseña } = req.body;
    const user = users.find(u => u.usuario === usuario && u.contraseña === contraseña);

    if (user) {
        const token = jwt.sign({ usuario }, 'secreto', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
    }
});

app.post('/api/register', async (req, res) => {
    const { nombre, email, usuario, contraseña } = req.body;

    // Validar que todos los campos estén presentes
    if (!nombre || !email || !usuario || !contraseña) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Verificar si el usuario ya existe
    const userExists = users.find(u => u.usuario === usuario);
    if (userExists) {
        return res.status(409).json({ message: 'El usuario ya existe' });
    }

    // Agregar el nuevo usuario a la lista (en una aplicación real, deberías guardarlo en una base de datos)
    users.push({ usuario: usuario, contraseña: contraseña });

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
});

console.log('Rutas de arte:', arteRoutes.stack.map(layer => layer.route?.path));
console.log('Rutas de autenticación:', authRoutes.stack.map(layer => layer.route?.path));

app.listen(8090, () => {
    console.log('Iniciando el backend en el puerto 8090');
});