const express = require('express');
const app = express();

//Importo los archivos del directorio routes
app.use( require('./home'));
app.use( require('./login'));
app.use('/usuarios/', require('./usuarios'));
app.use('/provincias/', require('./provincias'));


module.exports = app;