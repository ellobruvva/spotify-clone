// Placeholder login function
function login() {
  alert("Spotify login will go here soon!");
}

// Example future: dynamic now playing (dummy animation)
const songs = ["Midnight Drive", "Purple Horizon", "Nightfall"];
const artists = ["Echo Beats", "Violet Wave", "Lunar Vibes"];

let index = 0;

setInterval(() => {
  const songEl = document.querySelector(".np-song");
  const artistEl = document.querySelector(".np-artist");

  songEl.textContent = songs[index % songs.length];
  artistEl.textContent = artists[index % artists.length];

  index++;
}, 5000);
