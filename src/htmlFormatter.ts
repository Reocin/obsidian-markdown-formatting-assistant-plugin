export interface htmlFormatterSetting {
  des: string;
  text: string;
  symbol: string;
  shift: number;
  selectionInput: number;
  newLine: boolean;
  enclose: boolean;
}

export const htmlFormatterSettings = {
  div: {
    des: '<div>',
    symbol: '<div></div>',
    shift: 5,
    selectionInput: 5,
    newLine: true,
    enclose: false,
  },
  span: {
    des: '<span>',
    symbol: '<span></span>',
    shift: 6,
    selectionInput: 6,
    newLine: true,
    enclose: false,
  },
  img: {
    des: '<img>',
    symbol: '<img src="" alt="" width="" height=""></img>',
    shift: 10,
    selectionInput: 38,
    newLine: true,
    enclose: false,
  },
  a: {
    des: '<a>',
    symbol: '<a></a>',
    shift: 2,
    selectionInput: 3,
    newLine: true,
    enclose: false,
  },
  p: {
    des: '<p>',
    symbol: '<p></p>',
    shift: 5,
    selectionInput: 5,
    newLine: true,
    enclose: false,
  },
  font: {
    des: '<font>',
    symbol:
      '<span style="font-family:default; font-size:default; color:red"></span>',
    shift: 64,
    selectionInput: 64,
    newLine: true,
    enclose: false,
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
