import { Editor } from 'obsidian';
import { baseFormatterSetting } from './formatter';

export interface htmlFormatterSetting extends baseFormatterSetting {
  symbol: string;
  shift: number;
  selectionInput: number;
}

export const htmlFormatterSettings = {
  br: {
    des: '<br/>',
    symbol: '<br/>',
    shift: 5,
    selectionInput: 5,
    objectType: 'htmlFormatterSetting',
  },
  div: {
    des: '<div>',
    symbol: '<div></div>',
    shift: 5,
    selectionInput: 5,
    objectType: 'htmlFormatterSetting',
  },
  span: {
    des: '<span>',
    symbol: '<span></span>',
    shift: 6,
    selectionInput: 6,
    objectType: 'htmlFormatterSetting',
  },
  img: {
    des: '<img>',
    symbol: '<img src="" alt="" width="" height=""></img>',
    shift: 10,
    selectionInput: 38,
    objectType: 'htmlFormatterSetting',
  },
  a: {
    des: '<a>',
    symbol: '<a></a>',
    shift: 3,
    selectionInput: 3,
    objectType: 'htmlFormatterSetting',
  },
  p: {
    des: '<p>',
    symbol: '<p></p>',
    shift: 3,
    selectionInput: 3,
    objectType: 'htmlFormatterSetting',
  },
  font: {
    des: '<font>',
    symbol:
      '<span style="font-family:default; font-size:default; color:red"></span>',
    shift: 64,
    selectionInput: 64,
    objectType: 'htmlFormatterSetting',
  },
  table: {
    des: '<table>',
    symbol: '<table></table>',
    shift: 7,
    selectionInput: 7,
    objectType: 'htmlFormatterSetting',
  },
  thead: {
    des: '<thead>',
    symbol: '<thead></thead>',
    shift: 7,
    selectionInput: 7,
    objectType: 'htmlFormatterSetting',
  },
  tbody: {
    des: '<tbody>',
    symbol: '<tbody></tbody>',
    shift: 7,
    selectionInput: 7,
    objectType: 'htmlFormatterSetting',
  },
  tfoot: {
    des: '<tfoot>',
    symbol: '<tfoot></tfoot>',
    shift: 7,
    selectionInput: 7,
    objectType: 'htmlFormatterSetting',
  },
  tr: {
    des: '<tr>',
    symbol: '<tr></tr>',
    shift: 4,
    selectionInput: 4,
    objectType: 'htmlFormatterSetting',
  },
  td: {
    des: '<td>',
    symbol: '<td></td>',
    shift: 4,
    selectionInput: 4,
    objectType: 'htmlFormatterSetting',
  },
  th: {
    des: '<th>',
    symbol: '<th></th>',
    shift: 4,
    selectionInput: 4,
    objectType: 'htmlFormatterSetting',
  },
  details: {
    des: '<details>',
    symbol: '<details></details>',
    shift: 9,
    selectionInput: 9,
    objectType: 'htmlFormatterSetting',
  },
  summary: {
    des: '<summary>',
    symbol: '<summary></summary>',
    shift: 9,
    selectionInput: 9,
    objectType: 'htmlFormatterSetting',
  },
  u: {
    des: '<u>',
    symbol: '<u></u>',
    shift: 3,
    selectionInput: 3,
    objectType: 'htmlFormatterSetting',
  },
};

export function htmlFormatter(editor: Editor, item: htmlFormatterSetting) {
  if (editor) {
    const isSelection = editor.somethingSelected;
    const selection = editor.getSelection();
    const curserStart = editor.getCursor('from');
    const curserEnd = editor.getCursor('to');
    const line = editor.getLine(curserStart.line);

    editor.focus();

    if (isSelection) {
      let replacment = selection.trim();

      editor.replaceSelection(
        item.symbol.substring(0, item.selectionInput) +
          replacment +
          item.symbol.substring(item.selectionInput),
      );
      editor.setCursor(curserStart.line, curserStart.ch + item.shift);
    } else {
      editor.replaceRange(item.symbol, curserStart);
      editor.setCursor(curserStart.line, curserStart.ch + item.shift);
    }
  }
}
