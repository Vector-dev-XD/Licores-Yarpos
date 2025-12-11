const wheelPrizes = [
    { discount: 10, color: '#1a5d2a' },
    { discount: 15, color: '#2d7a3a' },
    { discount: 20, color: '#0f4620' },
    { discount: 5, color: '#1a5d2a' },
    { discount: 25, color: '#2d7a3a' },
    { discount: 30, color: '#0f4620' },
    { discount: 50, color: '#1a5d2a' },
    { discount: 10, color: '#2d7a3a' }
];

let isSpinning = false;
let wheelRotation = 0;

function createWheel() {
    const wheelHTML = `
        <div class="modal-ruleta" id="wheelModal">
            <div class="contenedor-ruleta">
                <button class="cerrar-ruleta" onclick="closeWheel()">×</button>
                <h2 class="titulo-ruleta">GIRA Y GANA</h2>
                
                <div class="envoltura-ruleta">
                    <div class="indicador-ruleta"></div>
                    <canvas class="lienzo-ruleta" id="wheelCanvas" width="300" height="300"></canvas>
                </div>

                <button class="boton-ruleta" id="spinBtn" onclick="spinWheel()">GIRAR</button>
                
                <!-- Resultado eliminado visualmente -->
                <div class="mensaje-resultado" id="resultMessage" style="display:none;">
                    <div class="descuento-resultado" id="discountAmount"></div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', wheelHTML);
    drawWheel();

}

function drawWheel() {
    const canvas = document.getElementById('wheelCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const radius = 150;
    const centerX = 150;
    const centerY = 150;
    const sliceAngle = (2 * Math.PI) / wheelPrizes.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    wheelPrizes.forEach((prize, index) => {
        const startAngle = index * sliceAngle;
        const endAngle = startAngle + sliceAngle;

        ctx.fillStyle = index % 2 === 0 ? '#1a5d2a' : '#0f4620';
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.lineTo(centerX, centerY);
        ctx.fill();
        
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + sliceAngle / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 18px Poppins';
        ctx.fillText(`${prize.discount}%`, radius - 30, 6);
        ctx.restore();
    });
}

function spinWheel() {
    if (isSpinning) return;

    const spinBtn = document.getElementById('spinBtn');
    const canvas = document.getElementById('wheelCanvas');

    isSpinning = true;
    spinBtn.disabled = true;

    const spins = Math.floor(Math.random() * 5) + 8;
    const extraDegrees = Math.floor(Math.random() * 360);
    const finalRotation = spins * 360 + extraDegrees;

    wheelRotation += finalRotation;

    const startTime = Date.now();
    const duration = 4000;

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentRotation = wheelRotation - (finalRotation * (1 - easeProgress));
        
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate((currentRotation * Math.PI) / 180);
        ctx.translate(-150, -150);

        const sliceAngle = (2 * Math.PI) / wheelPrizes.length;

        wheelPrizes.forEach((prize, index) => {
            const startAngle = index * sliceAngle;
            const endAngle = startAngle + sliceAngle;
            
            ctx.fillStyle = index % 2 === 0 ? '#1a5d2a' : '#0f4620';
            ctx.beginPath();
            ctx.arc(150, 150, 150, startAngle, endAngle);
            ctx.lineTo(150, 150);
            ctx.fill();
            
            ctx.strokeStyle = '#ffd700';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.save();
            ctx.translate(150, 150);
            ctx.rotate(startAngle + sliceAngle / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#ffd700';
            ctx.font = 'bold 18px Poppins';
            ctx.fillText(`${prize.discount}%`, 120, 6);
            ctx.restore();
        });

        ctx.restore();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Resultado eliminado
            // NO se muestra nada visual
            // NO se rellena el mensaje

            isSpinning = false;
            spinBtn.style.display = 'none';
        }
    }

    animate();
}

function closeWheel() {
    const wheelModal = document.getElementById('wheelModal');
    wheelModal.classList.remove('activo');
}

document.addEventListener('DOMContentLoaded', function() {
    createWheel();
    setTimeout(() => {
        const wheelModal = document.getElementById('wheelModal');
        if (wheelModal) wheelModal.classList.add('activo');
    }, 500);
});

document.addEventListener('click', function(event) {
    const wheelModal = document.getElementById('wheelModal');
    if (wheelModal && event.target === wheelModal) {
        closeWheel();
    }
});
