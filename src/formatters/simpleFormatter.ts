import { Editor } from 'obsidian';
import * as R from 'ramda';
import { textEditCommand } from './formatters';

export function simpleFormatter(editor: Editor, item: textEditCommand) {
  let selection = editor.getSelection();
  const curserStart = editor.getCursor('from');
  const line = editor.getLine(curserStart.line);
  let prefix = '';
  let shift = 0;

  if (item.replaceSelectionTo) selection = item.replaceSelectionTo;

  if (item.shiftFromStart) {
    shift = item.shiftFromStartOrEnd;
  } else {
    shift =
      item.startTag.length +
      selection.length +
      item.endTag.length -
      item.shiftFromStartOrEnd;
  }

  if (item.tagsOnOwnLine) {
    selection = '\n' + selection + '\n';
    if (!selection && line.trim()) prefix = '\n';
  }
  let newContent = item.startTag + selection + item.endTag;

  const reverseSortedArguments = R.reverse(
    R.sortBy(R.prop('pos'), item.arguments),
  );
  reverseSortedArguments.forEach((arg) => {
    newContent =
      newContent.substring(0, arg.pos) +
      arg.value +
      newContent.substring(arg.pos);
  });

  editor.replaceSelection(prefix + newContent);
  editor.setCursor(curserStart.line, curserStart.ch + shift);
}
