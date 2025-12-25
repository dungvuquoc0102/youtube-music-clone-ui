import instance from "../httpRequest";
import { appStatus } from "../main";

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

function togglePlayPauseButtons(isPlaying) {
  console.log(isPlaying);

  const playButton = document.querySelector(".play-button");
  const pauseButton = document.querySelector(".pause-button");
  if (isPlaying) {
    playButton.classList.add("hidden");
    pauseButton.classList.remove("hidden");
  } else {
    playButton.classList.remove("hidden");
    pauseButton.classList.add("hidden");
  }
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

function formatTimeText(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours} hours ${minutes} minutes`;
  } else if (minutes > 0) {
    return `${minutes} minutes`;
  } else {
    return `${seconds} seconds`;
  }
}

function formatTimeDigital(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (num) => String(num).padStart(2, "0");

  if (hours > 0) {
    // Định dạng hh:mm:ss -> 01:05:09
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  } else if (minutes > 0) {
    // Định dạng mm:ss -> 05:09
    return `${pad(minutes)}:${pad(seconds)}`;
  } else {
    // Định dạng 00:ss -> 00:09
    return `00:${pad(seconds)}`;
  }
}

function songs(songs) {
  return /* html */ `
<div class="p-8 space-y-4">
  ${songs
    .map(
      (song, index) => `
    <div class="flex items-center justify-between hover:bg-[rgba(255,255,255,0.1)] rounded-lg p-4 cursor-pointer js-playlist-detail" data-audio-url=${
      song.audioUrl
    }>
      <div class="flex items-center gap-4">
        <div>
          <img src="${song.thumbnails[0]}" alt="${
        song.title
      }" class="w-12 h-12 object-cover rounded-lg" />
        </div>
        <div>
          <div class="text-white font-medium">${song.title}</div>
          <div class="text-(--text-secondary-color) text-sm">${song.artists.join(
            ", "
          )}</div>
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
  songsContainer.innerHTML = songs(playlist.tracks);

  songsContainer.addEventListener("click", (event) => {
    const songDetailEl = event.target.closest(".js-playlist-detail");
    if (songDetailEl) {
      const controlsEl = document.querySelector(".js-controls");
      if (controlsEl.hidden) {
        controlsEl.hidden = false;
      } // if this song same as current song => play -> pause and pause -> play
      const audioUrl = songDetailEl.getAttribute("data-audio-url");
      if (appStatus.song === audioUrl) {
        const audioPlayer = document.querySelector(".js-audio-player");
        if (appStatus.isPlaying) {
          audioPlayer.pause();
        } else {
          audioPlayer.play();
        }
        appStatus.isPlaying = !appStatus.isPlaying;
      } else {
        appStatus.song = audioUrl;
        appStatus.isPlaying = true;
        const audioPlayer = document.querySelector(".js-audio-player");
        audioPlayer.src = audioUrl;
        audioPlayer.play();

        // Update duration display
        audioPlayer.addEventListener("loadedmetadata", () => {
          const durationEl = document.querySelector(".js-time-info .duration");
          const totalDuration = Math.floor(audioPlayer.duration);
          const minutes = Math.floor(totalDuration / 60);
          const seconds = totalDuration % 60;
          durationEl.textContent = `${minutes}:${
            seconds < 10 ? "0" : ""
          }${seconds}`;
        });

        // Update appStatus.songs
        appStatus.songs = playlist.tracks.map((song) => song.audioUrl);
      }
      // Update play/pause button state
      togglePlayPauseButtons(appStatus.isPlaying);
    }
  });
}
