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

  const keyboard1 = 'QWERTZUIOPÜ'.split('');
  const keyboard2 = 'ASDFGHJKLÖÄ'.split('');
  const keyboard3 = 'YXCVBNM'.split('');

  let letter_hints = {};
  grid.forEach(row => {
      row.forEach((char, i) => {
        if(solution.charAt(i) === char) {
          letter_hints[char] = 'green-600';
        } else if (solution.includes(char) && letter_hints[char] !== 'green-600') {
          letter_hints[char] = 'orange-400';
        } else if (letter_hints[char] !== 'green-600' && letter_hints[char] !== 'orange-400') {
          letter_hints[char] = 'gray-900';
        }
      });
  });

  function Key(char) {
    return html`
      <button class="border rounded-1 w-1/12 text-base bg-${letter_hints[char] || 'gray-700'}">${char}</button>
    `;
  }

  return html`
    <div class="flex-row bg-gray-600 max-w-sm mx-auto my-8 text-gray-100 p-4">
      <${Header}
        title="WÖRTLI"
      />
      <${Grid} solution="${solution}" grid="${grid}"/>

      <div class="">${keyboard1.map(Key)}</div>
      <div class="ml-[4%]">${keyboard2.map(Key)}</div>
      <div class="ml-[8%]">${keyboard3.map(Key)}
        <button class="border rounded-1 w-3/12">⏎</button>
      </div>
    
    </div>
  `;
}

render(html`<${App} />`, document.getElementById('app'));
