import sidebar from "../components/sidebar";
import controls from "../components/controls";
import header from "../components/header";

export default function defaultLayout() {
  return `
<div class="flex h-dvh">
  ${sidebar()}
  ${controls()}
  <div>
    ${header()}
    <div class="pt-16">
      <main id="main-content">
        <!-- Main content will be rendered here -->
      </main>
    </div>
  </div>
</div>
  `;
}
