import path from "node:path";
import fs from "node:fs";

const REQUIREMENTSREGEX =
  /^([a-zA-Z0-9._-]+)(?:([<>=!~]+)([^,\s]+(?:,[<>=!~]+[^,\s]+)*))?\s*(?:#.*)?$/g;

async function main(args) {
  const { JS_BINARY__EXECROOT } = process.env;
  const { 
    input, 
    output, 
    package_names,
    local_version = "0.0.0",
  } = args;

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