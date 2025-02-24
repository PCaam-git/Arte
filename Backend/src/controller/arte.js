const {
  findAllObras,
  findObra,
  registerObra,
  modifyObra,
  removeObra,
 } = require("../service/arte");
 
 // Obtener todas las obras
 const getObras = async (req, res) => {
  try {
    const obras = await findAllObras();
    res.json(obras);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las obras" });
  }
 };
 
 // Obtener una obra específica por ID
 const getObra = async (req, res) => {
  try {
    const obra = await findObra(req.params.ID_obra);
    if (!obra) {
      return res.status(404).json({ error: "Obra no encontrada" });
    }
    res.json(obra);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la obra" });
  }
 };
 
 // Crear una nueva obra
 const postObra = async (req, res) => {
  try {
    const {
      ID_disciplina,
      ID_subdisciplina,
      descripcion,
      fecha_creacion,
      precio,
    } = req.body;
    // Obtener nombre del archivo si se subió una imagen
    const imagen = req.file ? req.file.filename : null;
 
    // Validar campos obligatorios
    if (
      !descripcion ||
      !fecha_creacion ||
      !precio ||
      !ID_disciplina ||
      !ID_subdisciplina
    ) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
 
    // Registrar la nueva obra
    await registerObra({
      ID_disciplina,
      ID_subdisciplina,
      descripcion,
      fecha_creacion,
      imagen,
      precio,
    });
    res.status(201).json({ message: "Obra creada" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la obra" });
  }
 };
 
 // Modificar una obra existente
 const putObra = async (req, res) => {
  try {
    const { descripcion, fecha_creacion, precio, ID_disciplina, ID_subdisciplina } = req.body;
 
    // Validar campos requeridos
    if (!descripcion || !fecha_creacion || !precio || !ID_disciplina || !ID_subdisciplina) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
 
    // Preparar datos para actualización
    const actualizacion = {
      descripcion,
      fecha_creacion,
      precio: Number(precio),
      ID_disciplina: Number(ID_disciplina),
      ID_subdisciplina: Number(ID_subdisciplina)
    };
 
    // Manejar la imagen si existe
    if (req.file) {
      actualizacion.imagen = req.file.filename;
    } else if (req.body.imagen) {
      actualizacion.imagen = req.body.imagen;
    }
 
    // Actualizar la obra
    const resultado = await modifyObra(req.params.ID_obra, actualizacion);
    res.json({
      message: 'Obra actualizada correctamente',
      obra: resultado
    });
 
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la obra' });
  }
 };
 
 // Eliminar una obra
 const deleteObra = async (req, res) => {
  try {
    await removeObra(req.params.ID_obra);
    res.status(200).json({ message: "Obra eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la obra" });
  }
 };
 
 module.exports = {
  getObras,
  getObra,
  postObra,
  putObra,
  deleteObra,
 };