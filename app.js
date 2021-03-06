const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.globalCompositeOperation = "destination-over";

const edge = 140;
let drawing = false;

const mouse = {
    x: null,
    y: null,
};

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Root {
    constructor(x, y, color, centerX, centerY) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.speedX = 0;
        this.speedY = 0;
        this.centerX = centerX;
        this.centerY = centerY;
    }
    draw() {
        this.speedX += (Math.random() - 0.5) / 2;
        this.speedY += (Math.random() - 0.5) / 2;
        this.x += this.speedY;
        this.y += this.speedX;

        const distanceX = this.x - this.centerX;
        const distanceY = this.y - this.centerY;
        const distance = Math.sqrt(
            distanceX * distanceX + distanceY * distanceY
        );
        const radius = ((-distance / edge + 1) * edge) / 10;

        if (radius > 0) {
            requestAnimationFrame(this.draw.bind(this));
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.strokeStyle = "black";
            ctx.stroke();
        }
    }
}

function branchOut() {
    if (drawing) {
        const centerX = mouse.x;
        const centerY = mouse.y;
        for (let i = 0; i < 3; i++) {
            const root = new Root(mouse.x, mouse.y, "blue", centerX, centerY);
            root.draw();
        }
    }
}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener("mousemove", function () {
    // ctx.fillStyle = "rgba(203, 203, 220, 0.03)";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    branchOut();
});
window.addEventListener("mousedown", function () {
    drawing = true;
});
window.addEventListener("mouseup", function () {
    drawing = false;
});

// make the code for movile
window.addEventListener("touchstart", function () {
    drawing = true;
});

window.addEventListener("touchend", function () {
    drawing = false;
});

window.addEventListener(
    "touchmove",
    function (event) {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
        branchOut();
    },
    false
);
