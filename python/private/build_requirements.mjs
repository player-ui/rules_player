import path from "node:path";
import fs from "node:fs";

const REQUIREMENTSREGEX =
  /^([a-zA-Z0-9._-]+)(?:([<>=!~]+)([^,\s]+(?:,[<>=!~]+[^,\s]+)*))?\s*(?:#.*)?$/g;


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
function getStampVars({
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

  return customSubstitutions;
}

async function main(args) {
  const { JS_BINARY__EXECROOT } = process.env;
  const { 
    input, 
    output, 
    package_names, 
    substitutions,   
    BAZEL_STABLE_STATUS_FILE,
    BAZEL_VOLATILE_STATUS_FILE
  } = args;

  // Get stamp vars
  const stampVars = getStampVars({
    substitutions,
    BAZEL_STABLE_STATUS_FILE,
    BAZEL_VOLATILE_STATUS_FILE,
  });

  const local_version = stampVars['STABLE_STATUS'] ?? "0.0.0"
  
  // clean up canary names to follow pep
  local_version.replace("--",".").replace("-",".")

  // Build map of requirement name to version
  const requirementsFile = await fs.promises.readFile(
    path.join(JS_BINARY__EXECROOT, input),
    "utf-8",
  );
  const requirementsMap = new Map();

  requirementsFile.split("\n").map((requirement) => {
    const result = Array.from(requirement.matchAll(REQUIREMENTSREGEX), (m) =>
      m.slice(1),
    )[0];
    if (result) {
      const [pkg, range, version] = result;
      requirementsMap.set(pkg, `${pkg}${range}${version}`);
    }
  });

  // map requirements to version
  const parsedRequirements = [];

  //clean up requirement names that are passed in like @@rules_python++pip+pypi//pytest:pkg
  const cleanedPackages = package_names.map((p) => {
    if(p.startsWith("//")){
      const localPackageName = p.split(":")[1].replace("_library", "")
      // if its a local package we can handle it directly
      requirementsMap.set(localPackageName, `${localPackageName}==${local_version}`);
      return localPackageName
    } else {
      return p.split("//")[1].split(":")[0]
    }
  });

  
  cleanedPackages.forEach((pkg) => {
    if (requirementsMap.has(pkg)) {
      parsedRequirements.push(`${requirementsMap.get(pkg)}`);
    }
  });

  // write results
  await fs.promises.mkdir(path.dirname(output), { recursive: true });
  await fs.promises.writeFile(output, parsedRequirements.join("\n"));
}

main(JSON.parse(process.argv[2])).catch((e) => {
  console.error(e);
  process.exit(1);
});