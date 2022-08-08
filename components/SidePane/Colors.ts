// import { checkIfMarkdownSource } from '../../src/generalFunctions';
// import { colorFormatter } from '../../formatters/colorFormatter';

// import {
//     ButtonComponent,
//     ItemView,
//     Notice,
//     TFile,
//     WorkspaceLeaf,
//   } from 'obsidian';

// export function addColorBody(mainDiv: HTMLElement, SidePanelControlView: ItemView ) {
//     const insertColor = (color: string) => {
//       const leaf = this.app.workspace.getMostRecentLeaf();
//       let editor = null;
//       if (checkIfMarkdownSource(leaf)) {
//         // @ts-ignore
//         editor = leaf.view.sourceMode.cmEditor;
//         colorFormatter(editor, color);
//         editor.focus();
//       }
//     };

//     const drawLastSelectedColorIcons = (container: HTMLElement = null) => {
//       if (!container)
//         container = document.getElementById('lastSelectedColorsDiv');
//       container.textContent = '';

//       const table = container.createEl('table');
//       const tbody = table.createEl('tbody');
//       let row: HTMLElement;
//       R.reverse(SidePanelControlView.lastColors).forEach((color, index) => {
//         if (index % 10 === 0) row = tbody.createEl('tr');
//         const colorBox = row.createEl('td');
//         colorBox.classList.add('color-icon');
//         colorBox.style.backgroundColor = color;

//         colorBox.onClickEvent((ev) => {
//           if (ev.type === 'click') {
//             insertColor(color);
//           } else {
//             SidePanelControlView.lastColors = R.without(
//               [color],
//               SidePanelControlView.lastColors,
//             );
//             drawLastSelectedColorIcons();
//           }
//         });
//       });
//     };

//     const drawLastSavedColorIcons = (container: HTMLElement = null) => {
//       if (!container) container = document.getElementById('lastSavedColorsDiv');

//       container.textContent = '';
//       const table = container.createEl('table');
//       const tbody = table.createEl('tbody');
//       let row: HTMLElement;

//       R.reverse(this.plugin.settings.savedColors).forEach((color, index) => {
//         if (index % 10 === 0) row = tbody.createEl('tr');
//         const colorBox = row.createEl('td');
//         colorBox.id = 'lastSavedColorsDiv' + color;
//         colorBox.classList.add('color-icon');
//         colorBox.style.backgroundColor = color;
//         colorBox.draggable = true;

//         colorBox.onClickEvent(async (ev) => {
//           if (ev.type === 'click') {
//             insertColor(color);
//           } else {
//             this.plugin.settings.savedColors = R.without(
//               [color],
//               this.plugin.settings.savedColors,
//             );
//             await this.plugin.saveSettings();
//             drawLastSavedColorIcons();
//           }
//         });
//         colorBox.ondragstart = (event) => {
//           // @ts-ignore
//           this.dragStartColor = event.target.id.replace(
//             'lastSavedColorsDiv',
//             '',
//           );
//         };
//         colorBox.ondrop = async (event) => {
//           if (event && event.target) {
//             // @ts-ignore
//             const id = event.target.id;
//             if (id.indexOf('lastSavedColorsDiv') === 0) {
//               const startColor = this.dragStartColor;
//               const endColor = id.replace('lastSavedColorsDiv', '');

//               const startIndex = R.indexOf(
//                 startColor,
//                 this.plugin.settings.savedColors,
//               );
//               const endIndex = R.indexOf(
//                 endColor,
//                 this.plugin.settings.savedColors,
//               );
//               this.plugin.settings.savedColors[startIndex] = endColor;
//               this.plugin.settings.savedColors[endIndex] = startColor;
//               await this.plugin.saveSettings();
//               drawLastSavedColorIcons();
//             }
//           }
//         };
//         colorBox.ondragover = (event) => {
//           event.preventDefault();
//         };
//       });
//     };

