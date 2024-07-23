const fs = require("fs");
const path = require("path");
const os = require('os');
// const tar = require('tar');

async function handleSubstitutions(folderOrFile, substitutions) {
  if (Object.keys(substitutions).length === 0) {
    return;
  }

  if ((await fs.promises.stat(folderOrFile)).isDirectory()) {
    const files = await fs.promises.readdir(folderOrFile);
    for (const file of files) {
      await handleSubstitutions(path.join(folderOrFile, file), substitutions);
    }

    return;
  }

  let contents = await fs.promises.readFile(folderOrFile, "utf-8");
  const originalContents = contents;
  for (const key in substitutions) {
    const value = substitutions[key];
    contents = contents.replace(new RegExp(key, "g"), value);
  }
  
  if (contents !== originalContents) {
    await fs.promises.writeFile(folderOrFile, contents);
  }
}

const repackageTar = async (input_file, output_file, substitutions) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'stamping-'));
  const tempTar = path.join(tempDir, "temp.tar");
  const tempOutputDir = path.join(tempDir, "output");
  await fs.promises.mkdir(tempOutputDir, { recursive: true });

  const cp = require('child_process')
  
  cp.spawnSync('tar -xvf',[input_file],{cwd: tempOutputDir})
  // await tar.extract({
  //   cwd: tempOutputDir,
  //   file: input_file,
  // });

  await handleSubstitutions(tempOutputDir, substitutions);

  cp.spawnSync('tar -czvf', [output_file], {cwd: tempOutputDir})
//   await tar.create({
//     file: output_file,
//     cwd: tempOutputDir,
//     gzip: true,
//   }, ['.']);
// };
}

const main = async ([config]) => {
  const { input_file, version_file, output_file, stamp, stable, substitutions, stamp_file } = JSON.parse(config);

  const file = stable ? info_file : version_file 
  

  // Don't do much if we don't have to stamp, just copy it over as is
  if (!stamp) {
    fs.copyFileSync(input_file, output_file);
    return;
  }

  // Grab all of the vars to stamp
  // untar the file
  // Replace what needs to be replaced
  // retar it to the new location
  
  const stampFile = fs.readFileSync(path.resolve(__dirname,"../../../../../../../../../../../" + stamp), "utf-8");

  // TODO: Should share this as a common module
  stampFile.split("\n").forEach((line) => {
    const firstSpace = line.indexOf(" ");
    const varName = line.substring(0, firstSpace);
    let varVal = line.substring(firstSpace + 1);

    // Using the same match as https://github.com/bazelbuild/rules_nodejs/blob/stable/internal/pkg_npm/packager.js#L139
    if (varName.endsWith('_VERSION')) {
      // vscode doesn't let you have `-canary` suffixes
      varVal = varVal.replace(/[^\d.]/g, '');
    }

    // Swap out anything referencing the stamped file with the actual value
    Object.keys(substitutions).forEach((key) => {
      if (substitutions[key] === `{${varName}}`) {
        substitutions[key] = varVal;
      }
    });
  });

  await repackageTar(input_file, output_file, substitutions);

};

main(process.argv.slice(2)).catch((e) => {
  console.error(e);
  process.exit(1);
})
