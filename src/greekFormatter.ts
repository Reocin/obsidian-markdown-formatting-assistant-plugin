import { checkIfSelection } from './generalFunctions';

export interface greekFormatterSetting {
  des: string;
  text: string;
  icon: string;
  symbol: string;
  shift: number;
}

export const greekLowerCaseFormatterSettings = {
  alpha: {
    des: 'alpha',
    icon: 'alpha',
    symbol: '\\alpha',
    shift: 6,
  },
  beta: {
    des: 'beta',
    icon: 'beta',
    symbol: '\\beta',
    shift: 5,
  },
  gamma: {
    des: 'gamma',
    icon: 'gamma',
    symbol: '\\gamma',
    shift: 6,
  },
  delta: {
    des: 'delta',
    icon: 'delta',
    symbol: '\\delta',
    shift: 6,
  },
  epsilon: {
    des: 'epsilon',
    icon: 'epsilon',
    symbol: '\\epsilon',
    shift: 8,
  },
  zeta: {
    des: 'zeta',
    icon: 'zeta',
    symbol: '\\zeta',
    shift: 5,
  },
  eta: {
    des: 'eta',
    icon: 'eta',
    symbol: '\\eta',
    shift: 4,
  },
  theta: {
    des: 'theta',
    icon: 'theta',
    symbol: '\\theta',
    shift: 6,
  },
  iota: {
    des: 'iota',
    icon: 'iota',
    symbol: '\\iota',
    shift: 5,
  },
  kappa: {
    des: 'kappa',
    icon: 'kappa',
    symbol: '\\kappa',
    shift: 6,
  },
  lambda: {
    des: 'lambda',
    icon: 'lambda',
    symbol: '\\lambda',
    shift: 7,
  },
  mu: {
    des: 'mu',
    icon: 'my',
    symbol: '\\mu',
    shift: 3,
  },
  nu: {
    des: 'nu',
    icon: 'ny',
    symbol: '\\nu',
    shift: 3,
  },
  xi: {
    des: 'xi',
    icon: 'xi',
    symbol: '\\xi',
    shift: 3,
  },
  pi: {
    des: 'pi',
    icon: 'pi',
    symbol: '\\pi',
    shift: 3,
  },
  rho: {
    des: 'rho',
    icon: 'rho',
    symbol: '\\rho',
    shift: 4,
  },
  sigma: {
    des: 'sigma',
    icon: 'sigma',
    symbol: '\\sigma',
    shift: 6,
  },
  tau: {
    des: 'tau',
    icon: 'tau',
    symbol: '\\tau',
    shift: 4,
  },
  upsilon: {
    des: 'upsilon',
    icon: 'ypsilon',
    symbol: '\\upsilon',
    shift: 8,
  },
  phi: {
    des: 'phi',
    icon: 'phi',
    symbol: '\\phi',
    shift: 4,
  },
  chi: {
    des: 'chi',
    icon: 'chi',
    symbol: '\\chi',
    shift: 4,
  },
  psi: {
    des: 'psi',
    icon: 'psi',
    symbol: '\\psi',
    shift: 4,
  },
  omega: {
    des: 'omega',
    icon: 'omega',
    symbol: '\\omega',
    shift: 6,
  },
};

export const greekUpperCaseFormatterSettings = {
  // Alpha: {
  //   des: 'Alpha',
  //   icon: 'Alpha',
  //   symbol: '\\Alpha',
  //   shift: 6,
  // },
  // Beta: {
  //   des: 'Beta',
  //   icon: 'Beta',
  //   symbol: '\\Beta',
  //   shift: 5,
  // },
  Gamma: {
    des: 'Gamma',
    icon: 'Gamma',
    symbol: '\\Gamma',
    shift: 6,
  },
  Delta: {
    des: 'Delta',
    icon: 'Delta',
    symbol: '\\Delta',
    shift: 6,
  },
  // Epsilon: {
  //   des: 'Epsilon',
  //   icon: 'Epsilon',
  //   symbol: '\\Epsilon',
  //   shift: 8,
  // },
  // Zeta: {
  //   des: 'Zeta',
  //   icon: 'Zeta',
  //   symbol: '\\Zeta',
  //   shift: 5,
  // },
  // Eta: {
  //   des: 'Eta',
  //   icon: 'Eta',
  //   symbol: '\\Eta',
  //   shift: 4,
  // },
  Theta: {
    des: 'Theta',
    icon: 'Theta',
    symbol: '\\Theta',
    shift: 6,
  },
  // Iota: {
  //   des: 'Iota',
  //   icon: 'Iota',
  //   symbol: '\\Iota',
  //   shift: 5,
  // },
  // Kappa: {
  //   des: 'Kappa',
  //   icon: 'Kappa',
  //   symbol: '\\Kappa',
  //   shift: 6,
  // },
  Lambda: {
    des: 'Lambda',
    icon: 'Lambda',
    symbol: '\\Lambda',
    shift: 7,
  },
  // Mu: {
  //   des: 'Mu',
  //   icon: 'My',
  //   symbol: '\\Mu',
  //   shift: 3,
  // },
  // Nu: {
  //   des: 'Nu',
  //   icon: 'Ny',
  //   symbol: '\\Nu',
  //   shift: 3,
  // },
  Xi: {
    des: 'Xi',
    icon: 'Xi',
    symbol: '\\Xi',
    shift: 3,
  },
  // Omikron: {
  //   des: 'Omikron',
  //   icon: 'Omikron',
  //   symbol: '\\Omikron',
  //   shift: 8,
  // },
  Pi: {
    des: 'Pi',
    icon: 'Pi',
    symbol: '\\Pi',
    shift: 3,
  },
  // Rho: {
  //   des: 'Rho',
  //   icon: 'Rho',
  //   symbol: '\\Rho',
  //   shift: 4,
  // },
  Sigma: {
    des: 'Sigma',
    icon: 'Sigma',
    symbol: '\\Sigma',
    shift: 6,
  },
  // Tau: {
  //   des: 'Tau',
  //   icon: 'Tau',
  //   symbol: '\\Tau',
  //   shift: 4,
  // },
  Upsilon: {
    des: 'Upsilon',
    icon: 'Ypsilon',
    symbol: '\\Upsilon',
    shift: 8,
  },
  Phi: {
    des: 'Phi',
    icon: 'Phi',
    symbol: '\\Phi',
    shift: 4,
  },
  // Chi: {
  //   des: 'Chi',
  //   icon: 'Chi',
  //   symbol: '\\Chi',
  //   shift: 4,
  // },
  Psi: {
    des: 'Psi',
    icon: 'Psi',
    symbol: '\\Psi',
    shift: 4,
  },
  Omega: {
    des: 'Omega',
    icon: 'Omega',
    symbol: '\\Omega',
    shift: 6,
  },
};

export function greekFormatter(
  editor: CodeMirror.Editor,
  item: greekFormatterSetting,
) {
  if (editor) {
    const isSelection = checkIfSelection(editor);
    const selection = editor.getSelection();
    const curserStart = editor.getCursor('from');
    const curserEnd = editor.getCursor('to');
    const line = editor.getLine(curserStart.line);

    editor.focus();
    editor.replaceRange(item.symbol, curserStart);
    editor.setCursor(curserStart.line, curserStart.ch + item.shift);
  }
}
