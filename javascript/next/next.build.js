const nextBuild = require("next/dist/build").default;
const nextExport = require('next/dist/export').default;
const { trace } = require('next/dist/trace');

const fse = require('fs-extra');
const path = require("path");

main(process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

async function main(argv) {
  const [_1, srcDir, _2, outDir, _3, statusFile] = argv;

  if (statusFile) {
    (await fse.readFile(statusFile, 'utf-8')).split('\n').forEach(line => {
      const firstSpace = line.indexOf(' ');
      const varName = line.substring(0, firstSpace);
      const varVal = line.substring(firstSpace + 1);
      process.env[varName] = varVal;
    })
  }

  const rootDir = path.resolve(srcDir);
  const distDir = path.resolve(outDir);
  
  await nextBuild(rootDir, null, false, true, false);

  await nextExport(rootDir, {
    threads: 6,
    outdir: path.join(rootDir, 'out')
  }, trace('bazel-export'));

  await fse.move(path.join(rootDir, 'out'), distDir, {
    overwrite: true
  });
}