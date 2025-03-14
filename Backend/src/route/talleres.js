//route/talleres.js
// Se encarga de manejar las rutas relacionadas con los talleres

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
// Importar los controladores para cada operación CRUD
const { getTalleres, getTaller, postTaller, putTaller, deleteTaller } = require('../controller/talleres');

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
router.get('/talleres', getTalleres);                                    // Obtener todos los talleres
router.get('/talleres/:ID_taller', getTaller);                           // Obtener un taller específico
router.post('/talleres', upload.single('imagen'), postTaller);         // Crear nuevo taller con imagen
router.put('/talleres/:ID_taller', upload.single('imagen'), putTaller);  // Actualizar taller existente
router.delete('/talleres/:ID_taller', deleteTaller);                     // Eliminar taller

module.exports = router;