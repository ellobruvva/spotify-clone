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

// Sample songs (replace with real mp3 URLs if you want)
const sampleSongs = [
  {title:"Dreamscape", url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover:"https://picsum.photos/300/300?random=1"},
  {title:"Neon Lights", url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover:"https://picsum.photos/300/300?random=2"},
  {title:"Galactic Ride", url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover:"https://picsum.photos/300/300?random=3"},
  {title:"Cosmic Drift", url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover:"https://picsum.photos/300/300?random=4"},
  {title:"Electric Pulse", url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover:"https://picsum.photos/300/300?random=5"},
  {title:"Midnight Wave", url:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover:"https://picsum.photos/300/300?random=6"},
];

// Populate grid
const grid = document.getElementById('grid-section');
const audio = new Audio();
const miniPlayer=document.getElementById("mini-player");
const playerSong=document.getElementById("player-song");
const playPauseBtn=document.getElementById("play-pause");
const playerProgress=document.getElementById("player-progress");

function activatePlayer(){miniPlayer.classList.add("active");}

function populateGrid(filter="") {
  grid.innerHTML="";
  sampleSongs.filter(s=>s.title.toLowerCase().includes(filter.toLowerCase())).forEach(song=>{
    const card=document.createElement("div"); card.classList.add("card");
    card.dataset.song=song.url; card.dataset.title=song.title;
    const img=document.createElement("img"); img.src=song.cover; card.appendChild(img);
    const overlay=document.createElement("div"); overlay.classList.add("overlay");
    overlay.innerHTML=`<span>${song.title}</span>`; card.appendChild(overlay);
    card.addEventListener("click",()=>{
      audio.src=song.url; audio.play();
      playerSong.textContent=song.title; playPauseBtn.textContent="❚❚"; activatePlayer();
    });
    grid.appendChild(card);
  });
}

populateGrid();

// Search input filter
const searchInput = document.getElementById("search-input-main");
searchInput.addEventListener("input",()=>populateGrid(searchInput.value));

// Mini player controls
playPauseBtn.addEventListener("click",()=>{
  if(audio.paused){audio.play(); playPauseBtn.textContent="❚❚"; activatePlayer();}
  else{audio.pause(); playPauseBtn.textContent="▶";}
});

audio.addEventListener("timeupdate",()=>{
  if(audio.duration){playerProgress.value=(audio.currentTime/audio.duration)*100;}
});

playerProgress.addEventListener("input",()=>{
  if(audio.duration){audio.currentTime=(playerProgress.value/100)*audio.duration;}
});

audio.addEventListener("ended",()=>{playPauseBtn.textContent="▶";});
