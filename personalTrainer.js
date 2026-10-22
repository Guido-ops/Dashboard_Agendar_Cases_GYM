
document.addEventListener("DOMContentLoaded", function() {

    const formulario = document.getElementById("formTrainer");
    const clienteSelect = document.getElementById("clienteTrainer");
    const tabla = document.querySelector("#tablaTrainer tbody");

    // Recuperar clientes registrados
    let clientes = [];
    const datosClientes = localStorage.getItem("usuarios");

    if (datosClientes != null) {
        clientes = JSON.parse(datosClientes);
    }

    // Recuperar sesiones guardadas
    let sesiones = [];
    const datosSesiones = localStorage.getItem("sesionesTrainer");

    if (datosSesiones != null) {
        sesiones = JSON.parse(datosSesiones);
    }

    // Mostrar clientes en el selector
    clientes.forEach(function(cliente, indice) {

        const opcion = document.createElement("option");

        opcion.value = indice;
        opcion.textContent = cliente.nombre + " " + cliente.apellido;

        clienteSelect.appendChild(opcion);
    });

    // Mostrar sesiones registradas
    function mostrarSesiones() {

        tabla.innerHTML = "";

        sesiones.forEach(function(sesion, indice) {

            const fila = document.createElement("tr");

            const datos = [
                sesion.cliente,
                sesion.entrenador,
                sesion.fecha,
                sesion.hora
            ];

            datos.forEach(function(dato) {

                const celda = document.createElement("td");
                celda.textContent = dato;
                fila.appendChild(celda);
            });

            // Botón para cancelar
            const acciones = document.createElement("td");
            const boton = document.createElement("button");

            boton.textContent = "Cancelar";
            boton.type = "button";

            boton.addEventListener("click", function() {
                cancelarSesion(indice);
            });

            acciones.appendChild(boton);
            fila.appendChild(acciones);
            tabla.appendChild(fila);
        });
    }

    // Agendar una sesión
    formulario.addEventListener("submit", function(event) {

        event.preventDefault();

        const indiceCliente = clienteSelect.value;
        const entrenador = document.getElementById("entrenador").value;
        const fecha = document.getElementById("fechaTrainer").value;
        const hora = document.getElementById("horaTrainer").value;

        // Validar campos vacíos
        if (indiceCliente === "" || !entrenador || !fecha || !hora) {
            alert("Debe completar todos los campos");
            return;
        }

        // Comprobar que la fecha sea futura
        const fechaSesion = new Date(fecha + "T" + hora);

        if (isNaN(fechaSesion.getTime()) || fechaSesion <= new Date()) {
            alert("Debe seleccionar una fecha y hora futura");
            return;
        }

        // Comprobar disponibilidad del entrenador
        const ocupado = sesiones.some(function(sesion) {

            return sesion.entrenador === entrenador &&
                   sesion.fecha === fecha &&
                   sesion.hora === hora;
        });

        if (ocupado) {
            alert("El entrenador ya está reservado en ese horario");
            return;
        }

        // Obtener cliente seleccionado
        const cliente = clientes[Number(indiceCliente)];

        if (!cliente) {
            alert("Cliente no encontrado");
            return;
        }

        // Crear nueva sesión
        const nuevaSesion = {
            cliente: cliente.nombre + " " + cliente.apellido,
            entrenador: entrenador,
            fecha: fecha,
            hora: hora
        };

        // Guardar la sesión
        sesiones.push(nuevaSesion);

        localStorage.setItem("sesionesTrainer", JSON.stringify(sesiones));

        alert("Sesión agendada correctamente");

        mostrarSesiones();
        formulario.reset();
    });

    // Cancelar una sesión
    function cancelarSesion(indice) {

        const confirmar = confirm("¿Desea cancelar esta sesión?");

        if (confirmar) {

            sesiones.splice(indice, 1);

            localStorage.setItem("sesionesTrainer", JSON.stringify(sesiones));

            mostrarSesiones();
        }
    }

    // Mostrar sesiones al iniciar
    mostrarSesiones();

});
