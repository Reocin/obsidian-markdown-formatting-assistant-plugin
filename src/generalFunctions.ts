import { MarkdownView, WorkspaceLeaf } from 'obsidian';

export function checkIfSelection(editor: CodeMirror.Editor) {
  const selection = editor.getSelection();
  if (!selection || selection === '') {
    return false;
  } else {
    return true;
  }
}

export function checkIfMarkdownSource(leaf: WorkspaceLeaf) {
  return (
    // @ts-ignore
    leaf.view instanceof MarkdownView && leaf.view.currentMode.type === 'source'
  );
}
