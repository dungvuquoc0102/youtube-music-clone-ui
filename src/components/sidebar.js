import router from "../router";

export default function sidebar() {
  return `
<nav class="bg-black w-60 border-r-2 border-gray-500 h-dvh text-white">
  <ul>
    <li><a href="/" data-navigo>Home</a></li>
    <li><a href="/explore" data-navigo>Explore</a></li>
    <li><a href="/library" data-navigo>Library</a></li>
    <li><a href="/upgrade" data-navigo>Upgrade</a></li>
  </ul>
</nav>`;
}
