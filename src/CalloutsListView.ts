import { App, Editor, Notice, SuggestModal } from 'obsidian';
import { calloutsFormatterSetting } from './calloutsFormatter';
import * as R from 'ramda';
import { setIcon } from "obsidian";
import { calloutsFormatterSettings, calloutsFormatter } from './calloutsFormatter';

const suggestions = R.values(calloutsFormatterSettings);

export class CalloutsSuggestionModal extends SuggestModal<calloutsFormatterSetting> {
  private editor: Editor;

  public setEditor = (editor: Editor) => {
    this.editor = editor;
  };

  // Returns all available suggestions.
  getSuggestions(query: string): calloutsFormatterSetting[] {
    const filterFunction = (setting: calloutsFormatterSetting) =>
      setting.des.toLowerCase().includes(query.toLowerCase());
    // @ts-ignore
    return R.values(R.filter(filterFunction, suggestions));
  }

  // Renders each suggestion item.
  renderSuggestion(
    calloutsFormatterSetting: calloutsFormatterSetting,
    el: HTMLElement,
  ) {
    const row = el.createEl('div');
    row.classList.add('command-list-view-row');
    const iconContainer = row.createDiv();
    iconContainer.classList.add('command-list-view-container');
    const iconDiv = iconContainer.createDiv();
    iconDiv.classList.add('command-list-view-icon');

    const cell2 = row.createDiv();
    cell2.classList.add('command-list-view-text');
    cell2.setText(calloutsFormatterSetting.des);
    cell2.style.color = 'var(--text-muted)';

    const spanIcon = document.createElement('span');
    spanIcon.style.verticalAlign = 'middle';
    spanIcon.style.color = calloutsFormatterSetting.color;
    //iconDiv.style.backgroundColor = calloutsFormatterSetting.bgColor;

    setIcon(spanIcon, calloutsFormatterSetting.icon);
    iconDiv.appendChild(spanIcon);
    row.style.backgroundColor = calloutsFormatterSetting.bgColor;
  }

  // Perform action on the selected suggestion.
  onChooseSuggestion(
    calloutsFormatterSetting: calloutsFormatterSetting,
    evt: MouseEvent | KeyboardEvent,
  ) {
    // @ts-ignore
    const item = calloutsFormatterSetting;
    calloutsFormatter(this.editor, item);

    // new Notice(`Selected ${calloutsFormatterSetting.des}`);
  }

  public static display = (app: App, editor: Editor): void => {
    const modal = new CalloutsSuggestionModal(app);
    modal.setEditor(editor);
    modal.open();
  };
}
