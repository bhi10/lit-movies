import rollupCommonjs from "@rollup/plugin-commonjs";
import { fromRollup } from '@web/dev-server-rollup';

const commonjs = fromRollup(rollupCommonjs);

export default {
  appIndex: 'index.html',
  open: true,
  nodeResolve: true,
  plugins: [commonjs()]
}