//     const colorSection = mainDiv.createDiv();
//     const colorSelector = colorSection.createDiv();
//     colorSelector.style.backgroundColor = R.last(
//       SidePanelControlView.lastColors,
//     );
//     colorSelector.style.height = '16px';
//     colorSelector.style.borderRadius = '8px';
//     colorSelector.style.padding = '5px';
//     colorSelector.style.margin = '4px';
//     colorSelector.style.marginBottom = '10px';
//     const colorInput = colorSelector.createEl('input');
//     colorInput.id = 'colorInput';
//     colorInput.type = 'color';
//     colorInput.value = R.last(SidePanelControlView.lastColors);
//     colorInput.style.visibility = 'hidden';
//     colorInput.style.padding = '0';
//     colorInput.style.margin = '0';
//     // colorInput.style.display = 'block';
//     // colorInput.style.opacity = '0';
//     colorInput.addEventListener('input', (ev) => {
//       // @ts-ignore
//       const color = ev.target.value;
//       colorSelector.style.backgroundColor = color;
//     });
//     colorInput.addEventListener(
//       'change',
//       (ev) => {
//         // @ts-ignore
//         const color = ev.target.value;
//         // @ts-ignore
//         SidePanelControlView.lastColors = R.pipe(
//           R.without([color]),
//           R.append(color),
//           R.takeLast(10),
//         )(SidePanelControlView.lastColors);
//         drawLastSelectedColorIcons();
//         insertColor(color);
//         colorSelector.style.backgroundColor = color;

//         navigator.clipboard.writeText(color).then(
//           () => {
//             // @ts-ignore
//             new Notice('Copied ' + color + ' to clipboard');
//           },
//           () => {
//             new Notice('Could not copy the color to clipboard');
//           },
//         );
//       },
//       false,
//     );

//     const colorButton = colorSection.createEl('label');
//     colorButton.classList.add('nav-action-text-button');
//     colorButton.appendText('Select a Color');
//     colorButton.style.display = 'block';
//     colorButton.htmlFor = 'colorInput';

//     const colorSaveButton = colorSection.createEl('div');
//     colorSaveButton.classList.add('nav-action-text-button');
//     colorSaveButton.appendText('Save Color');
//     colorSaveButton.style.display = 'block';
//     colorSaveButton.onClickEvent(async (ev) => {
//       const color = R.last(SidePanelControlView.lastColors);
//       this.plugin.settings.savedColors = R.pipe(
//         R.without([color]),
//         R.append(color),
//       )(this.plugin.settings.savedColors);
//       drawLastSavedColorIcons();
//       await this.plugin.saveSettings();
//     });

//     const lastSelectedColorsTitle = colorSection.createEl('p');
//     lastSelectedColorsTitle.appendText('Last used colors:');
//     lastSelectedColorsTitle.style.marginBottom = '0px';

//     const lastSelectedColors = colorSection.createEl('div');
//     lastSelectedColors.id = 'lastSelectedColorsDiv';
//     lastSelectedColors.style.display = 'flex';

//     drawLastSelectedColorIcons(lastSelectedColors);

//     const lastSavedColorsTitle = colorSection.createEl('p');
//     lastSavedColorsTitle.appendText('Saved Colors:');
//     lastSavedColorsTitle.style.marginBottom = '0px';

//     const settingsInfo = colorSection.createEl('p');
//     settingsInfo.appendText(
//       'Saved colors can be directly edited in the settings.',
//     );
//     settingsInfo.style.textAlign = 'left';
//     settingsInfo.style.fontSize = '10px';
//     settingsInfo.style.marginTop = '0px';

//     const lastSavedColors = colorSection.createEl('div');
//     lastSavedColors.id = 'lastSavedColorsDiv';
//     lastSavedColors.style.display = 'flex';

//     drawLastSavedColorIcons(lastSavedColors);

//     const info = colorSection.createEl('p');
//     info.style.textAlign = 'center';
//     info.style.marginTop = '10px';
//     info.style.marginBottom = '10px';

//     const link = info.createEl('a');
//     link.appendText('Do you need some Help?');
//     link.style.textAlign = 'center';

//     link.style.fontSize = '10px';
//     link.href =
//       'https://github.com/Reocin/obsidian-markdown-formatting-assistant-plugin#color-picker';
//   }
