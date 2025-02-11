const { authenticateUser } = require('../service/auth');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await authenticateUser(username, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
};

module.exports = { login };
