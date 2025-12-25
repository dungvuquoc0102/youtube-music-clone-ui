import { appStatus, updatePlayPauseUI } from "../main";
import { formatTimeDigital } from "../utils/formatTime";

export default function controls() {
  // Step 1
  return /* html */ `
<div class="fixed js-controls group bg-(--controls-background-color) z-[100] bottom-0 left-0 right-0 h-18">
  <div class="player-page">
  </div>
  <div class="player-bar flex gap-3 pt-1 h-full">
    <div class="left-controls flex items-center gap-4 w-[20%] pl-4">
      <div class="left-controls-button flex items-center gap-2">
        <span class="prev-button size-9 hover:bg-(--items-button-hover-background-color) flex items-center justify-center rounded-full cursor-pointer">
          <span class="w-6 fill-current">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M4 4a1 1 0 00-1 1v14a1 1 0 102 0V5a1 1 0 00-1-1Zm14.955.23L6 12.003l12.955 7.772A1.35 1.35 0 0021 18.617V5.387a1.35 1.35 0 00-2.045-1.157Z"></path></svg>
          </span>
        </span>
        <span class="play-pause-button cursor-pointer size-13 hover:bg-(--items-button-hover-background-color) rounded-full flex items-center justify-center">
          <span class="play-button fill-current size-10 block">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M5 4.623V19.38a1.5 1.5 0 002.26 1.29L22 12 7.26 3.33A1.5 1.5 0 005 4.623Z"></path></svg>
          </span>
          <span class="pause-button fill-current size-10 block hidden">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M6.5 3A1.5 1.5 0 005 4.5v15A1.5 1.5 0 006.5 21h2a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 008.5 3h-2Zm9 0A1.5 1.5 0 0014 4.5v15a1.5 1.5 0 001.5 1.5h2a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0017.5 3h-2Z"></path></svg>
          </span>
        </span>
        <span class="next-button size-9 hover:bg-(--items-button-hover-background-color) flex items-center justify-center rounded-full cursor-pointer">
          <span class="w-6 fill-current">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M20 20a1 1 0 001-1V5a1 1 0 00-2 0v14a1 1 0 001 1Zm-14.955-.226L18 12 5.045 4.228A1.35 1.35 0 003 5.386v13.23a1.35 1.35 0 002.045 1.158Z"></path></svg>
          </span>
        </span>
      </div>
      <div class="js-time-info text-xs text-(--text-secondary-color)">
        <span class="current-time">0:00</span> / <span class="duration">0:00</span>
      </div>
    </div>
    <div class="js-center-controls w-[60%]"></div>
    <div class="right-controls flex items-center gap-1 w-[20%] justify-end pr-4">
      <!-- Volume icon -->
      <div class="size-9 hover:bg-(--items-button-hover-background-color) flex items-center justify-center rounded-full cursor-pointer">
        <div class="size-6 fill-current">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M11.485 2.143 3.913 6.687A6 6 0 001 11.832v.338a6 6 0 002.913 5.144l7.572 4.543A1 1 0 0013 21V3a1.001 1.001 0 00-1.515-.857Zm6.88 2.079a1 1 0 00-.001 1.414 9 9 0 010 12.728 1 1 0 001.414 1.414 11 11 0 000-15.556 1 1 0 00-1.413 0ZM4.941 8.402l.001-.002L11 4.767v14.466l-6.058-3.635A4 4 0 013 12.168v-.337a4 4 0 011.941-3.429ZM15.535 7.05a1 1 0 000 1.415 5 5 0 010 7.07 1 1 0 001.415 1.415 6.999 6.999 0 000-9.9 1 1 0 00-1.415 0Z"></path></svg>
        </div>
      </div>
      <!-- Repeat icon -->
      <div class="size-9 hover:bg-(--items-button-hover-background-color) flex items-center justify-center rounded-full cursor-pointer">
        <div class="size-6 fill-current">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M17.293 1.293a1 1 0 000 1.415L18.586 4H7a5 5 0 00-5 5v4a1 1 0 102 0V9a3 3 0 013-3h11.586l-1.293 1.293a1 1 0 001.414 1.415L22.414 5l-3.707-3.707a1 1 0 00-1.414 0ZM21 10a1 1 0 00-1 1v4a3 3 0 01-3 3H5.414l1.293-1.292a1.001 1.001 0 00-1.414-1.415L1.586 19l3.707 3.707a1 1 0 101.414-1.413L5.414 20H17a5 5 0 005-5v-4a1 1 0 00-1-1Z"></path></svg>
        </div>
      </div>
      <!-- Shuffle icon -->
      <div class="size-9 hover:bg-(--items-button-hover-background-color) flex items-center justify-center rounded-full cursor-pointer">
        <div class="size-6 fill-current">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M16.293 1.293a1 1 0 00-.001 1.415L18.585 5H17.21a7 7 0 00-5.823 3.118L6.95 14.774A5 5 0 012.79 17H2a1 1 0 000 2h.79a7 7 0 005.822-3.117l4.438-6.656A5 5 0 0117.21 7h1.376l-2.293 2.293a1 1 0 001.414 1.414L22.414 6l-4.707-4.707a1 1 0 00-1.414 0ZM2.789 5H2a1 1 0 000 2h.79a5 5 0 014.159 2.227l.647.97 1.202-1.802-.185-.277A7 7 0 002.789 5Zm13.504 8.293a1 1 0 00-.001 1.414L18.585 17H17.21a5 5 0 01-4.16-2.226l-.648-.972-1.202 1.803.186.278A7 7 0 0017.21 19h1.376l-2.293 2.294-.068.076a1 1 0 001.406 1.406l.076-.07L22.414 18l-4.707-4.707a1 1 0 00-1.414 0Z"></path></svg>
        </div>
      </div>
      <!-- Dropdown arrow icon -->
      <div class="size-9 hover:bg-(--items-button-hover-background-color) flex items-center justify-center rounded-full cursor-pointer">
        <div class="size-6 fill-current">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M4.135 7a1 1 0 00-.768 1.64L12 19l8.633-10.36A1 1 0 0019.865 7H4.135Z"></path></svg>
        </div>
      </div>
    </div>
    <div class="slider">
      <audio class="js-audio-player" src=""></audio>
      <div class="absolute js-slider-bar -top-3 left-0 right-0 py-3 cursor-pointer group/progress">
        <!-- Slider background -->
        <div class="js-slider-background relative bg-(--controls-progress-background-color) h-[2px]">
          <!-- Slider background hover -->
          <div class="absolute inset-0 bg-(--controls-progress-background-color) h-[4px] opacity-0 group-hover/progress:opacity-100 group-hover/progress:top-[-1px]"></div>
          <!-- Slider fill -->
          <div class="absolute js-slider-fill bg-(image:--paper-slider-active-color) w-0 h-[2px] group-hover/progress:h-1 group-hover/progress:top-[-1px]"></div>
        </div>
        <!-- Time info -->
        <div class="absolute -top-5 js-current-time hidden group-hover/progress:block text-[12px] bg-(--controls-background-color) px-2 py-1 rounded-xs">00:00</div>
        <!-- Slider knob -->
        <div class="absolute top-[6px] js-slider-knob transition-transform duration-200 ease-in-out size-[14px] bg-(--controls-button-hover-background-color) rounded-full hidden group-hover:block"></div>
      </div>
    </div>
  </div>
</div>
`;
}

