const loginUsuario = document.getElementById("Login");

loginUsuario.addEventListener("submit", function(event){
    event.preventDefault()
    console.log("Boton Funcionando");

    const correo = document.getElementById("correo2").value.trim();
    const contraseña = document.getElementById("contra").value;

    const usuario = {correo, contraseña}

    if(!validarUsuario(usuario)){
        return;
    }
    
    console.log("correo: " + correo);
    console.log("contraseña: " + contraseña);
    window.location = "dashboard.html";
});

function validarUsuario(usuario){

    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

    if(usuariosGuardados.length === 0){
        alert("No hay usuarios registrados");
        return false;
    }

    const encontrado = usuariosGuardados.find(
        u => u.correo === usuario.correo && u.contraseña === usuario.contraseña
    );

    if(encontrado){
        alert("Usuario Logeado");
        localStorage.setItem("usuarioActivo", JSON.stringify(encontrado));
        return true;
        
    } else{
        alert("Correo o contraseña incorrectos"); 
        return false;
    }
}
