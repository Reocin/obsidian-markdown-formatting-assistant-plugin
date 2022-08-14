import { Editor } from 'obsidian';
import { headerFormatter } from './headerFormatter';
import { listFormatter } from './listFormatter';
import { simpleFormatter } from './simpleFormatter';

export interface textEditCommand {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconType: string;
  group: string;

  startTag: string;
  endTag: string;
  arguments: Array<{ pos: number; value: string }>;

  tagsOnOwnLine: boolean;
  shiftFromStartOrEnd: number;
  shiftFromStart: boolean;

  isDefaultCommand: boolean;
  isFavorite: boolean;
  formatter: string;
}

const formatters = {
  simpleFormatter,
  headerFormatter,
  listFormatter,
};

export function startFormatter(editor: Editor, item: textEditCommand) {
  // @ts-ignore
  return formatters[item.formatter](editor, item);
}
