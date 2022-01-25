import { html } from 'https://unpkg.com/htm/preact/standalone.module.js';

export function Grid({ solution, grid }) {

  function hint(a, b, s) {
    if (a === b) { return 'green-600'; }
    if (s.includes(a)) { return 'orange-400'; }
    return 'gray-800';
  }
  
  function Row({row, solution}) {
      const sol = solution.split('');
      return html`
        <tr class="h-1/5">${
          row.map((col, i) => html`
            <td class="border border-gray-300 p-2 m-4 w-1/5 text-middle text-center bg-${hint(col, sol[i], sol)}">${col || ''}</td>
          `)
        }
        </tr>
      `
  }
  
  return html`
    <table class="[width:80%] [aspect-ratio:1/1] mx-auto my-6">${
      grid.map(row => html`
        <${Row} row="${row}" solution="${solution}"/>
      `)
    }
    </table>
  `;
}
