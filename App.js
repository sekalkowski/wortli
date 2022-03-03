import { html, render, useState } from 'https://unpkg.com/htm/preact/standalone.module.js';

// New import:
import { Header } from './Header.js';
import { Grid } from './Grid.js';
import { wordlist } from './wordlist.js';

function weight(x, N) {
  return 0.5 * (Math.tanh(3.0 - (6.0 * x) / N) + 1); // starts around 1 at x=0, degrades towards 0 at x -> N
}

const wordlist_weights = [];
var cumsum = 0.0;
for (let i = 0; i < wordlist.length; i++) {
  cumsum += weight(i, wordlist.length);
  wordlist_weights.push(cumsum);
}

// console.log(cumsum);
// console.log(wordlist_weights);
  

function weightedRandomElem(arr) {
  const needle = Math.random() * cumsum;
  let idx = wordlist_weights.findIndex((v) => v >= needle);
  idx = Math.max(idx - 1, 0);
  return arr[idx];
}

function chooseSolutionWord() {
  return weightedRandomElem(wordlist);
}

// for (let i = 0; i < 100; i++) { console.log(chooseSolutionWord()) }

function App() {
  
  const [solution, setSolution] = useState(chooseSolutionWord());
  const [prev, setPrev] = useState([]);
  const [curr, setCurr] = useState([]);

  function resetGame() {
    setSolution(chooseSolutionWord());
    setPrev([]);
    setCurr([]);
  }

  function appendLine(curr) {
    setPrev(prev.concat([curr]));
    setCurr([]);
  }

  function addChar(char) {
    setCurr(curr.concat(char));
  }

  function backspace() {
    setCurr(curr.slice(0, curr.length - 1));
  }

  function inDictionary(word) {
    return wordlist.includes(word.join(''))
  }

  function trySubmit() {
    if(inDictionary(curr)) {
      if (curr.join('') === solution) {
        alert(`Gewonnen! Das Lösungswort war ${solution}`);
        resetGame();
      } else if (prev.length === 4) {
        alert(`Game over! Das Lösungswort war ${solution}`);
        resetGame();
      } else {
        appendLine(curr);
      }
    } else {
      alert(`Nicht im Wörterbuch: ${curr.join('')}`);
    }
  }

  const currSubmittable = curr.length === 5;
  const currTypable = curr.length < 5;
  const currDeleteable = curr.length > 0;

  const keyboard1 = 'QWERTZUIOPÜ'.split('');
  const keyboard2 = 'ASDFGHJKLÖÄ'.split('');
  const keyboard3 = 'YXCVBNM'.split('');

  let letter_hints = {};
  prev.forEach(row => {
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
      <button 
        class="border rounded-1 w-1/12 text-base bg-${letter_hints[char] || 'gray-700'} hover:bg-gray-600"
        ${currTypable ? '' : 'disabled'}
        onclick="${() => currTypable && addChar(char)}"
      >${char}</button>
    `;
  }

  return html`
    <div class="flex-row bg-gray-600 max-w-sm mx-auto h-full text-gray-100 py-6">
      <${Header}
        title="WÖRTLI"
        resetCallback="${() => resetGame()}"
      />
      <${Grid} solution="${solution}" prev="${prev}" curr="${curr}"/>

      <div class="w-full">
        <button class="invisible w-[${100/24}%]" deactivated/>
        ${keyboard1.map(Key)}
      </div>
      <div class="w-full">
      <button class="invisible w-[${100/24}%]" deactivated/>
        ${keyboard2.map(Key)}
      </div>
      <div class="w-full">
      <button class="invisible w-[${100/24}%]" deactivated/>
        <button class="border rounded-1 w-1/12 bg-gray-700 hover:bg-gray-600" onclick="${() => currDeleteable && backspace()}" ${currDeleteable ? '' : 'disabled'}>⌫</button>
        ${keyboard3.map(Key)}
        <button class="border rounded-1 w-3/12 bg-gray-700 hover:bg-gray-600" onclick="${() => currSubmittable && trySubmit()}" ${currSubmittable ? '' : 'disabled'}>⏎</button>
      </div>
    
    </div>
  `;
}

render(html`<${App} />`, document.getElementById('app'));
