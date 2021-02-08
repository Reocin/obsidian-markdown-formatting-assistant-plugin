import { svgToElement } from './icons';
import { iconFormatter, formatSettings, formatterSetting } from './formatter';
import {
  htmlFormatter,
  htmlFormatterSettings,
  htmlFormatterSetting,
} from './htmlFormatter';
import { ItemView, MarkdownView, Notice, TFile, WorkspaceLeaf } from 'obsidian';
import * as R from 'ramda';
import MarkdownAutocompletePlugin from './main';

export const SidePanelControlViewType = 'side-panel-control-view';

export class SidePanelControlView extends ItemView {
  private static lastColors: Array<string> = ['#ff0000'];
  private plugin: MarkdownAutocompletePlugin;
  private dragStartColor: string;

  constructor(leaf: WorkspaceLeaf, plugin: MarkdownAutocompletePlugin) {
    super(leaf);
    this.plugin = plugin;
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

  private draw(): void {
    const container = this.containerEl.children[1];

    const rootEl = document.createElement('div');

    const mainDiv = rootEl.createDiv({ cls: 'nav-header' });

    // --------------
    // Text Edit Section
    // --------------
    let header = mainDiv.createEl('h4');
    header.appendText('Text Edit');
    header.style.textAlign = 'center';
    header.style.marginTop = '10px';
    header.style.marginBottom = '5px';

    let hr = mainDiv.createEl('hr');
    hr.style.marginTop = '0px';
    hr.style.marginBottom = '10px';

    this.addTextEditButtons(mainDiv);

    // --------------
    // Table Section
    // --------------
    header = mainDiv.createEl('h4');
    header.appendText('Tables');
    header.style.textAlign = 'center';
    header.style.marginTop = '20px';
    header.style.marginBottom = '5px';

    hr = mainDiv.createEl('hr');
    hr.style.marginTop = '0px';
    hr.style.marginBottom = '10px';

    let info = mainDiv.createEl('p');
    info.appendText('upcoming ...');
    info.style.textAlign = 'center';

    // --------------
    // HTML Section
    // --------------
    header = mainDiv.createEl('h4');
    header.appendText('HTML');
    header.style.textAlign = 'center';
    header.style.marginTop = '20px';
    header.style.marginBottom = '5px';

    hr = mainDiv.createEl('hr');
    hr.style.marginTop = '0px';
    hr.style.marginBottom = '10px';

    this.addHtmlButtons(mainDiv);

    info = mainDiv.createEl('p');
    info.style.textAlign = 'center';
    info.style.marginTop = '10px';
    info.style.marginBottom = '10px';
    const link = info.createEl('a');
    link.appendText('Do you miss a Tag? report it!');
    link.style.textAlign = 'center';

    link.style.fontSize = '10px';
    link.href =
      'https://github.com/Reocin/obsidian-markdown-formatting-assistant-plugin/issues';

    // --------------
    // Colors
    // --------------
    header = mainDiv.createEl('h4');
    header.appendText('Colors');
    header.style.textAlign = 'center';
    header.style.marginTop = '20px';
    header.style.marginBottom = '5px';

    hr = mainDiv.createEl('hr');
    hr.style.marginTop = '0px';
    hr.style.marginBottom = '10px';

    this.addColorSection(mainDiv);

    container.empty();
    container.appendChild(rootEl);
  }

  private addHtmlButtons(mainDiv: HTMLElement) {
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

    R.sortBy(R.identity, R.keys(htmlFormatterSettings)).forEach(
      (key, index) => {
        // @ts-ignore
        const item = htmlFormatterSettings[key];
        if (index % numberOfCols === 0) {
          row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
        }

        let button = row.createDiv({ cls: 'nav-action-text-button' });
        addClickEvent(button, key);
        button.appendText(item.des);
      },
    );
  }

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

  private addColorSection(mainDiv: HTMLElement) {
    const insertColor = (color: string) => {
      const leaf = this.app.workspace.activeLeaf;
      let editor = null;
      if (leaf.view instanceof MarkdownView) {
        editor = leaf.view.sourceMode.cmEditor;
        editor.focus();
        const curserStart = editor.getCursor('from');
        editor.replaceRange(color, curserStart);
        editor.setCursor(curserStart);
      }
    };

    const drawLastSelectedColorIcons = (container: HTMLElement = null) => {
      if (!container)
        container = document.getElementById('lastSelectedColorsDiv');
      container.textContent = '';
      R.reverse(SidePanelControlView.lastColors).forEach((color) => {
        const colorBox = container.createDiv();
        colorBox.classList.add('color-icon');
        colorBox.style.backgroundColor = color;

        colorBox.onClickEvent((ev) => {
          if (ev.type === 'click') {
            insertColor(color);
          } else {
            SidePanelControlView.lastColors = R.without(
              [color],
              SidePanelControlView.lastColors,
            );
            drawLastSelectedColorIcons();
          }
        });
      });
    };

    const drawLastSavedColorIcons = (container: HTMLElement = null) => {
      if (!container) container = document.getElementById('lastSavedColorsDiv');

      container.textContent = '';
      R.reverse(this.plugin.settings.savedColors).forEach((color) => {
        const colorBox = container.createDiv();
        colorBox.id = 'lastSavedColorsDiv' + color;
        colorBox.classList.add('color-icon');
        colorBox.style.backgroundColor = color;
        colorBox.draggable = true;

        colorBox.onClickEvent(async (ev) => {
          if (ev.type === 'click') {
            insertColor(color);
          } else {
            this.plugin.settings.savedColors = R.without(
              [color],
              this.plugin.settings.savedColors,
            );
            await this.plugin.saveSettings();
            drawLastSavedColorIcons();
          }
        });
        colorBox.ondragstart = (event) => {
          // @ts-ignore
          this.dragStartColor = event.target.id.replace(
            'lastSavedColorsDiv',
            '',
          );
        };
        colorBox.ondrop = async (event) => {
          if (event && event.target) {
            // @ts-ignore
            const id = event.target.id;
            if (id.indexOf('lastSavedColorsDiv') === 0) {
              const startColor = this.dragStartColor;
              const endColor = id.replace('lastSavedColorsDiv', '');

              const startIndex = R.indexOf(
                startColor,
                this.plugin.settings.savedColors,
              );
              const endIndex = R.indexOf(
                endColor,
                this.plugin.settings.savedColors,
              );
              this.plugin.settings.savedColors[startIndex] = endColor;
              this.plugin.settings.savedColors[endIndex] = startColor;
              await this.plugin.saveSettings();
              drawLastSavedColorIcons();
            }
          }
        };
        colorBox.ondragover = (event) => {
          event.preventDefault();
        };
      });
    };

    const colorSection = mainDiv.createDiv();
    const colorSelector = colorSection.createDiv();
    colorSelector.style.backgroundColor = R.last(
      SidePanelControlView.lastColors,
    );
    colorSelector.style.height = '16px';
    colorSelector.style.borderRadius = '8px';
    colorSelector.style.padding = '5px';
    colorSelector.style.margin = '4px';
    colorSelector.style.marginBottom = '10px';
    const colorInput = colorSelector.createEl('input');
    colorInput.id = 'colorInput';
    colorInput.type = 'color';
    colorInput.value = R.last(SidePanelControlView.lastColors);
    colorInput.style.visibility = 'hidden';
    colorInput.style.padding = '0';
    colorInput.style.margin = '0';
    // colorInput.style.display = 'block';
    // colorInput.style.opacity = '0';
    colorInput.addEventListener('input', (ev) => {
      // @ts-ignore
      const color = ev.target.value;
      colorSelector.style.backgroundColor = color;
    });
    colorInput.addEventListener(
      'change',
      (ev) => {
        // @ts-ignore
        const color = ev.target.value;
        // @ts-ignore
        SidePanelControlView.lastColors = R.pipe(
          R.without([color]),
          R.append(color),
          R.takeLast(10),
        )(SidePanelControlView.lastColors);
        drawLastSelectedColorIcons();
        insertColor(color);
        colorSelector.style.backgroundColor = color;

        navigator.clipboard.writeText(color).then(
          () => {
            // @ts-ignore
            new Notice('Copied ' + color + ' to clipboard');
          },
          () => {
            new Notice('Could not copy the color to clipboard');
          },
        );
      },
      false,
    );

    const colorButton = colorSection.createEl('label');
    colorButton.classList.add('nav-action-text-button');
    colorButton.appendText('Select a Color');
    colorButton.style.display = 'block';
    colorButton.htmlFor = 'colorInput';

    const colorSaveButton = colorSection.createEl('div');
    colorSaveButton.classList.add('nav-action-text-button');
    colorSaveButton.appendText('Save Color');
    colorSaveButton.style.display = 'block';
    colorSaveButton.onClickEvent(async (ev) => {
      const color = R.last(SidePanelControlView.lastColors);
      this.plugin.settings.savedColors = R.pipe(
        R.without([color]),
        R.append(color),
      )(this.plugin.settings.savedColors);
      drawLastSavedColorIcons();
      await this.plugin.saveSettings();
    });

    const lastSelectedColorsTitle = colorSection.createEl('p');
    lastSelectedColorsTitle.appendText('Last used colors:');
    lastSelectedColorsTitle.style.marginBottom = '0px';

    const lastSelectedColors = colorSection.createEl('div');
    lastSelectedColors.id = 'lastSelectedColorsDiv';
    lastSelectedColors.style.display = 'flex';

    drawLastSelectedColorIcons(lastSelectedColors);

    const lastSavedColorsTitle = colorSection.createEl('p');
    lastSavedColorsTitle.appendText('Saved Colors:');
    lastSavedColorsTitle.style.marginBottom = '0px';

    const lastSavedColors = colorSection.createEl('div');
    lastSavedColors.id = 'lastSavedColorsDiv';
    lastSavedColors.style.display = 'flex';

    drawLastSavedColorIcons(lastSavedColors);
  }
}
