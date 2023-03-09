import rollupCommonjs from "@rollup/plugin-commonjs";
import { fromRollup } from '@web/dev-server-rollup';
import { esbuildPlugin } from "@web/dev-server-esbuild";

const commonjs = fromRollup(rollupCommonjs);

export default {
  appIndex: 'index.html',
  open: true,
  nodeResolve: true,
  watch: true,
  plugins: [commonjs(), esbuildPlugin({ ts: true })],
}