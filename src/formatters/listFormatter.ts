import { Editor } from 'obsidian';
import { textEditCommand } from './formatters';

export function listFormatter(editor: Editor, item: textEditCommand) {
  let selection = editor.getSelection();

  const reString = ('^(\\s*)(' + item.startTag + ')(\\s*)')
    .replace('[', '\\[')
    .replace(']', '\\]');
  const re = new RegExp(reString);

  const selectionLines = selection.split('\n');

  const convertedSelectionLines = selectionLines.map((newLine) => {
    const match = newLine.match(re);
    if (!match) {
      let indent = match.length > 0 ? match[1] : '';
      return indent + item.startTag + newLine.trim();
    } else {
      return newLine;
    }
  });
  editor.replaceSelection(convertedSelectionLines.join('\n'));
}
