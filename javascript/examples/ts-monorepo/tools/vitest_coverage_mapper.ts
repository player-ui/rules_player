import fs from "fs";
import path from "path";

class CustomReporter {
  onFinished(results: any) {
    const coverageDir = path.join(process.cwd(), "coverage");
    const testCov = path.join(coverageDir, "lcov.info");

    if (!fs.existsSync(coverageDir)) {
      fs.mkdirSync(coverageDir);
    }

    const watcher = fs.watch(coverageDir, (event, filename) => {
      if (event === "rename" && filename === "lcov.info") {
        if (process.env.COVERAGE_OUTPUT_FILE) {
          fs.copyFileSync(testCov, process.env.COVERAGE_OUTPUT_FILE);
        }
        watcher.close();
      }
    });

    // setTimeout(() => {
    //   // console.log(fs.statSync(testCov));
    //   if (fs.existsSync(testCov) && process.env.COVERAGE_OUTPUT_FILE) {
    //     fs.copyFileSync(testCov, process.env.COVERAGE_OUTPUT_FILE);
    //   }
    //   watcher.close();
    // }, 5000);
  }
}

export default CustomReporter;
