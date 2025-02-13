const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = [
  { id: 1, usuario: 'admin', contraseña: bcrypt.hashSync('admin123', 10) }
];

const authenticateUser = async (usuario, contraseña) => {
  const user = users.find(u => u.usuario === usuario);
  if (user && bcrypt.compareSync(contraseña, user.contraseña)) {
    return jwt.sign({ id: user.id, usuario: user.usuario }, 'secreto', { expiresIn: '1h' });
  }
  throw new Error('Credenciales incorrectas');
};

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Token requerido' });

  jwt.verify(token.split(' ')[1], 'secreto', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido' });
    req.user = decoded;
    next();
  });
};

module.exports = { authenticateUser, verifyToken };
