export interface htmlFormatterSetting {
  des: string;
  text: string;
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
  },
  div: {
    des: '<div>',
    symbol: '<div></div>',
    shift: 5,
    selectionInput: 5,
  },
  span: {
    des: '<span>',
    symbol: '<span></span>',
    shift: 6,
    selectionInput: 6,
  },
  img: {
    des: '<img>',
    symbol: '<img src="" alt="" width="" height=""></img>',
    shift: 10,
    selectionInput: 38,
  },
  a: {
    des: '<a>',
    symbol: '<a></a>',
    shift: 2,
    selectionInput: 3,
  },
  p: {
    des: '<p>',
    symbol: '<p></p>',
    shift: 5,
    selectionInput: 5,
  },
  font: {
    des: '<font>',
    symbol:
      '<span style="font-family:default; font-size:default; color:red"></span>',
    shift: 64,
    selectionInput: 64,
  },
  table: {
    des: '<table>',
    symbol: '<table></table>',
    shift: 7,
    selectionInput: 7,
  },
  thead: {
    des: '<thead>',
    symbol: '<thead></thead>',
    shift: 7,
    selectionInput: 7,
  },
  tbody: {
    des: '<tbody>',
    symbol: '<tbody></tbody>',
    shift: 7,
    selectionInput: 7,
  },
  tfoot: {
    des: '<tfoot>',
    symbol: '<tfoot></tfoot>',
    shift: 7,
    selectionInput: 7,
  },
  tr: {
    des: '<tr>',
    symbol: '<tr></tr>',
    shift: 4,
    selectionInput: 4,
  },
  td: {
    des: '<td>',
    symbol: '<td></td>',
    shift: 4,
    selectionInput: 4,
  },
  th: {
    des: '<th>',
    symbol: '<th></th>',
    shift: 4,
    selectionInput: 4,
  },
};

function checkIfSelection(editor: CodeMirror.Editor) {
  const selection = editor.getSelection();
  if (!selection || selection === '') {
    return false;
  } else {
    return true;
  }
}

export function htmlFormatter(
  editor: CodeMirror.Editor,
  item: htmlFormatterSetting,
) {
  if (editor) {
    const isSelection = checkIfSelection(editor);
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
