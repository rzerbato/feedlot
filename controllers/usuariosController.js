const Usuario = require('../models/Usuarios');
const bcrypt = require('bcrypt');
const { 
    generaTituloMenuBreadcrumbsAddForm, 
    generaTituloMenuBreadcrumbsEditForm,
    validaMail, 
    validaPassword } = require('../helpers/usuarios');


const getListadoUsuarios = async (req, res) => {
    const titulo = 'Trabajo Con Usuarios';
    const breadcrumbs = `<li class="breadcrumb-item"><a href="/home">Tablero</a></li>
    <li class="breadcrumb-item active">Trabajo con Usuarios`;
    const menubar = `<li class="nav-item">
                        <a class="nav-link"  href="/usuarios/add" role="button">                            
                                <i class="fas fa-plus green-color"></i>                                
                        </a>
                    </li>`;
    try{
        const usuarios = await Usuario.findAll( { raw: true } );
        res.render('usuarios/read', { 
            titulo, 
            menubar, 
            breadcrumbs,
            usuarios
        });
    }
    catch (error){
        console.log(error);
        res.redirect('/home');
    }
}

const getAgregarUsuario = (req, res) => {
    const { titulo, breadcrumbs, menubar } = generaTituloMenuBreadcrumbsAddForm();
    res.render('usuarios/create', { titulo, breadcrumbs, menubar });
}

const postAgregarUsuario = async (req, res) => {

    const { nombre, mail, password } = req.body;
    const errores = [];

    // Valido campos
    //---------------------------
    if( !nombre ){
        errores.push( { texto: 'El nombre es obligatorio.' });
    }
    if( !mail ){
        errores.push( { texto: 'El mail es obligatorio.' });
    }else {
        if( !validaMail(mail) ){
            errores.push( { texto: 'El email ingresado es inválido.' });
        } else {
            const usuarioExistente = await Usuario.findOne( { where: { email: mail }});
            if( usuarioExistente ){ 
                errores.push( { texto: `Ya existe un usuario con mail ${ mail }` });
            }
        }
    }
    if( !password ){
        errores.push( { texto: 'La clave es obligatoria.' });
    } else {
        const mensaje = validaPassword( password );
        if( mensaje ){
            errores.push( { texto: mensaje } );
        }
    }
    //---------------------------

    if( errores.length > 0 ){
        const { titulo, breadcrumbs, menubar } = generaTituloMenuBreadcrumbsAddForm();
        res.render('usuarios/create', { titulo, breadcrumbs, menubar, nombre, mail, password, errores });
    }else {        
        try {
            await Usuario.create({
                fullName: nombre,
                email: mail, 
                password: bcrypt.hashSync(password, 10)
            });
            res.redirect("/usuarios");
        } catch (error) {
            console.log(error);
            errores.push( { texto: error } );
            const { titulo, breadcrumbs, menubar } = generaTituloMenuBreadcrumbsAddForm();
            res.render('usuarios/create', { titulo, breadcrumbs, menubar, nombre, apellido, direccion, telefono, provincia, localidad, mail, password, errores });
        }
    }
}

const getEditarUsuario = async (req, res) => {
    const { id: idUsuario } = req.params;
    try {
        const usuario = await Usuario.findByPk( idUsuario, { raw: true } );
        const { titulo, breadcrumbs, menubar } = generaTituloMenuBreadcrumbsEditForm( usuario );
        res.render('usuarios/edit', { titulo, breadcrumbs, menubar, usuario });
    }
    catch (error){
        console.log(error);
        res.redirect('/usuarios');
    }
}

const putEditarUsuario = async (req, res) => {
    
    // Valido campos
    //---------------------------    
    const { idUsuario, password } = req.body;
    const errores = [];
    const usuario = await Usuario.findByPk( idUsuario, { raw: true } );        
    if(!usuario){
        errores.push( { texto: 'El usuario no existe.' });
    }
    if( !password ){
        errores.push( { texto: 'La clave es obligatoria.' });
    } else {
        const mensaje = validaPassword( password );
        if( mensaje ){
            errores.push( { texto: mensaje } );
        }
    }
    //---------------------------

    if( errores.length > 0 ){
        const { titulo, breadcrumbs, menubar } = generaTituloMenuBreadcrumbsEditForm( usuario );
        res.render('usuarios/edit', { titulo, breadcrumbs, menubar, usuario, errores });
    }else {        
        try {            
            await Usuario.update({ password: bcrypt.hashSync(password, 10) }, {
                where: {
                  id: usuario.id
                }
              });
            res.redirect("/usuarios");
        } catch (error) {
            errores.push( { texto: error } );
            const { titulo, breadcrumbs, menubar } = generaTituloMenuBreadcrumbsEditForm( usuario );
            res.render('usuarios/edit', { titulo, breadcrumbs, menubar, usuario, errores });
        }
    }
}

const deleteEliminarUsuario = async (req, res) => {
    const { id: idUsuario } = req.params;    

    try {        
        const usuario = await Usuario.findByPk( idUsuario, { raw: true } );        
        if(!usuario){
            throw "El usuario no existe";
        }
        await Usuario.destroy({
            where: {
              id: idUsuario
            }
          });
        return res.json({
            ok: true
        });
    } catch (error) {
        if( error.original.sqlMessage ){
            error = error.original.sqlMessage;
        }
        return res.status(400).json({
            error
        });
    }
}

module.exports = {
    getListadoUsuarios,
    getAgregarUsuario,
    postAgregarUsuario,
    getEditarUsuario,
    putEditarUsuario,
    deleteEliminarUsuario
}