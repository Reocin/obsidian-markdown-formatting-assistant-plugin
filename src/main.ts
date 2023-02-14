import {
  App,
  Editor,
  MarkdownView,
  Modal,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
  Workspace,
  EditorPosition,
} from 'obsidian';

import { addIcons } from './icons';

import {
  SidePanelControlView,
  SidePanelControlViewType,
} from './SidePanelControlView';
import plugin from 'rollup-plugin-import-css';
import { CodeSuggestionModal } from './CommandListView';
import { CalloutsSuggestionModal } from './CalloutsListView';

interface RegionSetting {
  name: string;
  active: boolean;
  visible: boolean;
}
export interface PluginSettings {
  triggerChar: string;
  sidePaneSideLeft: Boolean;
  savedColors: string[];
  aviabileRegions: string[];
  regionSettings: Array<RegionSetting>;
}

const DEFAULT_SETTINGS: PluginSettings = {
  triggerChar: '\\',
  sidePaneSideLeft: false,
  savedColors: ['#ff0000'],
  aviabileRegions: [
    'textEdit',
    'tabels',
    'html',
    'latex',
    'greekLetters',
    'colors',
    'callouts',
  ],
  regionSettings: [
    { name: 'textEdit', active: true, visible: false },
    { name: 'tables', active: true, visible: false },
    { name: 'html', active: true, visible: false },
    { name: 'latex', active: true, visible: false },
    { name: 'greekLetters', active: true, visible: false },
    { name: 'colors', active: true, visible: false },
    { name: 'callouts', active: true, visible: false },
  ],
};

export default class MarkdownAutocompletePlugin extends Plugin {
  settings: PluginSettings;
  private sidePanelControlView: SidePanelControlView;

