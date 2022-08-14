import MarkdownAutocompletePlugin from '../../src/main';
import * as R from 'ramda';
import { svgToElement } from '../../src/icons';

const getRegion = (name: string, plugin: MarkdownAutocompletePlugin) => {
  return plugin.settings.regionSettings.find((item) => item.name === name);
};

const createHeaderDiv = (mainDiv: HTMLElement, regionName: string) => {
  let header = mainDiv.createEl('div');
  header.id = 'lastSavedHeaderDiv' + regionName;

  header.style.width = '100%';
  // header.style.border = '2px solid white';
  header.style.display = 'flex';
  header.style.flexWrap = 'nowrap';
  header.style.alignContent = 'center';
  header.style.position = 'relative';
  header.style.cursor = 'move';
  header.draggable = true;

  return header;
};

const addDragAndDropForHeader = (
  header: HTMLElement,
  plugin: MarkdownAutocompletePlugin,
  drawContentOfRootElement: any,
) => {
  header.ondragstart = (event) => {
    console.log('ondragstart');
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

    console.log(start, end);

    if (end && plugin.settings.aviabileRegions.contains(end) && start !== end) {
      const startIndex = R.findIndex(
        R.propEq('name', start),
        plugin.settings.regionSettings,
      );
      const endIndex = R.findIndex(
        R.propEq('name', end),
        plugin.settings.regionSettings,
      );

      console.log(startIndex, endIndex);

      const startRegion = plugin.settings.regionSettings[startIndex];
      plugin.settings.regionSettings[startIndex] =
        plugin.settings.regionSettings[endIndex];
      plugin.settings.regionSettings[endIndex] = startRegion;
      await plugin.saveSettings();
      drawContentOfRootElement();
    }
    event.preventDefault();
  };

  header.ondragover = async (event) => {
    event.preventDefault();
  };

  header.ondrop = onDrop;
};

const addBurgerButton = (header: HTMLElement) => {
  const burgerButton = header.createDiv({ cls: 'nav-action-button' });
  burgerButton.appendChild(svgToElement('menu'));
  burgerButton.style.display = 'flex';
  burgerButton.style.flexWrap = 'nowrap';
  burgerButton.style.alignContent = 'center';
  burgerButton.style.transform = 'scale(0.8,0.8)';
  burgerButton.style.cursor = 'move';

  return burgerButton;
};

const addTitle = (header: HTMLElement, sectionTitle: string) => {
  const title = header.createEl('h4');
  title.appendText(sectionTitle);
  title.style.flexDirection = 'column';
  title.style.textAlign = 'left';
  title.style.margin = '0px';
  title.style.display = 'flex';
  title.style.flexWrap = 'nowrap';
  title.style.justifyContent = 'center';
  return title;
};

const addArrowButton = (div: HTMLElement) => {
  let arrowButton = div.createDiv({ cls: 'nav-action-button' });
  arrowButton.appendChild(svgToElement('expandArrowDown'));
  arrowButton.style.position = 'absolute';
  arrowButton.style.right = '0px';
  arrowButton.style.top = '0px';
  arrowButton.style.bottom = '0px';
  arrowButton.style.marginTop = 'auto';
  arrowButton.style.marginBottom = 'auto';
  arrowButton.style.width = '24px';
  arrowButton.style.height = '24px';

  return arrowButton;
};

const addArrowButtonEvent = (
  arrowButton: HTMLElement,
  content: HTMLElement,
  regionName: string,
  plugin: MarkdownAutocompletePlugin,
) => {
  arrowButton.onClickEvent(async (e) => {
    const region = getRegion(regionName, plugin);

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

      return await plugin.saveSettings();
    }
  });
};

const addHorizontalRule = (div: HTMLElement) => {
  let hr = div.createEl('hr');
  hr.style.marginTop = '0px';
  hr.style.marginBottom = '10px';

  return hr;
};

export function addSelectableHeader(
  mainDiv: HTMLElement,
  regionName: string,
  sectionTitle: string,
  plugin: MarkdownAutocompletePlugin,
  drawContentOfRootElement: any,
) {
  const header = createHeaderDiv(mainDiv, regionName);
  addHorizontalRule(mainDiv);
  addDragAndDropForHeader(header, plugin, drawContentOfRootElement);
  addBurgerButton(header);
  addTitle(header, sectionTitle);
  const arrowButton = addArrowButton(header);

  let content = mainDiv.createEl('div');

  const region = getRegion(regionName, plugin);
  if (region && region.active && region.visible) {
    content.style.display = 'block';
  } else {
    content.style.display = 'none';
  }

  addArrowButtonEvent(arrowButton, content, regionName, plugin);

  return content;
}
