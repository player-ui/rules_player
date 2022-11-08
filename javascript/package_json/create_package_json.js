const fs = require("fs");
const process = require("process");
const path = require("path");

const main = ([config]) => {
  const {
    name,
    peer_dependencies,
    dependencies,
    local_deps,
    output_file,
    bin_name,
    esm_only,
    bin_entry,
    placeholder_version,
    root_package_json,
    base_package_json,
    additional_properties,
    out_dir,
    registry,
    private,
  } = JSON.parse(config);

  const rootPackageJson = JSON.parse(
    fs.readFileSync(root_package_json, "utf-8")
  );
  const createDependencyObject = (deps) => {
    return Object.fromEntries(
      deps.map((depName) => {
        if (local_deps.includes(depName)) {
          return [depName, placeholder_version];
        }

        if (rootPackageJson.dependencies[depName]) {
          return [depName, rootPackageJson.dependencies[depName]];
        }

        throw new Error(`Unable to resolve version for ${depName}`);
      })
    );
  };

  let base_package_json_props = {};
  if (base_package_json) {
    base_package_json_props = JSON.parse(
      fs.readFileSync(base_package_json, "utf-8")
    );
  }

  let bin_props = {};

  if (bin_entry) {
    const bin_path = path.join(out_dir, bin_entry);

    bin_props = {
      bin: bin_name ? { [bin_name]: bin_path } : bin_path,
    };
  }

  let publishConfig = undefined;

  if (registry) {
    publishConfig = {
      registry: registry,
    };
  }

  const cjsEntry = path.join(out_dir, "index.cjs.js");
  const esmEntry = path.join(out_dir, "index.esm.js");

  const entries = esm_only
    ? {
      main: esmEntry,
      type: 'module'
      }
    : {
        main: cjsEntry,
        module: esmEntry,
      };

  fs.writeFileSync(
    output_file,
    JSON.stringify(
      {
        name,
        version: placeholder_version,
        private,
        publishConfig,
        peerDependencies: createDependencyObject(peer_dependencies),
        dependencies: createDependencyObject(dependencies),
        ...entries,
        typings: path.join(out_dir, "index.d.ts"),
        ...bin_props,
        ...base_package_json_props,
        ...JSON.parse(additional_properties),
      },
      null,
      2
    )
  );
};

if (require.main === module) {
  try {
    process.exitCode = main(process.argv.slice(2));
  } catch (e) {
    console.error(process.argv[1], e);
  }
}
