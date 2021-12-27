import html from "@web/rollup-plugin-html";
import {copy} from "@web/rollup-plugin-copy";
import resolve from "@rollup/plugin-node-resolve";
import {terser} from "rollup-plugin-terser";
import minifyHTML from "rollup-plugin-minify-html-literals";
import summary from "rollup-plugin-summary";

export default {
  plugins: [
    html({
      input: 'index.html',
    }),
    resolve(),
    minifyHTML(),
    terser({
      ecma: 2021,
      module: true,
      warnings: true,
    }),
    summary(),
    copy({
      patterns: ['src/img/**/*']
    })
  ],
  output: {
    dir: 'dist',
  },
  preserveEntrySignatures: 'strict',
};