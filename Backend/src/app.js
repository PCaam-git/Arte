const express = require('express');
 
const app = express();
app.use(express.json());
 
const disciplinas = {
    'Lienzos': {
        acrilico: 3,
        oleo: 5,
        acuarela: 25
    },
    'Esculturas': {
        altitude: 488,
        population: 53305
    },
    'Cerámica': {
        altitude: 915,
        population: 25900
    }
};
 
app.get('/arte', (req, res) => {
    res.json(arte);
});
 
app.get('/arte:disciplina', (req, res) => {
    const disciplina = req.params.disciplina;
    res.json(arte[disciplinas]);
});
 
 
app.listen(8080, () => {
    console.log('Iniciando el backend en el puerto 8080');
});