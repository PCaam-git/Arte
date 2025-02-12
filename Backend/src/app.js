const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const arteRoutes = require('./route/arte'); 
app.use('/api/arte', arteRoutes); 


const users = [{ username: 'admin', password: 'admin' }];

const authRoutes = require('./route/auth');
app.use('/api', authRoutes);

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = jwt.sign({ username }, 'secreto', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
    }
});

console.log('Rutas de arte:', arteRoutes.stack.map(layer => layer.route?.path));
console.log('Rutas de autenticación:', authRoutes.stack.map(layer => layer.route?.path));

 
app.listen(8090, () => {
    console.log('Iniciando el backend en el puerto 8090');
});