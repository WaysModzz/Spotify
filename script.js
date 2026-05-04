// SIMULASI DATA DARI PLAYLIST SPOTIFY (contoh dari link kamu)
const songs = [
  { title: "kota ini tak sama tanpamu", artist: "Nadhif Basalamah" },
  { title: "Ada titik-titik di ujung doa", artist: "Sal Priadi" },
  { title: "SWIM", artist: "BTS" },
  { title: "Risk It All", artist: "Bruno Mars" },
  { title: "American Girls", artist: "Harry Styles" },
  { title: "Lesung Pipi", artist: "Raim Laode" },
  { title: "GO", artist: "BLACKPINK" },
  { title: "WILDFLOWER", artist: "Billie Eilish" }
];

const container = document.getElementById("songs");

let currentIndex = 0;

// render list
songs.forEach((song, i) => {
  const div = document.createElement("div");
  div.className = "song";

  div.innerHTML = `
    <img src="https://i.scdn.co/image/ab67616d0000b273a108e07c661f9fc54de9c43a">
    <div>
      <b>${song.title}</b><br>
      <small>${song.artist}</small>
    </div>
  `;

  div.onclick = () => playSong(i);

  container.appendChild(div);
});

// play lagu
function playSong(index) {
  currentIndex = index;

  const song = songs[index];

  document.getElementById("title").innerText = song.title;
  document.getElementById("artist").innerText = song.artist;

  const query = encodeURIComponent(song.title + " " + song.artist);

  document.getElementById("playerBox").innerHTML = `
    <iframe 
      src="https://www.youtube.com/embed?listType=search&list=${query}&autoplay=1">
    </iframe>
  `;
}

// next otomatis
function nextSong() {
  currentIndex++;
  if (currentIndex >= songs.length) currentIndex = 0;
  playSong(currentIndex);
}
