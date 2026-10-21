let fila = [];

const input = document.getElementById("nombreInput");
const btnAnotar = document.getElementById("btnAnotar");
const btnAtender = document.getElementById("btnAtender");
const btnReiniciar = document.getElementById("btnReiniciar");
const btnPausa = document.getElementById("btnPausa");
const visor = document.getElementById("clienteActual");
const lista = document.getElementById("lista");
const panel = document.getElementById("panelEntrada");
const contador = document.getElementById("contador");

let datosGuardados = localStorage.getItem("turnos");

if (datosGuardados !== null) {
    fila = JSON.parse(datosGuardados);
}

actualizarLista();

function anotarCliente() {
    let nombre = input.value.trim();

    if (nombre === "") {
        alert("Ingrese un nombre.");
        return;
    }

    let existe = fila.some(cliente =>
        cliente.toLowerCase() === nombre.toLowerCase()
    );

    if (existe) {
        alert("Este cliente ya está en la fila.");
        return;
    }

    fila.push(nombre);
    localStorage.setItem("turnos", JSON.stringify(fila));

    input.value = "";
    actualizarLista();
    input.focus();
}

btnAnotar.addEventListener("click", anotarCliente);

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        anotarCliente();
    }
});

btnAtender.addEventListener("click", function() {
    if (fila.length > 0) {
        let atendido = fila.shift();
        visor.textContent = atendido;

        localStorage.setItem("turnos", JSON.stringify(fila));
        actualizarLista();
    } else {
        alert("No hay clientes en espera.");
    }
});

btnPausa.addEventListener("click", function() {
    panel.classList.toggle("pausado");

    if (panel.classList.contains("pausado")) {
        btnPausa.textContent = "Reanudar Entrada";
    } else {
        btnPausa.textContent = "Pausar Entrada";
    }
});

function actualizarLista() {
    lista.innerHTML = "";

    fila.forEach(function(nombre) {
        let li = document.createElement("li");
        li.textContent = nombre;
        lista.appendChild(li);
    });

    contador.textContent = fila.length;
}

btnReiniciar.addEventListener("click", function() {
    let confirmar = confirm("¿Está seguro de que desea reiniciar el día?");

    if (confirmar) {
        localStorage.removeItem("turnos");
        location.reload();
    }
});
