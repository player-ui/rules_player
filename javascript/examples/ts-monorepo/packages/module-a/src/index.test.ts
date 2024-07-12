import { test, expect } from "vitest";
import { helloWorld } from ".";

test("expect return", () => {
  expect(helloWorld()).toBe("hello world");
});
