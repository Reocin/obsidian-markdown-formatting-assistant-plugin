import { Editor } from 'obsidian';
import { baseFormatterSetting } from './formatter';

export interface greekFormatterSetting extends baseFormatterSetting {
  symbol: string;
  shift: number;
}

export const greekLowerCaseFormatterSettings = {
  alpha: {
    des: 'alpha',
    icon: 'alpha',
    symbol: '\\alpha',
    shift: 6,
    objectType: 'greekFormatterSetting',
  },
  beta: {
    des: 'beta',
    icon: 'beta',
    symbol: '\\beta',
    shift: 5,
    objectType: 'greekFormatterSetting',
  },
  gamma: {
    des: 'gamma',
    icon: 'gamma',
    symbol: '\\gamma',
    shift: 6,
    objectType: 'greekFormatterSetting',
  },
  delta: {
    des: 'delta',
    icon: 'delta',
    symbol: '\\delta',
    shift: 6,
    objectType: 'greekFormatterSetting',
  },
  epsilon: {
    des: 'epsilon',
    icon: 'epsilon',
    symbol: '\\epsilon',
    shift: 8,
    objectType: 'greekFormatterSetting',
  },
  zeta: {
    des: 'zeta',
    icon: 'zeta',
    symbol: '\\zeta',
    shift: 5,
    objectType: 'greekFormatterSetting',
  },
  eta: {
    des: 'eta',
    icon: 'eta',
    symbol: '\\eta',
    shift: 4,
    objectType: 'greekFormatterSetting',
  },
  theta: {
    des: 'theta',
    icon: 'theta',
    symbol: '\\theta',
    shift: 6,
    objectType: 'greekFormatterSetting',
  },
  iota: {
    des: 'iota',
    icon: 'iota',
    symbol: '\\iota',
    shift: 5,
    objectType: 'greekFormatterSetting',
  },
  kappa: {
    des: 'kappa',
    icon: 'kappa',
    symbol: '\\kappa',
    shift: 6,
    objectType: 'greekFormatterSetting',
  },
  lambda: {
    des: 'lambda',
    icon: 'lambda',
    symbol: '\\lambda',
    shift: 7,
    objectType: 'greekFormatterSetting',
  },
  mu: {
    des: 'mu',
    icon: 'my',
    symbol: '\\mu',
    shift: 3,
    objectType: 'greekFormatterSetting',
  },
  nu: {
    des: 'nu',
    icon: 'ny',
    symbol: '\\nu',
    shift: 3,
    objectType: 'greekFormatterSetting',
  },
  xi: {
    des: 'xi',
    icon: 'xi',
    symbol: '\\xi',
    shift: 3,
    objectType: 'greekFormatterSetting',
  },
  pi: {
    des: 'pi',
    icon: 'pi',
    symbol: '\\pi',
    shift: 3,
    objectType: 'greekFormatterSetting',
  },
  rho: {
    des: 'rho',
    icon: 'rho',
    symbol: '\\rho',
    shift: 4,
    objectType: 'greekFormatterSetting',
  },
  sigma: {
    des: 'sigma',
    icon: 'sigma',
    symbol: '\\sigma',
    shift: 6,
    objectType: 'greekFormatterSetting',
  },
  tau: {
    des: 'tau',
    icon: 'tau',
    symbol: '\\tau',
    shift: 4,
    objectType: 'greekFormatterSetting',
  },
  upsilon: {
    des: 'upsilon',
    icon: 'ypsilon',
    symbol: '\\upsilon',
    shift: 8,
    objectType: 'greekFormatterSetting',
  },
  phi: {
    des: 'phi',
    icon: 'phi',
    symbol: '\\phi',
    shift: 4,
    objectType: 'greekFormatterSetting',
  },
  chi: {
    des: 'chi',
    icon: 'chi',
    symbol: '\\chi',
    shift: 4,
    objectType: 'greekFormatterSetting',
  },
  psi: {
    des: 'psi',
    icon: 'psi',
    symbol: '\\psi',
    shift: 4,
    objectType: 'greekFormatterSetting',
  },
  omega: {
    des: 'omega',
    icon: 'omega',
    symbol: '\\omega',
    shift: 6,
    objectType: 'greekFormatterSetting',
  },
};

