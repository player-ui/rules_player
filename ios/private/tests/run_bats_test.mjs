#!/usr/bin/env node
/**
 * Generated with Cursor by Koriann South, December 19, 2024
 * 
 * Node.js script to run BATS tests using js_test in Bazel
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import { access, constants } from 'fs';
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

    // Try different approaches to run bats
    let batsCommand;
    let batsArgs;
    let cwd = process.cwd(); // Use current working directory by default

    // First try direct bats command (most likely to work in Bazel environment)
    try {
      await new Promise((resolve, reject) => {
        const testProcess = spawn('bats', ['--version'], { stdio: 'pipe' });
        testProcess.on('close', (code) => {
          if (code === 0) resolve();
          else reject(new Error('bats not available'));
        });
        testProcess.on('error', reject);
      });
      
      batsCommand = 'bats';
      batsArgs = [absoluteBatsFile];
    } catch {
      // Fall back to pnpm exec if bats is not directly available
      try {
        await new Promise((resolve, reject) => {
          const testProcess = spawn('pnpm', ['--version'], { stdio: 'pipe', cwd: workspaceRoot });
          testProcess.on('close', (code) => {
            if (code === 0) resolve();
            else reject(new Error('pnpm not available'));
          });
          testProcess.on('error', reject);
        });
        
        batsCommand = 'pnpm';
        batsArgs = ['exec', 'bats', absoluteBatsFile];
        cwd = workspaceRoot; // Use workspace root for pnpm
      } catch {
        console.error('Neither bats nor pnpm command is available');
        console.error('Make sure bats is installed globally or as a devDependency');
        process.exit(1);
      }
    }

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
      console.error('Failed to start pnpm exec bats process:', error.message);
      console.error('Make sure bats is installed as a devDependency and pnpm is available');
      process.exit(1);
    });

  } catch (error) {
    console.error('Error running BATS tests:', error.message);
    process.exit(1);
  }
}

runBatsTest();
