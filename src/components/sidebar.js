import router from "../router";

export default function sidebar() {
  return /* html */ `
<nav class="fixed left-0 top-0 bottom-0 bg-(--sidebar-background-color) w-60 border-r-2 border-(--sidebar-border-right-color) pt-18">
  <div class="absolute top-0 left-0 right-0 h-16 flex items-center px-6">
      <span class="inline-block w-6 mr-5 fill-current">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M20 5H4a1 1 0 000 2h16a1 1 0 100-2Zm0 6H4a1 1 0 000 2h16a1 1 0 000-2Zm0 6H4a1 1 0 000 2h16a1 1 0 000-2Z"></path></svg>  
      </span>
      <span>
        <img src="/img/logo.svg" alt="Logo" class="h-6" />
      </span>
  </div>
  <ul class="flex flex-col px-2">
    <li>
      <a class="block px-4 rounded-lg min-h-12" href="/" data-navigo>
        <span class="inline-block w-6 mr-5 fill-current">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="m11.485 2.143-8 4.8-2 1.2a1 1 0 001.03 1.714L3 9.567V20a2 2 0 002 2h5v-8h4v8h5a2 2 0 002-2V9.567l.485.29a1 1 0 001.03-1.714l-2-1.2-8-4.8a1 1 0 00-1.03 0Z"></path></svg>
        </span>
        <span>Home</span>
      </a>
    </li>
    <li>
      <a class="block px-4 rounded-lg min-h-12" href="/explore" data-navigo>
        <span class="inline-block w-6 mr-5 fill-current">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1Zm0 2a9 9 0 110 18.001A9 9 0 0112 3Zm3.73 2.775L9.028 7.604a2 2 0 00-1.405 1.412l-1.811 6.76a2 2 0 002.458 2.448l6.701-1.828a2 2 0 001.406-1.412l1.812-6.761a2.001 2.001 0 00-2.459-2.448ZM9.555 9.533l6.702-1.828-1.812 6.762-6.702 1.826 1.812-6.76Zm1.238 2.143a1.25 1.25 0 102.415.647 1.25 1.25 0 00-2.415-.647Z"></path></svg>
        </span>
        <span>Explore</span>
      </a>
      </li>
    <li>
      <a class="block px-4 rounded-lg min-h-12" href="/library" data-navigo>
        <span class="inline-block w-6 mr-5 fill-current">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M19 2H5a2 2 0 00-2 2v16.887c0 1.266 1.382 2.048 2.469 1.399L12 18.366l6.531 3.919c1.087.652 2.469-.131 2.469-1.397V4a2 2 0 00-2-2ZM5 20.233V4h14v16.233l-6.485-3.89-.515-.309-.515.309L5 20.233Z"></path></svg>
        </span>
        <span>Library</span>
      </a>
    </li>
    <li>
      <a class="block px-4 rounded-lg min-h-12" href="/upgrade" data-navigo>
        <span class="inline-block w-6 mr-5 fill-current">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1Zm0 2a9 9 0 110 18.001A9 9 0 0112 3Zm0 2.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13ZM12 7a5 5 0 110 10 5 5 0 010-10Zm3 5-5-3v6l5-3Z"></path></svg>
        </span>
        <span>
          Upgrade
        </span>
        </a>
    </li>
  </ul>
</nav>`;
}

function sidebarScript() {}
