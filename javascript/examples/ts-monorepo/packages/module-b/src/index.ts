import { helloWorld } from "@test/module-a";

export function sayHi(name: string) {
  return `${name}: ${helloWorld()}`;
}
