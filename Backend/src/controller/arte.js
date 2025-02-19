const { findAllObras, findObra, registerObra, modifyObra, removeObra } = require('../service/arte');

// Obtener todas las obras
const getObras = async (req, res) => {
    try {
        const obras = await findAllObras();
        res.json(obras);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las obras' });
    }
};

// Obtener una obra específica
const getObra = async (req, res) => {
    try {
        const obra = await findObra(req.params.ID_obra);
        if (!obra) {
            return res.status(404).json({ error: 'Obra no encontrada' });
        }
        res.json(obra);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la obra' });
    }
};

// Crear una nueva obra
const postObra = async (req, res) => {
    try {
        const { ID_disciplina, ID_subdisciplina, descripcion, fecha_creacion, precio } = req.body;
        const imagen = req.file ? req.file.filename : null;

        if (!descripcion || !fecha_creacion || !precio || !ID_disciplina || !ID_subdisciplina) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        await registerObra({ 
            ID_disciplina, 
            ID_subdisciplina, 
            descripcion, 
            fecha_creacion, 
            imagen, 
            precio 
        });
        res.status(201).json({ message: "Obra creada" });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la obra' });
    }
};

// Modificar una obra
const putObra = async (req, res) => {
    try {
        const { ID_disciplina, ID_subdisciplina, descripcion, fecha_creacion, imagen, precio } = req.body;
        await modifyObra(req.params.ID_obra, { 
            descripcion, 
            fecha_creacion, 
            precio, 
            imagen, 
            ID_disciplina,
            ID_subdisciplina 
        });
        res.status(200).json({ message: 'Obra actualizada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la obra' });
    }
};

// Eliminar una obra
const deleteObra = async (req, res) => {
    try {
        await removeObra(req.params.ID_obra);
        res.status(200).json({ message: 'Obra eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la obra' });
    }
};

module.exports = {
    getObras,
    getObra,
    postObra,
    putObra,
    deleteObra
};