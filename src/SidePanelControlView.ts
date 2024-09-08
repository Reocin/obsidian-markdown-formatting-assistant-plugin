import { svgToElement } from './icons';
import { setIcon } from "obsidian";
import { iconFormatter, formatSettings, formatterSetting } from './formatter';
import {
  htmlFormatter,
  htmlFormatterSettings,
  htmlFormatterSetting,
} from './htmlFormatter';
import {
  greekFormatter,
  greekLowerCaseFormatterSettings,
  greekUpperCaseFormatterSettings,
  greekFormatterSetting,
} from './greekFormatter';
import {
  latexFormatter,
  latexFormatterSettings,
  latexFormatterSetting,
} from './latexFormatter';
import {
  calloutsFormatter,
  calloutsFormatterSettings,
  calloutsFormatterSetting,
} from './calloutsFormatter';
import { colorFormatter } from '../formatters/colorFormatter';
import {
  ButtonComponent,
  ItemView,
  Notice,
  TFile,
  WorkspaceLeaf,
} from 'obsidian';

import * as R from 'ramda';
import MarkdownAutocompletePlugin from './main';
import { checkIfMarkdownSource } from './generalFunctions';

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
    rootEl.id = 'SidePaneRootElement';

    this.drawContentOfRootElement(rootEl);

    container.empty();
    container.appendChild(rootEl);
  }

  private drawContentOfRootElement(rootEl: HTMLElement = null): void {
    if (!rootEl) rootEl = document.getElementById('SidePaneRootElement');
    rootEl.textContent = '';

    const getRegion = (name: string) => {
      return this.plugin.settings.regionSettings.find(
        (item) => item.name === name,
      );
    };

    const mainDiv = rootEl.createDiv({ cls: 'nav-header' });
    mainDiv.style.maxWidth = '300px';
    mainDiv.style.minWidth = '300px';

    // --------------
    // Text Edit Section
    // --------------

    const addTextEditSection = () => {
      let content = this.addSelectableHeader(mainDiv, 'textEdit', 'Text Edit');
      this.addTextEditButtons(content);
    };

    // --------------
    // Table Section
    // --------------
    const addTabelsSection = () => {
      const content = this.addSelectableHeader(mainDiv, 'tables', 'Tables');

      const info = content.createEl('p');
      info.appendText('upcoming ...');
      info.style.textAlign = 'center';
    };

    // --------------
    // HTML Section
    // --------------
    const addHtmlSection = () => {
      const content = this.addSelectableHeader(mainDiv, 'html', 'HTML');

      this.addHtmlButtons(content);

      const info = content.createEl('p');
      info.style.textAlign = 'center';
      info.style.marginTop = '10px';
      info.style.marginBottom = '10px';
      const link = info.createEl('a');
      link.appendText('Do you miss a Tag? report it!');
      link.style.textAlign = 'center';

      link.style.fontSize = '10px';
      link.href =
        'https://github.com/Reocin/obsidian-markdown-formatting-assistant-plugin/issues';
    };

    // --------------
    // Latex Section
    // --------------
    const addLatexSection = () => {
      const content = this.addSelectableHeader(mainDiv, 'latex', 'Latex');

      this.addLatexButtons(content);

      let info = content.createEl('p');
      info.style.textAlign = 'center';
      info.style.marginTop = '10px';
      info.style.marginBottom = '10px';
      let link = info.createEl('a');
      link.appendText('Introduction into latex mathematics');
      link.style.textAlign = 'center';
      link.style.fontSize = '10px';
      link.href = 'https://en.wikibooks.org/wiki/LaTeX/Mathematics';

      info = content.createEl('p');
      info.style.textAlign = 'center';
      info.style.marginTop = '10px';
      info.style.marginBottom = '10px';
      link = info.createEl('a');
      link.appendText('Do you miss a latex function? report it!');
      link.style.textAlign = 'center';

      link.style.fontSize = '10px';
      link.href =
        'https://github.com/Reocin/obsidian-markdown-formatting-assistant-plugin/issues';
    };
    // --------------
    // Greek Section
    // --------------
    const addGreekLettersSection = () => {
      const content = this.addSelectableHeader(
        mainDiv,
        'greekLetters',
        'Greek Letters',
      );

      let header = content.createEl('h5');
      header.appendText('Lower Case');
      header.style.textAlign = 'center';
      header.style.marginTop = '0px';
      header.style.marginBottom = '5px';

      this.addGreekLowerCaseLetters(content);

      header = content.createEl('h5');
      header.appendText('Upper Case');
      header.style.textAlign = 'center';
      header.style.marginTop = '10px';
      header.style.marginBottom = '5px';

      this.addGreekUpperCaseLetters(content);

      const info = content.createEl('p');
      info.style.textAlign = 'center';
      info.style.marginTop = '10px';
      info.style.marginBottom = '10px';
      const link = info.createEl('a');
      link.appendText('Overview of greek letters');
      link.style.textAlign = 'center';

      link.style.fontSize = '10px';
      link.href = 'https://en.wikipedia.org/wiki/Greek_alphabet';
    };

    // --------------
    // Colors
    // --------------
    const addColorsSection = () => {
      const content = this.addSelectableHeader(mainDiv, 'colors', 'Colors');
      this.addColorBody(content);
    };

    // --------------
    // Callouts
    // --------------

    const addCalloutsSection = () => {
      let content = this.addSelectableHeader(mainDiv, 'callouts', 'Callouts');
      this.addCalloutsButtons(content);
    };

    const regions = {
      textEdit: addTextEditSection,
      tables: addTabelsSection,
      html: addHtmlSection,
      latex: addLatexSection,
      greekLetters: addGreekLettersSection,
      colors: addColorsSection,
      callouts: addCalloutsSection,
    };

    this.plugin.settings.regionSettings.map((item) => {
      // @ts-ignore
      const regionFunction = regions[item.name];
      if (regionFunction && getRegion(item.name).active) regionFunction();
    });
  }

  private addHtmlButtons(mainDiv: HTMLElement) {
    const addClickEvent = (btn: HTMLElement, type: string) => {
      btn.onClickEvent(() => {
        // @ts-ignore
        const formatterSetting = htmlFormatterSettings[type];

        const leaf = this.app.workspace.getMostRecentLeaf();
        let editor = null;
        if (checkIfMarkdownSource(leaf)) {
          // @ts-ignore
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
//xxxxx
  private addCalloutsButtons(mainDiv: HTMLElement) {
    const addClickEvent = (btn: HTMLElement, type: string) => {
      btn.onClickEvent(() => {
        // @ts-ignore
        const formatterSetting = calloutsFormatterSettings[type];

        const leaf = this.app.workspace.getMostRecentLeaf();
        let editor = null;
        if (checkIfMarkdownSource(leaf)) {
          // @ts-ignore
          editor = leaf.view.sourceMode.cmEditor;
          calloutsFormatter(editor, formatterSetting);
        }
      });
    };

    const numberOfCols = 5;
    let row: HTMLElement = null;

    R.keys(calloutsFormatterSettings).forEach((key, index) => {
      // @ts-ignore
      const item = calloutsFormatterSettings[key];
      if (index === 0 || item.newLine) {
        row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
      }

      let button = row.createDiv({ cls: 'nav-action-text-button' });
      // @ts-ignore
      button.style.textJustify = 'center';
      button.style.textAlign = 'center';
      button.style.backgroundColor = item.bgColor;
      addClickEvent(button, key);
      
      const spanText = document.createElement('span');
      spanText.innerHTML = ' '+item.text;
      const spanIcon = document.createElement('span');
      setIcon(spanIcon, item.icon);
      spanIcon.style.verticalAlign = 'middle';
      spanIcon.style.color = item.color;
      button.appendChild(spanIcon);
      button.appendChild(spanText);
      
    });
  }

  private addLatexButtons(mainDiv: HTMLElement) {
    const addClickEvent = (btn: HTMLElement, type: string) => {
      btn.onClickEvent(() => {
        // @ts-ignore
        const formatterSetting = latexFormatterSettings[type];

        const leaf = this.app.workspace.getMostRecentLeaf();
        let editor = null;
        if (checkIfMarkdownSource(leaf)) {
          // @ts-ignore
          editor = leaf.view.sourceMode.cmEditor;
          latexFormatter(editor, formatterSetting);
        }
      });
    };

    const numberOfCols = 5;
    let row: HTMLElement = null;

    R.keys(latexFormatterSettings).forEach((key, index) => {
      // @ts-ignore
      const item = latexFormatterSettings[key];
      if (index === 0 || item.newLine) {
        row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
      }

      let button = row.createDiv({ cls: 'nav-action-text-button' });
      // @ts-ignore
      button.style.textJustify = 'center';
      button.style.textAlign = 'center';

      addClickEvent(button, key);

      if (item.type === 'icon') {
        let svg = svgToElement(item.text);
        svg.style.display = 'inline-block';
        svg.style.verticalAlign = 'middle';
        button.appendChild(svg);
      } else if (item.type === 'text') {
        let div = document.createElement('div');
        div.innerHTML = item.text;
        button.appendChild(div);
      }
    });
  }

  private addGreekLowerCaseLetters(mainDiv: HTMLElement) {
    const addClickEvent = (btn: HTMLElement, type: string) => {
      btn.onClickEvent(() => {
        // @ts-ignore
        const formatterSetting = greekLowerCaseFormatterSettings[type];

        const leaf = this.app.workspace.getMostRecentLeaf();
        let editor = null;
        if (checkIfMarkdownSource(leaf)) {
          // @ts-ignore
          editor = leaf.view.sourceMode.cmEditor;
          greekFormatter(editor, formatterSetting);
        }
      });
    };

    const numberOfCols = 5;
    let row: HTMLElement = null;

    R.keys(greekLowerCaseFormatterSettings).forEach((key, index) => {
      // @ts-ignore
      const item = greekLowerCaseFormatterSettings[key];
      if (index % numberOfCols === 0) {
        row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
      }

      let button = row.createDiv({ cls: 'nav-action-button' });
      addClickEvent(button, key);
      button.appendChild(svgToElement(item.icon));
    });
  }

  private addGreekUpperCaseLetters(mainDiv: HTMLElement) {
    const addClickEvent = (btn: HTMLElement, type: string) => {
      btn.onClickEvent(() => {
        // @ts-ignore
        const formatterSetting = greekUpperCaseFormatterSettings[type];

        const leaf = this.app.workspace.getMostRecentLeaf();
        let editor = null;
        if (checkIfMarkdownSource(leaf)) {
          // @ts-ignore
          editor = leaf.view.sourceMode.cmEditor;
          greekFormatter(editor, formatterSetting);
        }
      });
    };

    const numberOfCols = 5;
    let row: HTMLElement = null;

    R.keys(greekUpperCaseFormatterSettings).forEach((key, index) => {
      // @ts-ignore
      const item = greekUpperCaseFormatterSettings[key];
      if (index % numberOfCols === 0) {
        row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
      }

      let button = row.createDiv({ cls: 'nav-action-button' });
      addClickEvent(button, key);
      button.appendChild(svgToElement(item.icon));
    });
  }

  private addTextEditButtons(mainDiv: HTMLElement) {
    const addClickEvent = (btn: HTMLElement, type: string) => {
      btn.onClickEvent(() => {
        console.log('Clicked Button', btn, type);
        // @ts-ignore
        const formatterSetting = formatSettings[type];

        const leaf = this.app.workspace.getMostRecentLeaf();
        let editor = null;
        if (checkIfMarkdownSource(leaf)) {
          // @ts-ignore
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
    button.id = 'obsidianMarkdownFormattingAssistantPluginButtonBold';

    button = row.createDiv({ cls: 'nav-action-button' });
    addClickEvent(button, 'italic');
    button.appendChild(svgToElement('italic'));
    button.id = 'obsidianMarkdownFormattingAssistantPluginButtonItalic';

    button = row.createDiv({ cls: 'nav-action-button' });
    addClickEvent(button, 'strikethrough');
    button.appendChild(svgToElement('strikethrough'));
    button.id = 'obsidianMarkdownFormattingAssistantPluginButtonStrikethrough';

    button = row.createDiv({ cls: 'nav-action-button' });
    addClickEvent(button, 'underline');
    button.appendChild(svgToElement('underline'));
    button.id = 'obsidianMarkdownFormattingAssistantPluginButtonUnderline';

    button = row.createDiv({ cls: 'nav-action-button' });
    addClickEvent(button, 'highlight');
    button.appendChild(svgToElement('highlight'));
    button.id = 'obsidianMarkdownFormattingAssistantPluginButtonHighlight';

    row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
    button = row.createDiv({ cls: 'nav-action-button' });
    addClickEvent(button, 'codeInline');
    button.appendChild(svgToElement('codeInline'));

    button = row.createDiv({ cls: 'nav-action-button' });
    addClickEvent(button, 'codeBlock');
    button.appendChild(svgToElement('codeBlock'));

    button = row.createDiv({ cls: 'nav-action-button' });
    addClickEvent(button, 'mermaidBlock');
    button.appendChild(svgToElement('mermaidBlock'));

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

  private addColorBody(mainDiv: HTMLElement) {
    const insertColor = (color: string) => {
      const leaf = this.app.workspace.getMostRecentLeaf();
      let editor = null;
      if (checkIfMarkdownSource(leaf)) {
        const addColor =
          // @ts-ignore
          document.getElementById('inputColorTagCheckBox').checked;

        const addBackgroundColor =
          // @ts-ignore
          document.getElementById('inputBackgroundColorTagCheckBox').checked;
        const addStyle =
          // @ts-ignore
          document.getElementById('inputStyleTagCheckBox').checked;
        const addHtml =
          // @ts-ignore
          document.getElementById('inputHtmlTagCheckBox').checked;

        let res = color;
        if (addColor) res = `color: ${color}`;
        if (addBackgroundColor) res = `background-color: ${color}`;
        if (addColor && addBackgroundColor)
          res = `color: ${color}; background-color: ${color}`;
        if (addStyle) res = `style="${res}"`;
        // @ts-ignore
        editor = leaf.view.sourceMode.cmEditor;
        if (addHtml) res = `<font color="${res}">${editor.getSelection()}</font>`;
        colorFormatter(editor, res);
        editor.focus();
      }
    };

    const drawLastSelectedColorIcons = (container: HTMLElement = null) => {
      if (!container)
        container = document.getElementById('lastSelectedColorsDiv');
      container.textContent = '';

      const table = container.createEl('table');
      const tbody = table.createEl('tbody');
      let row: HTMLElement;
      R.reverse(SidePanelControlView.lastColors).forEach((color, index) => {
        if (index % 10 === 0) row = tbody.createEl('tr');
        const colorBox = row.createEl('td');
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
      const table = container.createEl('table');
      const tbody = table.createEl('tbody');
      let row: HTMLElement;

      R.reverse(this.plugin.settings.savedColors).forEach((color, index) => {
        if (index % 10 === 0) row = tbody.createEl('tr');
        const colorBox = row.createEl('td');
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
    colorSaveButton.style.marginBottom = '20px';

    const addCheckbox = (id: string, text: string) => {
      const div = colorSection.createEl('div');
      let input = div.createEl('input');
      input.id = id;
      input.type = 'checkbox';
      input.name = id;
      let label = div.createEl('label');
      label.appendText(text);
      label.style.fontSize = '12px';
    };

    addCheckbox('inputColorTagCheckBox', ' Add "color: {your color}"');
    addCheckbox(
      'inputBackgroundColorTagCheckBox',
      ' Add "background-color: {your color}"',
    );
    addCheckbox('inputStyleTagCheckBox', ' Add tag: "style={your color}"');
    addCheckbox('inputHtmlTagCheckBox', ' Add HTML: "<font color={your color}>{selected text}</font>"');

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

    const settingsInfo = colorSection.createEl('p');
    settingsInfo.appendText(
      'Saved colors can be directly edited in the settings.',
    );
    settingsInfo.style.textAlign = 'left';
    settingsInfo.style.fontSize = '10px';
    settingsInfo.style.marginTop = '0px';

    const lastSavedColors = colorSection.createEl('div');
    lastSavedColors.id = 'lastSavedColorsDiv';
    lastSavedColors.style.display = 'flex';

    drawLastSavedColorIcons(lastSavedColors);

    const info = colorSection.createEl('p');
    info.style.textAlign = 'center';
    info.style.marginTop = '10px';
    info.style.marginBottom = '10px';

    const link = info.createEl('a');
    link.appendText('Do you need some Help?');
    link.style.textAlign = 'center';

    link.style.fontSize = '10px';
    link.href =
      'https://github.com/Reocin/obsidian-markdown-formatting-assistant-plugin#color-picker';
  }

  private addSelectableHeader(
    mainDiv: HTMLElement,
    regionName: string,
    sectionTitle: string,
  ) {
    const getRegion = (name: string) => {
      return this.plugin.settings.regionSettings.find(
        (item) => item.name === name,
      );
    };

    let header = mainDiv.createEl('div');
    header.id = 'lastSavedHeaderDiv' + regionName;
    let hr = mainDiv.createEl('hr');
    let title = header.createEl('h4');
    let arrowButton = header.createDiv({ cls: 'nav-action-button' });
    let content = mainDiv.createEl('div');

    header.style.width = '100%';
    // header.style.border = '2px solid white';
    header.style.display = 'flex';
    header.style.flexWrap = 'nowrap';
    header.style.alignContent = 'center';
    header.style.position = 'relative';
    header.style.cursor = 'move';
    header.draggable = true;

    header.ondragstart = (event) => {
      // @ts-ignore
      const sectionId = event.target.id.replace('lastSavedHeaderDiv', '');

      event.dataTransfer.setData('sectionHeaderMoveId', sectionId);
    };

    const onDrop = async (event: DragEvent) => {
      const getId = R.pipe(
        R.find(R.pipe(R.prop('id'), R.contains('lastSavedHeaderDiv'))),
        R.prop('id'),
        R.replace('lastSavedHeaderDiv', ''),
      );

      const start = event.dataTransfer.getData('sectionHeaderMoveId');
      // @ts-ignore
      const end = getId(event.path);

      if (
        end &&
        this.plugin.settings.aviabileRegions.contains(end) &&
        start !== end
      ) {
        const startIndex = R.findIndex(
          R.propEq('name', start),
          this.plugin.settings.regionSettings,
        );
        const endIndex = R.findIndex(
          R.propEq('name', end),
          this.plugin.settings.regionSettings,
        );

        const startRegion = this.plugin.settings.regionSettings[startIndex];
        this.plugin.settings.regionSettings[startIndex] =
          this.plugin.settings.regionSettings[endIndex];
        this.plugin.settings.regionSettings[endIndex] = startRegion;
        await this.plugin.saveSettings();
        this.drawContentOfRootElement();
      }
      event.preventDefault();
    };

    header.ondragover = async (event) => {
      event.preventDefault();
    };

    header.ondrop = onDrop;

    title.appendText(sectionTitle);
    title.style.flexDirection = 'column';
    title.style.textAlign = 'left';
    title.style.margin = '0px';
    title.style.display = 'flex';
    title.style.flexWrap = 'nowrap';
    title.style.justifyContent = 'center';

    arrowButton.appendChild(svgToElement('expandArrowDown'));
    arrowButton.style.position = 'absolute';
    arrowButton.style.right = '0px';
    arrowButton.style.top = '0px';
    arrowButton.style.bottom = '0px';
    arrowButton.style.marginTop = 'auto';
    arrowButton.style.marginBottom = 'auto';
    arrowButton.style.width = '24px';
    arrowButton.style.height = '24px';
    const region = getRegion(regionName);
    if (region && region.active && region.visible) {
      content.style.display = 'block';
    } else {
      content.style.display = 'none';
    }

    arrowButton.onClickEvent(async (e) => {
      const region = getRegion(regionName);

      if (region && region.active) {
        if (!region.visible) {
          content.style.display = 'block';
          arrowButton.innerHTML = null;
          arrowButton.appendChild(svgToElement('expandArrowUp'));
          region.visible = true;
        } else {
          content.style.display = 'none';
          arrowButton.innerHTML = null;
          arrowButton.appendChild(svgToElement('expandArrowDown'));
          region.visible = false;
        }

        return await this.plugin.saveSettings();
      }
    });

    hr.style.marginTop = '0px';
    hr.style.marginBottom = '10px';

    return content;
  }
}
