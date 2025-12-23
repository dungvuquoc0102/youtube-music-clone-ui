import instance from "../httpRequest";
import { appStatus } from "../main";

export default function album() {
  // Step 1
  return /* html */ `
<div>
  <div class="js-songs flex gap-3"></div>
  <div class="js-song-detail"></div>
</div>
`;
}

function togglePlayPauseButtons(isPlaying) {
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

export function albumScript(slug) {
  async function fetchSongs() {
    // Step 2
    const response = await instance.get(`albums/details/${slug}`);

    const songs = response.data.tracks;

    // Step 3
    const songsContainer = document.querySelector(".js-songs");
    songsContainer.innerHTML = songs
      .map(
        (song) => `
        <div class="js-song-detail cursor-pointer" data-audio-url=${song.audioUrl}>${song.title}</div>
    `
      )
      .join("");

    // Step 4: Add event listeners to each song detail

    const songListEl = document.querySelector(".js-songs");
    songListEl.addEventListener("click", (event) => {
      const songDetailEl = event.target.closest(".js-song-detail");
      if (songDetailEl) {
        // if this song same as current song => play -> pause and pause -> play
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
            const durationEl = document.querySelector(
              ".js-time-info .duration"
            );
            const totalDuration = Math.floor(audioPlayer.duration);
            const minutes = Math.floor(totalDuration / 60);
            const seconds = totalDuration % 60;
            durationEl.textContent = `${minutes}:${
              seconds < 10 ? "0" : ""
            }${seconds}`;
          });

          // Update appStatus.songs
          appStatus.songs = songs.map((song) => song.audioUrl);
        }
        // Update play/pause button state
        togglePlayPauseButtons(appStatus.isPlaying);
      }
    });
  }
  fetchSongs();
}
