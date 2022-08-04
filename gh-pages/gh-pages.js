const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers');
const fse = require('fs-extra');
const ghPages = require('gh-pages');
const tar = require('tar');

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

async function expandTarball(tarball) {
  const tempDir = path.join(__dirname, "temp");
  await fs.promises.mkdir(tempDir, { recursive: true });

  await tar.extract({
    cwd: tempDir,
    file: tarball,
  });

  return tempDir
}

const isTarball = (file) => file.endsWith('.tar.gz') || file.endsWith('.tar') || file.endsWith('.tar.xz');

async function main(args) {
  const {
    srcDir, repo, branch, version: version_file, gh_user, gh_email, dest_dir, 
  } = args;

  let cleanup = false;
  let upload_root = srcDir;

  if (isTarball(srcDir)) {
    cleanup = true;
    upload_root = await expandTarball(srcDir);
  }

  const version = await fse.readFile(version_file, 'utf8');
  console.log(`Deploying version ${version} to gh-pages`);

  let mainVersion = `${version.split('.')[0]}`
  if (version.includes('-next')) {
    mainVersion = 'next';
  }

  console.log(`Deploying GH pages to subdirectory: ${mainVersion}`);

  const config = {
    branch,
    repo:  `https://${process.env.GH_TOKEN}@github.com/${repo}.git`,
    dest: dest_dir || mainVersion,
    dotFiles: true,
    add: false,
    verbose: false,
    message: `Deploying docs for ${version}`,
    user: {
      name: gh_user,
      email: gh_email
    }
  }

  await deployPages(srcDir, config);

  if (cleanup) {
    await fs.promises.rm(upload_root, { recursive: true });
  }

  // const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  // const isLatestVersion = currentBranch === 'main' && mainVersion !== 'next';
  // if (isLatestVersion) {
  //   console.log(`Deploying latest version to gh-pages`);
  //   await deployPages(srcDir, {
  //     ...config,
  //     dest: 'latest'
  //   });
  // }
}

const parsed = yargs(hideBin(process.argv)).version(false).parse();

main(parsed).catch((err) => {
  console.error(err);
  process.exitCode = 1;
});