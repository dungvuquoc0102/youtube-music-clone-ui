import explore from "./pages/explore";
import home, { homeScript } from "./pages/home";
import album, { albumScript } from "./pages/album";
import Navigo from "navigo";

export default function router() {
  const router = new Navigo("/");
  router
    .on("/", () => {
      // Render HTML
      document.querySelector("#main-content").innerHTML = home();
      // Run JS
      homeScript();
    })
    .on("/explore", () => {
      document.querySelector("#main-content").innerHTML = explore();
    })
    .on("/moods/:slug", ({ data }) => {
      const slug = data.slug;
      console.log(slug);
    })
    .on("/albums/:slug", ({ data }) => {
      document.querySelector("#main-content").innerHTML = album();
      const slug = data.slug;
      albumScript(slug);
    });
  router.resolve();
}
