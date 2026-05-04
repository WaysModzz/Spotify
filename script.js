const TOKEN = "BQAMUMCXhfSjC1Pj9jqBrxB8kcb2T_wD3uavsMoBp913jYF48..."; // ganti kalau expired

let player;
let songs = [];
let currentIndex = 0;

// DATA PLAYLIST DARI API KAMU
const playlists = [
  {
    id: "3CdfoioAm3TCoieKyYPPys",
    name: "2016 vibes🫧",
    thumbnail: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72cfc1139d55164022b64c389aa"
  },
  {
    id: "1nTJuzz0tilrwZx6ggQwA0",
    name: "Alan Walker Hits",
    thumbnail: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84c249b8e633b6264a54183644"
  }
];

// INIT YOUTUBE
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "100",
    width: "300"
  });
}

// LOAD PLAYLIST UI
function loadPlaylists() {
  const container = document.getElementById("playlist");

  playlists.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${p.thumbnail}">
      <h4>${p.name}</h4>
    `;

    div.onclick = () => loadSongs(p.id);

    container.appendChild(div);
  });
}

// AMBIL LAGU DARI SPOTIFY
async function loadSongs(playlistId) {
  const res = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: "Bearer " + TOKEN
      }
    }
  );

  const data = await res.json();

  songs = data.items.map(item => ({
    title: item.track.name,
    artist: item.track.artists[0].name
  }));

  renderSongs();
}

// TAMPIL LAGU
function renderSongs() {
  const container = document.getElementById("songs");
  container.innerHTML = "";

  songs.forEach((song, i) => {
    const div = document.createElement("div");
    div.className = "song";
    div.innerHTML = `${song.title} - ${song.artist}`;
    div.onclick = () => playSong(i);
    container.appendChild(div);
  });
}

// PLAY
async function playSong(index) {
  currentIndex = index;

  const song = songs[index];
  const query = encodeURIComponent(song.title + " " + song.artist);

  const res = await fetch(`https://ytsearch.automate.my.id/search?q=${query}`);
  const data = await res.json();

  const videoId = data.result[0].id;

  player.loadVideoById(videoId);
}

// START
loadPlaylists();
