import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { colorCode, wrapWithColor } from '../src/colorMarkup.ts';

const none = {
  color: false,
  background: false,
  styleAttribute: false,
  html: false,
};

// ---------------------------------------------------------------------------
// Colouring a selection
// ---------------------------------------------------------------------------

test('selected text is kept', () => {
  // The bug behind three separate reports: clicking a colour with a word
  // selected replaced that word with '#ff0000'.
  const result = wrapWithColor('#ff0000', 'hello', none);

  assert.ok(result.includes('hello'), 'the selected text was lost');
});

test('a selection is wrapped in a font tag by default', () => {
  assert.equal(
    wrapWithColor('#ff0000', 'hello', none),
    '<font color="#ff0000">hello</font>',
  );
});

test('the tag checkbox makes no difference to a selection', () => {
  // Wrapping is the only thing "colour this text" can mean, so it does not
  // wait for a checkbox that the reporters had to discover for themselves.
  assert.equal(
    wrapWithColor('#ff0000', 'hello', { ...none, html: true }),
    wrapWithColor('#ff0000', 'hello', none),
  );
});

test('nor does the style attribute checkbox', () => {
  assert.equal(
    wrapWithColor('#ff0000', 'hello', { ...none, styleAttribute: true }),
    '<font color="#ff0000">hello</font>',
  );
});

test('asking for a background produces a span, since font cannot', () => {
  // A font tag colours text and nothing else. Wrapping in one here would
  // quietly do something other than what was asked.
  assert.equal(
    wrapWithColor('#ff0000', 'hello', { ...none, background: true }),
    '<span style="background-color: #ff0000">hello</span>',
  );
});

test('both declarations land in the same span', () => {
  assert.equal(
    wrapWithColor('#ff0000', 'hello', {
      ...none,
      color: true,
      background: true,
    }),
    '<span style="color: #ff0000; background-color: #ff0000">hello</span>',
  );
});

test('a multi-line selection is wrapped whole', () => {
  assert.equal(
    wrapWithColor('#fff', 'two\nlines', none),
    '<font color="#fff">two\nlines</font>',
  );
});

test('an empty selection still produces a usable tag', () => {
  assert.equal(wrapWithColor('#fff', '', none), '<font color="#fff"></font>');
});

// ---------------------------------------------------------------------------
// Inserting code when nothing is selected
// ---------------------------------------------------------------------------

test('with nothing ticked the colour is written as it is', () => {
  assert.equal(colorCode('#ff0000', none), '#ff0000');
});

test('each declaration checkbox does what it says', () => {
  assert.equal(colorCode('#ff0000', { ...none, color: true }), 'color: #ff0000');
  assert.equal(
    colorCode('#ff0000', { ...none, background: true }),
    'background-color: #ff0000',
  );
});

test('both give both declarations', () => {
  assert.equal(
    colorCode('#ff0000', { ...none, color: true, background: true }),
    'color: #ff0000; background-color: #ff0000',
  );
});

test('the style attribute wraps whatever was built', () => {
  assert.equal(
    colorCode('#ff0000', { ...none, color: true, styleAttribute: true }),
    'style="color: #ff0000"',
  );
});

test('the tag takes a colour, not a declaration', () => {
  // 'style' and the tag together used to emit
  // <font color="style="color: #ff0000"">, which is not markup at all.
  const result = colorCode('#ff0000', {
    color: true,
    background: false,
    styleAttribute: true,
    html: true,
  });

  assert.equal(result, '<font color="#ff0000"></font>');
  assert.ok(!result.includes('style='), 'the attribute was nested inside itself');
});

test('every combination produces balanced quotes', () => {
  // Sixteen combinations, and the broken one was reachable by ticking two
  // boxes that look unrelated.
  for (let mask = 0; mask < 16; mask++) {
    const options = {
      color: Boolean(mask & 1),
      background: Boolean(mask & 2),
      styleAttribute: Boolean(mask & 4),
      html: Boolean(mask & 8),
    };

    for (const produced of [
      colorCode('#ff0000', options),
      wrapWithColor('#ff0000', 'x', options),
    ]) {
      const quotes = (produced.match(/"/g) || []).length;

      assert.equal(
        quotes % 2,
        0,
        `odd number of quotes in ${produced} for ${JSON.stringify(options)}`,
      );
      assert.ok(
        !/=""[^>]/.test(produced),
        `an attribute closed early in ${produced}`,
      );
    }
  }
});

// ---------------------------------------------------------------------------
// What the checkbox says
// ---------------------------------------------------------------------------

test('the html checkbox label shows what the click writes, in every language', () => {
  // Since 0.9.0 the checkbox only applies with nothing selected, and then it
  // writes an empty tag. The label went on promising {selected text} inside
  // the tag until 0.10.0, which is the one case the checkbox does not handle.
  const dir = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
    'src',
    'locales',
  );
  const written = colorCode('#ff0000', { ...none, html: true });

  assert.equal(written, '<font color="#ff0000"></font>');

  const locales = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.ts') && file !== 'index.ts');

  assert.equal(locales.length, 12);
  for (const file of locales) {
    const source = fs.readFileSync(path.join(dir, file), 'utf8');
    const label = source.match(/'colors\.optionHtmlTag':\s*'([^']*)'/);

    assert.ok(label, `${file} has no html option label`);
    assert.ok(label[1].includes('></font>'), `${file}: ${label[1]}`);
    assert.ok(!label[1].includes('{selected text}'), `${file}: ${label[1]}`);
  }
});