export function controlsScript() {
  // Call all sub-scripts
  leftControlsScript();
  progressBarScript();
  centerControlsScript();
  rightControlsScript();
}

function leftControlsScript() {
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
    if (
      !appStatus.songs ||
      !appStatus.songs.tracks ||
      appStatus.songs.tracks.length === 0
    )
      return;

    // Update appStatus state
    appStatus.isPlaying = true;
    if (appStatus.song === null) {
      appStatus.song = appStatus.songs.tracks[0];
    } else {
      const currentIndex = appStatus.songs.tracks.findIndex(
        (song) => song.id === appStatus.song.id
      );
      appStatus.song =
        appStatus.songs.tracks[
          (currentIndex - 1 + appStatus.songs.tracks.length) %
            appStatus.songs.tracks.length
        ];
    }

    // Update audio player
    audioPlayer.src = appStatus.song.audioUrl;
    audioPlayer.play();

    // Update UI
    updatePlayPauseUI();
  });

  nextButton.addEventListener("click", () => {
    if (
      !appStatus.songs ||
      !appStatus.songs.tracks ||
      appStatus.songs.tracks.length === 0
    )
      return;

    // Update appStatus state
    appStatus.isPlaying = true;
    if (appStatus.song === null) {
      appStatus.song = appStatus.songs.tracks[0];
    } else {
      const currentIndex = appStatus.songs.tracks.findIndex(
        (song) => song.id === appStatus.song.id
      );
      appStatus.song =
        appStatus.songs.tracks[
          (currentIndex + 1) % appStatus.songs.tracks.length
        ];
    }

    // Update audio player
    audioPlayer.src = appStatus.song.audioUrl;
    audioPlayer.play();

    // Update UI
    updatePlayPauseUI();
  });

  // Audio ended event to play next song automatically
  audioPlayer.addEventListener("ended", () => {
    nextButton.click();
  });
}

