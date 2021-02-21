import { addIcon } from 'obsidian';
import * as mdiIcons from '@mdi/js';

function pathToSvg(icon: string) {
  return `
    <svg style="width:24px;height:24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="${icon}" />
    </svg>`;
}
export const icons: Record<string, string> = {
  h1: pathToSvg(mdiIcons.mdiFormatHeader1),
  h2: pathToSvg(mdiIcons.mdiFormatHeader2),
  h3: pathToSvg(mdiIcons.mdiFormatHeader3),
  h4: pathToSvg(mdiIcons.mdiFormatHeader4),
  h5: pathToSvg(mdiIcons.mdiFormatHeader5),
  h6: pathToSvg(mdiIcons.mdiFormatHeader6),
  bold: pathToSvg(mdiIcons.mdiFormatBold),
  italic: pathToSvg(mdiIcons.mdiFormatItalic),
  strikethrough: pathToSvg(mdiIcons.mdiFormatStrikethroughVariant),
  codeInline: pathToSvg(mdiIcons.mdiCodeTags),
  codeBlock: pathToSvg(mdiIcons.mdiXml),
  link: pathToSvg(mdiIcons.mdiLinkVariant),
  mermaidBlock: pathToSvg(mdiIcons.mdiGraph),
  fileLink: pathToSvg(mdiIcons.mdiFileLink),
  image: pathToSvg(mdiIcons.mdiImage),
  quote: pathToSvg(mdiIcons.mdiFormatIndentIncrease),
  bulletList: pathToSvg(mdiIcons.mdiFormatListBulleted),
  numberList: pathToSvg(mdiIcons.mdiFormatListNumbered),
  checkList: pathToSvg(mdiIcons.mdiFormatListBulletedSquare),
  viewIcon: pathToSvg(mdiIcons.mdiLanguageMarkdown),
};

export const addIcons = (): void => {
  Object.keys(icons).forEach((key) => {
    addIcon(key, icons[key]);
  });
};

/**
 * Convert an svg string into an HTML element.
 *
 * @param svgText svg image as a string
 */
export const svgToElement = (key: string | number): HTMLElement => {
  const parser = new DOMParser();
  return parser.parseFromString(icons[key], 'text/xml').documentElement;
};
