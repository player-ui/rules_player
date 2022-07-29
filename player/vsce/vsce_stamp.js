const fs = require("fs");
const path = require("path");
const extract = require("extract-zip");
const zipFolder = require("zip-folder");

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
  for (const key in substitutions) {
    const value = substitutions[key];
    contents = contents.replace(new RegExp(key, "g"), value);
  }

  await fs.promises.writeFile(folderOrFile, contents);
}

const repackageVSIX = async (input_file, output_file, substitutions) => {
  const tempDir = path.join(__dirname, "temp");
  await fs.promises.mkdir(tempDir, { recursive: true });

  await extract(input_file, { dir: tempDir });
  await handleSubstitutions(tempDir, substitutions);

  await new Promise((resolve, reject) => {
    zipFolder(tempDir, output_file, (err) => {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });

  await fs.promises.rm(tempDir, { recursive: true });
};

const main = async ([config]) => {
  const { input_file, output_file, stamp, substitutions } = JSON.parse(config);

  // Don't do much if we don't have to stamp, just copy it over as is
  if (!stamp) {
    fs.copyFileSync(input_file, output_file);
    return;
  }

  // Grab all of the vars to stamp
  // Unzip the file
  // Replace what needs to be replaced
  // Rezip it to the new location

  const stampFile = fs.readFileSync(stamp, "utf-8");

  // TODO: Should share this as a common module
  stampFile.split("\n").forEach((line) => {
    const firstSpace = line.indexOf(" ");
    const varName = line.substring(0, firstSpace);
    const varVal = line.substring(firstSpace + 1);

    // Swap out anything referencing the stamped file with the actual value
    Object.keys(substitutions).forEach((key) => {
      if (substitutions[key] === `{${varName}}`) {
        substitutions[key] = varVal;
      }
    });
  });

  await repackageVSIX(input_file, output_file, substitutions);
};

if (require.main === module) {
  try {
    process.exitCode = main(process.argv.slice(2));
  } catch (e) {
    console.error(process.argv[1], e);
  }
}