function progressBarScript() {
  const audioPlayer = document.querySelector(".js-audio-player");
  const sliderBar = document.querySelector(".js-slider-bar");
  const sliderKnob = document.querySelector(".js-slider-knob");
  const sliderFill = document.querySelector(".js-slider-fill");
  const currentTimeHover = document.querySelector(".js-current-time");

  // Update time and slider on audio timeupdate
  audioPlayer.addEventListener("timeupdate", () => {
    // Update current time display
    const currentTimeEl = document.querySelector(".js-time-info .current-time");
    currentTimeEl.textContent = formatTimeDigital(
      Math.floor(audioPlayer.currentTime)
    );

    // Update slider fill width
    const progressPercent =
      (audioPlayer.currentTime / audioPlayer.duration) * 100;
    sliderFill.style.width = `${progressPercent}%`;

    // Update knob position
    sliderKnob.style.left = `calc(${progressPercent}% - 7px)`;
  });

  // Update duration on loadedmetadata
  audioPlayer.addEventListener("loadedmetadata", () => {
    const durationEl = document.querySelector(".js-time-info .duration");
    durationEl.textContent = formatTimeDigital(
      Math.floor(audioPlayer.duration)
    );
  });

  // Click to seek
  sliderBar.addEventListener("click", (event) => {
    const rect = sliderBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const newTime = (clickX / rect.width) * audioPlayer.duration;
    audioPlayer.currentTime = newTime;
  });

  // Hover to show current time
  sliderBar.addEventListener("mousemove", (event) => {
    const rect = sliderBar.getBoundingClientRect();
    const hoverX = event.clientX - rect.left;
    const hoverTime = (hoverX / rect.width) * audioPlayer.duration;
    currentTimeHover.textContent = formatTimeDigital(Math.floor(hoverTime));

    // Transform position
    let leftPos = hoverX - currentTimeHover.clientWidth / 2;
    if (leftPos < 0) leftPos = 0;
    if (leftPos + currentTimeHover.clientWidth > rect.width) {
      leftPos = rect.width - currentTimeHover.clientWidth;
    }
    currentTimeHover.style.left = `${leftPos}px`;
  });

  sliderBar.addEventListener("mouseleave", () => {
    currentTimeHover.textContent = "00:00";
    currentTimeHover.style.left = `0px`;
  });

  // Drag to seek
  let isDragging = false;
  sliderBar.addEventListener("mousedown", (event) => {
    isDragging = true;
    sliderBar.classList.add("cursor-grabbing");
  });

  window.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      sliderBar.classList.remove("cursor-grabbing");
      // When drop, knob scale down to 1, delay 2s for hide
      sliderKnob.classList.remove("scale-125");
      setTimeout(() => {
        sliderKnob.classList.add("hidden");
      }, 2000);
    }
  });

  window.addEventListener("mousemove", (event) => {
    if (isDragging) {
      const rect = sliderBar.getBoundingClientRect();
      const dragX = event.clientX - rect.left;
      let newTime = (dragX / rect.width) * audioPlayer.duration;
      if (newTime < 0) newTime = 0;
      if (newTime > audioPlayer.duration) newTime = audioPlayer.duration;
      audioPlayer.currentTime = newTime;

      // When drag, knob show + scale up
      sliderKnob.classList.remove("hidden");
      sliderKnob.classList.add("scale-125");
    }
  });
}

