// Imports
// ------------------
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');
const {
    getListadoProvincias,
    getAgregarProvincia,
    postAgregarProvincia
} = require('../controllers/provinciasController');

// Endpoints
// ------------------
router.get('/', getListadoProvincias); //Muestra el listado de provincias
router.get('/add', getAgregarProvincia); //Muestra el form para agregar provincias
router.post('/add', postAgregarProvincia) // Valida y agrega la nueva provinca

module.exports = router;