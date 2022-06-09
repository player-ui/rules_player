import path from 'path';
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import styles from "rollup-plugin-styles";
import json from '@rollup/plugin-json';

const isBinBuild = "TMPL_build_target_type" === 'CLI';

const bundle = config => ({
  ...config,
  input: 'TMPL_entry',
  external: id => !/^[./]/.test(id),
})

let builds = [];

if (isBinBuild) {
  builds = [
    bundle({
      plugins: [esbuild()],
      output: [
        {
          file: path.join('TMPL_out_dir', 'TMPL_bin_name'),
          format: 'cjs',
          sourcemap: true
        }
      ]
    })
  ]
} else {
  builds = [
    bundle({
      plugins: [esbuild(), styles({
        modules: true,
      }), json()],
      output: [
        {
          file: path.join('TMPL_out_dir', 'index.cjs.js'),
          format: 'cjs',
          sourcemap: true,
          assetFileNames: "[name]-[hash][extname]",
        },
        {
          file: path.join('TMPL_out_dir', 'index.esm.js'),
          format: 'es',
          sourcemap: true,
          assetFileNames: "[name]-[hash][extname]",
        },
      ],
    }),
    bundle({
      plugins: [dts({
        compilerOptions: {
          paths: TMPL_ts_paths
        }
      })],
      output: {
        file: path.join('TMPL_out_dir', 'index.d.ts'),
        format: 'es',
      },
    }),
  ]
}

export default builds;
