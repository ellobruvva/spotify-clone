// Sidebar smooth scroll
const buttons = document.querySelectorAll('.sidebar-btn');
buttons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = btn.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    target.scrollIntoView({ behavior:'smooth', block:'start' });
  });
});

window.addEventListener('scroll', () => {
  const sections = ['home-section','grid-section'];
  let scrollPos = window.scrollY + 100;
  sections.forEach(id => {
    const section = document.getElementById(id);
    const link = document.querySelector(`.sidebar-btn[href="#${id}"]`);
    if(section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos){
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// Search modal
const searchBtn = document.getElementById("search-btn");
const searchModal = document.getElementById("search-modal");
const searchClose = document.getElementById("search-close");
searchBtn.addEventListener("click",()=>{searchModal.classList.add("active");document.getElementById("search-input").focus();});
searchClose.addEventListener("click",()=>searchModal.classList.remove("active"));
document.addEventListener("keydown",(e)=>{if(e.key==="Escape")searchModal.classList.remove("active");});

// Floating particles
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particles = [], particleCount=100;
class Particle{constructor(){this.x=Math.random()*canvas.width;this.y=Math.random()*canvas.height;this.size=Math.random()*3+1;this.speedX=Math.random()*1.5-0.75;this.speedY=Math.random()*1.5-0.75;this.alpha=Math.random()*0.7+0.3;}update(){this.x+=this.speedX;this.y+=this.speedY;if(this.x<0)this.x=canvas.width;if(this.x>canvas.width)this.x=0;if(this.y<0)this.y=canvas.height;if(this.y>canvas.height)this.y=0;}draw(){ctx.fillStyle=`rgba(124,108,255,${this.alpha})`;ctx.beginPath();ctx.arc(this.x,this.y,this.size,0,Math.PI*2);ctx.fill();}}
for(let i=0;i<particleCount;i++){particles.push(new Particle());}
function animateParticles(){ctx.clearRect(0,0,canvas.width,canvas.height);particles.forEach(p=>{p.update();p.draw();});requestAnimationFrame(animateParticles);}
animateParticles();

// Cards + hover overlay + audio
const cards = document.querySelectorAll(".card");
let audio = new Audio();
const cardModal = document.getElementById("card-modal");
const cardClose = document.getElementById("card-close");
const cardModalImg = document.getElementById("card-modal-img");
const cardTitle = document.getElementById("card-title");
const cardDesc = document.getElementById("card-description");

cards.forEach((card,index)=>{
  card.addEventListener("click",(e)=>{
    const songSrc = card.dataset.song;
    const songTitle = card.dataset.title;
    // Play audio
    audio.src=songSrc; audio.play();
    // Update mini player
    playerSong.textContent=songTitle; playPauseBtn.textContent="❚❚"; activatePlayer();
    // Optional: open card modal
    cardModalImg.src=card.querySelector("img").src; cardTitle.textContent=songTitle;
    cardDesc.textContent=`This is a detail view for ${songTitle}.`; cardModal.classList.add("active");
  });
});

cardClose.addEventListener("click",()=>cardModal.classList.remove("active"));
document.addEventListener("keydown",e=>{if(e.key==="Escape")cardModal.classList.remove("active");});

// Mini player
const miniPlayer=document.getElementById("mini-player");
const playerSong=document.getElementById("player-song");
const playPauseBtn=document.getElementById("play-pause");
const playerProgress=document.getElementById("player-progress");

function activatePlayer(){miniPlayer.classList.add("active");}
function deactivatePlayer(){if(audio.paused && !audio.src){miniPlayer.classList.remove
