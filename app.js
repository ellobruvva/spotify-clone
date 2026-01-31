// Floating particles for max visual effect
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1.5 - 0.75;
    this.speedY = Math.random() * 1.5 - 0.75;
    this.alpha = Math.random() * 0.7 + 0.3;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x < 0) this.x = canvas.width;
    if(this.x > canvas.width) this.x = 0;
    if(this.y < 0) this.y = canvas.height;
    if(this.y > canvas.height) this.y = 0;
  }

  draw() {
    ctx.fillStyle = `rgba(124,108,255,${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
  }
}

for(let i=0; i<particleCount; i++){
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();

// Optional: rotate cards randomly for micro-motion
const cards = document.querySelectorAll(".card");
setInterval(() => {
  cards.forEach(c => {
    const angle = (Math.random()*2 -1) + "deg";
    c.style.transform += ` rotate(${angle})`;
  });
}, 3000);
