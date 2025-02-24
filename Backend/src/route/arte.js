const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
// Importar los controladores para cada operación CRUD
const { getObras, getObra, postObra, putObra, deleteObra } = require('../controller/arte');

// Configuración de multer para gestionar la subida de imágenes
const storage = multer.diskStorage({
   // Definir la carpeta de destino para las imágenes
   destination: function (req, file, cb) {
       cb(null, path.join(__dirname, "../../../uploads"));
   },
   // Generar nombre único para cada imagen usando timestamp
   filename: function (req, file, cb) {
       cb(null, Date.now() + path.extname(file.originalname));
   },
});

// Crear instancia de multer con la configuración definida
const upload = multer({ storage: storage });

// Definición de rutas siguiendo convenciones REST
router.get('/obras', getObras);                                    // Obtener todas las obras
router.get('/obras/:ID_obra', getObra);                           // Obtener una obra específica
router.post('/obras', upload.single('imagen'), postObra);         // Crear nueva obra con imagen
router.put('/obras/:ID_obra', upload.single('imagen'), putObra);  // Actualizar obra existente
router.delete('/obras/:ID_obra', deleteObra);                     // Eliminar obra

module.exports = router;