import { sayHi } from "../entry";

test("works", () => {
  expect(sayHi("Adam")).toBe("Adam: hello world");
});
