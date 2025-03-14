const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let users = []; // Base de datos temporal en memoria

// Credenciales del administrador
const adminCredentials = {
    usuario: 'admin',
    contraseña: 'admin123'
};

router.post('/login', async (req, res) => {
    const { usuario, contraseña } = req.body;

    // Verificar si es el administrador
    if (usuario === adminCredentials.usuario && contraseña === adminCredentials.contraseña) {
        const token = jwt.sign({ usuario, role: 'admin' }, 'secreto', { expiresIn: '1h' });
        return res.json({ token, role: 'admin' });
    }

    // Verificar si es un usuario normal
    const user = users.find(u => u.usuario === usuario);
    if (user && await bcrypt.compare(contraseña, user.contraseña)) {
        const token = jwt.sign({ usuario, role: 'user' }, 'secreto', { expiresIn: '1h' });
        return res.json({ token, role: 'user' });
    } else {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
});

router.post('/register', async (req, res) => {
    const { nombre, usuario, email, contraseña } = req.body;
    
    if (!nombre || !usuario || !email || !contraseña) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // Verificar si el usuario ya existe
    const userExists = users.find(u => u.usuario === usuario);
    if (userExists) {
        return res.status(409).json({ error: "El usuario ya existe" });
    }

    // Hashear la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Agregar el nuevo usuario a la lista
    users.push({ nombre, usuario, email, contraseña: hashedPassword });
    res.status(201).json({ message: "Usuario registrado exitosamente" });
});

// Endpoint para verificar el token
router.post('/verify-token', (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token no proporcionado o mal formado' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'secreto', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido o expirado' });
        }
        res.json({ role: decoded.role });
    });
});

module.exports = router;