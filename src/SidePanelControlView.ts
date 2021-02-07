import { svgToElement } from './icons';
import { iconFormatter, formatSettings, formatterSetting } from './formatter';
import {
  htmlFormatter,
  htmlFormatterSettings,
  htmlFormatterSetting,
} from './htmlFormatter';
import { ItemView, MarkdownView, Notice, TFile, WorkspaceLeaf } from 'obsidian';

export const SidePanelControlViewType = 'side-panel-control-view';

export class SidePanelControlView extends ItemView {
  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  public getViewType(): string {
    return SidePanelControlViewType;
  }

  public getDisplayText(): string {
    return 'Markdown-Autocomplete';
  }

  public getIcon(): string {
    return 'viewIcon';
  }

  public load(): void {
    super.load();
    this.draw();
  }

  private readonly draw = (): void => {
    const container = this.containerEl.children[1];

    const rootEl = document.createElement('div');

    const mainDiv = rootEl.createDiv({ cls: 'nav-header' });

    // Text Edit Section
    let header = mainDiv.createEl('h4');
    header.appendText('Text Edit');
    header.style.textAlign = 'center';
    header.style.marginTop = '10px';
    header.style.marginBottom = '5px';

    let hr = mainDiv.createEl('hr');
    hr.style.marginTop = '0px';
    hr.style.marginBottom = '10px';

    this.addTextEditButtons(mainDiv);

    // Table Section
    header = mainDiv.createEl('h4');
    header.appendText('Tables');
    header.style.textAlign = 'center';
    header.style.marginTop = '20px';
    header.style.marginBottom = '5px';

    hr = mainDiv.createEl('hr');
    hr.style.marginTop = '0px';
    hr.style.marginBottom = '10px';

    const info = mainDiv.createEl('p');
    info.appendText('upcoming ...');
    info.style.textAlign = 'center';

    // HTML Section
    header = mainDiv.createEl('h4');
    header.appendText('HTML');
    header.style.textAlign = 'center';
    header.style.marginTop = '20px';
    header.style.marginBottom = '5px';

    hr = mainDiv.createEl('hr');
    hr.style.marginTop = '0px';
    hr.style.marginBottom = '10px';

    const addClickEvent = (btn: HTMLElement, type: string) => {
      btn.onClickEvent(() => {
        // @ts-ignore
        const formatterSetting = htmlFormatterSettings[type];

        const leaf = this.app.workspace.activeLeaf;
        let editor = null;
        if (leaf.view instanceof MarkdownView) {
          editor = leaf.view.sourceMode.cmEditor;
          htmlFormatter(editor, formatterSetting);
        }
      });
    };

    const numberOfCols = 3;
    let row: HTMLElement = null;
    Object.keys(htmlFormatterSettings).forEach((key, index) => {
      // @ts-ignore
      const item = htmlFormatterSettings[key];
      if (index % numberOfCols === 0) {
        row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
      }

      let button = row.createDiv({ cls: 'nav-action-button' });
      addClickEvent(button, key);
      button.appendText(item.des);
      button.style.border = '1px solid';
      button.style.margin = '4px';
      button.style.padding = '5px';
      button.style.textAlign = 'center';
      button.style.width = '70px';
    });

    container.empty();
    container.appendChild(rootEl);
  };

  private addTextEditButtons(mainDiv: HTMLElement) {
    const addClickEvent = (btn: HTMLElement, type: string) => {
      btn.onClickEvent(() => {
        // @ts-ignore
        const formatterSetting = formatSettings[type];

        const leaf = this.app.workspace.activeLeaf;
        let editor = null;
        if (leaf.view instanceof MarkdownView) {
          editor = leaf.view.sourceMode.cmEditor;
          iconFormatter(editor, formatterSetting);
        }
      });
    };

    let row = mainDiv.createDiv({ cls: 'nav-buttons-container' });

    for (let icon of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']) {
      const button = row.createDiv({ cls: 'nav-action-button' });
      addClickEvent(button, icon);
      button.appendChild(svgToElement(icon));
    }

    row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
    let button = row.createDiv({ cls: 'nav-action-button' });
    addClickEvent(button, 'bold');
    button.appendChild(svgToElement('bold'));

    button = row.createDiv({ cls: 'nav-action-button' });
    addClickEvent(button, 'italic');
    button.appendChild(svgToElement('italic'));

    button = row.createDiv({ cls: 'nav-action-button' });
    addClickEvent(button, 'strikethrough');
    button.appendChild(svgToElement('strikethrough'));

    row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
    button = row.createDiv({ cls: 'nav-action-button' });
    addClickEvent(button, 'codeInline');
    button.appendChild(svgToElement('codeInline'));

    button = row.createDiv({ cls: 'nav-action-button' });
    addClickEvent(button, 'codeBlock');
    button.appendChild(svgToElement('codeBlock'));

    button = row.createDiv({ cls: 'nav-action-button' });
    addClickEvent(button, 'link');
    button.appendChild(svgToElement('link'));

    button = row.createDiv({ cls: 'nav-action-button' });
    addClickEvent(button, 'internalLink');
    button.appendChild(svgToElement('fileLink'));

    button = row.createDiv({ cls: 'nav-action-button' });
    addClickEvent(button, 'blockquote');
    button.appendChild(svgToElement('quote'));

    button = row.createDiv({ cls: 'nav-action-button' });
    addClickEvent(button, 'image');
    button.appendChild(svgToElement('image'));

    row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
    button = row.createDiv({ cls: 'nav-action-button' });
    addClickEvent(button, 'bulletList');
    button.appendChild(svgToElement('bulletList'));

    button = row.createDiv({ cls: 'nav-action-button' });
    addClickEvent(button, 'numberList');
    button.appendChild(svgToElement('numberList'));

    button = row.createDiv({ cls: 'nav-action-button' });
    addClickEvent(button, 'checkList');
    button.appendChild(svgToElement('checkList'));
  }
}
