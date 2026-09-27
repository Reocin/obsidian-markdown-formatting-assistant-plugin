import { appendLabel, svgToElement } from './icons';
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
import { colorCode, wrapWithColor } from './colorMarkup';
import {
  MAX_TABLE_COLUMNS,
  MAX_TABLE_ROWS,
  TABLE_ALIGNMENTS,
  tableFormatter,
} from './tableFormatter';
import type { tableAlignment } from './tableFormatter';
import { ItemView, Notice, WorkspaceLeaf } from 'obsidian';

import * as R from 'ramda';
import MarkdownAutocompletePlugin from './main';
import { getTargetEditor } from './generalFunctions';
import { moveItem } from './reorder';
import { calloutLabel, sectionLabel, t } from './i18n';
import { commandName } from './commandNames';

export const SidePanelControlViewType = 'side-panel-control-view';

// The repository the community catalogue installs from, so the one whose
// tracker is open. The fork this was maintained in has issues turned off.
const REPOSITORY_URL =
  'https://github.com/Reocin/obsidian-markdown-formatting-assistant-plugin';
const ISSUES_URL = `${REPOSITORY_URL}/issues`;

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
    return t('view.displayName');
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
    rootEl.id = 'mfa-panel-root';

    this.drawContentOfRootElement(rootEl);

    container.empty();
    container.appendChild(rootEl);
  }

  private drawContentOfRootElement(rootEl: HTMLElement = null): void {
    if (!rootEl) rootEl = document.getElementById('mfa-panel-root');
    rootEl.textContent = '';

    const getRegion = (name: string) => {
      return this.plugin.settings.regionSettings.find(
        (item) => item.name === name,
      );
    };

    // Width is left to the stylesheet - the leaf is user-resizable, so nothing
    // in here may pin a fixed width.
    const mainDiv = rootEl.createDiv({
      cls: 'nav-header markdown-formatting-assistant-panel mfa-scope',
    });

    // --------------
    // Text Edit Section
    // --------------

    const addTextEditSection = () => {
      let content = this.addSelectableHeader(mainDiv, 'textEdit');
      this.addTextEditButtons(content);
    };

    // --------------
    // Table Section
    // --------------
    const addTabelsSection = () => {
      const content = this.addSelectableHeader(mainDiv, 'tables');
      this.addTableBuilder(content);
    };

    // --------------
    // HTML Section
    // --------------
    const addHtmlSection = () => {
      const content = this.addSelectableHeader(mainDiv, 'html');

      this.addHtmlButtons(content);
      this.addNote(content, t('html.reportMissingTag'), ISSUES_URL);
    };

    // --------------
    // Latex Section
    // --------------
    const addLatexSection = () => {
      const content = this.addSelectableHeader(mainDiv, 'latex');

      this.addLatexButtons(content);
      this.addNote(
        content,
        t('latex.introduction'),
        'https://en.wikibooks.org/wiki/LaTeX/Mathematics',
      );
      this.addNote(content, t('latex.reportMissingFunction'), ISSUES_URL);
    };
    // --------------
    // Greek Section
    // --------------
    const addGreekLettersSection = () => {
      const content = this.addSelectableHeader(mainDiv, 'greekLetters');

      content
        .createEl('h5', { cls: 'mfa-subheading' })
        .setText(t('greek.lowerCase'));

      this.addGreekLowerCaseLetters(content);

      content
        .createEl('h5', { cls: 'mfa-subheading' })
        .setText(t('greek.upperCase'));

      this.addGreekUpperCaseLetters(content);

      this.addNote(
        content,
        t('greek.overview'),
        'https://en.wikipedia.org/wiki/Greek_alphabet',
      );
    };

    // --------------
    // Colors
    // --------------
    const addColorsSection = () => {
      const content = this.addSelectableHeader(mainDiv, 'colors');
      this.addColorBody(content);
    };

    // --------------
    // Callouts
    // --------------

    const addCalloutsSection = () => {
      let content = this.addSelectableHeader(mainDiv, 'callouts');
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

  /**
   * Turns one of the panel's divs into something a keyboard and a screen
   * reader can use.
   *
   * The panel is built from divs on purpose: they carry Obsidian's own
   * `nav-action-button` styling, which is what makes the buttons follow the
   * user's theme. A real `<button>` would be the better element, but it also
   * arrives with browser chrome that would have to be fought back off, and the
   * hover states are the theme's rather than ours. So the div is given the
   * three things the element type would otherwise have supplied: a role, a
   * place in the tab order, and activation by Enter and Space.
   *
   * The name matters most. Most of these buttons hold nothing but a drawing,
   * so without a label a screen reader has literally nothing to announce - not
   * a mislabelled button, no button at all. It also gives everyone else the
   * hover tooltip the panel never had.
   */
  private asButton(
    element: HTMLElement,
    label: string,
    activate: () => void,
  ): void {
    element.setAttribute('role', 'button');
    element.setAttribute('aria-label', label);
    element.tabIndex = 0;

    element.onClickEvent(() => activate());

    element.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;

      // Space scrolls the panel otherwise, which is the one thing a person
      // pressing it on a button does not want.
      event.preventDefault();
      activate();
    });
  }

  /** The small centred link that closes several of the sections. */
  private addNote(parent: HTMLElement, text: string, href: string): void {
    parent
      .createEl('p', { cls: 'mfa-note' })
      .createEl('a', { cls: 'mfa-note-link', href })
      .appendText(text);
  }

  /**
   * A size picker for markdown tables: hovering the grid previews the table
   * that a click would insert, which is a lot less fiddly in a narrow pane than
   * two number inputs.
   */
  private addTableBuilder(mainDiv: HTMLElement) {
    let alignment: tableAlignment = this.plugin.settings.tableAlignment;

    const label = mainDiv.createEl('p', { cls: 'mfa-table-label' });

    const idleLabel = () => t('tables.pick');
    label.setText(idleLabel());

    const grid = mainDiv.createDiv({ cls: 'mfa-table-grid' });

    const cells: HTMLElement[][] = [];

    const paint = (rows: number, columns: number) => {
      cells.forEach((cellRow, rowIndex) =>
        cellRow.forEach((cell, columnIndex) => {
          cell.toggleClass(
            'is-covered',
            rowIndex < rows && columnIndex < columns,
          );
        }),
      );
    };

    for (let rowIndex = 0; rowIndex < MAX_TABLE_ROWS; rowIndex++) {
      const rowEl = grid.createDiv({ cls: 'mfa-table-grid-row' });

      const rowCells: HTMLElement[] = [];

      for (let columnIndex = 0; columnIndex < MAX_TABLE_COLUMNS; columnIndex++) {
        const cell = rowEl.createDiv({ cls: 'mfa-table-cell' });

        const rows = rowIndex + 1;
        const columns = columnIndex + 1;

        cell.addEventListener('mouseenter', () => {
          paint(rows, columns);
          label.setText(t('tables.size', { rows, columns }));
        });

        // The grid is a picture of the table, so each cell says the size it
        // would insert - the only way to use it without seeing it.
        this.asButton(cell, t('tables.size', { rows, columns }), () => {
          const editor = getTargetEditor(this.app.workspace);
          if (editor) tableFormatter(editor, rows, columns, alignment);
        });

        rowCells.push(cell);
      }

      cells.push(rowCells);
    }

    grid.addEventListener('mouseleave', () => {
      paint(0, 0);
      label.setText(idleLabel());
    });

    const alignmentRow = mainDiv.createDiv({
      cls: 'nav-buttons-container mfa-table-alignment',
    });

    const alignmentButtons: HTMLElement[] = [];

    const highlightAlignment = () => {
      alignmentButtons.forEach((button, index) => {
        button.toggleClass(
          'is-active',
          TABLE_ALIGNMENTS[index] === alignment,
        );
      });
    };

    TABLE_ALIGNMENTS.forEach((option) => {
      const label = t(`tables.align.${option}` as never);
      const button = alignmentRow.createDiv({ cls: 'nav-action-text-button' });

      button.appendText(label);
      this.asButton(button, label, () => {
        alignment = option;
        this.plugin.settings.tableAlignment = option;
        highlightAlignment();
        void this.plugin.saveSettings();
      });
      alignmentButtons.push(button);
    });

    highlightAlignment();
  }

  private addHtmlButtons(mainDiv: HTMLElement) {
    const activate = (type: string) => {
      // @ts-ignore
      const formatterSetting = htmlFormatterSettings[type];

      const editor = getTargetEditor(this.app.workspace);
      if (editor) htmlFormatter(editor, formatterSetting);
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

        const button = row.createDiv({ cls: 'nav-action-text-button' });
        button.appendText(item.des);
        this.asButton(button, item.des, () => activate(key));
      },
    );
  }

  private addCalloutsButtons(mainDiv: HTMLElement) {
    const activate = (type: string) => {
      // @ts-ignore
      const formatterSetting = calloutsFormatterSettings[type];

      const editor = getTargetEditor(this.app.workspace);
      if (!editor) return;

      // The heading is written into the note so it renders translated; the
      // keyword inside [!...] stays English either way.
      calloutsFormatter(
        editor,
        formatterSetting,
        this.plugin.settings.calloutTitles
          ? calloutLabel(formatterSetting.id)
          : '',
      );
    };

    const numberOfCols = 5;
    let row: HTMLElement = null;

    R.keys(calloutsFormatterSettings).forEach((key, index) => {
      // @ts-ignore
      const item = calloutsFormatterSettings[key];
      if (index === 0 || item.newLine) {
        row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
      }

      const button = row.createDiv({
        cls: 'nav-action-text-button mfa-centered-button mfa-callout-button',
      });

      // Each callout carries its own colours as data, so the stylesheet takes
      // delivery of them through custom properties.
      button.style.setProperty('--mfa-callout-color', item.color);
      button.style.setProperty('--mfa-callout-background', item.bgColor);

      this.asButton(button, calloutLabel(item.id), () => activate(key));

      const spanIcon = button.createSpan({ cls: 'mfa-callout-icon' });
      setIcon(spanIcon, item.icon);

      button.createSpan().setText(' ' + calloutLabel(item.id));
    });
  }

  private addLatexButtons(mainDiv: HTMLElement) {
    const activate = (type: string) => {
      // @ts-ignore
      const formatterSetting = latexFormatterSettings[type];

      const editor = getTargetEditor(this.app.workspace);
      if (editor) latexFormatter(editor, formatterSetting);
    };

    let row: HTMLElement = null;

    // The panel shows a chosen few; the rest are reachable through ALT+Q,
    // which is what issue #21 asked for. Filtered before the index is taken,
    // or a hidden entry would take its row break with it.
    const shown = R.keys(latexFormatterSettings).filter(
      // @ts-ignore
      (key) => !latexFormatterSettings[key].suggestOnly,
    );

    shown.forEach((key, index) => {
      // @ts-ignore
      const item = latexFormatterSettings[key];
      if (index === 0 || item.newLine) {
        row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
      }

      const button = row.createDiv({
        cls: 'nav-action-text-button mfa-centered-button',
      });

      // Half of these are drawn as an svg, so des is the only name they have.
      this.asButton(button, commandName(item.des), () => activate(key));

      if (item.type === 'icon') {
        const svg = svgToElement(item.text);
        svg.addClass('mfa-inline-svg');
        button.appendChild(svg);
      } else if (item.type === 'text') {
        appendLabel(button.createDiv(), item.text);
      }
    });
  }

  private addGreekLowerCaseLetters(mainDiv: HTMLElement) {
    const activate = (type: string) => {
      // @ts-ignore
      const formatterSetting = greekLowerCaseFormatterSettings[type];

      const editor = getTargetEditor(this.app.workspace);
      if (editor) greekFormatter(editor, formatterSetting);
    };

    const numberOfCols = 5;
    let row: HTMLElement = null;

    R.keys(greekLowerCaseFormatterSettings).forEach((key, index) => {
      // @ts-ignore
      const item = greekLowerCaseFormatterSettings[key];
      if (index % numberOfCols === 0) {
        row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
      }

      const button = row.createDiv({ cls: 'nav-action-button' });

      // A letter drawn as an svg has no text at all, so 'Alpha' is the only
      // thing there is to announce or to show on hover.
      this.asButton(button, commandName(item.des), () => activate(key));
      button.appendChild(svgToElement(item.icon));
    });
  }

  private addGreekUpperCaseLetters(mainDiv: HTMLElement) {
    const activate = (type: string) => {
      // @ts-ignore
      const formatterSetting = greekUpperCaseFormatterSettings[type];

      const editor = getTargetEditor(this.app.workspace);
      if (editor) greekFormatter(editor, formatterSetting);
    };

    const numberOfCols = 5;
    let row: HTMLElement = null;

    R.keys(greekUpperCaseFormatterSettings).forEach((key, index) => {
      // @ts-ignore
      const item = greekUpperCaseFormatterSettings[key];
      if (index % numberOfCols === 0) {
        row = mainDiv.createDiv({ cls: 'nav-buttons-container' });
      }

      const button = row.createDiv({ cls: 'nav-action-button' });

      // A letter drawn as an svg has no text at all, so 'Alpha' is the only
      // thing there is to announce or to show on hover.
      this.asButton(button, commandName(item.des), () => activate(key));
      button.appendChild(svgToElement(item.icon));
    });
  }

  private addTextEditButtons(mainDiv: HTMLElement) {
    const activate = (type: string) => {
      // @ts-ignore
      const formatterSetting = formatSettings[type];

      const editor = getTargetEditor(this.app.workspace);
      if (editor) iconFormatter(editor, formatterSetting);
    };

    // Each row of the section, as [action, icon] pairs. Written out because
    // three of them draw an icon under a different name than the action, and
    // the grouping into rows is a layout decision rather than data.
    type textAction = keyof typeof formatSettings;

    const rows: Array<Array<[textAction, string]>> = [
      [
        ['h1', 'h1'],
        ['h2', 'h2'],
        ['h3', 'h3'],
        ['h4', 'h4'],
        ['h5', 'h5'],
        ['h6', 'h6'],
      ],
      [
        ['bold', 'bold'],
        ['italic', 'italic'],
        ['strikethrough', 'strikethrough'],
        ['underline', 'underline'],
        ['highlight', 'highlight'],
      ],
      [
        ['codeInline', 'codeInline'],
        ['codeBlock', 'codeBlock'],
        ['mermaidBlock', 'mermaidBlock'],
        ['link', 'link'],
        ['internalLink', 'fileLink'],
        ['blockquote', 'quote'],
        ['image', 'image'],
      ],
      [
        ['bulletList', 'bulletList'],
        ['numberList', 'numberList'],
        ['checkList', 'checkList'],
      ],
    ];

    rows.forEach((actions) => {
      const row = mainDiv.createDiv({ cls: 'nav-buttons-container' });

      actions.forEach(([id, icon]) => {
        const button = row.createDiv({ cls: 'nav-action-button' });

        // These buttons hold a drawing and nothing else, so the label is the
        // only thing a screen reader has to go on.
        this.asButton(button, commandName(formatSettings[id].des), () =>
          activate(id),
        );
        button.appendChild(svgToElement(icon));
      });
    });
  }

  private addColorBody(mainDiv: HTMLElement) {
    const insertColor = (color: string) => {
      const editor = getTargetEditor(this.app.workspace);
      if (!editor) return;

      const isChecked = (id: string) => {
        const box = document.getElementById(id) as HTMLInputElement | null;
        return box ? box.checked : false;
      };

      const options = {
        color: isChecked('mfa-option-color'),
        background: isChecked('mfa-option-background'),
        styleAttribute: isChecked('mfa-option-style'),
        html: isChecked('mfa-option-html'),
      };

      const selection = editor.getSelection();

      // Selected text is coloured, not overwritten. Clicking a colour with a
      // word selected used to replace that word with '#ff0000' - three reports
      // on the tracker are people working around exactly this, two of them
      // with patches of their own.
      colorFormatter(
        editor,
        selection
          ? wrapWithColor(color, selection, options)
          : colorCode(color, options),
      );
      editor.focus();
    };

    const drawLastSelectedColorIcons = (container: HTMLElement = null) => {
      if (!container)
        container = document.getElementById('mfa-recent-colors');
      container.textContent = '';

      R.reverse(SidePanelControlView.lastColors).forEach((color) => {
        const colorBox = container.createDiv({ cls: 'mfa-color-icon' });
        colorBox.style.setProperty('--mfa-swatch', color);

        this.asButton(colorBox, color, () => insertColor(color));

        // onClickEvent binds 'click' and nothing else, so the removal branch
        // this used to share with it could never run: right-clicking a colour
        // simply inserted it. The README promised otherwise.
        colorBox.oncontextmenu = (event) => {
          event.preventDefault();
          SidePanelControlView.lastColors = R.without(
            [color],
            SidePanelControlView.lastColors,
          );
          drawLastSelectedColorIcons();
        };
      });
    };

    const drawLastSavedColorIcons = (container: HTMLElement = null) => {
      if (!container) container = document.getElementById('mfa-saved-colors');

      container.textContent = '';

      R.reverse(this.plugin.settings.savedColors).forEach((color) => {
        const colorBox = container.createDiv({ cls: 'mfa-color-icon' });
        colorBox.id = 'mfa-saved-colors' + color;
        colorBox.style.setProperty('--mfa-swatch', color);
        colorBox.draggable = true;

        this.asButton(colorBox, color, () => insertColor(color));

        // Same dead branch as the last-used swatches above: 'click' was the
        // only event ever bound, so a saved colour could not be removed here.
        colorBox.oncontextmenu = async (event) => {
          event.preventDefault();
          this.plugin.settings.savedColors = R.without(
            [color],
            this.plugin.settings.savedColors,
          );
          await this.plugin.saveSettings();
          drawLastSavedColorIcons();
        };
        colorBox.ondragstart = (event) => {
          // @ts-ignore
          this.dragStartColor = event.target.id.replace(
            'mfa-saved-colors',
            '',
          );
        };
        colorBox.ondrop = async (event) => {
          const target = event.target as HTMLElement;
          if (!target || !target.id) return;

          const savedColors = this.plugin.settings.savedColors;
          const startColor = this.dragStartColor;
          const endColor = target.id.replace('mfa-saved-colors', '');

          const startIndex = R.indexOf(startColor, savedColors);
          const endIndex = R.indexOf(endColor, savedColors);

          // The container carries the id 'mfa-saved-colors' itself, so a drop
          // into the empty space next to the swatches used to resolve to an
          // empty colour and index -1 - which then wrote junk into the list.
          if (startIndex < 0 || endIndex < 0 || startIndex === endIndex) return;

          this.plugin.settings.savedColors = moveItem(
            savedColors,
            startIndex,
            endIndex,
          );
          await this.plugin.saveSettings();
          drawLastSavedColorIcons();
        };
        colorBox.ondragover = (event) => {
          event.preventDefault();
        };
      });
    };

    const colorSection = mainDiv.createDiv();
    const colorSelector = colorSection.createDiv({ cls: 'mfa-color-preview' });
    colorSelector.style.setProperty(
      '--mfa-swatch',
      R.last(SidePanelControlView.lastColors),
    );

    const colorInput = colorSelector.createEl('input', {
      cls: 'mfa-color-input',
    });
    colorInput.id = 'mfa-color-input';
    colorInput.type = 'color';
    colorInput.value = R.last(SidePanelControlView.lastColors);
    colorInput.addEventListener('input', (ev) => {
      // @ts-ignore
      const color = ev.target.value;
      colorSelector.style.setProperty('--mfa-swatch', color);
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
        colorSelector.style.setProperty('--mfa-swatch', color);

        // Mobile webviews are not a secure context, so navigator.clipboard is
        // undefined there - reading .writeText would throw synchronously,
        // which a rejection handler does not catch.
        if (navigator.clipboard) {
          navigator.clipboard.writeText(color).then(
            () => new Notice(t('colors.copied', { color })),
            () => new Notice(t('colors.copyFailed')),
          );
        }
      },
      false,
    );

    const colorButton = colorSection.createEl('label', {
      cls: 'nav-action-text-button mfa-block-button',
    });
    colorButton.appendText(t('colors.select'));
    colorButton.htmlFor = 'mfa-color-input';

    const colorSaveButton = colorSection.createEl('div', {
      cls: 'nav-action-text-button mfa-block-button mfa-color-save',
    });
    colorSaveButton.appendText(t('colors.save'));
    this.asButton(colorSaveButton, t('colors.save'), () => {
      const color = R.last(SidePanelControlView.lastColors);
      this.plugin.settings.savedColors = R.pipe(
        R.without([color]),
        R.append(color),
      )(this.plugin.settings.savedColors);
      drawLastSavedColorIcons();
      void this.plugin.saveSettings();
    });

    const addCheckbox = (id: string, text: string) => {
      const div = colorSection.createEl('div');
      const input = div.createEl('input');
      input.id = id;
      input.type = 'checkbox';
      input.name = id;

      // Tied to the input, which is what lets the words be clicked as well as
      // the box - and what a screen reader reads out instead of "checkbox".
      const label = div.createEl('label', { cls: 'mfa-checkbox-label' });
      label.htmlFor = id;
      label.appendText(text);
    };

    addCheckbox('mfa-option-color', t('colors.optionColor'));
    addCheckbox(
      'mfa-option-background',
      t('colors.optionBackgroundColor'),
    );
    addCheckbox('mfa-option-style', t('colors.optionStyleTag'));
    addCheckbox('mfa-option-html', t('colors.optionHtmlTag'));

    colorSection
      .createEl('p', { cls: 'mfa-swatches-title' })
      .appendText(t('colors.lastUsed'));

    const lastSelectedColors = colorSection.createEl('div', {
      cls: 'mfa-color-swatches',
    });
    lastSelectedColors.id = 'mfa-recent-colors';

    drawLastSelectedColorIcons(lastSelectedColors);

    colorSection
      .createEl('p', { cls: 'mfa-swatches-title' })
      .appendText(t('colors.saved'));

    colorSection
      .createEl('p', { cls: 'mfa-swatches-hint' })
      .appendText(t('colors.editInSettings'));

    const lastSavedColors = colorSection.createEl('div', {
      cls: 'mfa-color-swatches',
    });
    lastSavedColors.id = 'mfa-saved-colors';

    drawLastSavedColorIcons(lastSavedColors);

    this.addNote(
      colorSection,
      t('colors.help'),
      `${REPOSITORY_URL}#color-picker`,
    );
  }

  private addSelectableHeader(mainDiv: HTMLElement, regionName: string) {
    const sectionTitle = sectionLabel(regionName);

    const getRegion = (name: string) => {
      return this.plugin.settings.regionSettings.find(
        (item) => item.name === name,
      );
    };

    const header = mainDiv.createEl('div', { cls: 'mfa-section-header' });
    header.id = 'mfa-region-' + regionName;
    const hr = mainDiv.createEl('hr', { cls: 'mfa-section-rule' });
    const title = header.createEl('h4', { cls: 'mfa-section-title' });
    const arrowButton = header.createDiv({
      cls: 'nav-action-button mfa-section-arrow',
    });
    const content = mainDiv.createEl('div', { cls: 'mfa-section-content' });

    header.draggable = true;

    header.ondragstart = (event) => {
      // @ts-ignore
      const sectionId = event.target.id.replace('mfa-region-', '');

      event.dataTransfer.setData('sectionHeaderMoveId', sectionId);
    };

    const onDrop = async (event: DragEvent) => {
      // The drop can land on any descendant of a section header, so walk the
      // event path up to the header that carries the region id. composedPath()
      // also yields document and window, which have no id at all.
      const getDroppedRegionName = (path: EventTarget[]) => {
        const header = path.find(
          (target) =>
            target instanceof HTMLElement &&
            target.id.startsWith('mfa-region-'),
        ) as HTMLElement | undefined;

        return header
          ? header.id.replace('mfa-region-', '')
          : undefined;
      };

      event.preventDefault();

      const regions = this.plugin.settings.regionSettings;
      const start = event.dataTransfer?.getData('sectionHeaderMoveId');
      const end = getDroppedRegionName(event.composedPath());

      if (!start || !end || start === end) return;

      const startIndex = regions.findIndex((region) => region.name === start);
      const endIndex = regions.findIndex((region) => region.name === end);

      // Headers accept any drag - a note dropped from the file explorer lands
      // here too, with an empty payload. Both indices must resolve, or the move
      // below would write undefined into the array and persist it.
      if (startIndex < 0 || endIndex < 0) return;

      this.plugin.settings.regionSettings = moveItem(
        regions,
        startIndex,
        endIndex,
      );

      await this.plugin.saveSettings();
      this.drawContentOfRootElement();
    };

    header.ondragover = async (event) => {
      event.preventDefault();
    };

    header.ondrop = onDrop;

    title.appendText(sectionTitle);

    const region = getRegion(regionName);

    /**
     * The arrow points the way the click will move the section: down to open
     * it, up to close it again. It used to be drawn as "down" unconditionally,
     * so a section that started open contradicted itself until it was clicked
     * twice.
     */
    const drawArrow = (expanded: boolean) => {
      arrowButton.empty();
      arrowButton.appendChild(
        svgToElement(expanded ? 'expandArrowUp' : 'expandArrowDown'),
      );
    };

    const expanded = Boolean(region && region.active && region.visible);

    content.toggleClass('is-collapsed', !expanded);
    drawArrow(expanded);
    // Announced as expanded or collapsed, and updated on every toggle - the
    // arrow itself is a drawing and says nothing.
    arrowButton.setAttribute('aria-expanded', String(expanded));

    this.asButton(arrowButton, sectionTitle, () => {
      const region = getRegion(regionName);

      if (!region || !region.active) return;

      region.visible = !region.visible;
      content.toggleClass('is-collapsed', !region.visible);
      drawArrow(region.visible);
      arrowButton.setAttribute('aria-expanded', String(region.visible));

      void this.plugin.saveSettings();
    });

    return content;
  }
}
