const fse = require('fs-extra');
const ghPages = require('gh-pages');
const { execSync } = require('child_process');

async function deployPages(dir, config) {
  return new Promise((resolve, reject) => { 
    ghPages.publish(dir, config, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  })
}

async function main(argv) { 
  const [_0, srcDir, _1, repo, _2, branch, _3, versionFile, _4, ghUser, _5, ghEmail] = argv;
  const version = await fse.readFile(versionFile, 'utf8');
  console.log(`Deploying version ${version} to gh-pages`);

  let mainVersion = `${version.split('.')[0]}`

  const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

  if (version.includes('-next')) {
    mainVersion = 'next';
  }

  console.log(`Deploying GH pages to subdirectory: ${mainVersion}`);
  const isLatestVersion = currentBranch === 'main' && mainVersion !== 'next';

  const config = {
    branch,
    repo:  `https://${process.env.GH_TOKEN}@github.com/${repo}.git`,
    dest: mainVersion,
    dotFiles: true,
    add: false,
    verbose: false,
    message: `Deploying docs for ${version}`,
    user: {
      name: ghUser,
      email: ghEmail
    }
  }

  await deployPages(srcDir, config);

  if (isLatestVersion) {
    console.log(`Deploying latest version to gh-pages`);
    await deployPages(srcDir, {
      ...config,
      dest: 'latest'
    });
  }
}

main(process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});