import explore from "./pages/explore";
import library from "./pages/library";
import upgrade from "./pages/upgrade";
import home, { homeScript } from "./pages/home";
import playlist, { playlistScript } from "./pages/playlist";
import Navigo from "navigo";
import notFound from "./pages/notFound";

export let routerInstance = null;

export default function router() {
  const router = new Navigo("/");
  routerInstance = router;
  router
    .on("/", () => {
      // Render HTML
      document.querySelector("#js-main-content").innerHTML = home();
      // Run JS
      homeScript();
    })
    .on("/explore", () => {
      document.querySelector("#js-main-content").innerHTML = explore();
    })
    .on("/library", () => {
      document.querySelector("#js-main-content").innerHTML = library();
    })
    .on("/upgrade", () => {
      document.querySelector("#js-main-content").innerHTML = upgrade();
    })
    .on("/playlists/:slug", async ({ data, params }) => {
      document.querySelector("#js-main-content").innerHTML = playlist();
      await playlistScript({ data, params });
    })
    .on("*", () => {
      document.querySelector("#app").innerHTML = notFound();
    });
  router.resolve();
}
