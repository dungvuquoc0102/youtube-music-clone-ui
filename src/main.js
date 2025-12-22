import { controlsScript } from "./components/controls";
import defaultLayout from "./layouts/DefaultLayout";
import router from "./router";
import "./style.css";
try {
  document.querySelector("#app").innerHTML = defaultLayout();
  router();
  controlsScript();
} catch (error) {}
