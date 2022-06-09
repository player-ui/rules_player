const fs = require("fs");
const process = require("process");
const path = require('path')

const main = ([config]) => {
  const {
    stable = false,
    substitutions = {},
    version_file,
    info_file,
    files = [],
    outputs = []
  } = JSON.parse(config);

  const variables = fs.readFileSync(stable ? info_file : version_file)
  .toString()
  .trim()
  .split('\n')
  .map(line => line.split(' '))
  .reduce((acc, cv) => ({...acc, ...{[`{${cv[0]}}`]: cv[1]}}))


  files.forEach( f => {
    const outputLocation = outputs.find((o) => o.includes(f))
    if (!outputLocation || !fs.existsSync(f)) { return }
    const contents = fs.readFileSync(f).toString()
    const newContents = Object.keys(substitutions).reduce((acc, cv) => {
      const subValue = variables[substitutions[cv]]
      return subValue ? acc.replace(cv, subValue) : acc
    }, contents)

    fs.writeFileSync(outputLocation, newContents)
  })
}


if (require.main === module) {
  try {
    process.exitCode = main(process.argv.slice(2));
  } catch (e) {
    console.error(process.argv[1], e);
  }
}