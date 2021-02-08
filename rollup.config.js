import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';

const exportFolder =
  '.obsidian/plugins/obsidian-markdown-formatting-assistant-plugin';
export default {
  input: 'src/main.ts',
  output: {
    dir: exportFolder,
    sourcemap: 'inline',
    format: 'cjs',
    exports: 'default',
  },
  external: ['obsidian'],
  plugins: [
    copy({
      targets: [
        { src: 'styles.css', dest: exportFolder },
        { src: 'manifest.json', dest: exportFolder },
        { src: 'versions.json', dest: exportFolder },
      ],
    }),
    typescript(),
    nodeResolve({ browser: true }),
    commonjs({
      include: 'node_modules/ramda/**',
    }),
  ],
};
