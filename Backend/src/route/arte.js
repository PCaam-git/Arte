const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getObras, getObra, postObra, putObra, deleteObra } = require('../controller/arte');

// Configuración de multer para el almacenamiento de imágenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../../uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Rutas
router.get('/obras', getObras);
router.get('/obras/:ID_obra', getObra);
router.post('/obras', upload.single('imagen'), postObra);  // Agregamos middleware de multer
router.put('/obras/:ID_obra', putObra);
router.delete('/obras/:ID_obra', deleteObra);

module.exports = router;