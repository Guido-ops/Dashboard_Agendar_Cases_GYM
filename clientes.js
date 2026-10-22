document.addEventListener("DOMContentLoaded", function() {

    const tabla = document.querySelector("#tablaClientes tbody");

    const clientes = JSON.parse(localStorage.getItem("usuarios")) || [];

    clientes.forEach(function(cliente) {

        const fila = document.createElement("tr");

        const datos = [
            cliente.nombre,
            cliente.apellido,
            cliente.correo,
            cliente.pais
        ];

        datos.forEach(function(dato) {
            const celda = document.createElement("td");
            celda.textContent = dato || "";
            fila.appendChild(celda);
        });

        tabla.appendChild(fila);
    });

});