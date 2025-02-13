const { authenticateUser } = require('../service/auth');

const login = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;
    const token = await authenticateUser(usuario, contraseña);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
};

module.exports = { login };
