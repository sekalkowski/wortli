import { html } from 'https://unpkg.com/htm/preact/standalone.module.js';

export function Grid({ solution, prev, curr }) {
  
  function nullArr(ofLen) {
    return Array(ofLen).fill(null);
  }

  function asGrid(prev, curr) {
    const currRestLen = 5 - curr.length;
    const currConcat = curr.concat(nullArr(currRestLen));
    const gridRestLen = 5 - 1 - prev.length;
    return [
      ...prev,
      currConcat,
      ...Array(gridRestLen).fill(nullArr(5))
    ];
  }

  const grid = asGrid(prev, curr);

  function colorHint(i, row, sol, highlight) {
    if (highlight == 'caret') {
      if (row.indexOf(null) == i) { return 'gray-500'; }
    }
    if (highlight == 'hints') { 
      if (sol[i] === row[i]) { return 'green-600'; }
      if (sol.includes(row[i])) { return 'orange-400'; }
    }return 'gray-800';
  }
  
  function Row({row, solution, highlight=null}) {
      const sol = solution.split('');
      return html`
        <tr class="h-1/5">${
          row.map((col, i) => html`
            <td class="border border-gray-300 p-2 m-4 w-1/5 text-middle text-center bg-${colorHint(i, row, sol, highlight)}">${col || ''}</td>
          `)
        }
        </tr>
      `
  }


  
  return html`
    <table class="[width:80%] [aspect-ratio:1/1] mx-auto my-6">${
      grid.map((row, i) => html`
        <${Row} row="${row}" solution="${solution}" highlight="${i < prev.length ? 'hints' : i == prev.length ? 'caret' : null}"/>
      `)
    }
    </table>
  `;
}
