import {
  App,
  Modal,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
} from 'obsidian';

import { addIcons } from './icons';

import {
  SidePanelControlView,
  SidePanelControlViewType,
} from './SidePanelControlView';
import { CommandListView } from './CommandListView';
import { settings } from 'cluster';

interface PluginSettings {
  triggerChar: string;
}

const DEFAULT_SETTINGS: PluginSettings = {
  triggerChar: '\\',
};

export default class MarkdownAutocompletePlugin extends Plugin {
  settings: PluginSettings;
  private sidePanelControlView: SidePanelControlView;
  private commandListView: CommandListView;

  async onload() {
    console.log('loading plugin');

    await this.loadSettings();
    addIcons();

    this.registerView(
      SidePanelControlViewType,
      (leaf) => (this.sidePanelControlView = new SidePanelControlView(leaf)),
    );

    this.addSettingTab(new SettingsTab(this.app, this));

    this.registerCodeMirror((cm: CodeMirror.Editor) => {
      cm.on('keyup', (cf, event: KeyboardEvent) => {
        return CommandListView.display(
          this.app,
          cf,
          event,
          this.settings.triggerChar,
        );
      });
    });
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign(DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  //   private readonly toggleSidePanelControlView = async (): Promise<void> => {
  //     const existing = this.app.workspace.getLeavesOfType(
  //       SidePanelControlViewType,
  //     );
  //     if (existing.length) {
  //       this.app.workspace.revealLeaf(existing[0]);
  //       return;
  //     }

  //     await this.app.workspace.getLeftLeaf(false).setViewState({
  //       type: SidePanelControlViewType,
  //       active: false,
  //     });

  //     this.app.workspace.revealLeaf(
  //       this.app.workspace.getLeavesOfType(SidePanelControlViewType)[0],
  //     );
  //   };
}

class SettingsTab extends PluginSettingTab {
  plugin: MarkdownAutocompletePlugin;

  constructor(app: App, plugin: MarkdownAutocompletePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  async display() {
    let { containerEl } = this;

    containerEl.empty();

    containerEl.createEl('h2', { text: 'Markdown Autocomplete Settings' });

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
  }
}
