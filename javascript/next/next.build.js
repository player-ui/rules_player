const nextBuild = require("next/dist/build").default;
const nextExport = require('next/dist/export').default;
const { trace } = require('next/dist/trace');

const fse = require('fs-extra');
const path = require("path");

main(process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

async function handleSubstitutions(folderOrFile, substitutions) {
  if (Object.keys(substitutions).length === 0) {
    return;
  }

  if (await fse.statSync(folderOrFile).isDirectory()) {
    const files = await fse.readdir(folderOrFile);
    for (const file of files) {
      await handleSubstitutions(path.join(folderOrFile, file), substitutions);
    }

    return;
  }

  let contents = await fse.readFile(folderOrFile, 'utf-8');
  const originalContents = contents;
  for (const key in substitutions) {
    const value = substitutions[key];
    contents = contents.replace(new RegExp(key, 'g'), value);
  }

  // If the contents didn't change (i.e. no substitutions were made), don't write it out
  // This will also fix non-utf8 files from changing
  if (contents !== originalContents) {
    await fse.writeFile(folderOrFile, contents);
  }
}

async function main(argv) {
  const [_1, srcDir, _2, outDir, _3, sub, _4, statusFile, ] = argv;

  const substitutions = JSON.parse(sub);

  if (statusFile) {
    (await fse.readFile(statusFile, 'utf-8')).split('\n').forEach(line => {
      const firstSpace = line.indexOf(' ');
      const varName = line.substring(0, firstSpace);
      const varVal = line.substring(firstSpace + 1);
      process.env[varName] = varVal;

      // Swap out anything referencing the stamped file with the actual value
      Object.keys(substitutions).forEach(key => {
        if (substitutions[key] === varName) {
          substitutions[key] = varVal;
        }
      });
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

  await handleSubstitutions(distDir, substitutions);
}