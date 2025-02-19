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

// Obtener una obra específica
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
    const imagen = req.file ? req.file.filename : null;

    if (
      !descripcion ||
      !fecha_creacion ||
      !precio ||
      !ID_disciplina ||
      !ID_subdisciplina
    ) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

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


// Modificar una obra
const putObra = async (req, res) => {
  try {
      // Log detallado de la petición recibida
      console.log('===== Inicio putObra =====');
      console.log('ID_obra:', req.params.ID_obra);
      console.log('Tipo de contenido:', req.headers['content-type']);
      console.log('Datos del body:', {
          descripcion: req.body.descripcion,
          fecha_creacion: req.body.fecha_creacion,
          precio: req.body.precio,
          ID_disciplina: req.body.ID_disciplina,
          ID_subdisciplina: req.body.ID_subdisciplina,
          imagen: req.body.imagen
      });
      console.log('Archivo recibido:', req.file);
      console.log('========================');

      const { descripcion, fecha_creacion, precio, ID_disciplina, ID_subdisciplina } = req.body;

      // Validar datos requeridos
      if (!descripcion || !fecha_creacion || !precio || !ID_disciplina || !ID_subdisciplina) {
          console.log('Faltan campos obligatorios:', {
              descripcion,
              fecha_creacion,
              precio,
              ID_disciplina,
              ID_subdisciplina
          });
          return res.status(400).json({ 
              error: "Faltan campos obligatorios",
              camposFaltantes: {
                  descripcion: !descripcion,
                  fecha_creacion: !fecha_creacion,
                  precio: !precio,
                  ID_disciplina: !ID_disciplina,
                  ID_subdisciplina: !ID_subdisciplina
              }
          });
      }

      // Crear objeto de actualización
      const actualizacion = {
          descripcion,
          fecha_creacion,
          precio: Number(precio),
          ID_disciplina: Number(ID_disciplina),
          ID_subdisciplina: Number(ID_subdisciplina)
      };

      // Manejar la imagen
      if (req.file) {
          actualizacion.imagen = req.file.filename;
      } else if (req.body.imagen) {
          actualizacion.imagen = req.body.imagen;
      }

      console.log('Intentando actualizar obra con datos:', actualizacion);

      // Realizar la actualización
      const resultado = await modifyObra(req.params.ID_obra, actualizacion);
      console.log('Resultado de la actualización:', resultado);

      res.json({
          message: 'Obra actualizada correctamente',
          obra: resultado
      });

  } catch (error) {
      console.error('Error detallado en putObra:', {
          mensaje: error.message,
          error: error
      });
      res.status(500).json({ 
          error: 'Error al actualizar la obra',
          detalle: error.message 
      });
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
