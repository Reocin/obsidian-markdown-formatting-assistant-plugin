import { textEditCommand } from '../formatters/formatters';

export const commandsMarkdown: textEditCommand[] = [
  {
    id: 'h1',
    title: 'H1',
    description: 'Convert the line to a title of level 1',
    icon: 'h1',
    iconType: 'mdiIcon',
    group: 'Markdown',

    startTag: '# ',
    endTag: '',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 0,
    shiftFromStart: true,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'headerFormatter',
  },
  {
    id: 'h2',
    title: 'H2',
    description: 'Convert the line to a title of level 2',
    icon: 'h2',
    iconType: 'mdiIcon',
    group: 'Markdown',

    startTag: '## ',
    endTag: '',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 0,
    shiftFromStart: true,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'headerFormatter',
  },
  {
    id: 'h3',
    title: 'H3',
    description: 'Convert the line to a title of level 3',
    icon: 'h3',
    iconType: 'mdiIcon',
    group: 'Markdown',

    startTag: '### ',
    endTag: '',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 0,
    shiftFromStart: true,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'headerFormatter',
  },
  {
    id: 'h4',
    title: 'H4',
    description: 'Convert the line to a title of level 4',
    icon: 'h4',
    iconType: 'mdiIcon',
    group: 'Markdown',

    startTag: '#### ',
    endTag: '',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 0,
    shiftFromStart: true,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'headerFormatter',
  },
  {
    id: 'h5',
    title: 'H5',
    description: 'Convert the line to a title of level 5',
    icon: 'h5',
    iconType: 'mdiIcon',
    group: 'Markdown',

    startTag: '##### ',
    endTag: '',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 0,
    shiftFromStart: true,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'headerFormatter',
  },
  {
    id: 'h6',
    title: 'H6',
    description: 'Convert the line to a title of level 6',
    icon: 'h6',
    iconType: 'mdiIcon',
    group: 'Markdown',

    startTag: '###### ',
    endTag: '',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 0,
    shiftFromStart: true,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'headerFormatter',
  },
  {
    id: 'bold',
    title: 'Bold',
    description: 'Makes the selected characters bold',
    icon: 'bold',
    iconType: 'mdiIcon',
    group: 'Markdown',

    startTag: '**',
    endTag: '**',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 2,
    shiftFromStart: true,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'simpleFormatter',
  },
  {
    id: 'italic',
    title: 'Italic',
    description: 'Makes the selected characters italic',
    icon: 'italic',
    iconType: 'mdiIcon',
    group: 'Markdown',

    startTag: '*',
    endTag: '*',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 1,
    shiftFromStart: true,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'simpleFormatter',
  },
  {
    id: 'underline',
    title: 'Underline',
    description: 'Underlines the selected characters',
    icon: 'underline',
    iconType: 'mdiIcon',
    group: 'Markdown',

    startTag: '<u>',
    endTag: '</u>',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 3,
    shiftFromStart: true,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'simpleFormatter',
  },
  {
    id: 'strikethrough',
    title: 'Strikethrough',
    description: 'Strikethrough the selected characters',
    icon: 'strikethrough',
    iconType: 'mdiIcon',
    group: 'Markdown',

    startTag: '~~',
    endTag: '~~',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 2,
    shiftFromStart: true,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'simpleFormatter',
  },
  {
    id: 'highlight',
    title: 'Highlight',
    description: 'Highlights the selected characters',
    icon: 'strikethrough',
    iconType: 'mdiIcon',
    group: 'Markdown',

    startTag: '==',
    endTag: '==',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 2,
    shiftFromStart: true,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'simpleFormatter',
  },
  {
    id: 'code_block',
    title: 'Code Block',
    description: 'Converts the selected characters / lines into an code block',
    icon: 'codeBlock',
    iconType: 'mdiIcon',
    group: 'Markdown',

    startTag: '```',
    endTag: '```',
    arguments: [],

    tagsOnOwnLine: true,
    shiftFromStartOrEnd: 3,
    shiftFromStart: true,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'simpleFormatter',
  },
  {
    id: 'mermaid_block',
    title: 'Mermaid Block',
    description:
      'Converts the selected characters / lines into an Mermaid block. Obsidian uses Mermaid to render diagrams and charts. Mermaid also provides a helpful live editor.',
    icon: 'mermaidBlock',
    iconType: 'mdiIcon',
    group: 'Markdown',

    startTag: '```',
    endTag: '```',
    arguments: [{ pos: 3, value: 'mermaid' }],

    tagsOnOwnLine: true,
    shiftFromStartOrEnd: 10,
    shiftFromStart: true,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'simpleFormatter',
  },
  {
    id: 'code_inline',
    title: 'Code Inline',
    description: 'Selected characters line will be formatted like code.',
    icon: 'codeInline',
    iconType: 'mdiIcon',
    group: 'Markdown',

    startTag: '`',
    endTag: '`',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 1,
    shiftFromStart: true,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'simpleFormatter',
  },
  {
    id: 'external_link',
    title: 'Insert external Link',
    description: 'Inserts an formatting for external links.',
    icon: 'link',
    iconType: 'mdiIcon',
    group: 'Markdown',

    startTag: '[',
    endTag: ']()',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 1,
    shiftFromStart: false,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'simpleFormatter',
  },
  {
    id: 'internal_link',
    title: 'Insert internal Link',
    description: 'Inserts an formatting for internal links.',
    icon: 'fileLink',
    iconType: 'mdiIcon',
    group: 'Markdown',

    startTag: '[[',
    endTag: ']]',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 2,
    shiftFromStart: true,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'simpleFormatter',
  },
  {
    id: 'image',
    title: 'Insert Image',
    description: 'Inserts an formatting for images.',
    icon: 'image',
    iconType: 'mdiIcon',
    group: 'Markdown',

    startTag: '![',
    endTag: ']()',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 1,
    shiftFromStart: false,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'simpleFormatter',
  },
  {
    id: 'blockquote',
    title: 'Insert Blockquote',
    description: 'Inserts an formatting for Blockquote.',
    icon: 'quote',
    iconType: 'mdiIcon',
    group: 'Markdown',

    startTag: '> ',
    endTag: '',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 2,
    shiftFromStart: false,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'listFormatter',
  },
  {
    id: 'bullet_list',
    title: 'Insert Bullet List',
    description: 'Inserts an formatting for Blockquote.',
    icon: 'bulletList',
    iconType: 'mdiIcon',
    group: 'Markdown',

    startTag: '- ',
    endTag: '',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 2,
    shiftFromStart: false,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'listFormatter',
  },
  {
    id: 'number_list',
    title: 'Insert Number List',
    description: 'Inserts an formatting for Number List.',
    icon: 'numberList',
    iconType: 'mdiIcon',
    group: 'Markdown',

    startTag: '1. ',
    endTag: '',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 3,
    shiftFromStart: false,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'listFormatter',
  },
  {
    id: 'check_list',
    title: 'Insert Check List',
    description: 'Inserts an formatting for Check List.',
    icon: 'checkList',
    iconType: 'mdiIcon',
    group: 'Markdown',

    startTag: '- [ ] ',
    endTag: '',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 6,
    shiftFromStart: false,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'listFormatter',
  },
];
