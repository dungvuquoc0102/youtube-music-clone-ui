export default function sidebar() {
  return /* html */ `
<nav class="js-sidebar fixed left-0 top-0 bottom-0 transition-transform transform -translate-x-full xl:translate-x-0 pt-18 bg-(--sidebar-background-color) w-(--sidebar-width) border-r-1 border-(--sidebar-border-right-color)">
  <div class="absolute top-0 left-0 right-0 h-16 flex items-center px-6"></div>
  <ul class="js-links not-only-of-type:flex flex-col px-2"></ul>
</nav>
`;
}

function setActiveLink(link, activeStatus) {
  if (activeStatus) {
    link.classList.add("!bg-(--items-background-color)");
    const divs = link.querySelectorAll("div");
    divs[0].classList.add("hidden");
    divs[1].classList.remove("hidden");
  } else {
    link.classList.remove("!bg-(--items-background-color)");
    const divs = link.querySelectorAll("div");
    divs[0].classList.remove("hidden");
    divs[1].classList.add("hidden");
  }
}

export function sidebarScript() {
  const path = window.location.pathname;

  const routes = [
    {
      text: "Home",
      href: "/",
      icon: /* html */ `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="m11.485 2.143-8 4.8-2 1.2a1 1 0 001.03 1.714L3 9.567V20a2 2 0 002 2h6v-7h2v7h6a2 2 0 002-2V9.567l.485.29a1 1 0 001.03-1.714l-2-1.2-8-4.8a1 1 0 00-1.03 0ZM5 8.366l7-4.2 7 4.2V20h-4v-5.5a1.5 1.5 0 00-1.5-1.5h-3A1.5 1.5 0 009 14.5V20H5V8.366Z"></path></svg>`,
      activeIcon: /* html */ `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="m11.485 2.143-8 4.8-2 1.2a1 1 0 001.03 1.714L3 9.567V20a2 2 0 002 2h5v-8h4v8h5a2 2 0 002-2V9.567l.485.29a1 1 0 001.03-1.714l-2-1.2-8-4.8a1 1 0 00-1.03 0Z"></path></svg>`,
    },
    {
      text: "Explore",
      href: "/explore",
      icon: /* html */ `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1Zm0 2a9 9 0 110 18.001A9 9 0 0112 3Zm3.73 2.775L9.028 7.604a2 2 0 00-1.405 1.412l-1.811 6.76a2 2 0 002.458 2.448l6.701-1.828a2 2 0 001.406-1.412l1.812-6.761a2.001 2.001 0 00-2.459-2.448ZM9.555 9.533l6.702-1.828-1.812 6.762-6.702 1.826 1.812-6.76Zm1.238 2.143a1.25 1.25 0 102.415.647 1.25 1.25 0 00-2.415-.647Z"></path></svg>`,
      activeIcon: /* html */ `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1Zm4.962 5.997a1 1 0 01.261.967l-1.812 6.762a1 1 0 01-.703.706L8.007 17.26a1 1 0 01-1.23-1.224l1.812-6.762a1 1 0 01.703-.706l6.701-1.828a1 1 0 01.969.257Zm-6.411 4.614a1.5 1.5 0 002.199 1.69 1.503 1.503 0 00.7-.911 1.501 1.501 0 10-2.899-.779Z"></path></svg>`,
    },
    {
      text: "Library",
      href: "/library",
      icon: /* html */ `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M19 2H5a2 2 0 00-2 2v16.887c0 1.266 1.382 2.048 2.469 1.399L12 18.366l6.531 3.919c1.087.652 2.469-.131 2.469-1.397V4a2 2 0 00-2-2ZM5 20.233V4h14v16.233l-6.485-3.89-.515-.309-.515.309L5 20.233Z"></path></svg>`,
      activeIcon: /* html */ `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M19 2H5a2 2 0 00-2 2v16.887c0 1.266 1.382 2.048 2.469 1.399L12 18.366l6.531 3.919c1.087.652 2.469-.131 2.469-1.397V4a2 2 0 00-2-2Z"></path></svg>`,
    },
    {
      text: "Upgrade",
      href: "/upgrade",
      icon: /* html */ `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1Zm0 2a9 9 0 110 18.001A9 9 0 0112 3Zm0 2.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13ZM12 7a5 5 0 110 10 5 5 0 010-10Zm3 5-5-3v6l5-3Z"></path></svg>`,
      activeIcon: /* html */ `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1Zm0 3.5a7.5 7.5 0 110 15 7.5 7.5 0 010-15ZM12 6a6 6 0 100 12 6 6 0 000-12Zm-2 9V9l5 3-5 3Z"></path></svg>`,
    },
  ];

  const linksElement = document.querySelector(".js-links");

  linksElement.innerHTML = routes
    .map(
      (route) => /* html */ `
    <li>
      <a class="flex items-center px-4 rounded-lg min-h-12 hover:bg-(--items-hover-background-color) ${
        route.href === path ? "!bg-(--items-background-color)" : ""
      }" href="${route.href}" data-navigo>
        <div class="w-6 mr-5 fill-current ${
          route.href === path ? "hidden" : ""
        }">
          ${route.icon}
        </div>
        <div class="w-6 mr-5 fill-current ${
          route.href === path ? "" : "hidden"
        }">
          ${route.activeIcon}
        </div>
        <span>${route.text}</span>
      </a>
    </li>
    `
    )
    .join("");

  const links = document.querySelectorAll(".js-links a");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      links.forEach((l) => {
        setActiveLink(l, false);
      });
      setActiveLink(link, true);
    });
  });
}
