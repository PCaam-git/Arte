const express = require('express');
const router = express.Router();
const { getObras, getObra, postObra, putObra, deleteObra } = require('../controller/arte');

router.get('/obras', getObras);
router.get('/obras/:id', getObra);
router.post('/obras', postObra);
router.put('/obras/:id', putObra);
router.delete('/obras/:id', deleteObra);

module.exports = router;