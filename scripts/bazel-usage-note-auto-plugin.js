const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const fetch = require('node-fetch');
const path = require('path');


async function getShaForTarFile(download_url) {
  // Download the tarball and get it's hash
  const downloadPath = fs.mkdtempSync(path.join(os.tmpdir(), 'bazel-rules-usage-'));
  const tarballPath = path.join(downloadPath, `rules.tar.gz`);

  const fetchResponse = await fetch(download_url, { 
    follow: 5,
    method: 'GET',
  });

  const fileStream = fs.createWriteStream(tarballPath);
  fetchResponse.body.pipe(fileStream);

  await new Promise((resolve, reject) => {
    fetchResponse.body.on('error', err => {
      reject(err);
    })

    fileStream.on('finish', () => {
      resolve();
    })
  });

  const ruleHash = crypto.createHash('sha256').update(fs.readFileSync(tarballPath)).digest('hex');

  return ruleHash;
}


class BazelRuleUsagePlugin {
  name = 'bazel-rules-usage';

  apply(auto) {
    auto.hooks.afterRelease.tap(this.name, async ({
      response,
      newVersion
    }) => {
      const tarball_url = `https://github.com/${auto.git.options.owner}/${auto.git.options.repo}/archive/refs/tags/${response.data.tag_name}.tar.gz`;
      const ruleHash = await getShaForTarFile(tarball_url);

      const notes = `

\`\`\`
http_archive(
  name = "rules_player",
  strip_prefix = "rules_player-${newVersion}",
  urls = ["${tarball_url}"],
  sha256 = "${ruleHash}"
)
\`\`\`


${response.data.body}
`

      await await auto.git.github.repos.updateRelease({
        owner: auto.git.options.owner,
        repo: auto.git.options.repo,
        release_id: response.data.id,
        body: notes,
      });

    });
  }
}

module.exports = BazelRuleUsagePlugin;