// Verificar edad al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    verificarEdad();
});

function verificarEdad() {
    mostrarModalEdad();
}

function mostrarModalEdad() {
    const overlay = document.createElement('div');
    overlay.className = 'superposicion-edad';

    const modal = document.createElement('div');
    modal.className = 'modal-edad';

    const titulo = document.createElement('h2');
    titulo.textContent = 'VERIFICACIÓN DE EDAD';

    const pregunta = document.createElement('p');
    pregunta.textContent = '¿Es mayor de 21 años?';

    const contenedorBotones = document.createElement('div');
    contenedorBotones.className = 'botones-edad';

    const btnSi = document.createElement('button');
    btnSi.className = 'boton-si';
    btnSi.textContent = 'SÍ';
    btnSi.onclick = () => {
        overlay.remove();
    };

    const btnNo = document.createElement('button');
    btnNo.className = 'boton-no';
    btnNo.textContent = 'NO';
    btnNo.onclick = () => {
        overlay.remove();
        deshabilitarBotones();
    };

    contenedorBotones.appendChild(btnSi);
    contenedorBotones.appendChild(btnNo);
    modal.appendChild(titulo);
    modal.appendChild(pregunta);
    modal.appendChild(contenedorBotones);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}

function deshabilitarBotones() {
    const botones = document.querySelectorAll('a, button');
    botones.forEach(boton => {
        boton.style.pointerEvents = 'none';
        boton.style.opacity = '0.5';
        boton.style.cursor = 'not-allowed';
    });
    
    const mensaje = document.createElement('div');
    mensaje.className = 'mensaje-restriccion-edad';
    mensaje.textContent = 'Debes ser mayor de 21 años para acceder a esta página';
    document.body.appendChild(mensaje);
}
