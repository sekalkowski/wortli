import { html, render, useState } from 'https://unpkg.com/htm/preact/standalone.module.js';

// New import:
import { Header } from './Header.js';
import { Grid } from './Grid.js';
import { wordlist } from './wordlist.js';

function randomElem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function App() {
  
  const [solution, setSolution] = useState(randomElem(wordlist));
  const [prev, setPrev] = useState([]);
  const [curr, setCurr] = useState([]);

  function resetGame() {
    setSolution(randomElem(wordlist));
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

  function backspace(char) {
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
        class="border rounded-1 w-1/12 text-base bg-${letter_hints[char] || 'gray-700'}"
        ${currTypable ? '' : 'disabled'}
        onclick="${() => currTypable && addChar(char)}"
      >${char}</button>
    `;
  }

  return html`
    <div class="flex-row bg-gray-600 max-w-sm mx-auto my-8 text-gray-100 p-4">
      <${Header}
        title="WÖRTLI"
        resetCallback="${() => resetGame()}"
      />
      <${Grid} solution="${solution}" prev="${prev}" curr="${curr}"/>

      <div class="">${keyboard1.map(Key)}</div>
      <div class="ml-[4%]">${keyboard2.map(Key)}</div>
      <div class="ml-[8%]">
        <button class="border rounded-1 w-1/12" onclick="${() => currDeleteable && backspace()}" ${currDeleteable ? '' : 'disabled'}>⌫</button>
        ${keyboard3.map(Key)}
        <button class="border rounded-1 w-3/12" onclick="${() => currSubmittable && trySubmit()}" ${currSubmittable ? '' : 'disabled'}>⏎</button>
      </div>
    
    </div>
  `;
}

render(html`<${App} />`, document.getElementById('app'));
