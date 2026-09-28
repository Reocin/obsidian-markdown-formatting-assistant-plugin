import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Links to the plugin's own repository, checked by reading the files that
 * carry them.
 *
 * Until 0.9.1 the panel sent people who wanted to report a missing tag to the
 * fork it was being maintained in, whose issue tracker is turned off. Nothing
 * failed; the link just led nowhere useful. The repository the community
 * catalogue installs from is the one whose tracker is open, so every link
 * names that one.
 */

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, '..');

// The owner changes if the repository is ever transferred. GitHub redirects
// the old address afterwards, so this is the only line that has to follow.
const OWNER = 'Reocin';
const REPOSITORY = 'obsidian-markdown-formatting-assistant-plugin';

const read = (relative: string) =>
  fs.readFileSync(path.join(ROOT, relative), 'utf8');

// Walked by hand: the project's Node typings predate readdirSync's recursive
// option. The locale files are included, since a translation can carry a link.
const typescriptUnder = (dir: string): Array<string> =>
  fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true }).flatMap((entry) => {
    const relative = path.join(dir, entry.name);
    if (entry.isDirectory()) return typescriptUnder(relative);
    return entry.name.endsWith('.ts') ? [relative] : [];
  });

const sources = typescriptUnder('src');

// Every language's README, not only the English one: they carry the same
// links, and a translation is the likeliest place for one to be missed.
const readmes = fs
  .readdirSync(ROOT)
  .filter((name) => /^README(\.[a-z]{2})?\.md$/.test(name));

const files = [...sources, ...readmes, 'manifest.json', 'package.json'];

test('every link to the repository names the one the catalogue installs from', () => {
  // The badges name the repository too, through shields.io, and would go on
  // quietly showing the old one's numbers after a transfer.
  const pattern = new RegExp(
    `(?:github\\.com[/:]|shields\\.io/github/(?:[\\w-]+/)+?)([\\w-]+)/${REPOSITORY}`,
    'g',
  );
  const elsewhere: Array<string> = [];

  for (const file of files) {
    for (const [, owner] of read(file).matchAll(pattern)) {
      if (owner !== OWNER) elsewhere.push(`${file}: ${owner}`);
    }
  }

  assert.deepEqual(elsewhere, []);
});

test('there is a README for every interface language, and each links to all of them', () => {
  // The row of languages at the top is copied into every file, so a language
  // added to one and forgotten in another is easy - and invisible until a
  // reader clicks it.
  const locales = fs
    .readdirSync(path.join(ROOT, 'src', 'locales'))
    .filter((name) => name.endsWith('.ts') && name !== 'index.ts');

  assert.equal(readmes.length, locales.length, 'a language has no README');

  for (const file of readmes) {
    const linked = new Set(
      [...read(file).matchAll(/href="(README(?:\.[a-z]{2})?\.md)"/g)].map(
        ([, target]) => target,
      ),
    );
    assert.deepEqual([...linked].sort(), [...readmes].sort(), file);
  }
});

test('the panel links to the repository at all', () => {
  // Guards the test above against passing because the links were removed.
  assert.ok(
    read(path.join('src', 'SidePanelControlView.ts')).includes(
      `github.com/${OWNER}/${REPOSITORY}`,
    ),
  );
});

test('an anchor into the README points at a heading it has', () => {
  // Renaming a heading breaks the link silently: GitHub opens the page at the
  // top instead of complaining.
  const slug = (heading: string) =>
    heading
      .trim()
      .toLowerCase()
      .replace(/[^\w\- ]/g, '')
      .replace(/ /g, '-');

  const headings = new Set(
    [...read('README.md').matchAll(/^#{1,6} (.+)$/gm)].map(([, h]) => slug(h)),
  );

  const anchors = sources.flatMap((file) =>
    [...read(file).matchAll(/URL\}#([\w-]+)|\/[\w-]+#([\w-]+)/g)].map(
      ([, a, b]) => ({ file, anchor: a ?? b }),
    ),
  );

  assert.ok(anchors.length > 0, 'expected at least the color picker help link');
  for (const { file, anchor } of anchors) {
    assert.ok(headings.has(anchor), `${file}: #${anchor} is not a README heading`);
  }
});
