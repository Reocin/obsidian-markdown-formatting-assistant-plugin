import {
  App,
  Editor,
  MarkdownView,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
  debounce,
  setIcon,
} from 'obsidian';

import { addIcons, removeIcons } from './icons';

import {
  SidePanelControlView,
  SidePanelControlViewType,
} from './SidePanelControlView';
import { CodeSuggestionModal } from './CommandListView';
import { CalloutsSuggestionModal } from './CalloutsListView';
import { CommandPickerModal } from './CommandPickerModal';
import { registerFormattingCommands } from './commands';
import { EditorToolbar, allCommands, getCommandRegistry } from './toolbar';
import {
  DEFAULT_TOOLBAR,
  MAX_TOOLBAR_COMMANDS,
  TOOLBAR_ALIGNMENTS,
  normaliseToolbarAlignment,
  normaliseToolbarCommands,
  toolbarSetting,
} from './toolbarSettings';
import {
  DEFAULT_PANEL_ALIGNMENT,
  PANEL_ALIGNMENTS,
  normalisePanelAlignment,
  panelAlignment,
} from './panelSettings';
import { moveItem } from './reorder';
import type { tableAlignment } from './tableFormatter';
import {
  AUTO_LOCALE,
  LOCALE_NAMES,
  LocaleSetting,
  SUPPORTED_LOCALES,
  sectionLabel,
  setLocale,
  t,
} from './i18n';

/** The drag payload for reordering toolbar buttons. */
const DRAG_PAYLOAD = 'toolbarButtonIndex';

interface RegionSetting {
  name: string;
  active: boolean;
  visible: boolean;
}
export interface PluginSettings {
  language: LocaleSetting;
  sidePaneSideLeft: Boolean;
  panelAlignment: panelAlignment;
  savedColors: string[];
  regionSettings: Array<RegionSetting>;
  tableAlignment: tableAlignment;
  calloutTitles: boolean;
  toolbar: toolbarSetting;
}

/** Preselected in the saved-colours picker, so it never opens on black. */
const DEFAULT_PICKER_COLOR = '#448aff';

const DEFAULT_SETTINGS: PluginSettings = {
  language: AUTO_LOCALE,
  sidePaneSideLeft: false,
  panelAlignment: DEFAULT_PANEL_ALIGNMENT,
  savedColors: ['#ff0000'],
  regionSettings: [
    { name: 'textEdit', active: true, visible: false },
    { name: 'tables', active: true, visible: false },
    { name: 'html', active: true, visible: false },
    { name: 'latex', active: true, visible: false },
    { name: 'greekLetters', active: true, visible: false },
    { name: 'colors', active: true, visible: false },
    { name: 'callouts', active: true, visible: false },
  ],
  tableAlignment: 'default',
  calloutTitles: true,
  toolbar: DEFAULT_TOOLBAR,
};

/** Order the section toggles appear in the settings tab. */
const SECTION_ORDER = DEFAULT_SETTINGS.regionSettings.map(
  (region) => region.name,
);

export default class MarkdownAutocompletePlugin extends Plugin {
  settings: PluginSettings;
  toolbar: EditorToolbar;

  async onload() {
    await this.loadSettings();

    // Has to happen before anything renders a label.
    setLocale(this.settings.language);

    addIcons();

    this.registerView(
      SidePanelControlViewType,
      (leaf) => new SidePanelControlView(leaf, this),
    );

    this.addRibbonIcon('viewIcon', t('command.openPanel'), () => {
      this.toggleSidePanelControlView();
    });

    this.addCommand({
      id: 'open-command-selector',
      name: t('command.openCommandSelector'),
      hotkeys: [{ modifiers: ['Alt'], key: 'q' }],
      editorCallback: (editor: Editor, view: MarkdownView) => {
        CodeSuggestionModal.display(this.app, editor);
      },
    });

    this.addCommand({
      id: 'open-callouts-selector',
      name: t('command.openCalloutsSelector'),
      hotkeys: [{ modifiers: ['Alt'], key: 'c' }],
      editorCallback: (editor: Editor, view: MarkdownView) => {
        CalloutsSuggestionModal.display(
          this.app,
          editor,
          this.settings.calloutTitles,
        );
      },
    });

    // The panel had only the ribbon icon, which is the one thing a keyboard
    // cannot reach.
    this.addCommand({
      id: 'toggle-side-panel',
      name: t('command.openPanel'),
      callback: () => {
        void this.toggleSidePanelControlView();
      },
    });

    registerFormattingCommands(this, () => this.settings.calloutTitles);

    this.toolbar = new EditorToolbar(this, () => this.settings.toolbar);
    this.toolbar.start();

    this.addSettingTab(new SettingsTab(this.app, this));
  }

