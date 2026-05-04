// API kamu langsung dimasukin
const data = {
  "results": [
    {
      "title": "Faded",
      "artist": "HINDIA",
      "thumbnail": "https://open.spotify.com/playlist/37i9dQZF1E4tOS1lg4Kdgo?si=YVuQvKKSQfuLzhv9g5op4Q"
    },
    {
      "title": "Faded",
      "artist": "Alan Walker",
      "thumbnail": "https://i.scdn.co/image/ab67616d0000b273c4d00cac55ae1b4598c9bc90"
    },
    {
      "title": "Faded Heart - Acoustic",
      "artist": "BØRNS",
      "thumbnail": "https://i.scdn.co/image/ab6742d3000053b7858af5a598e4b56c49e3e4da"
    }
  ]
};

const songsDiv = document.getElementById("songs");

let currentIndex = 0;

function loadSongs() {
  data.results.forEach((song, index) => {
    const div = document.createElement("div");
    div.className = "song";

    div.innerHTML = `
      <img src="${song.thumbnail}">
      <div>
        <b>${song.title}</b><br>
        <small>${song.artist}</small>
      </div>
    `;

    div.onclick = () => playSong(index);

    songsDiv.appendChild(div);
  });
}

function playSong(index) {
  currentIndex = index;
  const song = data.results[index];

  document.getElementById("cover").src = song.thumbnail;
  document.getElementById("title").innerText = song.title;
  document.getElementById("artist").innerText = song.artist;

  const query = encodeURIComponent(song.title + " " + song.artist);

  document.getElementById("ytPlayer").innerHTML = `
    <iframe 
      src="https://www.youtube.com/embed?listType=search&list=${query}&autoplay=1">
    </iframe>
  `;
}

// AUTO NEXT (simple)
function nextSong() {
  currentIndex++;
  if(currentIndex >= data.results.length) currentIndex = 0;
  playSong(currentIndex);
}

loadSongs();
