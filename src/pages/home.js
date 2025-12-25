import instance from "../httpRequest";
import { routerInstance } from "../router";

export default function home() {
  // Step 1
  return /* html */ `
<div>
  <!-- Moods section -->
  <div class="js-moods flex gap-3 flex-wrap shadow-2xl pt-10 text-[14px]"></div>
  <!-- Albums for you section -->
  <div class="pt-10">
    <div class="text-[28px] font-semibold flex items-center justify-between">
      <span class="font-[var(--font-google)]">Albums for you</span>
      <div class="flex gap-4">
        <div class="flex items-center justify-center size-9 fill-current border-1 rounded-full cursor-pointer hover:bg-(--items-button-hover-background-color) border-(--items-button-border-color)">
          <div class="size-[18px]">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M13.793 5.293 7.086 12l6.707 6.707a1 1 0 101.414-1.414L9.914 12l5.293-5.293a1 1 0 10-1.414-1.414Z"></path></svg>
          </div>
        </div>
        <div class="flex items-center justify-center size-9 fill-current border-1 rounded-full cursor-pointer hover:bg-(--items-button-hover-background-color) border-(--items-button-border-color)">
          <div class="size-[18px]">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M8.793 5.293a1 1 0 000 1.414L14.086 12l-5.293 5.293a1 1 0 101.414 1.414L16.914 12l-6.707-6.707a1 1 0 00-1.414 0Z"></path></svg>
          </div>
        </div>
      </div>
    </div>
    <div class="js-albums flex gap-6 overflow-x-auto mt-4"></div>
  </div>
</div>
`;
}

export function homeScript() {
  async function fetchMoods() {
    // Step 2
    const response = await instance.get("/moods");
    const moods = response.data.items;

    // Step 3
    const moodsContainer = document.querySelector(".js-moods");
    moodsContainer.innerHTML = moods
      .map(
        (mood) => `
      <div>
        <span class="block px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] cursor-pointer" data-navigo>${mood.name}</span>
      </div>
    `
      )
      .join("");
  }

  async function fetchAlbums() {
    // Step 2
    const response = await instance.get("/home/albums-for-you");
    const albums = response.data;

    // Step 3
    const albumsContainer = document.querySelector(".js-albums");
    albumsContainer.innerHTML = albums
      .map(
        (album) => `
      <div class="flex flex-col gap-4 flex-shrink-0">
        <a href="/playlists/${album.slug}?type=album" data-navigo>
          <img src="${album.thumbnails[0]}" alt="${
          album.title
        }" class="size-55 object-cover rounded-lg" />
        </a>
        <div>
          <div>
            <a class="hover:underline" href="/playlists/${
              album.slug
            }?type=album" data-navigo>${album.title}</a>
          </div>
          <div class="text-(--text-secondary-color)">
            <span>${album.type[0].toUpperCase() + album.type.slice(1)}</span>
            <span> • </span>
            <a href="#!" class="cursor-pointer hover:underline">${album.artists.join(
              ", "
            )}</a>
          </div>
        </div>
      </div>
    `
      )
      .join("");

    // Cập nhật Navigo để nhận diện các links mới được render
    if (routerInstance) {
      routerInstance.updatePageLinks();
    }
  }

  fetchMoods();
  fetchAlbums();
}
