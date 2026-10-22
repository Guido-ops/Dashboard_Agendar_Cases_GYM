document.addEventListener("DOMContentLoaded", function() {

    const formulario = document.getElementById("FormAgendar");
    const tabla = document.querySelector("#tablaClases tbody");
    const btnCancelar = document.getElementById("btnCancelar");

    let clases = JSON.parse(localStorage.getItem("clasesAgendadas")) || [];

    function mostrarClases() {

        tabla.innerHTML = "";

        clases.forEach(function(clase) {

            const fila = document.createElement("tr");

            const datos = [
                clase.servicio,
                clase.fecha,
                clase.hora
            ];

            datos.forEach(function(dato) {
                const celda = document.createElement("td");
                celda.textContent = dato;
                fila.appendChild(celda);
            });

            const acciones = document.createElement("td");
            fila.appendChild(acciones);

            tabla.appendChild(fila);
        });
    }

    formulario.addEventListener("submit", function(event) {

        event.preventDefault();

        const servicio = document.getElementById("servicioSelect").value;
        const fecha = document.getElementById("fecha").value;
        const hora = document.getElementById("hora").value;

        if (!servicio || !fecha || !hora) {
            alert("Debe completar todos los campos");
            return;
        }

        const nuevaClase = {
            servicio: servicio,
            fecha: fecha,
            hora: hora
        };

        clases.push(nuevaClase);

        localStorage.setItem("clasesAgendadas", JSON.stringify(clases));

        mostrarClases();
        formulario.reset();

    });

    btnCancelar.addEventListener("click", function() {
        formulario.reset();
    });

    mostrarClases();

});