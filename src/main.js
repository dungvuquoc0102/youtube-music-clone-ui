import { controlsScript } from "./components/controls";
import defaultLayout from "./layouts/defaultLayout";
import router from "./router";
import "./style.css";

export const appStatus = {
  isPlaying: false,
  song: null,
  songs: [],
};

window.appStatus = appStatus;

async function app() {
  document.body.innerHTML = await defaultLayout();
  controlsScript();
  router();
}

app();
