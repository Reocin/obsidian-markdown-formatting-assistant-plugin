import { textEditCommand } from '../formatters/formatters';

export const commandsLatex: textEditCommand[] = [
  {
    id: 'equation_block',
    title: 'equation_block',
    description: 'Starts an latex equation block',
    icon: '$$x$$',
    iconType: 'text',
    group: 'Latex',

    startTag: '$$',
    endTag: '$$',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 2,
    shiftFromStart: true,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'simpleFormatter',
  },
  {
    id: 'equation',
    title: 'equation',
    description: 'Starts an latex inline equation',
    icon: '$x$',
    iconType: 'text',
    group: 'Latex',

    startTag: '$',
    endTag: '$',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 2,
    shiftFromStart: true,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'simpleFormatter',
  },
  {
    id: 'frac',
    title: 'frac',
    description: 'Fraction',
    icon: 'division',
    iconType: 'mdiIcon',
    group: 'Latex',

    startTag: '\\frac{',
    endTag: '}{}',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 6,
    shiftFromStart: true,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'simpleFormatter',
  },
];
