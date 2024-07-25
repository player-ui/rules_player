import path from "node:path";
import fs from "node:fs";

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

/** Adds support for replacing process.env.* references with stamped values from bazel */
function getStampedSubstitutions(
  customSubstitutions,
  stableStatusFile,
  volatileStatusFile
) {
  const substitutions = {};

  [stableStatusFile, volatileStatusFile].forEach((statusFile) => {
    if (!fs.existsSync(statusFile)) {
      return;
    }

    const contents = fs.readFileSync(statusFile, "utf-8");

    contents.split("\n").forEach((statusLine) => {
      if (!statusLine.trim()) {
        return;
      }

      const firstSpace = statusLine.indexOf(" ");
      const varName = statusLine.substring(0, firstSpace);
      const varVal = statusLine.substring(firstSpace + 1);

      Object.entries(customSubstitutions).forEach(([key, value]) => {
        if (value === `{${varName}}`) {
          substitutions[key] = varVal;
        }
      });
    });
  });

  return substitutions;
}

function createStampHandler({
  substitutions,
  BAZEL_STABLE_STATUS_FILE,
  BAZEL_VOLATILE_STATUS_FILE,
}) {
  if (
    Object.keys(substitutions).length === 0 ||
    !BAZEL_STABLE_STATUS_FILE ||
    !BAZEL_VOLATILE_STATUS_FILE
  ) {
    return (obj) => obj;
  }

  const stableStatusFile = path.join(
    process.env.JS_BINARY__EXECROOT,
    BAZEL_STABLE_STATUS_FILE
  );
  const volatileStatusFile = path.join(
    process.env.JS_BINARY__EXECROOT,
    BAZEL_VOLATILE_STATUS_FILE
  );

  if (!fs.existsSync(stableStatusFile) || !fs.existsSync(volatileStatusFile)) {
    return (obj) => obj;
  }

  const customSubstitutions = getStampedSubstitutions(
    substitutions,
    stableStatusFile,
    volatileStatusFile
  );

  return (obj) => stampObject(obj, customSubstitutions);
}

function stampObject(obj, customSubstitutions) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (Array.isArray(value)) {
        return [key, value.map((v) => stampObject(v, customSubstitutions))];
      }

      if (typeof value === "object" && value !== null) {
        return [key, stampObject(value, customSubstitutions)];
      }

      if (
        typeof value === "string" &&
        customSubstitutions[value] !== undefined
      ) {
        return [key, customSubstitutions[value]];
      }

      return [key, value];
    })
  );
}

async function main(args) {
  const { JS_BINARY__EXECROOT } = process.env;
  const {
    output_file,
    root_package_json,
    base_package_json,
    dependencies,
    peer_dependencies,
    native_bundle,
    substitutions,
    custom_entrypoints,
    additional_exports,
    BAZEL_STABLE_STATUS_FILE,
    BAZEL_VOLATILE_STATUS_FILE,
  } = args;

  const parsedBasePackageJson = JSON.parse(
    await fs.promises.readFile(
      path.join(JS_BINARY__EXECROOT, base_package_json),
      "utf-8"
    )
  );
  const parsedRootPackageJson = JSON.parse(
    await fs.promises.readFile(
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

  const versionedDependencies = dependencies.reduce((acc, key) => {
    if (!dependenciesMap.has(key)) {
      if (parsedBasePackageJson.dependencies[key] !== undefined) {
        return acc;
      }

      throw new Error(`Unable to determine version for dependency: ${key}`);
    }
    acc[key] = dependenciesMap.get(key);
    return acc;
  }, parsedBasePackageJson.dependencies ?? {});

  const versionedPeerDependencies = peer_dependencies.reduce((acc, key) => {
    if (!dependenciesMap.has(key)) {
      if (parsedBasePackageJson.peerDependencies[key] !== undefined) {
        return acc;
      }

      throw new Error(`Unable to determine version for dependency: ${key}`);
    }
    acc[key] = dependenciesMap.get(key);
    return acc;
  }, parsedBasePackageJson.peerDependencies ?? {});

  const packageJson = {
    ...parsedBasePackageJson,
    ...(!custom_entrypoints
      ? {
          main: "dist/cjs/index.cjs",
          module: "dist/index.legacy-esm.js",
          types: "types/index.d.ts",
        }
      : {}),
    ...(native_bundle
      ? {
          bundle: `dist/${native_bundle}.native.js`,
        }
      : {}),
    sideEffects: false,
    ...(!custom_entrypoints
      ? {
          exports: {
            "./package.json": "./package.json",
            "./dist/index.css": "./dist/index.css",
            ".": {
              types: "./types/index.d.ts",
              import: "./dist/index.mjs",
              default: "./dist/cjs/index.cjs",
            },
            ...(additional_exports ?? {}),
          },
        }
      : {}),
    files: ["dist", "src", "types"],
    dependencies: replaceWorkspaceReferenceWithVersion(
      versionedDependencies,
      "0.0.0-PLACEHOLDER"
    ),
    peerDependencies: replaceWorkspaceReferenceWithVersion(
      versionedPeerDependencies,
      "0.0.0-PLACEHOLDER"
    ),
  };

  const stamper = createStampHandler({
    substitutions,
    BAZEL_STABLE_STATUS_FILE,
    BAZEL_VOLATILE_STATUS_FILE,
  });

  const stampedPkgJson = stamper(packageJson);

  await fs.promises.mkdir(path.dirname(output_file), { recursive: true });
  await fs.promises.writeFile(
    output_file,
    JSON.stringify(stampedPkgJson, null, 2)
  );
}

main(JSON.parse(process.argv[2])).catch((e) => {
  console.error(e);
  process.exit(1);
});
