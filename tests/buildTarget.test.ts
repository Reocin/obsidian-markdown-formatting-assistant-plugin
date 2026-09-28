import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * What the plugin is compiled down to - #96.
 *
 * Until 0.10.1 it was ES5, which rewrites every class into a function that
 * extends its base with `_super.call(this, ...)`. A native class constructor
 * refuses to be called that way, so the moment Obsidian's own Plugin, ItemView
 * and Modal classes are native, an ES5 plugin cannot even be constructed.
 * Obsidian has said it is phasing ES5 plugins out.
 */

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, '..');

const read = (relative: string) =>
  fs.readFileSync(path.join(ROOT, relative), 'utf8');

test('the compiler targets a version with native classes', () => {
  // tsconfig.json carries comments, so it is read rather than parsed.
  const target = read('tsconfig.json').match(/"target"\s*:\s*"([^"]+)"/);

  assert.ok(target, 'tsconfig.json names no target');
  assert.ok(
    !/^es(3|5)$/i.test(target[1]),
    `target ${target[1]} rewrites classes into ES5 functions`,
  );
});

test('the shipped bundle extends Obsidian’s classes natively', () => {
  // The committed build is what users get, so it is checked as well as the
  // setting that produces it.
  const bundle = read(path.join('build', 'main.js'));

  assert.ok(!bundle.includes('__extends('), 'build/main.js still subclasses the ES5 way');
  assert.match(
    bundle,
    /class \w+ extends obsidian\.Plugin\b/,
    'the plugin class is not a native subclass of Plugin',
  );
});
