#!/usr/bin/env node
/**
 * Generated with Cursor by Koriann South, December 19, 2024
 * 
 * Node.js script to run BATS tests using js_test in Bazel
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join, resolve, parse } from 'path';
import { access, constants, accessSync } from 'fs';
import { promisify } from 'util';

const accessAsync = promisify(access);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runBatsTest() {
  try {
    // Get the BATS test file from command line arguments
    const batsFile = process.argv[2];
    if (!batsFile) {
      console.error('Error: BATS test file must be provided as argument');
      process.exit(1);
    }

    console.log(`Running BATS test: ${batsFile}`);

    // Resolve the absolute path to the BATS file
    const absoluteBatsFile = resolve(batsFile);
    
    // Check if the BATS file exists
    try {
      await accessAsync(absoluteBatsFile, constants.F_OK);
    } catch (error) {
      console.error(`Error: BATS test file not found: ${absoluteBatsFile}`);
      process.exit(1);
    }

    // Set up environment variables for BATS
    const env = {
      ...process.env,
      // Ensure BATS can find the test file and runfiles
      TEST_SRCDIR: process.env.TEST_SRCDIR || process.env.RUNFILES_DIR,
      RUNFILES_DIR: process.env.RUNFILES_DIR,
    };

    // Find the workspace root where package.json is located
    let workspaceRoot = process.cwd();
    if (process.env.RUNFILES_DIR) {
      // In Bazel environment, look for the workspace root in runfiles
      workspaceRoot = join(process.env.RUNFILES_DIR, '_main');
    }

    // Use the bats binary from runfiles (explicitly added as data dependency)
    const runfilesBatsPath = join(workspaceRoot, 'node_modules', 'bats', 'bin', 'bats');
    
    try {
      await accessAsync(runfilesBatsPath, constants.F_OK);
      console.log(`Using runfiles bats binary: ${runfilesBatsPath}`);
    } catch (error) {
      console.error(`Error: Could not find bats binary at expected path: ${runfilesBatsPath}`);
      console.error('Make sure //:bats_binary is included in the test data dependencies.');
      process.exit(1);
    }

    const batsCommand = runfilesBatsPath;
    const batsArgs = [absoluteBatsFile];
    const cwd = workspaceRoot; // Use workspaceRoot for cwd

    console.log(`Executing: ${batsCommand} ${batsArgs.join(' ')}`);

    // Run BATS with the test file
    const batsProcess = spawn(batsCommand, batsArgs, {
      stdio: 'inherit',
      env,
      cwd
    });

    batsProcess.on('close', (code) => {
      if (code === 0) {
        console.log('BATS tests completed successfully');
      } else {
        console.error(`BATS tests failed with exit code: ${code}`);
      }
      process.exit(code);
    });

    batsProcess.on('error', (error) => {
      console.error('Failed to start bats process:', error.message);
      console.error('Make sure //:bats_binary is included in test data dependencies');
      process.exit(1);
    });

  } catch (error) {
    console.error('Error running BATS tests:', error.message);
    process.exit(1);
  }
}

runBatsTest();
