import { test, expect } from "vitest";
import { sayHi } from "../index";

test("works", () => {
  expect(sayHi("Adam")).toBe("Adam: hello world");
});
