/**
 * English is the base dictionary: its keys define the translation key type, and
 * every other locale falls back to it for anything it leaves out.
 */
export const en = {
  // Product name. Locales normally leave this alone and inherit it.
  'view.displayName': 'Markdown Formatting Assistant',

  // Commands and ribbon
  'command.openPanel': 'Open Markdown Formatting Assistant',
  'command.openCommandSelector': 'Open Command Selector',
  'command.openCalloutsSelector': 'Open Callouts Selector',

  // Section headers
  'section.textEdit': 'Text Edit',
  'section.tables': 'Tables',
  'section.html': 'HTML',
  'section.latex': 'Latex',
  'section.greekLetters': 'Greek Letters',
  'section.colors': 'Colors',
  'section.callouts': 'Callouts',

  // Panel body
  'panel.noLeaf': 'Could not open the panel: the sidebar is unavailable.',
  'tables.pick': 'Pick a size',
  'tables.size': '{rows} x {columns}',
  'tables.align.default': 'Plain',
  'tables.align.left': 'Left',
  'tables.align.center': 'Center',
  'tables.align.right': 'Right',
  'html.reportMissingTag': 'Do you miss a Tag? report it!',
  'latex.introduction': 'Introduction into latex mathematics',
  'latex.reportMissingFunction': 'Do you miss a latex function? report it!',
  'greek.lowerCase': 'Lower Case',
  'greek.upperCase': 'Upper Case',
  'greek.overview': 'Overview of greek letters',

  // Colour picker
  'colors.select': 'Select a Color',
  'colors.save': 'Save Color',
  'colors.optionColor': ' Add "color: {your color}"',
  'colors.optionBackgroundColor': ' Add "background-color: {your color}"',
  'colors.optionStyleTag': ' Add tag: "style={your color}"',
  'colors.optionHtmlTag':
    ' Add HTML: "<font color={your color}></font>"',
  'colors.lastUsed': 'Last used colors:',
  'colors.saved': 'Saved Colors:',
  'colors.editInSettings': 'Saved colors can be directly edited in the settings.',
  'colors.help': 'Do you need some Help?',
  'colors.copied': 'Copied {color} to clipboard',
  'colors.copyFailed': 'Could not copy the color to clipboard',

  // Settings
  'settings.title': 'Markdown Formatting Assistant Settings',
  'settings.language.name': 'Language',
  'settings.language.desc':
    'Language of the plugin interface. (restart required)',
  'settings.language.auto': 'Same as Obsidian',
  'settings.sidePaneSide.name': 'Side Pane Side',
  'settings.sidePaneSide.desc': 'Choose on which side the Side Pane appears.',
  'settings.sidePaneSide.placeholder': 'Enter left or right',
  'settings.panelAlign.name': 'Panel button alignment',
  'settings.panelAlign.desc':
    'Where the buttons sit in the sections of the side panel.',
  'settings.toggleSection.name': 'Toggle {section} Section',
  'settings.toggleSection.desc':
    'Activate or deactivate the {section} section. (restart required)',
  'settings.calloutTitles.name': 'Write callout headings',
  'settings.calloutTitles.desc':
    'Insert the callout name as its heading, so a note shows it in your language. The keyword inside [!note] always stays English - that is what Obsidian matches on.',
  'settings.savedColors.name': 'Saved Colors',
  'settings.savedColors.desc':
    'Colours kept for the palette in the side panel. Pick one to add it, click a swatch to remove it.',
  'settings.savedColors.empty': 'No saved colours yet.',
  'settings.savedColors.removeHint': 'click to remove',
  'settings.toolbar.name': 'Toolbar above the note',
  'settings.toolbar.desc': 'A row of buttons at the top of the editor, so the side panel can stay closed. Desktop only - on mobile Obsidian already has a toolbar above the keyboard.',
  'settings.toolbar.empty': 'No buttons yet. Add one below.',
  'settings.toolbar.unavailable': 'Unavailable: {id}',
  'settings.toolbar.remove': 'Remove from the toolbar',
  'settings.toolbar.add': 'Add a button',
  'settings.toolbar.addDesc': 'Any command in the vault can go on the toolbar, including Obsidian’s own and other plugins’. Drag the rows to reorder them. Up to {max} buttons.',
  'settings.toolbar.pick': 'Search every command',
  'settings.toolbar.align.name': 'Button alignment',
  'settings.toolbar.align.desc': 'Where the buttons sit in the row.',
  // Shared by the toolbar's alignment and the side panel's.
  'settings.align.left': 'Left',
  'settings.align.center': 'Center',
  'settings.align.right': 'Right',

  // Callout button labels. Only the label is translated - the callout type
  // inside '> [!note]' is a keyword Obsidian matches in English.
  'callout.note': 'Note',
  'callout.info': 'Info',
  'callout.todo': 'Todo',
  'callout.abstract': 'Abstract',
  'callout.summary': 'Summary',
  'callout.tldr': 'TLDR',
  'callout.tip': 'Tip',
  'callout.hint': 'Hint',
  'callout.important': 'Important',
  'callout.success': 'Success',
  'callout.check': 'Check',
  'callout.done': 'Done',
  'callout.question': 'Question',
  'callout.help': 'Help',
  'callout.faq': 'FAQ',
  'callout.warning': 'Warning',
  'callout.caution': 'Caution',
  'callout.attention': 'Attention',
  'callout.failure': 'Failure',
  'callout.fail': 'Fail',
  'callout.missing': 'Missing',
  'callout.danger': 'Danger',
  'callout.error': 'Error',
  'callout.bug': 'Bug',
  'callout.example': 'Example',
  'callout.quote': 'Quote',
};

export type TranslationKey = keyof typeof en;

/**
 * Locales other than English may translate any subset of the keys - anything
 * omitted falls back to English, so a half-finished translation still yields a
 * usable interface.
 */
export type LocaleDictionary = Partial<Record<TranslationKey, string>>;
