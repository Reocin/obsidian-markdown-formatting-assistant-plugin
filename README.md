# Obsidian Markdown Formatting Assistant

> This Plugin provides easy to use snippets for Markdown and HTML and a color picker which shows the history of last used colors. Furthermore, it is possible to save any color you want.
> Version 0.1.1

> If you find a Bug or have a feature request: https://github.com/Reocin/obsidian-markdown-formatting-assistant-plugin/issues

![](assets/Obsidian_Overview.png)


## Side Panel

The Side Panel can be opened by the Ribbon Icon on the left side. If you changed the side of the panel in the settings, just hit this butten/icon again and it will reload on the right side.

![](assets/Panel_Overview.png)

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

![](assets/Color_Picker.png)

## Settings

- Trigger Char

  - default: `\`
  - options: any char

- Side Pane Side
  - default: right
  - options: right, left
  - Defines the side of the side pane. By default the side pane will open on the right side/leaf.

## Changelog
-  Vesion 0.2.0
	-  Added support for HTML snippets in command language and in side pane.
	-  Added a color picker
-  Vesion 0.1.2
	-  Inital plugin