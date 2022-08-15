import { textEditCommand } from '../formatters/formatters';

export const commandsHtml: textEditCommand[] = [
  {
    id: '<br/>',
    title: '<br/>',
    description: 'HTML line break',
    icon: '<br/>',
    iconType: 'text',
    group: 'HTML',

    startTag: '<br/>',
    endTag: '',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 5,
    shiftFromStart: true,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'simpleFormatter',
  },
  {
    id: '<div>',
    title: '<div></div>',
    description: 'HTML <div>',
    icon: '<div>',
    iconType: 'text',
    group: 'HTML',

    startTag: '<div>',
    endTag: '</div>',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 5,
    shiftFromStart: true,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'simpleFormatter',
  },
  {
    id: '<img>',
    title: '<img></img>',
    description: 'HTML <img>',
    icon: '<img>',
    iconType: 'text',
    group: 'HTML',

    startTag: '<img src="" alt="" width="" height="">',
    endTag: '</img>',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 10,
    shiftFromStart: true,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'simpleFormatter',
  },
  {
    id: '<a>',
    title: '<a></a>',
    description: 'HTML <a>',
    icon: '<a>',
    iconType: 'text',
    group: 'HTML',

    startTag: '<a href="">',
    endTag: '</a>',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 9,
    shiftFromStart: true,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'simpleFormatter',
  },
  {
    id: '<p>',
    title: '<p></p>',
    description: 'HTML <p>',
    icon: '<p>',
    iconType: 'text',
    group: 'HTML',

    startTag: '<p>',
    endTag: '</p>',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 3,
    shiftFromStart: true,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'simpleFormatter',
  },
  {
    id: '<details>',
    title: '<details></details>',
    description: 'HTML <details>',
    icon: '<details>',
    iconType: 'text',
    group: 'HTML',

    startTag: '<details>',
    endTag: '</details>',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 9,
    shiftFromStart: true,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'simpleFormatter',
  },
  {
    id: '<summary>',
    title: '<summary></summary>',
    description: 'HTML <summary>',
    icon: '<summary>',
    iconType: 'text',
    group: 'HTML',

    startTag: '<summary>',
    endTag: '</summary>',
    arguments: [],

    tagsOnOwnLine: false,
    shiftFromStartOrEnd: 9,
    shiftFromStart: true,

    isDefaultCommand: true,
    isFavorite: true,
    formatter: 'simpleFormatter',
  },
];
