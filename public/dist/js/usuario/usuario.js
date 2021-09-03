const botonOKAdd = document.querySelector("#okAddUser");
if( botonOKAdd ){
    botonOKAdd.addEventListener("click", () => {
        document.querySelector("#formAdd").submit();
    });
}

const botonOKEdit = document.querySelector("#okEditUser");
if( botonOKEdit ){
    botonOKEdit.addEventListener("click", () => {
        document.querySelector("#formEdit").submit();
    });
}

const linksEliminar = document.querySelectorAll(".eliminar");
if( linksEliminar ){
    linksEliminar.forEach(link => {
        link.addEventListener("click", e => {            
            Swal.fire({
                title: '¿Estás seguro?',
                text: "No prodrás revertir esta acción",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Eliminar'
            }).then( async result => {
                if (result.value) {
                    const id = e.target.id;
                    try {
                        const response = await fetch(`/usuarios/delete/${ id }`, {
                            method: 'DELETE'                        
                        });
                        if( response.status === 200) {
                            await Swal.fire(
                                'Eliminado!',
                                'El usuario ha sido eliminado.',
                                'success'
                            );
                            
                            var table = $('#usuarios').DataTable();
                            table
                                .row( $(e.target).parents('tr') )
                                .remove()
                                .draw();
                            
                        }else{
                            const { error } = await response.json();
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: error,
                                footer: 'Comuníquese con el administrador del sistema'
                            })
                        }
                    } catch (error) {
                        console.log(error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: '¡Ocurrió un error al intentar eliminar el usuario!',
                            footer: 'Comuníquese con el administrador del sistema'
                        });
                    }
                }
            })
        })
    })
}