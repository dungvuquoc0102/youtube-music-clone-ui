import instance from "../httpRequest";

export default function home() {
  // Step 1
  return /* html */ `
<div>
  <div class="js-moods flex gap-3"></div>
  <div class="js-albums flex gap-3 flex-wrap shadow-2xl p-4 m-4"></div>
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
        <a href="/moods/${mood.slug}" data-navigo>${mood.name}</a>
      </div>
    `
      )
      .join("");
  }

  async function fetchAlbums() {
    // Step 2
    const response = await instance.get("/home/albums-for-you");
    console.log(response);
    const albums = response.data;

    // Step 3
    const albumsContainer = document.querySelector(".js-albums");
    albumsContainer.innerHTML = albums
      .map(
        (album) => `
      <div>
        <a class="hover:underline" href="/albums/${album.slug}" data-navigo>${album.title}</a>
      </div>
    `
      )
      .join("");
  }

  fetchMoods();
  fetchAlbums();
}
