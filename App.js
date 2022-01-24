import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js';

// New import:
import { Header } from './Header.js';

function App() {
  return html`
    <${Header} title="WÖRTLI"></${Header}>

    <div>
      Content of the page
    </div>
  `;
}

render(html`<${App} />`, document.getElementById('app'));
