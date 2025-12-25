import instance from "../httpRequest";
import { appStatus, updatePlayPauseUI } from "../main";
import { formatTimeDigital, formatTimeText } from "../utils/formatTime";

export default function playlist() {
  return /* html */ `
<div class="flex">
  <!-- Playlist info -->
  <div class="js-playlist-info w-[30%] pl-[5%]"></div>
  <!-- Songs list -->
  <div class="js-songs w-[70%]"></div>
</div>
`;
}

async function getPLayListDetail({ data, params }) {
  const slug = data.slug;
  const type = params.type;
  const response = await instance.get(`${type}s/details/${slug}`);
  return response.data;
}

function playlistInfo(playlist) {
  return /* html */ `
<div class=" flex flex-col items-center gap-6 p-8 text-center">
  <img src="${playlist.thumbnails[0]}" alt="${
    playlist.title
  }" class="w-full aspect-square object-cover rounded-lg" />
  <div class="text-4xl font-bold">${playlist.title}</div>
  <div class="text-(--text-secondary-color) space-y-2">
    <!-- Artist names -->
    <div class="text-xs">${
      playlist.artists?.join(", ") || "YouTube Music"
    }</div>
    <!-- Type and release year -->
    <div>
      <span class="text-sm font-semibold uppercase">${playlist.type} </span>
      <span> • </span>
      <span>${new Date(playlist.releaseDate).getFullYear()}</span>
    </div>
    <!-- Number of songs and total duration -->
    <div>
      <span>${playlist.tracks.length} songs</span>
      <span> • </span>
      <span>${formatTimeText(
        playlist.tracks.reduce((total, track) => total + track.duration, 0)
      )}</span>
    </div>
    <!-- Description -->
    <div>
      ${playlist.description || ""}
    </div>
  </div>
</div>
`;
}

function songs(playlist) {
  const songs = playlist.tracks;
  // Add active status to the current playing song
  songs.map((song) => {
    if (song.audioUrl === appStatus.song && playlist.id === appStatus.songsId) {
      song.isActive = true;
    } else {
      song.isActive = false;
    }
  });
  return /* html */ `
<div class="p-8 space-y-4">
  ${songs
    .map(
      (song) => `
    <div class="js-song-item flex items-center justify-between p-4 ${
      song.isActive ? "bg-(--song-active-background-color)" : ""
    } rounded-lg">
      <div class="flex items-center gap-4">
        <div class="relative group cursor-pointer rounded-sm overflow-hidden js-song-image" data-audio-url=${
          song.audioUrl
        }>
          <img src="${song.thumbnails[0]}" alt="${
        song.title
      }" class="w-12 h-12 object-cover"/>
          <div class="js-play-button hidden group-hover:flex absolute inset-[-2px] items-center justify-center bg-(--songs-img-backround-color)">
            <div class="size-6 fill-white">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M5 4.623V19.38a1.5 1.5 0 002.26 1.29L22 12 7.26 3.33A1.5 1.5 0 005 4.623Z"></path></svg>
            </div>
            <div class="size-6 fill-white ${song.isActive ? "" : "hidden"}">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M6.5 3A1.5 1.5 0 005 4.5v15A1.5 1.5 0 006.5 21h2a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 008.5 3h-2Zm9 0A1.5 1.5 0 0014 4.5v15a1.5 1.5 0 001.5 1.5h2a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0017.5 3h-2Z"></path></svg>
            </div>
          </div>
        </div>
        <div>
          <a href="#!" class="text-white font-medium js-song-title" data-audio-url=${
            song.audioUrl
          }>${song.title}</a>
          <div class="text-(--text-secondary-color) text-sm hover:underline cursor-pointer">${
            song.artists.join(", ") || "Không rõ nghệ sĩ"
          }</div>
        </div>
      </div>
      <div class="text-(--text-secondary-color) text-sm">${formatTimeDigital(
        song.duration
      )}</div>
    </div>
  `
    )
    .join("")}
</div>
`;
}

export async function playlistScript({ data, params }) {
  const slug = data.slug;
  const type = params.type;

  const playlist = await getPLayListDetail({ data, params });
  playlist.type = playlist.type || type;

  const playlistInfoContainer = document.querySelector(".js-playlist-info");
  const songsContainer = document.querySelector(".js-songs");

  playlistInfoContainer.innerHTML = playlistInfo(playlist);
  songsContainer.innerHTML = songs(playlist);

  songsContainer.addEventListener("click", (event) => {
    const triggerEl = event.target.closest(".js-song-image, .js-song-title");
    if (!triggerEl) return;

    // Show controls if hidden
    const controlsEl = document.querySelector(".js-controls");
    if (controlsEl.hidden) {
      controlsEl.hidden = false;
    }

    const audioUrl = triggerEl.getAttribute("data-audio-url");
    const audioPlayer = document.querySelector(".js-audio-player");
    if (appStatus.song === audioUrl) {
      // Toggle play/pause if the same song is clicked
      // Update appStatus state
      appStatus.isPlaying = !appStatus.isPlaying;

      // Update audio player
      appStatus.isPlaying ? audioPlayer.play() : audioPlayer.pause();
    } else {
      // Play the selected song if it's different from the current one
      // Update appStatus state
      appStatus.isPlaying = true;
      appStatus.song = audioUrl;
      appStatus.songs = playlist.tracks.map((song) => song.audioUrl);
      appStatus.songsId = playlist.id;

      // Update audio player
      audioPlayer.src = audioUrl;
      audioPlayer.play();
    }

    // Update play/pause button state
    updatePlayPauseUI();
  });
}
