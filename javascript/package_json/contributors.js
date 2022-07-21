const fs = require("fs");
const { execSync } = require("child_process");

const main = ([config]) => {
  const { output_file, all_contributors } = JSON.parse(config);
  const allContrib = JSON.parse(fs.readFileSync(all_contributors, "utf-8"));
  const contributors = [];

  allContrib.contributors.forEach(contrib => { 
    contributors.push({
      name: contrib.name,
      url: contrib.profile
    })
  })

  fs.writeFileSync(output_file, JSON.stringify({ contributors }, null, 2));
};

if (require.main === module) {
  try {
    process.exitCode = main(process.argv.slice(2));
  } catch (e) {
    console.error(process.argv[1], e);
  }
}
