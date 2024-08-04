import fs from 'fs';
import path from 'path';
import os from 'os';
import {spawnSync} from 'child_process';
import process from 'process';


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
  const tempDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'stamping-'))
  const tempOutputDir = path.join(tempDir, "output");
  await fs.promises.mkdir(tempOutputDir, { recursive: true });

  spawnSync('tar',['-xzvf', input_file, '-C', tempOutputDir], {stdio:'inherit'})

  await handleSubstitutions(tempOutputDir, substitutions);

  spawnSync('tar',['-czvf', output_file, '-C', tempOutputDir, '.'], {stdio:'inherit'})
}


const main = async ([config]) => {
  const { input_file, output_file,stable, stamp, substitutions,version_file, info_file} = JSON.parse(config);

  const resolvedInputFile = path.resolve(input_file)
  const resolvedOutputFile = path.resolve(output_file)

  // If stamping doesnt exist, just copy files
  if (!stamp) {
    fs.copyFileSync(resolvedInputFile, resolvedOutputFile);
    return;
  }
  
  // from bazel builld //docs:gh_deploy no info and version file
  let file = stable ? info_file : version_file 

  // need this to find the bazel-out/ path
  process.chdir(process.env.JS_BINARY__EXECROOT)  

  const stampFile = fs.readFileSync(file,"utf-8");

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

  await repackageTar(resolvedInputFile, resolvedOutputFile, substitutions);

};

main(process.argv.slice(2)).catch((e) => {
  console.error(e);
  process.exit(1);
})
