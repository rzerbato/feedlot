const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/Usuarios');

passport.use( new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async ( email, password, done ) => {

    
    //valido si existe el usuario
    const usuario = await Usuario.findOne( { where: { email }});
    if( !usuario ){
        return done( null, false, { message: 'Email inválido' } );
    }

    //Valido que la contraseña coincida
    const match = await bcrypt.compare( password, usuario.password);
    if( match ) {
        return done( null, usuario )
    } else {
        return done( null, false, { message: 'Contraseña incorrecta' } );
    }
    
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
    try {
        const usuario = await Usuario.findByPk( id, { raw: true } );
        done(null, usuario);        
    } catch (error) {
        done(error, null);
    }
});
