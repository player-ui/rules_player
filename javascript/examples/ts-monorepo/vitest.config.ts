import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    reporters: [
      "default",
      "junit",
      path.join(__dirname, "tools", "vitest_coverage_mapper.ts"),
    ],
    outputFile: {
      junit: process.env.XML_OUTPUT_FILE ?? "test-results.xml",
    },

    passWithNoTests: true,

    coverage: {
      enabled: Boolean(process.env.COVERAGE_OUTPUT_FILE),
      all: true,
      reportOnFailure: true,
      provider: "v8",
      exclude: ["**/node_modules/**", "external/**", "tools/**"],
      reporter: ["text", "html", "lcovonly"],
    },
  },
});
