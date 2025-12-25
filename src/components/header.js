export default function header() {
  return /* html */ `
<header class="fixed z-[100] top-0 left-0 right-0 h-16 flex items-center border-b-1 border-b-transparent">
  <!-- Left section -->
  <div class="h-16 w-60 flex items-center px-4">
      <div class="flex items-center justify-center hover:bg-(--items-button-hover-background-color) size-10 rounded-full mr-5">
        <span class="inline-block w-6 fill-current cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M20 5H4a1 1 0 000 2h16a1 1 0 100-2Zm0 6H4a1 1 0 000 2h16a1 1 0 000-2Zm0 6H4a1 1 0 000 2h16a1 1 0 000-2Z"></path></svg>  
        </span>
      </div>
      <a href="/" data-navigo>
        <img src="/img/logo.svg" alt="Logo" class="h-6" />
      </a>
  </div>
  <!-- Center section -->
  <div class="w-[calc(100%-240px)] flex justify-center items-center relative">
    <div class="container mx-auto">
      <div class="mx-25 flex">
        <!-- Search box -->
        <div class="py-2 flex-1">
          <div class="flex items-center bg-[rgba(255,255,255,0.1)] border-1 rounded-lg border-[rgba(255,255,255,0.3)] w-120 text-(--search-box-text-color)">
            <span class="px-4 py-3 fill-current">
              <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 18 18" width="18" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M8.25 1.5a6.75 6.75 0 104.232 12.007.8.8 0 00.113.148l2.625 2.625.056.052a.75.75 0 001.056-1.056l-.052-.056-2.625-2.625a.8.8 0 00-.148-.113A6.75 6.75 0 008.25 1.5Zm0 1.5a5.25 5.25 0 110 10.5 5.25 5.25 0 010-10.5Z"></path></svg>
              </span>
            <input class="flex-1 text-white self-stretch outline-hidden placeholder:text-(--search-box-text-color)" type="text" placeholder="Search songs, albums, artists, podcasts" />
          </div>
        </div>
        <!-- User actions -->
        <div class="flex items-center ml-auto space-x-6 absolute right-25 top-1/2 transform -translate-y-1/2 ">
          <div class="inline-block w-6 h-6 fill-current cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M21 3H3a2 2 0 00-2 2v3c.67 0 1.337.051 2 .153V5h18v14h-7.153c.1.653.152 1.32.153 2h7a2 2 0 002-2V5a2 2 0 00-2-2ZM1 10v2a9 9 0 019 9h2A11 11 0 001 10Zm0 4v2a5 5 0 015 5h2a7 7 0 00-7-7Zm0 4v3h3a3.003 3.003 0 00-3-3Z"></path></svg>
          </div>
          <div class="cursor-pointer">
            <img src="/img/avatar.jpg" alt="User Avatar" class="size-7 rounded-full object-cover" />
          </div>
        </div>                    
      </div>
    </div>
  </div>
</header>  
`;
}

export function headerScript() {
  const wrapperEl = document.querySelector(".js-main-wrapper");
  wrapperEl.addEventListener("scroll", (event) => {
    const headerEl = document.querySelector("header");
    if (wrapperEl.scrollTop > 0) {
      headerEl.classList.add(
        "bg-(--header-background-color)",
        "border-b-(--header-border-bottom-color)"
      );
      headerEl.classList.remove("border-b-transparent");
    } else {
      headerEl.classList.remove(
        "bg-(--header-background-color)",
        "border-b-(--header-border-bottom-color)"
      );
      headerEl.classList.add("border-b-transparent");
    }
  });
}
