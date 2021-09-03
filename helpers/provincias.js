
const generaTituloMenuBreadcrumbsAddForm = () => {
    const titulo = 'Nueva Provincia';
    const menubar = `<li class="nav-item">
                        <a class="nav-link" id="okAddProvincia" data-slide="true" href="#" role="button">
                            <i class="fas fa-check green-color"></i>
                        </a>                        
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-slide="true" href="/provincias" role="button">
                            <i class="fas fa-times red-color"></i>
                        </a>                        
                    </li>`;
    const breadcrumbs = `<li class="breadcrumb-item"><a href="/home">Tablero</a></li>
    <li class="breadcrumb-item"><a href="/provincias">Trabajo con Provincias</a></li>
    <li class="breadcrumb-item active">Agregar`;
    return {
        titulo,
        menubar,
        breadcrumbs
    }
}

/*const generaTituloMenuBreadcrumbsEditForm = ( usuario ) => {
    const { id, fullName } = usuario;
    const titulo = `Editar Usuario - ${ fullName }`;
    const menubar = `<li class="nav-item">
                        <a class="nav-link" id="okEditUser" data-slide="true" href="#" role="button">
                            <i class="fas fa-check green-color"></i>
                        </a>                        
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-slide="true" href="/usuarios" role="button">
                            <i class="fas fa-times red-color"></i>
                        </a>                        
                    </li>`;
    const breadcrumbs = `<li class="breadcrumb-item"><a href="/home">Tablero</a></li>
    <li class="breadcrumb-item"><a href="/usuarios">Trabajo con Usuarios</a></li>
    <li class="breadcrumb-item active"> ${ fullName }`;
    return {
        titulo,
        menubar,
        breadcrumbs
    }
}

const validaPassword = (pass) => {
    if ( pass.length <= 7 ) {
        return 'La clave debe contener al menos 8 caracteres.';
    } 
    if ( pass.match(/([!,%,&,@,#,$,^,*,?,_,~])/) ) {
        return "La clave sólo debe poseer letras mayúsculas, minúsculas y números";
    } 
    return;
}

const validaMail = (eMail) => {
    const eMailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);    
    return eMailPattern.test(eMail);
}
*/


module.exports = {
    generaTituloMenuBreadcrumbsAddForm,
  /*  generaTituloMenuBreadcrumbsEditForm,
    validaMail,
    validaPassword*/
}