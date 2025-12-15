import instance from "../httpRequest";

export default function home() {
  // Step 1
  return `
<div>
  <div class="js-moods flex gap-3">

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
        <a href="/moods/${mood.slug}" data-navigo>${mood.name}</a>
      </div>
    `
      )
      .join("");
  }
  fetchMoods();
}
