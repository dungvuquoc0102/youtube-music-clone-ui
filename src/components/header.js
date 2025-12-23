export default function header() {
  return /* html */ `
<header class="fixed top-0 left-0 right-0 h-16 flex items-center">
  <div class="h-16 w-60 flex items-center px-6">
      <span class="inline-block w-6 mr-5 fill-current">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M20 5H4a1 1 0 000 2h16a1 1 0 100-2Zm0 6H4a1 1 0 000 2h16a1 1 0 000-2Zm0 6H4a1 1 0 000 2h16a1 1 0 000-2Z"></path></svg>  
      </span>
      <span>
        <img src="/img/logo.svg" alt="Logo" class="h-6" />
      </span>
  </div>
  <div class="w-[calc(100%-240px)]">
    <div class="container mx-auto">
      <div class="flex items-center gap-4 py-2 mx-25 bg-[rgba(255,255,255,0.15)] border-2 rounded-lg border-[rgba(255,255,255,0.3)] px-4 w-120">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </span>
        <input type="text" placeholder="Search songs, albums, artists, podcasts" />
      </div>
    </div>
  </div>
  <div>
  </div>
</header>  
`;
}
