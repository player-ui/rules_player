const fs = require('fs');

const main = ([config]) => {
  const { input_files, output_file } = JSON.parse(config);
  let merged_json = {};

  input_files.forEach(file => { 
    const json = JSON.parse(fs.readFileSync(file, 'utf-8'));
    merged_json = {
      ...merged_json,
      ...json,
    }
  });

  fs.writeFileSync(output_file, JSON.stringify(merged_json, null, 2));
};

if (require.main === module) {
  try {
    process.exitCode = main(process.argv.slice(2));
  } catch (e) {
    console.error(process.argv[1], e);
  }
}
