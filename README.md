# Obsidian Markdown Formatting Assistant

> This Plugin provides easy to use snippets for Markdown, HTML and Latex and a color picker which shows the history of last used colors. Furthermore, it is possible to save any color you want.
> Version 0.1.1

> If you find a Bug or have a feature request: https://github.com/Reocin/obsidian-markdown-formatting-assistant-plugin/issues

![](assets/Obsidian_Overview.png)

## Side Panel

The Side Panel can be opened by the Ribbon Icon on the left side. If you changed the side (left or right) of the panel in the settings, just hit this butten/icon again and it will reload on the right side.

### Order and expansion of the Sections

It is possible to change the order of the sections according to the personal wishes. Furthermore it is possible to expand and shrink every section to keep the overview.

![](assets/OrderableAndExpandableRows.gif)

### Markdown Section

![](assets/Panel_Overview.png)

### HTML Section

![](assets/Panel_Overview_Html.png)

### Latex Section

> Latex Functions only work if they are in a latex equation section like $...$ or $$...$$.

![](assets/Panel_Overview_Latex.png)

### Greek Letters Section

> Greek Letters only work if they are in a latex equation section like $...$ or $$...$$.

![](assets/Panel_Overview_Greek_Letters.png)

## Command Language

With the command language the speed of the workflow can be specifically improved. By typing the trigger char (by default `\`) the commands will be activated and a suggestion window opens. It shows maximal 5 suggestions, which can be improved by adding more letters. The selected suggestion can be changed with the arrow keys and be activated with the enter key.

![](assets/Suggestion_Window.png)
![](assets/Suggestion_Window_Improved.png)

## Color Picker

### Select a color

The color picker provides an easy and fast workflow to work with colors. If you pick a color with the `Select a Color` button and leave the window (by clicking outside the color picker), the selected color will be inserted at the current courser position. In addition, it will be copied to the clipboard.

### Color History

Furthermore, the color picker saves the history of the last 10 used colors.

### Saved Colors

To Save the current color even if obsidian will be closed, just click the `Save Color` button.

### Sort saved Colors

All saved colors can be sorted via drop a catch.

### Delete a Color

To delete a saved or last used color just click it with the right mouse button.

### Additonal Formats

For a even easier handling you can select additional options to what should be added to the color.

#### Options

- Add "color: {your color}"
  - ex. `color: #ffffff`
- Add "background-color: {your color}
  - ex. `background-color: #ffffff`
- Add tag: "style={your color}
  - This option is only helpful, if you also select one of both of the other options like:
  - ex. `style="background-color: #ff0000"`

![](assets/Color_Picker.png)

## Settings

- Trigger Char

  - default: `\`
  - options: any char

- Side Pane Side

  - default: right
  - options: right, left
  - Defines the side of the side pane. By default the side pane will open on the right side/leaf.

- Saved Colors
  - default: ""
  - options: any hex color. One hex (#ffffff) color per line.
  - Manages the saved colors. Colors can be added, deleted, edited. The order is also considered.

## Changelog

- Version: 0.3.2
  - Aditional options for the color picker
  - New Higlight Button in the Text Edit section and commandline
- Version 0.3.1
  - Changeable order of the sections
  - Expandable sections
  - Corrected the latex `\$\$` and `\$\$\$\$` buttons as they were switched
- Version 0.3.0
  - added a Latex and Greek Letters section
- Version 0.2.2
  - added /mermaid snipplet to generate mermaid code block - allows drawing diagrams ![](assets/Mermaid.png)
- Version 0.2.1
  ⁻ Some Bug Fixes
  - No input preview mode
  - Highlighting of the html buttons when hover
  - Replace selection when insert colors.
  - Saved Colors can be added and edited in the settings.
  - New HTML Tags `<details></details>` and `<summary></summary>`
- Vesion 0.2.0
  - Added support for HTML snippets in command language and in side pane.
  - Added a color picker
- Vesion 0.1.2
  - Inital plugin
