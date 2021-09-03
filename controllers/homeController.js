
const getPaginaPrincipal = (req, res) => {
    const titulo = 'Tablero';
    res.render('home/dashboard', { titulo });
}


module.exports = {
    getPaginaPrincipal
}