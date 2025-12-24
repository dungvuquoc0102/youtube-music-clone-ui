import sidebar from "../components/sidebar";
import controls from "../components/controls";
import header from "../components/header";

async function mainContent() {
  const response = await fetch(`/templates/mainContent.html`);
  const mainContentHTML = await response.text();
  return mainContentHTML;
}

export default async function defaultLayout() {
  const headerString = header();
  const controlsString = controls();
  const sidebarString = sidebar();
  const mainContentString = await mainContent();

  console.log(mainContentString);

  return /* html */ `
<div class="relative h-dvh">
  <!-- Bg -->
  <div class="bg-(image:--layout-background-image) bg-center bg-cover h-2/3"></div>
  <div class="bg-(image:--overlay-background-image) absolute top-0 left-0 w-full h-full"></div>
  <div class="flex absolute top-0 left-0 w-full h-full">
    ${sidebarString}
    ${headerString}
    ${controlsString}
    ${mainContentString}
  </div>
</div>
  `;
}
