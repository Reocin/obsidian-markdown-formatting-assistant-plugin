import { commandsGreekLettersLowercase } from './CommandsGreekLettersLowercase';
import { commandsGreekLettersUppercase } from './CommandsGreekLettersUppercase';
import { commandsHtml } from './CommandsHtml';
import { commandsMarkdown } from './CommandsMarkdown';
import { commandsLatex } from './CommandsLatex';

export const textEditCommands = [
  ...commandsMarkdown,
  ...commandsHtml,
  ...commandsLatex,
  ...commandsGreekLettersLowercase,
  ...commandsGreekLettersUppercase,
];
