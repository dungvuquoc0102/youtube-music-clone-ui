import instance from "../httpRequest";

export default function album() {
  // Step 1
  return /* html */ `
<div>
  <div class="js-songs flex gap-3"></div>
  <div class="js-song-detail"></div>
</div>
`;
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
        const audioSrc = songDetailEl.dataset.audioUrl;
        const audioPlayer = document.querySelector(".js-audio-player");
        audioPlayer.src = audioSrc;
        audioPlayer.play();

        // Update play/pause button state
        const playButton = document.querySelector(".play-button");
        const pauseButton = document.querySelector(".pause-button");
        playButton.classList.add("hidden");
        pauseButton.classList.remove("hidden");

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
      }
    });
  }
  fetchSongs();
}
