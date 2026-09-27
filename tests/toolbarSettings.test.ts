import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  DEFAULT_TOOLBAR_COMMANDS,
  MAX_TOOLBAR_COMMANDS,
  PLUGIN_ID,
  TOOLBAR_ALIGNMENTS,
  normaliseToolbarAlignment,
  normaliseToolbarCommands,
  sortedCommands,
} from '../src/toolbarSettings.ts';

const HERE = path.dirname(fileURLToPath(import.meta.url));

test('the namespace matches the id Obsidian actually registers under', () => {
  // Every command id is prefixed with the manifest id. If the two drifted the
  // default buttons would silently resolve to nothing, and the toolbar would
  // come up empty for everyone who never customised it.
  const manifest = JSON.parse(
    fs.readFileSync(path.join(HERE, '..', 'manifest.json'), 'utf8'),
  );

  assert.equal(PLUGIN_ID, manifest.id);
});

test('every default button names a command the plugin registers', () => {
  // Read from the source table rather than imported, which would pull in the
  // obsidian module.
  const source = fs.readFileSync(
    path.join(HERE, '..', 'src', 'formatter.ts'),
    'utf8',
  );
  const table = source.slice(
    source.indexOf('export const formatSettings = withIds({'),
  );
  const keys = [...table.matchAll(/^  ([a-zA-Z0-9]+): \{/gm)].map((m) => m[1]);

  const unknown = DEFAULT_TOOLBAR_COMMANDS.map((id) =>
    id.replace(`${PLUGIN_ID}:`, ''),
  ).filter((id) => !keys.includes(id));

  assert.deepEqual(unknown, [], 'these default buttons would do nothing');
});

// ---------------------------------------------------------------------------
// The list the picker offers
// ---------------------------------------------------------------------------

test('an editor command is offered even though it cannot run right now', () => {
  // The bug this replaced: the picker was built from Obsidian's listCommands(),
  // which returns what is runnable at that moment. The settings dialog has no
  // editor focused, so every command that writes to a note was missing - all
  // but one of this plugin's, and most of Obsidian's with them.
  const registry = {
    'core:palette': { id: 'core:palette', name: 'Command palette' },
    'mfa:bold': { id: 'mfa:bold', name: 'Assistant: Bold' },
  };

  assert.deepEqual(
    sortedCommands(registry).map((command) => command.id),
    ['mfa:bold', 'core:palette'],
  );
});

test("this plugin's own commands come first", () => {
  // Not a courtesy: a suggester renders one screenful until a query narrows
  // it. Sorted purely by name these land under M, behind several hundred of
  // Obsidian's - reachable by typing and invisible to anyone who scrolls,
  // which is exactly the report this fixed.
  const registry = {
    a: { id: 'bookmarks:show', name: 'Bookmarks: Show' },
    b: { id: `${PLUGIN_ID}:h1`, name: 'Markdown Formatting Assistant: H1' },
    c: { id: 'app:go-back', name: 'App: Go back' },
  };

  assert.deepEqual(
    sortedCommands(registry).map((command) => command.id),
    [`${PLUGIN_ID}:h1`, 'app:go-back', 'bookmarks:show'],
  );
});

test('within each group the order is by name', () => {
  const registry = {
    a: { id: `${PLUGIN_ID}:h1`, name: 'Assistant: H1' },
    b: { id: 'zzz:one', name: 'Zebra: One' },
    c: { id: `${PLUGIN_ID}:bold`, name: 'Assistant: Bold' },
    d: { id: 'aaa:two', name: 'Alpha: Two' },
  };

  assert.deepEqual(
    sortedCommands(registry).map((command) => command.name),
    ['Assistant: Bold', 'Assistant: H1', 'Alpha: Two', 'Zebra: One'],
  );
});

test('a command whose id merely contains the plugin id is not treated as ours', () => {
  const registry = {
    a: { id: `other:${PLUGIN_ID}:x`, name: 'Other: X' },
    b: { id: `${PLUGIN_ID}:bold`, name: 'Assistant: Bold' },
  };

  assert.equal(sortedCommands(registry)[0].id, `${PLUGIN_ID}:bold`);
});

test('a nameless or missing register does not throw', () => {
  assert.deepEqual(sortedCommands(undefined as never), []);
  assert.deepEqual(
    sortedCommands({ a: { id: 'a', name: undefined as never } }).length,
    1,
  );
});

// ---------------------------------------------------------------------------
// Normalising what was stored
// ---------------------------------------------------------------------------

test('a missing list falls back to the defaults', () => {
  assert.deepEqual(normaliseToolbarCommands(undefined), DEFAULT_TOOLBAR_COMMANDS);
  assert.deepEqual(normaliseToolbarCommands(null), DEFAULT_TOOLBAR_COMMANDS);
  assert.deepEqual(normaliseToolbarCommands('bold'), DEFAULT_TOOLBAR_COMMANDS);
});

test('the fallback is a copy, so the defaults cannot be mutated', () => {
  const first = normaliseToolbarCommands(undefined);
  first.push('junk');

  assert.equal(
    normaliseToolbarCommands(undefined).includes('junk'),
    false,
    'the default array leaked into the settings',
  );
});

test('an empty list is respected rather than refilled', () => {
  // Emptying the toolbar deliberately is a reasonable thing to do; treating it
  // as "unset" would keep putting the defaults back.
  assert.deepEqual(normaliseToolbarCommands([]), []);
});

test('duplicates are dropped, keeping the first position', () => {
  assert.deepEqual(normaliseToolbarCommands(['a', 'b', 'a', 'c', 'b']), [
    'a',
    'b',
    'c',
  ]);
});

test('non-strings and blanks are skipped', () => {
  assert.deepEqual(
    normaliseToolbarCommands(['a', null, 42, '', '   ', { id: 'b' }, 'c']),
    ['a', 'c'],
  );
});

test('surrounding whitespace is trimmed before comparing', () => {
  assert.deepEqual(normaliseToolbarCommands([' a ', 'a']), ['a']);
});

test('the list is capped', () => {
  const many = Array.from({ length: 200 }, (_, i) => `command-${i}`);

  assert.equal(
    normaliseToolbarCommands(many).length,
    MAX_TOOLBAR_COMMANDS,
  );
});

// ---------------------------------------------------------------------------
// Alignment
// ---------------------------------------------------------------------------

test('each of the three alignments is kept', () => {
  for (const alignment of TOOLBAR_ALIGNMENTS) {
    assert.equal(normaliseToolbarAlignment(alignment), alignment);
  }
});

test('anything else falls back to the default rather than to no layout', () => {
  // A settings file is hand-editable and synced between versions, so 'justify'
  // or a stale value has to land somewhere sensible.
  assert.equal(normaliseToolbarAlignment('justify'), 'left');
  assert.equal(normaliseToolbarAlignment(''), 'left');
  assert.equal(normaliseToolbarAlignment(undefined), 'left');
  assert.equal(normaliseToolbarAlignment(null), 'left');
  assert.equal(normaliseToolbarAlignment(2), 'left');
  assert.equal(normaliseToolbarAlignment('LEFT'), 'left');
});

test('every alignment has a translation and a rule', () => {
  const en = fs.readFileSync(
    path.join(HERE, '..', 'src', 'locales', 'en.ts'),
    'utf8',
  );
  const css = fs.readFileSync(path.join(HERE, '..', 'styles.css'), 'utf8');

  for (const alignment of TOOLBAR_ALIGNMENTS) {
    assert.ok(
      en.includes(`'settings.align.${alignment}'`),
      `${alignment} has no label`,
    );
    assert.ok(
      css.includes(`.is-align-${alignment}`),
      `${alignment} has no stylesheet rule, so it would render as left`,
    );
  }
});

