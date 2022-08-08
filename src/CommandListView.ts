import { App, Editor, Notice, SuggestModal } from 'obsidian';
import { baseFormatterSetting, iconFormatter } from './formatter';
import { formatSettings, formatterSetting } from './formatter';
import * as R from 'ramda';
import { svgToElement } from './icons';
import {
  greekLowerCaseFormatterSettings,
  greekUpperCaseFormatterSettings,
  greekFormatter,
} from './greekFormatter';
import { latexFormatterSettings, latexFormatter } from './latexFormatter';
import { htmlFormatterSettings, htmlFormatter } from './htmlFormatter';

const suggestions = R.values(formatSettings).concat(
  // @ts-ignore
  R.values(htmlFormatterSettings),
  R.values(latexFormatterSettings),
  R.values(greekLowerCaseFormatterSettings),
  R.values(greekUpperCaseFormatterSettings),
);

export class CodeSuggestionModal extends SuggestModal<baseFormatterSetting> {
  private editor: Editor;

  public setEditor = (editor: Editor) => {
    this.editor = editor;
  };

  // Returns all available suggestions.
  getSuggestions(query: string): baseFormatterSetting[] {
    const filterFunction = (setting: baseFormatterSetting) =>
      setting.des.toLowerCase().includes(query.toLowerCase());
    // @ts-ignore
    return R.values(R.filter(filterFunction, suggestions));
  }

  // Renders each suggestion item.
  renderSuggestion(
    baseFormatterSetting: baseFormatterSetting,
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
    cell2.setText(baseFormatterSetting.des);

    console.log(baseFormatterSetting.objectType);
    if (baseFormatterSetting.objectType === 'formatterSetting') {
      iconDiv.appendChild(svgToElement(baseFormatterSetting.icon));
      cell2.style.color = '#c7254e';
    } else if (baseFormatterSetting.objectType === 'htmlFormatterSetting') {
      iconDiv.appendText('HTML');
      cell2.style.color = '#0055F2';
    } else if (baseFormatterSetting.objectType === 'greekFormatterSetting') {
      iconDiv.appendChild(svgToElement(baseFormatterSetting.icon));
      cell2.style.color = '#25e712';
    } else if (baseFormatterSetting.objectType === 'latexFormatterSetting') {
      const item = baseFormatterSetting;
      if (item.type === 'icon') {
        let svg = svgToElement(item.text);
        svg.style.display = 'inline-block';
        svg.style.verticalAlign = 'middle';
        iconDiv.appendChild(svg);
      } else if (item.type === 'text') {
        let div = document.createElement('div');
        div.innerHTML = item.text;
        iconDiv.appendChild(div);
      }
      cell2.style.color = '#25e712';
    } else {
      iconDiv.appendText('HTML');
    }
  }

  // Perform action on the selected suggestion.
  onChooseSuggestion(
    baseFormatterSetting: baseFormatterSetting,
    evt: MouseEvent | KeyboardEvent,
  ) {
    // @ts-ignore
    const item = baseFormatterSetting;

    console.log(baseFormatterSetting);
    if (item.objectType === 'formatterSetting') {
      // @ts-ignore
      iconFormatter(this.editor, item);
    } else if (item.objectType === 'htmlFormatterSetting') {
      // @ts-ignore
      htmlFormatter(this.editor, item);
    } else if (item.objectType === 'latexFormatterSetting') {
      // @ts-ignore
      latexFormatter(this.editor, item);
    } else if (item.objectType === 'greekFormatterSetting') {
      // @ts-ignore
      greekFormatter(this.editor, item);
    }

    // new Notice(`Selected ${baseFormatterSetting.des}`);
  }

  public static display = (app: App, editor: Editor): void => {
    const modal = new CodeSuggestionModal(app);
    modal.setEditor(editor);
    modal.open();
  };
}