  onunload() {
    // Views, commands, the ribbon icon and the settings tab are torn down by
    // Plugin itself. These two are the exception: addIcon is a module-level
    // function outside that lifecycle, and the toolbar lives in the markdown
    // view's own container rather than in anything the plugin owns.
    removeIcons();
    this.toolbar?.detachAll();
  }

  async loadSettings() {
    // Merge into a fresh object - assigning onto DEFAULT_SETTINGS would
    // permanently overwrite the defaults for the rest of the session.
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());

    // The merge is shallow, so every array either comes straight off disk -
    // where it may be anything at all - or IS the default array itself. Both
    // need handling: a malformed value would throw here and take the whole
    // plugin down with it, and mutating a default would poison it for the
    // session. Rebuilding each one solves both at once.
    const storedRegions = Array.isArray(this.settings.regionSettings)
      ? this.settings.regionSettings
      : DEFAULT_SETTINGS.regionSettings;

    this.settings.regionSettings = storedRegions
      .filter((region) => region && typeof region.name === 'string')
      // A section removed since the file was written has no renderer any more,
      // so keeping its entry would only leave a dead toggle behind.
      .filter((region) => SECTION_ORDER.includes(region.name))
      .map((region) => ({
        name: region.name,
        active: region.active !== false,
        visible: region.visible === true,
      }));

    // A settings file written by an older version lacks sections added since.
    const known = this.settings.regionSettings.map((region) => region.name);

    DEFAULT_SETTINGS.regionSettings
      .filter((region) => !known.includes(region.name))
      .forEach((region) => this.settings.regionSettings.push({ ...region }));

    this.settings.savedColors = (
      Array.isArray(this.settings.savedColors)
        ? this.settings.savedColors
        : DEFAULT_SETTINGS.savedColors
    ).filter((color) => typeof color === 'string');

    this.settings.panelAlignment = normalisePanelAlignment(
      this.settings.panelAlignment,
    );

    const stored = this.settings.toolbar;

    this.settings.toolbar = {
      enabled: Boolean(stored && stored.enabled),
      commands: normaliseToolbarCommands(stored && stored.commands),
      alignment: normaliseToolbarAlignment(stored && stored.alignment),
    };
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  /** Every open panel, so the alignment changes without reopening it. */
  applyPanelAlignment(): void {
    this.app.workspace
      .getLeavesOfType(SidePanelControlViewType)
      .forEach((leaf) => {
        // A leaf restored from the saved layout but not yet shown holds a
        // placeholder view; it draws with the current setting when revealed.
        if (leaf.view instanceof SidePanelControlView) {
          leaf.view.applyAlignment();
        }
      });
  }

  private readonly toggleSidePanelControlView = async (): Promise<void> => {
    const { workspace } = this.app;

    // Detaching first is what lets the ribbon icon move the panel to the other
    // side after the setting changes.
    workspace.detachLeavesOfType(SidePanelControlViewType);

    // Both getters return null when the sidebar cannot host a leaf.
    const leaf = this.settings.sidePaneSideLeft
      ? workspace.getLeftLeaf(false)
      : workspace.getRightLeaf(false);

    if (!leaf) {
      new Notice(t('panel.noLeaf'));
      return;
    }

    await leaf.setViewState({
      type: SidePanelControlViewType,
      active: true,
    });

    await workspace.revealLeaf(leaf);
  };
}

class SettingsTab extends PluginSettingTab {
  plugin: MarkdownAutocompletePlugin;

  /**
   * Text fields fire on every keystroke and each save rewrites data.json in
   * full, so a 200-character template meant 200 rewrites - and on a synced
   * vault, 200 chances at a conflict. Coalescing them costs nothing: the
   * in-memory settings are already up to date when the panel reads them.
   */
  private readonly saveSoon = debounce(
    (): void => {
      void this.plugin.saveSettings();
    },
    400,
    true,
  );

