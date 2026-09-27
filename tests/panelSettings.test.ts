import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  DEFAULT_PANEL_ALIGNMENT,
  PANEL_ALIGNMENTS,
  normalisePanelAlignment,
} from '../src/panelSettings.ts';
import { TOOLBAR_ALIGNMENTS } from '../src/toolbarSettings.ts';

/**
 * Where the side panel's buttons sit - issue #94.
 *
 * The setting is a class on the panel and a handful of rules in the
 * stylesheet, so most of what can go wrong is the two drifting apart: a choice
 * in the dropdown with no rule behind it renders exactly like the default, and
 * nothing anywhere reports it.
 */

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, '..');

// Line endings normalised: a Windows checkout has CRLF, and one of the checks
// below looks across a line break.
const read = (...parts: string[]) =>
  fs.readFileSync(path.join(ROOT, ...parts), 'utf8').replace(/\r\n/g, '\n');

const withoutComments = (source: string) =>
  source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

const css = withoutComments(read('styles.css'));

test('each of the three alignments is kept', () => {
  for (const alignment of PANEL_ALIGNMENTS) {
    assert.equal(normalisePanelAlignment(alignment), alignment);
  }
});

test('anything else falls back to centred, the way the panel has always looked', () => {
  assert.equal(DEFAULT_PANEL_ALIGNMENT, 'center');

  for (const value of ['justify', '', undefined, null, 2, 'LEFT', {}]) {
    assert.equal(normalisePanelAlignment(value), 'center');
  }
});

test('the choices are the toolbar’s, whose labels they share', () => {
  assert.deepEqual(PANEL_ALIGNMENTS, TOOLBAR_ALIGNMENTS);
});

test('every alignment has a label', () => {
  const en = read('src', 'locales', 'en.ts');

  assert.ok(en.includes(`'settings.panelAlign.name'`));
  for (const alignment of PANEL_ALIGNMENTS) {
    assert.ok(
      en.includes(`'settings.align.${alignment}'`),
      `${alignment} has no label`,
    );
  }
});

test('every alignment moves the buttons, the swatches, the table and the text', () => {
  // One missing selector and that part of the panel quietly stays centred
  // while the rest follows the setting.
  for (const alignment of PANEL_ALIGNMENTS) {
    const scope = `.markdown-formatting-assistant-panel.is-align-${alignment}`;

    for (const part of [
      '.nav-buttons-container',
      '.mfa-color-swatches',
      '.mfa-table-grid',
      ':is(.mfa-note',
    ]) {
      assert.ok(
        css.includes(`${scope} ${part}`) || css.includes(`${scope}\n  ${part}`),
        `${alignment} does not reach ${part}`,
      );
    }
  }
});

test('the side panel’s swatches are no longer pinned to the right edge', () => {
  // The rule meant for the settings tab used to apply to every swatch row,
  // so the panel's recent and saved colours hugged its right edge from 0.6.0
  // on, whatever else in the panel did.
  const bare = css.match(/(^|\n)\.mfa-color-swatches\s*\{([^}]*)\}/);

  assert.ok(bare, 'the base swatch rule is missing');
  assert.ok(
    !/justify-content/.test(bare[2]),
    'the base rule decides the alignment for the panel too',
  );
  assert.match(
    css,
    /\.setting-item-control \.mfa-color-swatches\s*\{[^}]*justify-content:\s*flex-end/,
    'the settings tab lost its right-aligned swatches',
  );
});

test('the panel is drawn with the setting and follows it when it changes', () => {
  const panel = withoutComments(read('src', 'SidePanelControlView.ts'));
  const main = withoutComments(read('src', 'main.ts'));

  assert.ok(
    panel.includes('is-align-${this.plugin.settings.panelAlignment}'),
    'the panel is drawn without the alignment class',
  );
  assert.ok(
    panel.includes('toggleClass(`is-align-${alignment}`'),
    'an open panel cannot change its alignment',
  );
  assert.ok(
    main.includes('this.plugin.applyPanelAlignment()'),
    'changing the setting does not reach an open panel',
  );
});
