declare global {
  const __VERSION__: string;
}

export const TEST_sub =
  typeof __VERSION__ !== "undefined" ? __VERSION__ : "__Placeholder__";
export const TEST_process = process.env.STABLE_VERSION;

export function helloWorld() {
  return "hello world";
}
