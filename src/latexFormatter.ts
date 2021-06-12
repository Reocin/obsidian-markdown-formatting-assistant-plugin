import { checkIfSelection } from './generalFunctions';

export interface latexFormatterSetting {
  des: string;
  text: string;
  symbol: string;
  shift: number;
  selectionInput: number;
  type: string;
  newLine: boolean;
}

export const latexFormatterSettings = {
  inlineEquation: {
    des: 'inline equation',
    text: '$$x$$',
    symbol: '$$$$',
    shift: 2,
    selectionInput: 2,
    type: 'text',
    newLine: false,
  },
  equation: {
    des: 'equation',
    text: '$x$',
    symbol: '$$',
    shift: 1,
    selectionInput: 1,
    type: 'text',
    newLine: false,
  },
  division: {
    des: 'frac',
    text: 'division',
    symbol: '\\frac{}{}',
    shift: 6,
    selectionInput: 6,
    type: 'icon',
    newLine: true,
  },
  multiplication: {
    des: 'times',
    text: 'multiplication',
    symbol: '\\times',
    shift: 6,
    selectionInput: 6,
    type: 'icon',
    newLine: false,
  },
  sup: {
    des: 'superscript',
    text: 'x<sup>y</sup>',
    symbol: '^{}',
    shift: 2,
    selectionInput: 2,
    type: 'text',
    newLine: false,
  },
  div: {
    des: 'division',
    text: 'x<sup>-1</sup>',
    symbol: '^{-1}',
    shift: 5,
    selectionInput: 5,
    type: 'text',
    newLine: false,
  },
  sub: {
    des: 'subscript',
    text: 'x<sub>y</sub>',
    symbol: '_{}',
    shift: 2,
    selectionInput: 2,
    type: 'text',
    newLine: false,
  },
  pi: {
    des: 'pi',
    text: 'pi',
    symbol: '\\pi',
    shift: 3,
    selectionInput: 3,
    type: 'icon',
    newLine: false,
  },
  e: {
    des: 'e',
    text: 'e<sup>x</sup>',
    symbol: 'e^{}',
    shift: 3,
    selectionInput: 3,
    type: 'text',
    newLine: true,
  },
  exp: {
    des: 'exp',
    text: 'exp',
    symbol: '\\exp()',
    shift: 5,
    selectionInput: 5,
    type: 'text',
    newLine: false,
  },
  log: {
    des: 'log',
    text: 'log',
    symbol: '\\log()',
    shift: 5,
    selectionInput: 5,
    type: 'text',
    newLine: false,
  },
  sin: {
    des: 'sin',
    text: 'sin',
    symbol: '\\sin()',
    shift: 5,
    selectionInput: 5,
    type: 'text',
    newLine: true,
  },
  cos: {
    des: 'cos',
    text: 'cos',
    symbol: '\\cos()',
    shift: 5,
    selectionInput: 5,
    type: 'text',
    newLine: false,
  },
  tan: {
    des: 'tan',
    text: 'tan',
    symbol: '\\tan()',
    shift: 5,
    selectionInput: 5,
    type: 'text',
    newLine: false,
  },
  cot: {
    des: 'cot',
    text: 'cot',
    symbol: '\\cot()',
    shift: 5,
    selectionInput: 5,
    type: 'text',
    newLine: false,
  },
  sin2: {
    des: 'cos^2',
    text: 'sin<sup>2</sup>',
    symbol: '\\sin^2()',
    shift: 7,
    selectionInput: 7,
    type: 'text',
    newLine: true,
  },
  cos2: {
    des: 'cos^2',
    text: 'cos<sup>2</sup>',
    symbol: '\\cos^2()',
    shift: 7,
    selectionInput: 7,
    type: 'text',
    newLine: false,
  },
  tan2: {
    des: 'tan^2',
    text: 'tan<sup>2</sup>',
    symbol: '\\tan^2()',
    shift: 7,
    selectionInput: 7,
    type: 'text',
    newLine: false,
  },
  cot2: {
    des: 'cot^2',
    text: 'cot<sup>2</sup>',
    symbol: '\\cot^2()',
    shift: 7,
    selectionInput: 7,
    type: 'text',
    newLine: false,
  },
  roundBrackets: {
    des: 'round brackets',
    text: '(x)',
    symbol: '\\left(\\right)',
    shift: 6,
    selectionInput: 6,
    type: 'text',
    newLine: true,
  },
  squareBrackets: {
    des: 'square brackets',
    text: '[x]',
    symbol: '\\left[\\right]',
    shift: 6,
    selectionInput: 6,
    type: 'text',
    newLine: false,
  },
  curlyBrackets: {
    des: 'curly brackets',
    text: '{x}',
    symbol: '\\left\\{\\right\\}',
    shift: 7,
    selectionInput: 7,
    type: 'text',
    newLine: false,
  },
  pipeBrackets: {
    des: 'pipe brackets',
    text: '|x|',
    symbol: '\\left|\\right|',
    shift: 6,
    selectionInput: 6,
    type: 'text',
    newLine: false,
  },
  doublePipeBrackets: {
    des: 'double pipe brackets',
    text: '||x||',
    symbol: '\\left\\|\\right\\|',
    shift: 7,
    selectionInput: 7,
    type: 'text',
    newLine: false,
  },
};

export function latexFormatter(
  editor: CodeMirror.Editor,
  item: latexFormatterSetting,
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
