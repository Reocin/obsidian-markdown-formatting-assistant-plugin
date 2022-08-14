import { Editor } from 'obsidian';
import * as R from 'ramda';
import { textEditCommand } from './formatters';

export function headerFormatter(editor: Editor, item: textEditCommand) {
  const curserStart = editor.getCursor('from');
  const line = editor.getLine(curserStart.line);

  // To delete the headings if the same heading is clicked twice
  const reStringExact = '^\\s*' + item.startTag + '+\\s*';
  const reStringAny = '^\\s*#+\\s*';
  const cleanedLine = line.replace(new RegExp(reStringAny, 'g'), '');
  let replacement = item.startTag + cleanedLine;

  if (new RegExp(reStringExact, 'g').test(line)) {
    replacement = cleanedLine;
  }

  // replace the hole line with the updated new line
  editor.replaceRange(
    replacement,
    { line: curserStart.line, ch: 0 },
    { line: curserStart.line, ch: line.length },
  );

  // Calculate the shift of the course depending on how many # are in the old and new line
  const oldNumberOfHeadings = R.match(/([#])/g, line).length;
  const newNumberOfHeadings = R.match(/([#])/g, replacement).length;
  let courserCorrection = newNumberOfHeadings - oldNumberOfHeadings;

  // If the old or the new line doesn't contain any heading than the course correction has to be corrected by the space after the # (### sdfsd)
  if (newNumberOfHeadings === 0) courserCorrection -= 1;
  if (oldNumberOfHeadings === 0) courserCorrection += 1;

  // finally set the new course position

  editor.setCursor(curserStart.line, curserStart.ch + courserCorrection);
}
