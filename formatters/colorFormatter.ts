import { checkIfSelection } from '../src/generalFunctions';

export function colorFormatter(editor: CodeMirror.Editor, color: string) {
  if (editor) {
    const isSelection = checkIfSelection(editor);
    const selection = editor.getSelection();
    const curserStart = editor.getCursor('from');
    const curserEnd = editor.getCursor('to');
    const line = editor.getLine(curserStart.line);

    editor.focus();

    if (isSelection) {
      let replacment = selection.trim();

      editor.replaceSelection(color);
      editor.setCursor(curserStart);
    } else {
      editor.replaceRange(color, curserStart);
      editor.setCursor(curserStart);
    }
  }
}
