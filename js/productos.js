const wheelPrizes = [
    { discount: 10, color: '#1a5d2a' },
    { discount: 15, color: '#2d7a3a' },
    { discount: 20, color: '#0f4620' },
    { discount: 5,  color: '#1a5d2a' },
    { discount: 25, color: '#2d7a3a' },
    { discount: 30, color: '#0f4620' },
    { discount: 50, color: '#1a5d2a' },
    { discount: 10, color: '#2d7a3a' }
];

let isSpinning = false;
let wheelRotation = 0;

window.addEventListener("load", () => {
    localStorage.removeItem("wheelUsed");
    localStorage.removeItem("finalRotation");
    createWheel();
});

function createWheel() {
    isSpinning = false;

    const old = document.getElementById("wheelModal");
    if (old) old.remove();

    const wheelHTML = `
        <div class="modal-ruleta" id="wheelModal">
            <div class="contenedor-ruleta">
                <button class="cerrar-ruleta" onclick="closeWheel()">×</button>
                <h2 class="titulo-ruleta">GIRA Y GANA</h2>

                <div class="envoltura-ruleta">
                    <div class="indicador-ruleta"></div>
                    <canvas id="wheelCanvas" width="300" height="300"></canvas>
                </div>

                <button class="boton-ruleta" id="spinBtn" onclick="spinWheel()">GIRAR</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', wheelHTML);

    const savedRotation = localStorage.getItem("finalRotation");
    if (savedRotation) {
        drawWheel(parseFloat(savedRotation));
        const btn = document.getElementById("spinBtn");
        btn.disabled = true;
        btn.innerText = "YA GIRASTE";
        btn.style.display = "none";
    } else {
        drawWheel(0);
    }

    setTimeout(() => {
        document.getElementById("wheelModal").classList.add("activo");
    }, 50);
}

function drawWheel(rotation = 0) {
    const canvas = document.getElementById("wheelCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, 300, 300);
    ctx.save();

    ctx.translate(150, 150);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.translate(-150, -150);

    const radius = 150;
    const sliceAngle = (2 * Math.PI) / wheelPrizes.length;

    wheelPrizes.forEach((prize, i) => {
        const start = i * sliceAngle;
        const end = start + sliceAngle;

        ctx.fillStyle = (i % 2 === 0) ? "#1a5d2a" : "#0f4620";

        ctx.beginPath();
        ctx.arc(150, 150, radius, start, end);
        ctx.lineTo(150, 150);
        ctx.fill();

        ctx.strokeStyle = "#ffd700";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate(start + sliceAngle / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#ffd700";
        ctx.font = "bold 18px Poppins";
        ctx.fillText(prize.discount + "%", 120, 6);
        ctx.restore();
    });

    ctx.restore();
}

function spinWheel() {
    if (localStorage.getItem("wheelUsed") === "true") return;
    if (isSpinning) return;

    isSpinning = true;

    const spinBtn = document.getElementById("spinBtn");
    spinBtn.disabled = true;

    const spins = Math.floor(Math.random() * 5) + 8;
    const extra = Math.floor(Math.random() * 360);
    const finalRotation = spins * 360 + extra;

    const start = Date.now();
    const duration = 4000;

    function animate() {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);

        const current = ease * finalRotation;
        wheelRotation = current % 360;

        drawWheel(wheelRotation);

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            spinBtn.style.display = "none";
            localStorage.setItem("wheelUsed", "true");
            localStorage.setItem("finalRotation", wheelRotation);
        }
    }

    animate();
}

function closeWheel() {
    const modal = document.getElementById("wheelModal");
    modal.classList.remove("activo");

    setTimeout(() => modal.remove(), 300);
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-ruleta-flotante")) {
        createWheel();
    }
});
