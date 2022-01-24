import { html } from 'https://unpkg.com/htm/preact/standalone.module.js';

export function Grid({ solution, grid }) {

  function hint(a, b, s) {
    console.log([a, b, s])
    if (a === b) { return 'green-600'; }
    if (s.includes(a)) { return 'orange-400'; }
    return 'gray-800';
  }
  
  function Row({row, solution}) {
      const sol = solution.split('');
      return html`
        <tr>
        <td class="border border-gray-300 p-2 m-4 bg-${hint(row[0], sol[0], sol)}">${row[0] || ' '}</td>
        <td class="border border-gray-300 p-2 m-4 bg-${hint(row[1], sol[1], sol)}">${row[1] || ' '}</td>
        <td class="border border-gray-300 p-2 m-4 bg-${hint(row[2], sol[2], sol)}">${row[2] || ' '}</td>
        <td class="border border-gray-300 p-2 m-4 bg-${hint(row[3], sol[3], sol)}">${row[3] || ' '}</td>
        <td class="border border-gray-300 p-2 m-4 bg-${hint(row[4], sol[4], sol)}">${row[4] || ' '}</td>
        </tr>
      `
  }
  
  return html`
    <table>
    <${Row} row="${grid[0]}" solution="${solution}"/>
    <${Row} row="${grid[1]}" solution="${solution}"/>
    <${Row} row="${grid[2]}" solution="${solution}"/>
    <${Row} row="${grid[3]}" solution="${solution}"/>
    <${Row} row="${grid[4]}" solution="${solution}"/>
    </table>
  `;
}
