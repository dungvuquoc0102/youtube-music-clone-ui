import defaultLayout, { defaultLayoutScript } from "./layouts/defaultLayout";
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
