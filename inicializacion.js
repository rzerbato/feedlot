const db = require('./database');


//TODO: Importar los modelos

db.sync()
    .then(() => console.log('Base de datos conectada...'))
    .catch(error => console.log(error));
