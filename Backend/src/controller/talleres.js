//controller/talleres.js
// Se encarga de manejar las peticiones que llegan a la API y enviar las respuestas correspondientes

const {
    findAllTalleres,
    findTaller,
    registerTaller,
    modifyTaller,
    removeTaller,
   } = require("../service/talleres");
   
   // Obtener todos los Talleres
   const getTalleres = async (req, res) => {
    try {
      const talleres = await findAllTalleres();
      res.json(talleres);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los talleres" });
    }
   };
   
   // Obtener un taller específica por ID
   const getTaller = async (req, res) => {
    try {
      const taller = await findTaller(req.params.ID_taller);
      if (!taller) {
        return res.status(404).json({ error: "Taller no encontrado" });
      }
      res.json(taller);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el taller" });
    }
   };
   
   // Crear un nuevo taller
   const postTaller = async (req, res) => {
    try {
      console.log("Cuerpo completo:", req.body);
      console.log("Archivo:", req.file);

      const {
        tematica,
        fecha,
        lugar,
        descripcion,
      } = req.body;
      // Obtener nombre del archivo si se subió una imagen
      const imagen = req.file ? req.file.filename : null;
      console.log("Datos a insertar:", { tematica, fecha, lugar, descripcion, imagen });
   
      // Validar campos obligatorios
      if (
        !tematica ||
        !fecha ||
        !lugar ||
        !descripcion 
       ) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }
   
      // Registrar la nueva Taller
      await registerTaller({
        tematica,
        fecha,
        lugar,
        descripcion,
        imagen,
      });
      res.status(201).json({ message: "Taller creado" });
    } catch (error) {
      res.status(500).json({ error: "Error al crear el taller" });
    }
   };
   
   // Modificar una Taller existente
   const putTaller = async (req, res) => {
    try {
      const { tematica, fecha, lugar, descripcion, imagen } = req.body;
   
      // Validar campos requeridos
      if (!tematica || !fecha || !lugar || !descripcion) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }
   
      // Preparar datos para actualización
      const actualizacion = {
        tematica,
        fecha,
        lugar,
        descripcion
      };
   
      // Manejar la imagen si existe
      if (req.file) {
        actualizacion.imagen = req.file.filename;
      } else if (req.body.imagen) {
        actualizacion.imagen = req.body.imagen;
      }
   
      // Actualizar la Taller
      const resultado = await modifyTaller(req.params.ID_taller, actualizacion);
      res.json({
        message: 'Taller actualizado correctamente',
        Taller: resultado
      });
   
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el taller' });
    }
   };
   
   // Eliminar una Taller
   const deleteTaller = async (req, res) => {
    try {
      await removeTaller(req.params.ID_taller);
      res.status(200).json({ message: "Taller eliminado" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el taller" });
    }
   };
   
   module.exports = {
    getTalleres,
    getTaller,
    postTaller,
    putTaller,
    deleteTaller,
   };