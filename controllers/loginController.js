const passport = require('passport');
const Usuario = require('../models/Usuarios');

//Renderiza formulario de login
const getLogin = (req, res) => {
    res.render("login/login", { login: true });
}

//Valida usuario y password
const postLogin = passport.authenticate( 'local', { 
   failureRedirect: ('/login'),
   successRedirect: ('/home'),
   failureFlash: true
});

//Cierra sesion
const getLogout = (req, res) => {
    req.logout();
    res.render("login/login", { login: true });
}

module.exports = {
    getLogin,
    postLogin,
    getLogout
}