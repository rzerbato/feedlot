// Imports
// ------------------
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require("connect-flash")
const db = require('./database');



// Inicializaciones
// -----------------
const app = express();
require('./config/passport');

// Configuraciones 
// ----------------
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');


// Middlewares
// -------------
app.use(morgan('dev'));
app.use( bodyParser.urlencoded({ extended: true } ) );
app.use( session({ 
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
app.use( passport.initialize() );
app.use( passport.session() );
app.use( flash() );


// Variables Globales
// -------------------
app.use( ( req, res, next ) => {
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})

// Configuracion de rutas
// -----------------------
app.use(require('./routes'));

// Archivos Publicos
// ------------------
app.use( express.static( path.join( __dirname, 'public' ) ) );

// Arrancar el Server
// -------------------
app.listen( app.get('port'), () => {
    console.log(`Servidor corriendo en puerto: ${ app.get('port') }`);
    // Conexcion a la DB
    // ------------------
    db.authenticate()
    .then(() => console.log('Base de datos conectada...'))
    .catch(error => console.log(error));
} );