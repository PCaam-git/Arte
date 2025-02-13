const { findAllObras, findObra, registerObra, modifyObra, removeObra } = require('../service/arte');

const getObras = async (req, res) => {
    const obras = await findAllObras();
    res.json(obras);
};

const getObra = async (req, res) => {
    const obra = await findObra(req.params.ID_obra);
    if (!obra) {
      return res.status(404).json({ error: 'Obra no encontrada' });
  }
    res.json(obra);
};

/*const postObra = async (req, res) => {
    const { descripcion, fecha_creacion, precio, imagen, ID_disciplina } = req.body;
    await registerObra({ descripcion, fecha_creacion, precio, imagen, ID_disciplina });
    res.status(201).json({ message: 'Obra creada' });
};*/

const postObra = async (req, res) => {
    console.log("Datos recibidos:", req.body);  // <-- Agregar esta línea
    const { ID_disciplina, ID_subdisciplina, descripcion, fecha_creacion, imagen, precio } = req.body;

    if (!descripcion || !fecha_creacion || !imagen || !precio || !ID_disciplina || !ID_subdisciplina) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    await registerObra({ ID_disciplina, ID_subdisciplina, descripcion, fecha_creacion, imagen, precio });
    res.status(201).json({ message: "Obra creada" });
};


const putObra = async (req, res) => {
    const { descripcion, fecha_creacion, precio, imagen } = req.body;
    await modifyObra(req.params.ID_obra, { descripcion, fecha_creacion, precio, imagen, ID_disciplina });
    res.status(204).json({});
};

const deleteObra = async (req, res) => {
    await removeObra(req.params.ID_obra);
    res.status(204).json({});
};

module.exports = {
    getObras,
    getObra,
    postObra,
    putObra,
    deleteObra
};
