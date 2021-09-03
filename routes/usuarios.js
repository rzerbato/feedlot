// Imports
// ------------------
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');
const { 
    getListadoUsuarios, 
    getAgregarUsuario, 
    postAgregarUsuario, 
    getEditarUsuario,
    putEditarUsuario,
    deleteEliminarUsuario } = require('../controllers/usuariosController');

// Endpoints
// ------------------
router.get('/', isAuthenticated, getListadoUsuarios); // Muestra listado de usuarios
router.get('/add', isAuthenticated, getAgregarUsuario); // Muestra el form para agregar usuario
router.post('/add', isAuthenticated, postAgregarUsuario); // Valida y agrega un nuevo usuario
router.get('/edit/:id', isAuthenticated, getEditarUsuario); // Muestra el form para editar al usuario
router.post('/edit', isAuthenticated, putEditarUsuario); // Valida y modifica el usuario
router.delete('/delete/:id', isAuthenticated, deleteEliminarUsuario); // Elimina el usuario

module.exports = router;