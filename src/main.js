import defaultLayout from "./layouts/DefaultLayout";
import router from "./router";
import "./style.css";

document.querySelector("#app").innerHTML = defaultLayout();
router();