export const greekUpperCaseFormatterSettings = {
  // Alpha: {
  //   des: 'Alpha',
  //   icon: 'Alpha',
  //   symbol: '\\Alpha',
  //   shift: 6,
  // objectType: 'greekFormatterSetting',},
  // Beta: {
  //   des: 'Beta',
  //   icon: 'Beta',
  //   symbol: '\\Beta',
  //   shift: 5,
  // objectType: 'greekFormatterSetting',},
  Gamma: {
    des: 'Gamma',
    icon: 'Gamma',
    symbol: '\\Gamma',
    shift: 6,
    objectType: 'greekFormatterSetting',
  },
  Delta: {
    des: 'Delta',
    icon: 'Delta',
    symbol: '\\Delta',
    shift: 6,
    objectType: 'greekFormatterSetting',
  },
  // Epsilon: {
  //   des: 'Epsilon',
  //   icon: 'Epsilon',
  //   symbol: '\\Epsilon',
  //   shift: 8,
  // objectType: 'greekFormatterSetting',},
  // Zeta: {
  //   des: 'Zeta',
  //   icon: 'Zeta',
  //   symbol: '\\Zeta',
  //   shift: 5,
  // objectType: 'greekFormatterSetting',},
  // Eta: {
  //   des: 'Eta',
  //   icon: 'Eta',
  //   symbol: '\\Eta',
  //   shift: 4,
  // objectType: 'greekFormatterSetting',},
  Theta: {
    des: 'Theta',
    icon: 'Theta',
    symbol: '\\Theta',
    shift: 6,
    objectType: 'greekFormatterSetting',
  },
  // Iota: {
  //   des: 'Iota',
  //   icon: 'Iota',
  //   symbol: '\\Iota',
  //   shift: 5,
  // objectType: 'greekFormatterSetting',},
  // Kappa: {
  //   des: 'Kappa',
  //   icon: 'Kappa',
  //   symbol: '\\Kappa',
  //   shift: 6,
  // objectType: 'greekFormatterSetting',},
  Lambda: {
    des: 'Lambda',
    icon: 'Lambda',
    symbol: '\\Lambda',
    shift: 7,
    objectType: 'greekFormatterSetting',
  },
  // Mu: {
  //   des: 'Mu',
  //   icon: 'My',
  //   symbol: '\\Mu',
  //   shift: 3,
  // objectType: 'greekFormatterSetting',},
  // Nu: {
  //   des: 'Nu',
  //   icon: 'Ny',
  //   symbol: '\\Nu',
  //   shift: 3,
  // objectType: 'greekFormatterSetting',},
  Xi: {
    des: 'Xi',
    icon: 'Xi',
    symbol: '\\Xi',
    shift: 3,
    objectType: 'greekFormatterSetting',
  },
  // Omikron: {
  //   des: 'Omikron',
  //   icon: 'Omikron',
  //   symbol: '\\Omikron',
  //   shift: 8,
  // objectType: 'greekFormatterSetting',},
  Pi: {
    des: 'Pi',
    icon: 'Pi',
    symbol: '\\Pi',
    shift: 3,
    objectType: 'greekFormatterSetting',
  },
  // Rho: {
  //   des: 'Rho',
  //   icon: 'Rho',
  //   symbol: '\\Rho',
  //   shift: 4,
  // objectType: 'greekFormatterSetting',},
  Sigma: {
    des: 'Sigma',
    icon: 'Sigma',
    symbol: '\\Sigma',
    shift: 6,
    objectType: 'greekFormatterSetting',
  },
  // Tau: {
  //   des: 'Tau',
  //   icon: 'Tau',
  //   symbol: '\\Tau',
  //   shift: 4,
  // objectType: 'greekFormatterSetting',},
  Upsilon: {
    des: 'Upsilon',
    icon: 'Ypsilon',
    symbol: '\\Upsilon',
    shift: 8,
    objectType: 'greekFormatterSetting',
  },
  Phi: {
    des: 'Phi',
    icon: 'Phi',
    symbol: '\\Phi',
    shift: 4,
    objectType: 'greekFormatterSetting',
  },
  // Chi: {
  //   des: 'Chi',
  //   icon: 'Chi',
  //   symbol: '\\Chi',
  //   shift: 4,
  // objectType: 'greekFormatterSetting',},
  Psi: {
    des: 'Psi',
    icon: 'Psi',
    symbol: '\\Psi',
    shift: 4,
    objectType: 'greekFormatterSetting',
  },
  Omega: {
    des: 'Omega',
    icon: 'Omega',
    symbol: '\\Omega',
    shift: 6,
    objectType: 'greekFormatterSetting',
  },
};

export function greekFormatter(editor: Editor, item: greekFormatterSetting) {
  if (editor) {
    const isSelection = editor.somethingSelected;
    const selection = editor.getSelection();
    const curserStart = editor.getCursor('from');
    const curserEnd = editor.getCursor('to');
    const line = editor.getLine(curserStart.line);

    editor.focus();
    editor.replaceRange(item.symbol, curserStart);
    editor.setCursor(curserStart.line, curserStart.ch + item.shift);
  }
}
