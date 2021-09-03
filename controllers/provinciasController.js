

const { 
    generaTituloMenuBreadcrumbsAddForm
 } = require('../helpers/provincias');


const getListadoProvincias = async (req, res) => {
    const titulo = 'Trabajo Con Provincias';
    const breadcrumbs = `<li class="breadcrumb-item"><a href="/home">Tablero</a></li>
    <li class="breadcrumb-item active">Trabajo con Provincias`;
    const menubar = `<li class="nav-item">
                        <a class="nav-link"  href="/provincias/add" role="button">                            
                                <i class="fas fa-plus green-color"></i>                                
                        </a>
                    </li>`;
    res.render('provincias/read', {
        titulo, 
        menubar, 
        breadcrumbs,
    })
}

const getAgregarProvincia = (req, res) => {
    const { titulo, breadcrumbs, menubar } = generaTituloMenuBreadcrumbsAddForm();
    res.render('provincias/create', { titulo, breadcrumbs, menubar });
}

const postAgregarProvincia = async (req, res) => {
    const { nombre } = req.body;
    const errores = [];

    //Valido campos obligatorios
    //-----------------------------
    if( !nombre ){
        errores.push( { texto: 'El nombre es obligatorio' } );
    } else{

    }

    if( errores.length > 0 ){
        const { titulo, breadcrumbs, menubar } = generaTituloMenuBreadcrumbsAddForm();
        res.render('provincias/create', { titulo, breadcrumbs, menubar, nombre, errores });
    }else {

    }
}

module.exports = {    
    getListadoProvincias,
    getAgregarProvincia,
    postAgregarProvincia
}