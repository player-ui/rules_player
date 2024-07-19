import { defineConfig, Options } from "tsup";
import path from "path";
import fs from "fs";

// Using the work from mark
// https://github.com/reduxjs/redux/blob/c9e06506f88926e252daf5275495eba0c04bf8e3/tsup.config.ts#L2
// https://blog.isquaredsoftware.com/2023/08/esm-modernization-lessons/

/** Adds support for replacing process.env.* references with stamped values from bazel */
function getStampedSubstitutions(): Record<string, string> {
  const contextDir = path.join(
    process.env.BAZEL_BINDIR ?? "",
    process.env.BAZEL_PACKAGE ?? ""
  );
  const contextDirRelative = contextDir.split(path.sep).map(() => "..");
  const rootDir = path.join(process.cwd(), ...contextDirRelative);

  if (
    !process.env.BAZEL_STABLE_STATUS_FILE ||
    !process.env.BAZEL_VOLATILE_STATUS_FILE
  ) {
    return {};
  }

  const stableStatusFile = path.join(
    rootDir,
    process.env.BAZEL_STABLE_STATUS_FILE
  );

  const volatileStatusFile = path.join(
    rootDir,
    process.env.BAZEL_VOLATILE_STATUS_FILE
  );

  const customSubstitutions = JSON.parse(
    process.env.STAMP_SUBSTITUTIONS ?? "{}"
  );

  const substitutions: Record<string, string> = {};

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

      substitutions[`process.env.${varName}`] = JSON.stringify(varVal);

      Object.entries(customSubstitutions).forEach(([key, value]) => {
        if (value === `{${varName}}`) {
          substitutions[key] = JSON.stringify(varVal);
        }
      });
    });
  });

  return substitutions;
}

export function createConfig() {
  return defineConfig((options: Options) => {
    const defaultOptions: Options = {
      entry: ["src/index.ts"],
      dts: true,
      sourcemap: true,
      define: getStampedSubstitutions(),
      ...options,
    };

    return [
      {
        ...defaultOptions,
        format: ["esm"],
        outExtension: () => ({ js: ".mjs" }),
        dts: true,
        clean: true,
        onSuccess() {
          // Support Webpack 4 by pointing `"module"` to a file with a `.js` extension
          fs.copyFileSync("dist/index.mjs", "dist/index.legacy-esm.js");
        },
      },
      // Browser-ready ESM, production + minified
      {
        ...defaultOptions,
        define: {
          ...defaultOptions.define,
          "process.env.NODE_ENV": JSON.stringify("production"),
        },
        format: ["esm"],
        outExtension: () => ({ js: ".mjs" }),
      },
      {
        ...defaultOptions,
        format: "cjs",
        outDir: "./dist/cjs/",
        outExtension: () => ({ js: ".cjs" }),
      },
    ];
  });
}
