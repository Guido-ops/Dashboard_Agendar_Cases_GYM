
document.addEventListener("DOMContentLoaded", function() {

    // Obtener usuarios registrados
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Obtener clases agendadas
    const clases = JSON.parse(localStorage.getItem("clasesAgendadas")) || [];

    // 1. Total de socios
    const totalSocios = usuarios.length;

    document.getElementById("totalSocios").textContent = totalSocios;

    
    // Obtener fecha y hora actual
    const ahora = new Date();

    // Buscar clases que todavía no comienzan
    const proximasClases = clases.filter(function(clase) {

        const fechaClase = new Date(clase.fecha + "T" + clase.hora);

        return fechaClase > ahora;

    });

    // Mostrar cantidad de próximas clases
    document.getElementById("proximasClases").textContent = proximasClases.length;

    // Convertir una fecha a formato YYYY-MM-DD
    function formatearFecha(fecha) {
        const anio = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, "0");
        const dia = String(fecha.getDate()).padStart(2, "0");

        return `${anio}-${mes}-${dia}`;
    }
    // Obtener fecha actual
    const hoy = new Date();
    const fechaHoy = formatearFecha(hoy);

    // 2. Contar clases agendadas para hoy
    const clasesHoy = clases.filter(function(clase) {
        return clase.fecha === fechaHoy;
    });

    document.getElementById("horasHoy").textContent = clasesHoy.length;

    // 3. Calcular inicio y fin de la semana
    const inicioSemana = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

    // Considerar el lunes como primer día
    const diaSemana = inicioSemana.getDay();
    const diferencia = diaSemana === 0 ? -6 : 1 - diaSemana;

    inicioSemana.setDate(inicioSemana.getDate() + diferencia);

    const finSemana = new Date(inicioSemana);
    finSemana.setDate(inicioSemana.getDate() + 6);

    const fechaInicio = formatearFecha(inicioSemana);
    const fechaFin = formatearFecha(finSemana);

    // Filtrar las clases de esta semana
    const clasesSemana = clases.filter(function(clase) {
        return clase.fecha >= fechaInicio && clase.fecha <= fechaFin;
    });

    document.getElementById("horasSemana").textContent = clasesSemana.length;

});
