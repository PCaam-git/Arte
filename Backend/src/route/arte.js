const express = require('express');
const router = express.Router();
const { getObras, getObra, postObra, putObra, deleteObra } = require('../controller/arte');

router.get('/obras', getObras);
router.get('/obras/:ID_obra', getObra);
router.post('/obras', postObra);
router.put('/obras/:ID_obra', putObra);
router.delete('/obras/:ID_obra', deleteObra);

module.exports = router;