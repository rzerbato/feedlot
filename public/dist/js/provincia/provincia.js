const botonOKAdd = document.querySelector("#okAddProvincia");
if( botonOKAdd ){
    botonOKAdd.addEventListener("click", () => {
        document.querySelector("#formAdd").submit();
    });
}