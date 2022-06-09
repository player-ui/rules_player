import { helloWorld } from "@test/module-a";

export const sayHi = (name: string) => {
  return `${name}: ${helloWorld()}`;
};
