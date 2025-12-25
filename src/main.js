import defaultLayout, { defaultLayoutScript } from "./layouts/defaultLayout";
import router from "./router";
import "./style.css";

export const appStatus = {
  isPlaying: false,
  song: null,
  songs: [],
  songsId: null,
};

window.appStatus = appStatus;

export function updatePlayPauseUI() {
  // Controls
  const playButton = document.querySelector(".play-button");
  const pauseButton = document.querySelector(".pause-button");
  if (appStatus.isPlaying) {
    playButton.classList.add("hidden");
    pauseButton.classList.remove("hidden");
  } else {
    playButton.classList.remove("hidden");
    pauseButton.classList.add("hidden");
  }
  // Playlist icon
  const songItems = document.querySelectorAll(".js-song-image");
  songItems.forEach((item) => {
    const audioUrl = item.getAttribute("data-audio-url");
    const playBtn = item.querySelector(".js-play-button > div:first-child");
    const pauseBtn = item.querySelector(".js-play-button > div:last-child");
    if (audioUrl === appStatus.song) {
      if (appStatus.isPlaying) {
        playBtn.classList.add("hidden");
        pauseBtn.classList.remove("hidden");
      } else {
        playBtn.classList.remove("hidden");
        pauseBtn.classList.add("hidden");
      }
    } else {
      playBtn.classList.remove("hidden");
      pauseBtn.classList.add("hidden");
    }
  });
  // Playlist overplay img
  const songItemButtons = document.querySelectorAll(".js-play-button");
  songItemButtons.forEach((button) => {
    const audioUrl = button
      .closest(".js-song-image")
      .getAttribute("data-audio-url");
    if (audioUrl === appStatus.song) {
      button.classList.remove("hidden");
      button.classList.add("flex");
    } else {
      button.classList.add("hidden");
      button.classList.remove("flex");
    }
  });
  // Playlist item background
  const songItemsContainer = document.querySelectorAll(".js-song-item");
  songItemsContainer.forEach((item) => {
    const audioUrl = item
      .querySelector(".js-song-image")
      .getAttribute("data-audio-url");
    if (audioUrl === appStatus.song) {
      item.classList.add("bg-(--song-active-background-color)");
    } else {
      item.classList.remove("bg-(--song-active-background-color)");
    }
  });
}

async function app() {
  const appEl = document.querySelector("#app");
  appEl.innerHTML = await defaultLayout();
  defaultLayoutScript();
  router();
  document.addEventListener(
    "error",
    function (e) {
      if (e.target.tagName.toLowerCase() === "img") {
        const placeholder = "/img/placeholder.jpg";
        if (e.target.src !== placeholder) {
          e.target.src = placeholder;
        }
      }
    },
    true
  );
}

app();
