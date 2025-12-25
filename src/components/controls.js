import { appStatus, updatePlayPauseUI } from "../main";
import { formatTimeDigital } from "../utils/formatTime";

export default function controls() {
  // Step 1
  return /* html */ `
<div class="js-controls fixed z-[100] bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-gray-300" hidden>
  <div class="player-page">
  </div>
  <div class="player-bar flex gap-3">
    <div class="left-controls">
      <div class="left-controls-button flex">
        <span class="prev-button w-6 block cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M4 4a1 1 0 00-1 1v14a1 1 0 102 0V5a1 1 0 00-1-1Zm14.955.23L6 12.003l12.955 7.772A1.35 1.35 0 0021 18.617V5.387a1.35 1.35 0 00-2.045-1.157Z"></path></svg>
        </span>
        <span class="play-pause-button cursor-pointer">
          <span class="play-button w-6 block">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M5 4.623V19.38a1.5 1.5 0 002.26 1.29L22 12 7.26 3.33A1.5 1.5 0 005 4.623Z"></path></svg>
          </span>
          <span class="pause-button w-6 block hidden">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M6.5 3A1.5 1.5 0 005 4.5v15A1.5 1.5 0 006.5 21h2a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 008.5 3h-2Zm9 0A1.5 1.5 0 0014 4.5v15a1.5 1.5 0 001.5 1.5h2a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0017.5 3h-2Z"></path></svg>
          </span>
        </span>
        <span class="next-button w-6 block cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M20 20a1 1 0 001-1V5a1 1 0 00-2 0v14a1 1 0 001 1Zm-14.955-.226L18 12 5.045 4.228A1.35 1.35 0 003 5.386v13.23a1.35 1.35 0 002.045 1.158Z"></path></svg>
        </span>
      </div>
      <div class="js-time-info">
        <span class="current-time">0:00</span> / <span class="duration">0:00</span>
      </div>
    </div>
    <div class="center-controls">
      
    </div>
    <div class="right-controls">
    </div>
    <div class="slider">
      <audio class="js-audio-player" src=""></audio>
      <div class="js-slider-bar absolute top-0 left-0 right-0 bg-gray-300 h-[2px] cursor-pointer">
        <div class="js-slider-fill bg-(image:--paper-slider-active-color) h-1 w-0"></div>
      </div>
      <span class="js-current-time">0:00</span>
      <span class="js-slider-knob">●</span>
    </div>
  </div>
</div>
`;
}

export function controlsScript() {
  const audioPlayer = document.querySelector(".js-audio-player");

  const playButton = document.querySelector(".play-button");
  const pauseButton = document.querySelector(".pause-button");
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");

  playButton.addEventListener("click", () => {
    if (!appStatus.song) return;

    // Update appStatus state
    appStatus.isPlaying = true;

    // Update audio player
    audioPlayer.play();

    // Update UI
    updatePlayPauseUI();
  });

  pauseButton.addEventListener("click", () => {
    // Update appStatus state
    appStatus.isPlaying = false;

    // Update audio player
    audioPlayer.pause();

    // Update UI
    updatePlayPauseUI();
  });

  prevButton.addEventListener("click", () => {
    if (appStatus.songs.length === 0) return;

    // Update audio player
    appStatus.isPlaying = true;
    if (appStatus.song === null) {
      appStatus.song = appStatus.songs[0];
    } else {
      const currentIndex = appStatus.songs.findIndex(
        (song) => song === audioPlayer.src
      );
      appStatus.song =
        appStatus.songs[
          (currentIndex - 1 + appStatus.songs.length) % appStatus.songs.length
        ];
    }

    // Update audio player
    audioPlayer.src = appStatus.song;
    audioPlayer.play();

    // Update UI
    updatePlayPauseUI();
  });

  nextButton.addEventListener("click", () => {
    if (appStatus.songs.length === 0) return;

    // Update appStatus state
    appStatus.isPlaying = true;
    if (appStatus.song === null) {
      appStatus.song = appStatus.songs[0];
    } else {
      appStatus.song =
        appStatus.songs[
          (appStatus.songs.findIndex((song) => song === audioPlayer.src) + 1) %
            appStatus.songs.length
        ];
    }

    // Update audio player
    audioPlayer.src = appStatus.song;
    audioPlayer.play();

    // Update UI
    updatePlayPauseUI();
  });

  audioPlayer.addEventListener("timeupdate", () => {
    // Update current time display
    const currentTimeEl = document.querySelector(".js-time-info .current-time");
    currentTimeEl.textContent = formatTimeDigital(
      Math.floor(audioPlayer.currentTime)
    );

    // Update slider fill width
    const sliderFill = document.querySelector(".js-slider-fill");
    const sliderKnob = document.querySelector(".js-slider-knob");
    const sliderBar = document.querySelector(".js-slider-bar");
    const progressPercent =
      (audioPlayer.currentTime / audioPlayer.duration) * 100;
    sliderFill.style.width = `${progressPercent}%`;
    const sliderBarWidth = sliderBar.clientWidth;
    sliderKnob.style.left = `calc(${progressPercent}% - ${
      (progressPercent / 100) * sliderBarWidth
    }px)`;
  });

  audioPlayer.addEventListener("loadedmetadata", () => {
    const durationEl = document.querySelector(".js-time-info .duration");
    durationEl.textContent = formatTimeDigital(
      Math.floor(audioPlayer.duration)
    );
  });

  // js-slider-bar click to seek
  const sliderBar = document.querySelector(".js-slider-bar");
  sliderBar.addEventListener("click", (event) => {
    const rect = sliderBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const newTime = (clickX / rect.width) * audioPlayer.duration;
    audioPlayer.currentTime = newTime;
  });
}