function centerControlsScript() {
  const centerControls = document.querySelector(".js-center-controls");
  if (!appStatus.song) {
    centerControls.innerHTML = "";
    return;
  }

  const song = appStatus.song;
  centerControls.innerHTML = /* html */ `
      <div class="flex items-center gap-3 w-full">
        <!-- Thumbnail -->
        <div class="flex-shrink-0">
          <img src="${song.thumbnails[0]}" alt="${
    song.title
  }" class="size-12 object-cover rounded" />
        </div>
        
        <!-- Song info -->
        <div class="flex-1 min-w-0">
          <!-- Song title -->
          <div class="text-sm font-medium truncate">
            ${song.title}
          </div>
          <!-- Artists, views, likes -->
          <div class="text-xs text-(--text-secondary-color) flex items-center gap-1 truncate">
            <span class="hover:underline cursor-pointer">${
              song.artists?.join(", ") || "Unknown Artist"
            }</span>
            <span>•</span>
            <span>1.2M views</span>
            <span>•</span>
            <span>45K likes</span>
          </div>
        </div>
        
        <!-- Action buttons -->
        <div class="flex items-center gap-1 flex-shrink-0">
          <!-- Unlike button -->
          <div class="size-9 hover:bg-(--items-button-hover-background-color) flex items-center justify-center rounded-full cursor-pointer">
            <div class="size-6 fill-current">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11v10h10c.67 0 1.24-.4 1.5-1.01l2.5-6.5c.08-.21.12-.43.12-.66V12c0-.55-.45-1-1-1zm-13.5 0H2c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h3.27c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1z"></path></svg>
            </div>
          </div>
          <!-- Like button -->
          <div class="size-9 hover:bg-(--items-button-hover-background-color) flex items-center justify-center rounded-full cursor-pointer">
            <div class="size-6 fill-current">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M5.23 11h4.23l-1.52-4.94A1.998 1.998 0 019.46 4c.58 0 1.14.24 1.52.65L17 11v10H7c-.67 0-1.24-.4-1.5-1.01l-2.5-6.5a2.015 2.015 0 01-.12-.66V12c0-.55.45-1 1-1zm13.5 0H22c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1h-3.27c-.55 0-1-.45-1-1v-8c0-.55.45-1 1-1z"></path></svg>
            </div>
          </div>
          <!-- More options (3 dots) -->
          <div class="size-9 hover:bg-(--items-button-hover-background-color) flex items-center justify-center rounded-full cursor-pointer">
            <div class="size-6 fill-current">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path></svg>
            </div>
          </div>
        </div>
      </div>
    `;

  // Listen to changes in appStatus.song
  // We can use a MutationObserver or custom event, but for simplicity,
  // we'll update it when play/pause/next/prev happens
  // For now, let's create a global update function
}

function rightControlsScript() {}
