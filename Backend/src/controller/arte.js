const { findAllObras, findObra, registerObra, modifyObra, removeObra } = require('../service/arte');

const getObras = async (req, res) => {
  const obras = await findAllObras();
  res.json(obras);
};

const getObra = async (req, res) => {
  const obra = await findObra(req.params.id);
  res.json(obra);
};

const postObra = async (req, res) => {
  const { descripcion, fecha_creacion, precio, imagen, disciplina_id } = req.body;
  await registerObra({ descripcion, fecha_creacion, precio, imagen, disciplina_id });
  res.status(201).json({ message: 'Obra creada' });
};

const putObra = async (req, res) => {
  const { descripcion, fecha_creacion, precio, imagen } = req.body;
  await modifyObra(req.params.id, { descripcion, fecha_creacion, precio, imagen });
  res.status(204).json({});
};

const deleteObra = async (req, res) => {
  await removeObra(req.params.id);
  res.status(204).json({});
};

module.exports = { 
    getObras, 
    getObra, 
    postObra, 
    putObra, 
    deleteObra 
};