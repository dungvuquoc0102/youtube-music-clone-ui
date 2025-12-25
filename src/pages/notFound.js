export default function notFound() {
  return /* html */ `
<div class="flex flex-col items-center justify-center h-full text-center gap-6 p-8">
  <div class="text-6xl font-bold">404</div>
  <div class="text-2xl font-semibold">Page Not Found</div>
  <div class="text-(--text-secondary-color)">
    The page you are looking for does not exist or has been moved.
  </div>
  <a href="/" class="block text-(--link-color) hover:underline">Return to Home</a>
</div>
`;
}
