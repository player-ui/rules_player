import path from "node:path";
import fs from "node:fs/promises";

function replaceWorkspaceReferenceWithVersion(deps, version) {
  return Object.entries(deps).reduce((acc, [key, value]) => {
    if (value.startsWith("workspace:")) {
      acc[key] = version;
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});
}

async function main(args) {
  const { JS_BINARY__EXECROOT } = process.env;
  const {
    output_file,
    root_package_json,
    base_package_json,
    dependencies,
    peer_dependencies,
  } = args;

  const parsedBasePackageJson = JSON.parse(
    await fs.readFile(
      path.join(JS_BINARY__EXECROOT, base_package_json),
      "utf-8"
    )
  );
  const parsedRootPackageJson = JSON.parse(
    await fs.readFile(
      path.join(JS_BINARY__EXECROOT, root_package_json),
      "utf-8"
    )
  );

  const dependenciesMap = new Map();
  Object.entries({
    ...(parsedRootPackageJson.dependencies ?? {}),
    ...(parsedRootPackageJson.devDependencies ?? {}),
    ...(parsedRootPackageJson.peerDependencies ?? {}),
  }).forEach(([key, value]) => {
    dependenciesMap.set(key, value);
  });

  const versionedDependencies = dependencies.reduce(
    (acc, key) => {
      if (!dependenciesMap.has(key)) {

        if (parsedBasePackageJson.dependencies[key] !== undefined) {
          return acc;
        }

        throw new Error(`Unable to determine version for dependency: ${key}`);
      }
      acc[key] = dependenciesMap.get(key);
      return acc;
    },
    parsedBasePackageJson.dependencies ?? {}
  );

  const versionedPeerDependencies = peer_dependencies.reduce(
    (acc, key) => {
      if (!dependenciesMap.has(key)) {

        if (parsedBasePackageJson.peerDependencies[key] !== undefined) {
          return acc;
        }

        throw new Error(`Unable to determine version for dependency: ${key}`);
      }
      acc[key] = dependenciesMap.get(key);
      return acc;
    },
    parsedBasePackageJson.peerDependencies ?? {}
  );

  const packageJson = {
    ...parsedBasePackageJson,
    main: "dist/cjs/index.cjs",
    module: "dist/index.legacy-esm.js",
    types: "dist/index.d.ts",
    sideEffects: false,
    exports: {
      "./package.json": "./package.json",
      ".": {
        types: "./dist/index.d.ts",
        import: "./dist/index.mjs",
        default: "./dist/cjs/index.cjs",
      },
    },
    files: ["dist", "src"],
    dependencies: replaceWorkspaceReferenceWithVersion(versionedDependencies, '0.0.0-PLACEHOLDER'),
    peerDependencies: replaceWorkspaceReferenceWithVersion(versionedPeerDependencies, '0.0.0-PLACEHOLDER'),
  };

  await fs.mkdir(path.dirname(output_file), { recursive: true });
  await fs.writeFile(output_file, JSON.stringify(packageJson, null, 2));
}

main(JSON.parse(process.argv[2])).catch((e) => {
  console.error(e);
  process.exit(1);
});
