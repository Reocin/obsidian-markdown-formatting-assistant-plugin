export interface formatterSetting {
  des: string;
  icon: string;
  symbol: string;
  shift: number;
  selectionInput: number;
  newLine: boolean;
  enclose: boolean;
}

export const formatSettings = {
  h1: {
    des: 'h1',
    icon: 'h1',
    symbol: '# ',
    shift: 2,
    selectionInput: 0,
    newLine: false,
    enclose: false,
  },
  h2: {
    des: 'h2',
    icon: 'h2',
    symbol: '## ',
    shift: 3,
    selectionInput: 0,
    newLine: false,
    enclose: false,
  },
  h3: {
    des: 'h3',
    icon: 'h3',
    symbol: '### ',
    shift: 4,
    selectionInput: 0,
    newLine: false,
    enclose: false,
  },
  h4: {
    des: 'h4',
    icon: 'h4',
    symbol: '#### ',
    shift: 5,
    selectionInput: 0,
    newLine: false,
    enclose: false,
  },
  h5: {
    des: 'h5',
    icon: 'h5',
    symbol: '##### ',
    shift: 6,
    selectionInput: 0,
    newLine: false,
    enclose: false,
  },
  h6: {
    des: 'h6',
    icon: 'h6',
    symbol: '###### ',
    shift: 7,
    selectionInput: 0,
    newLine: false,
    enclose: false,
  },
  bold: {
    des: 'bold',
    icon: 'bold',
    symbol: '****',
    shift: 2,
    selectionInput: 2,
    newLine: false,
    enclose: false,
  },
  italic: {
    des: 'italic',
    icon: 'italic',
    symbol: '**',
    shift: 1,
    selectionInput: 1,
    newLine: false,
    enclose: false,
  },
  underline: {
    des: 'underline',
    icon: 'underline',
    symbol: '<u></u>',
    shift: 3,
    selectionInput: 3,
    newLine: false,
    enclose: false,
  },
  strikethrough: {
    des: 'strikethrough',
    icon: 'strikethrough',
    symbol: '~~~~',
    shift: 2,
    selectionInput: 2,
    newLine: false,
    enclose: false,
  },
  codeBlock: {
    des: 'code_block',
    icon: 'codeBlock',
    symbol: '``` \n```',
    shift: 4,
    selectionInput: 4,
    newLine: true,
    enclose: true,
  },
  mermaidBlock: {
    des: 'mermaid_block',
    icon: 'mermaidBlock',
    symbol: '```mermaid \n```',
    shift: 4,
    selectionInput: 4,
    newLine: true,
    enclose: true,
  },
  codeInline: {
    des: 'code_inline',
    icon: 'codeInline',
    symbol: '``',
    shift: 1,
    selectionInput: 1,
    newLine: false,
    enclose: false,
  },
  link: {
    des: 'link',
    icon: 'link',
    symbol: '[]()',
    shift: 3,
    selectionInput: 1,
    newLine: false,
    enclose: false,
  },
  internalLink: {
    des: 'internal_link',
    icon: 'fileLink',
    symbol: '[[]]',
    shift: 2,
    selectionInput: 2,
    newLine: false,
    enclose: false,
  },
  image: {
    des: 'image',
    icon: 'image',
    symbol: '![]()',
    shift: 4,
    selectionInput: 2,
    newLine: false,
    enclose: false,
  },
  blockquote: {
    des: 'blockquote',
    icon: 'quote',
    symbol: '> ',
    shift: 2,
    selectionInput: 0,
    newLine: true,
    enclose: false,
  },
  bulletList: {
    des: 'bullet_list',
    icon: 'bulletList',
    symbol: '- ',
    shift: 2,
    selectionInput: 0,
    newLine: true,
    enclose: false,
  },
  numberList: {
    des: 'number_list',
    icon: 'numberList',
    symbol: '1. ',
    shift: 3,
    selectionInput: 0,
    newLine: true,
    enclose: false,
  },
  checkList: {
    des: 'check_list',
    icon: 'checkList',
    symbol: '- [ ] ',
    shift: 6,
    selectionInput: 0,
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

export function iconFormatter(
  editor: CodeMirror.Editor,
  item: formatterSetting,
) {
  if (editor) {
    const isSelection = checkIfSelection(editor);
    const selection = editor.getSelection();
    const curserStart = editor.getCursor('from');
    const curserEnd = editor.getCursor('to');
    const line = editor.getLine(curserStart.line);

    editor.focus();

    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].contains(item.des)) {
      const reStringExact = '^\\s*' + item.symbol + '+\\s*';
      const reStringAny = '^\\s*#+\\s*';
      const cleanedLine = line.replace(new RegExp(reStringAny, 'g'), '');
      let replacment = item.symbol + cleanedLine;

      if (new RegExp(reStringExact, 'g').test(line)) {
        replacment = cleanedLine;
      }
      editor.replaceRange(
        replacment,
        { line: curserStart.line, ch: 0 },
        { line: curserStart.line, ch: line.length },
      );
    } else if (
      [
        'bold',
        'italic',
        'strikethrough',
        'code_inline',
        'link',
        'internal_link',
        'image',
        'underline',
      ].contains(item.des)
    ) {
      if (isSelection) {
        editor.replaceSelection(
          item.symbol.substring(0, item.selectionInput) +
            selection +
            item.symbol.substring(item.selectionInput),
        );

        editor.setCursor(
          curserStart.line,
          curserStart.ch + selection.length + item.shift,
        );
      } else {
        editor.replaceRange(item.symbol, curserStart);
        editor.setCursor(curserStart.line, curserStart.ch + item.shift);
      }
    } else if (
      ['code_block'].contains(item.des) ||
      ['mermaid_block'].contains(item.des)
    ) {
      if (isSelection) {
        const re = new RegExp('^(```).*(```)$', 'gs');
        const match = selection.trim().match(re);
        let replacment = selection.trim();

        if (match) {
          replacment = editor
            .getSelection()
            .trim()
            .replace(/^(```)/g, '')
            .replace(/(```)$/g, '');
          editor.replaceSelection(replacment);
        } else {
          editor.replaceSelection(
            item.symbol.substring(0, item.selectionInput) +
              '\n' +
              replacment +
              item.symbol.substring(item.selectionInput),
          );
          editor.setCursor(curserStart.line, curserStart.ch + item.shift);
        }
      } else {
        const pos = curserStart;
        let replacement = item.symbol;
        if (line.trim()) {
          pos.ch = line.length;
          replacement = '\n' + replacement;
        } else {
          pos.ch = 0;
        }

        editor.replaceRange(replacement, pos);
        editor.setCursor(curserStart.line, curserStart.ch + item.shift);
      }
    } else if (
      ['blockquote', 'bullet_list', 'number_list', 'check_list'].contains(
        item.des,
      )
    ) {
      const reString = ('^\\s*' + item.symbol + '\\s*')
        .replace('[', '\\[')
        .replace(']', '\\]');

      if (isSelection) {
        const selectionLines = selection.split('\n');

        const notAllAreItems = selectionLines.map((lineOfSelection) => {
          const re = new RegExp(reString, 'g');
          return re.test(lineOfSelection);
        });

        if (!notAllAreItems.contains(false)) {
          const convertetSelectionLines = selectionLines.map((newLine) => {
            const re = new RegExp(reString, 'g');
            return newLine.replace(re, '');
          });
          editor.replaceSelection(convertetSelectionLines.join('\n'));
        } else {
          const convertetSelectionLines = selectionLines.map((newLine) => {
            const re = new RegExp(reString, 'g');
            if (!re.test(newLine.trim())) {
              return item.symbol + newLine.trim();
            } else {
              return newLine;
            }
          });
          editor.replaceSelection(convertetSelectionLines.join('\n'));
        }
      } else {
        const re = new RegExp(reString, 'gm');
        const match = line.trim().match(re);
        let replacment = item.symbol + line.replace(re, '');

        if (match) {
          replacment = line.replace(re, '');
        }
        editor.replaceRange(
          replacment,
          { line: curserStart.line, ch: 0 },
          { line: curserStart.line, ch: line.length },
        );
      }
    }
  }
}
