const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getObras, getObra, postObra, putObra, deleteObra } = require('../controller/arte');

// Configuración de multer para el almacenamiento de imágenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../../uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// Rutas
router.get('/obras', getObras);
router.get('/obras/:ID_obra', getObra);
router.post('/obras', upload.single('imagen'), postObra);
router.put('/obras/:ID_obra', upload.single('imagen'), async (req, res) => {
    console.log('Petición PUT recibida:', {
        params: req.params,
        body: req.body,
        file: req.file
    });
    return putObra(req, res);
});
router.delete('/obras/:ID_obra', deleteObra);

module.exports = router;