  async onload() {
    console.log('loading obsidian-markdown-formatting-assistant-plugin');

    await this.loadSettings();
    addIcons();

    this.registerView(SidePanelControlViewType, (leaf) => {
      this.sidePanelControlView = new SidePanelControlView(leaf, this);
      return this.sidePanelControlView;
    });

    this.addRibbonIcon('viewIcon', 'Open Markdown Formatting Assistant', () => {
      this.toggleSidePanelControlView();
    });

    this.addCommand({
      id: 'open-command-selector',
      name: 'Open Command Selector',
      hotkeys: [{ modifiers: ['Alt'], key: 'q' }],
      editorCallback: (editor: Editor, view: MarkdownView) => {
        CodeSuggestionModal.display(this.app, editor);
      },
    });

    this.addCommand({
      id: 'open-callouts-selector',
      name: 'Open Callouts Selector',
      hotkeys: [{ modifiers: ['Alt'], key: 'c' }],
      editorCallback: (editor: Editor, view: MarkdownView) => {
        CalloutsSuggestionModal.display(this.app, editor);
      },
    });

    this.addSettingTab(new SettingsTab(this.app, this));
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign(DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  private readonly toggleSidePanelControlView = async (): Promise<void> => {
    // const existing = this.app.workspace.getLeavesOfType(
    //   SidePanelControlViewType,
    // );

    // if (existing.length) {
    //   this.app.workspace.revealLeaf(existing[0]);
    //   return;
    // }

    this.app.workspace.detachLeavesOfType(SidePanelControlViewType);

    if (this.settings.sidePaneSideLeft) {
      await this.app.workspace.getLeftLeaf(false).setViewState({
        type: SidePanelControlViewType,
        active: true,
      });
    } else {
      await this.app.workspace.getRightLeaf(false).setViewState({
        type: SidePanelControlViewType,
        active: true,
      });
    }

    this.app.workspace.revealLeaf(
      this.app.workspace.getLeavesOfType(SidePanelControlViewType)[0],
    );
  };
}

class SettingsTab extends PluginSettingTab {
  plugin: MarkdownAutocompletePlugin;

  constructor(app: App, plugin: MarkdownAutocompletePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  close() {
    console.log('closed');
    super.hide();
  }

  async display() {
    let { containerEl } = this;

    containerEl.empty();

    containerEl.createEl('h2', {
      text: 'Markdown Formatting Assistant Settings',
    });

    new Setting(containerEl)
      .setName('Trigger Char')
      .setDesc('Char which triggers the autocompletion')
      .addText((text) =>
        text
          .setPlaceholder('Enter a char to trigger the autocompletion')
          .setValue(this.plugin.settings.triggerChar)
          .onChange(async (value) => {
            this.plugin.settings.triggerChar = value;
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName('Side Pane Side')
      .setDesc('Choose on which side the Side Pane accours. ()')
      .addText((text) =>
        text
          .setPlaceholder('Enter left or right')
          .setValue(this.plugin.settings.sidePaneSideLeft ? 'left' : 'right')
          .onChange(async (value) => {
            this.plugin.settings.sidePaneSideLeft =
              value === 'left' ? true : false;
            await this.plugin.saveSettings();
          }),
      );

    const getRegion = (name: string) => {
      return this.plugin.settings.regionSettings.find(
        (item) => item.name === name,
      );
    };

    new Setting(containerEl)
      .setName('Toggle Text Section')
      .setDesc(
        'Activate or deactivate the Text Editor section. (restart required)',
      )
      .addToggle((comp) => {
        comp.setValue(getRegion('textEdit').active).onChange(async (e) => {
          const region = getRegion('textEdit');

          region.active = e;
          await this.plugin.saveSettings();
        });
      });

    new Setting(containerEl)
      .setName('Toggle Tabels Section')
      .setDesc(
        'Activate or deactivate the Greek Letters section. (restart required)',
      )
      .addToggle((comp) => {
        comp.setValue(getRegion('tables').active).onChange(async (e) => {
          const region = getRegion('tables');

          region.active = e;
          await this.plugin.saveSettings();
        });
      });

    new Setting(containerEl)
      .setName('Toggle HTML Section')
      .setDesc('Activate or deactivate the HTML section. (restart required)')
      .addToggle((comp) => {
        comp.setValue(getRegion('html').active).onChange(async (e) => {
          const region = getRegion('html');

          region.active = e;
          await this.plugin.saveSettings();
        });
      });

    new Setting(containerEl)
      .setName('Toggle Colors Section')
      .setDesc('Activate or deactivate the Colors section. (restart required)')
      .addToggle((comp) => {
        comp.setValue(getRegion('colors').active).onChange(async (e) => {
          const region = getRegion('colors');

          region.active = e;
          await this.plugin.saveSettings();
        });
      });

    new Setting(containerEl)
      .setName('Toggle Latex Section')
      .setDesc('Activate or deactivate the Latex section. (restart required)')
      .addToggle((comp) => {
        comp.setValue(getRegion('latex').active).onChange(async (e) => {
          const region = getRegion('latex');

          region.active = e;
          await this.plugin.saveSettings();
        });
      });

    new Setting(containerEl)
      .setName('Toggle Greek Letters Section')
      .setDesc(
        'Activate or deactivate the Greek Letters section. (restart required)',
      )
      .addToggle((comp) => {
        comp.setValue(getRegion('greekLetters').active).onChange(async (e) => {
          const region = getRegion('greekLetters');

          region.active = e;
          await this.plugin.saveSettings();
        });
      });

    new Setting(containerEl)
      .setName('Saved Colors')
      .setDesc(
        'Colors which are saved via the color picker. The order will be also considered. Requiers a restart of obsidian.',
      )
      .addTextArea((text) => {
        text.inputEl.style.minHeight = '400px';

        text
          .setValue(
            this.plugin.settings.savedColors
              .reverse()
              .map((color, i) => color)
              .join('\n'),
          )
          .onChange(async (value) => {
            let colors = value.split('\n').reverse();
            let filteredColors = colors.filter((color) => {
              return /^#[0-9A-F]{6}$/i.test(color);
            });
            this.plugin.settings.savedColors = filteredColors;
            await this.plugin.saveSettings();
          });

        text.inputEl.addEventListener('focusout', (ev) => {
          // @ts-ignore
          let colors = ev.target.value.split('\n').reverse();

          // @ts-ignore
          let filteredColors = colors.map((color, i) => {
            const isHex = /^#[0-9A-F]{6}$/i.test(color);
            if (!isHex) {
              new Notice(
                'The color ' +
                  color +
                  'on Line' +
                  (i + 1) +
                  " has the wrong format and wan't be saved.",
              );
            }
          });
        });
      });

      new Setting(containerEl)
      .setName('Toggle Callouts Section')
      .setDesc(
        'Activate or deactivate the Callouts section. (restart required)',
      )
      .addToggle((comp) => {
        comp.setValue(getRegion('callouts').active).onChange(async (e) => {
          const region = getRegion('callouts');

          region.active = e;
          await this.plugin.saveSettings();
        });
      });
  }
}