  constructor(app: App, plugin: MarkdownAutocompletePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  /**
   * Obsidian calls this when the tab goes away. Whatever the debounce is still
   * holding has to be written now: quitting within 400 ms of the last
   * keystroke used to lose the setting that was just typed.
   */
  hide() {
    this.saveSoon.run();
  }

  // Must stay synchronous: other plugins (e.g. Settings Search) call display()
  // and read containerEl straight after, which sees nothing if this returns a
  // promise instead of a filled container.
  display() {
    let { containerEl } = this;

    containerEl.empty();

    // Scopes the stylesheet's overrides of Obsidian's own button classes to
    // this tab, so they cannot restyle the rest of the app.
    containerEl.addClass('mfa-scope');

    new Setting(containerEl)
      .setName(t('settings.language.name'))
      .setDesc(t('settings.language.desc'))
      .addDropdown((dropdown) => {
        dropdown.addOption(AUTO_LOCALE, t('settings.language.auto'));
        SUPPORTED_LOCALES.forEach((code) =>
          dropdown.addOption(code, LOCALE_NAMES[code]),
        );

        dropdown
          .setValue(this.plugin.settings.language)
          .onChange(async (value) => {
            this.plugin.settings.language = value as LocaleSetting;
            setLocale(this.plugin.settings.language);
            await this.plugin.saveSettings();

            // Redraw so the change is visible without reopening the tab.
            this.display();
          });
      });

    new Setting(containerEl)
      .setName(t('settings.sidePaneSide.name'))
      .setDesc(t('settings.sidePaneSide.desc'))
      .addText((text) =>
        text
          .setPlaceholder(t('settings.sidePaneSide.placeholder'))
          .setValue(this.plugin.settings.sidePaneSideLeft ? 'left' : 'right')
          .onChange((value) => {
            this.plugin.settings.sidePaneSideLeft =
              value === 'left' ? true : false;
            this.saveSoon();
          }),
      );

    new Setting(containerEl)
      .setName(t('settings.panelAlign.name'))
      .setDesc(t('settings.panelAlign.desc'))
      .addDropdown((dropdown) => {
        PANEL_ALIGNMENTS.forEach((option) =>
          dropdown.addOption(option, t(`settings.align.${option}`)),
        );

        dropdown
          .setValue(this.plugin.settings.panelAlignment)
          .onChange(async (value) => {
            this.plugin.settings.panelAlignment = normalisePanelAlignment(value);
            this.plugin.applyPanelAlignment();
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName(t('settings.calloutTitles.name'))
      .setDesc(t('settings.calloutTitles.desc'))
      .addToggle((comp) => {
        comp
          .setValue(this.plugin.settings.calloutTitles)
          .onChange(async (value) => {
            this.plugin.settings.calloutTitles = value;
            await this.plugin.saveSettings();
          });
      });

    const getRegion = (name: string) => {
      return this.plugin.settings.regionSettings.find(
        (item) => item.name === name,
      );
    };

    // One templated pair of strings instead of seven hand-written ones - which
    // is also how the old copy-paste mix-ups got fixed, where the Tables toggle
    // described the Greek Letters section.
    SECTION_ORDER.forEach((regionName) => {
      const region = getRegion(regionName);

      // A settings file written by an older version may not list every region.
      if (!region) return;

      const section = sectionLabel(regionName);

      new Setting(containerEl)
        .setName(t('settings.toggleSection.name', { section }))
        .setDesc(t('settings.toggleSection.desc', { section }))
        .addToggle((comp) => {
          comp.setValue(region.active).onChange(async (value) => {
            region.active = value;
            await this.plugin.saveSettings();
          });
        });
    });

    this.addSavedColorSettings(containerEl);
    this.addToolbarSettings(containerEl);
  }

  /**
   * The toolbar above the note: whether to show it, and which buttons.
   *
   * A button is a command id and nothing more, so this list can hold anything
   * the vault has registered - Obsidian's own commands and other plugins' as
   * readily as this one's.
   */
  private addToolbarSettings(containerEl: HTMLElement) {
    const toolbar = this.plugin.settings.toolbar;

    new Setting(containerEl)
      .setName(t('settings.toolbar.name'))
      .setDesc(t('settings.toolbar.desc'))
      .addToggle((toggle) =>
        toggle.setValue(toolbar.enabled).onChange(async (value) => {
          toolbar.enabled = value;
          await this.plugin.saveSettings();
          this.plugin.toolbar.refresh();
          // Redraw so the button list appears or goes away with the toggle.
          this.display();
        }),
      );

    if (!toolbar.enabled) return;

    new Setting(containerEl)
      .setName(t('settings.toolbar.align.name'))
      .setDesc(t('settings.toolbar.align.desc'))
      .addDropdown((dropdown) => {
        TOOLBAR_ALIGNMENTS.forEach((option) =>
          dropdown.addOption(option, t(`settings.align.${option}`)),
        );

        dropdown.setValue(toolbar.alignment).onChange(async (value) => {
          toolbar.alignment = normaliseToolbarAlignment(value);
          await this.plugin.saveSettings();
          this.plugin.toolbar.refresh();
        });
      });

    const registry = getCommandRegistry(this.plugin);

    // Redraw before the write, never after. Awaiting first leaves the old rows
    // on screen and clickable for the whole of it, and each of them closes over
    // the position it was rendered at - so a second click removes whatever has
    // since moved into that slot. Double-clicking a button's x used to delete
    // its neighbour. The saved-colour swatches already work this way.
    const commit = (commands: string[]) => {
      toolbar.commands = commands;
      this.display();
      this.plugin.toolbar.refresh();
      void this.plugin.saveSettings();
    };

    const list = containerEl.createDiv({ cls: 'mfa-toolbar-editor' });

    if (toolbar.commands.length === 0) {
      list
        .createDiv({ cls: 'mfa-toolbar-empty' })
        .setText(t('settings.toolbar.empty'));
    }

    toolbar.commands.forEach((id, index) => {
      const command = registry.commands[id];
      const row = list.createDiv({ cls: 'mfa-toolbar-item' });

      row.draggable = true;

      const icon = row.createSpan({ cls: 'mfa-toolbar-item-icon' });

      if (command && command.icon) {
        setIcon(icon, command.icon);
      }

      // A command vanishes when its plugin is disabled or uninstalled. The
      // entry is kept - it works again when the plugin returns - but saying so
      // beats showing a blank row.
      row
        .createSpan({ cls: 'mfa-toolbar-item-name' })
        .setText(
          command ? command.name : t('settings.toolbar.unavailable', { id }),
        );

      if (!command) row.addClass('is-unavailable');

      const remove = row.createSpan({ cls: 'mfa-toolbar-item-remove' });
      setIcon(remove, 'x');
      remove.setAttribute('aria-label', t('settings.toolbar.remove'));
      remove.onClickEvent(() => {
        commit(toolbar.commands.filter((_, at) => at !== index));
      });

      // Named like the panel's own drag payload rather than with the mfa-
      // prefix, which throughout this project means a CSS class - and there is
      // a test that holds it to that.
      row.ondragstart = (event) => {
        event.dataTransfer?.setData(DRAG_PAYLOAD, String(index));
      };

      row.ondragover = (event) => {
        event.preventDefault();
      };

      row.ondrop = (event) => {
        event.preventDefault();

        // Every row accepts any drag, so the payload has to be checked rather
        // than trusted. getData returns '' for a format that was never set,
        // and Number('') is 0 - a perfectly valid index, which used to send
        // the first button wherever a stray text selection was dropped.
        const payload = event.dataTransfer?.getData(DRAG_PAYLOAD);

        if (!payload) return;

        commit(moveItem(toolbar.commands, Number(payload), index));
      };
    });

    new Setting(containerEl)
      .setName(t('settings.toolbar.add'))
      .setDesc(
        t('settings.toolbar.addDesc', { max: String(MAX_TOOLBAR_COMMANDS) }),
      )
      .addButton((button) =>
        button
          .setButtonText(t('settings.toolbar.add'))
          .setCta()
          .setDisabled(toolbar.commands.length >= MAX_TOOLBAR_COMMANDS)
          .onClick(() => {
            CommandPickerModal.open(
              this.app,
              allCommands(registry),
              toolbar.commands,
              t('settings.toolbar.pick'),
              (id) => void commit([...toolbar.commands, id]),
            );
          }),
      );
  }

  /**
   * Saved colours as swatches rather than a text field.
   *
   * The old version was a textarea pinned to 400px whatever it held, and it
   * asked people to type hex codes by hand - so it also needed a validator and
   * a warning for malformed lines. Showing the actual colours removes all of
   * that: a swatch cannot be misspelled.
   */
  private addSavedColorSettings(containerEl: HTMLElement) {
    const colors = this.plugin.settings.savedColors;

    const setting = new Setting(containerEl)
      .setName(t('settings.savedColors.name'))
      .setDesc(t('settings.savedColors.desc'));

    // Built into the control area ahead of the picker rather than left loose
    // under the description, where they read as leftover decoration instead of
    // as a control.
    const swatches = setting.controlEl.createDiv({ cls: 'mfa-color-swatches' });

    if (colors.length === 0) {
      swatches.createSpan({ cls: 'mfa-color-empty' }).setText(
        t('settings.savedColors.empty'),
      );
    }

    colors.forEach((color, index) => {
      const swatch = swatches.createDiv({
        cls: 'mfa-color-icon mfa-removable',
      });
      swatch.style.setProperty('--mfa-swatch', color);
      swatch.setAttribute('aria-label', color);
      swatch.title = `${color} - ${t('settings.savedColors.removeHint')}`;

      // Redraw before awaiting the write: the old DOM stays live during the
      // await, and a second click would still carry its stale index.
      swatch.onClickEvent(() => {
        colors.splice(index, 1);
        this.display();
        void this.plugin.saveSettings();
      });
    });

    setting.addColorPicker((picker) =>
      picker.setValue(DEFAULT_PICKER_COLOR).onChange(async (value) => {
        if (colors.includes(value)) return;

        colors.push(value);
        await this.plugin.saveSettings();
        this.display();
      }),
    );
  }
}
