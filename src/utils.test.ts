import { test, describe, expect } from "vitest";
import { getNumberSequence } from "./utils";

describe("getNumberSequence", () => {
  test("generates sequence of numbers", () => {
    expect(getNumberSequence({ min: 0, max: 4 })).toEqual([0, 1, 2, 3, 4]);
    expect(getNumberSequence({ min: 1, max: 3 })).toEqual([1, 2, 3]);
  });
  test("min same as max", () => {
    expect(getNumberSequence({ min: 1, max: 1 })).toEqual([1]);
  });
  test("min greater than max", () => {
    expect(getNumberSequence({ min: 2, max: 1 })).toEqual([]);
  });
  test("min defaults to 0", () => {
    expect(getNumberSequence({ max: 2 })).toEqual([0, 1, 2]);
  });
});
