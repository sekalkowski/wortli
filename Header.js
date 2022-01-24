import { html } from 'https://unpkg.com/htm/preact/standalone.module.js';

export function Header({ title, children }) {
  return html`
    <div class="flex flex-row justify-between content-center">
      <h1 class="text-3xl font-bold">${title}</h1>
      <button class="text-2xl w-8 h-8 rounded-full shadow shadow-gray-500">⟳</button>
    </div>
  `;
}
