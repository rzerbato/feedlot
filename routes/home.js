// Imports
// ------------------
const express = require('express');
const router = express.Router();
const { getPaginaPrincipal } = require('../controllers/homeController');
const { isAuthenticated } = require('../helpers/auth');

// Endpoints
// ------------------
router.get('/home', isAuthenticated, getPaginaPrincipal);
router.get('/', isAuthenticated, (req, res) => { res.redirect('/home')});

module.exports = router;