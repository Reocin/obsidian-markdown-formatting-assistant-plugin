import {
  ButtonComponent,
  ItemView,
  Notice,
  TFile,
  WorkspaceLeaf,
} from 'obsidian';

import * as R from 'ramda';
import MarkdownAutocompletePlugin from './main';

export const SidePanelControlViewType = 'side-panel-control-view';
// @ts-ignore
import { createApp, reactive } from 'petite-vue';
// @ts-ignore
import html from './components/SidePane/test.html';

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
    return 'Markdown-Autocomplete';
  }

  public getIcon(): string {
    return 'viewIcon';
  }

  public load(): void {
    super.load();
    this.draw();

    const app = reactive({
      movieType: 'popular',
      results: '',
      async search() {
        const movieSearch = await fetch(
          `https://api.themoviedb.org/3/movie/${this.movieType}?api_key=fbb0c92eb459272c7afd323360fb1146`,
        );
        this.results = await movieSearch.json();
      },
    });
    createApp({ app }).mount('#movieapp');

    console.log('hello');
    console.log(createApp);
  }

  private draw(): void {
    const container = this.containerEl.children[1];

    const rootEl = document.createElement('div');
    rootEl.id = 'SidePaneRootElement';

    rootEl.innerHTML = html;
    container.empty();
    container.appendChild(rootEl);
  }
}
