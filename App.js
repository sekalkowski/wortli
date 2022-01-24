import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js';

// New import:
import { Header } from './Header.js';
import { Grid } from './Grid.js';

function App() {
  
  const solution = "BEAST";
  const grid = [
    ["H", "E", "A", "R", "T"],
    ["S", "T", "A", "R", "T"],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];

  return html`
    <div class="flex-row bg-gray-600 max-w-sm mx-auto my-8 text-gray-100 p-4">
      <${Header}
        title="WÖRTLI"
      />
      <div class="sm-auto">
      <${Grid} solution="${solution}" grid="${grid}"/>
      </div>
    </div>
  `;
}

render(html`<${App} />`, document.getElementById('app'));
