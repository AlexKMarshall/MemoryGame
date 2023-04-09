import { test, describe, expect } from "vitest";
import {
  getNextIndex,
  getNumberSequence,
  getRandomNumbers,
  shuffleArray,
} from "./utils";

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

describe("shuffleArray", () => {
  test("shuffles array", () => {
    const testArray = [1, 2, 3, 4, 5];
    expect(shuffleArray(testArray)).not.toEqual(testArray);
    expect(shuffleArray(testArray).sort()).toEqual([...testArray].sort());
  });
});

describe("getRandomNumbers", () => {
  test("returns of numbers in the range", () => {
    const min = 0;
    const max = 4;
    getRandomNumbers({ min, max, length: 5 }).forEach((num) => {
      expect(num).toBeGreaterThanOrEqual(0);
      expect(num).toBeLessThanOrEqual(4);
    });
  });
  test("returns unique numbers", () => {
    const min = 0;
    const max = 4;
    const length = 5;
    const randomNumbers = getRandomNumbers({ min, max, length });
    expect(new Set(randomNumbers).size).toEqual(length);
  });
});

describe("getNextIndex", () => {
  test("returns the next index in the array based on the direction of the movement", () => {
    expect(
      getNextIndex({ currentIndex: 0, direction: "right", length: 5 })
    ).toEqual(1);
    expect(
      getNextIndex({ currentIndex: 0, direction: "left", length: 5 })
    ).toEqual(4);
    expect(
      getNextIndex({ currentIndex: 4, direction: "right", length: 5 })
    ).toEqual(0);
    expect(
      getNextIndex({ currentIndex: 4, direction: "left", length: 5 })
    ).toEqual(3);
  });
});
