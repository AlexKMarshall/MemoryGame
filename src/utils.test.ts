import { test, describe, expect } from "vitest";
import {
  convertArrayTo2D,
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
  describe("move left", () => {
    test("from top left corner", () => {
      expect(
        getNextIndex({
          currentIndex: 0,
          direction: "left",
          length: 16,
          rowLength: 4,
        })
      ).toEqual(3);
    });
    test("from top right corner", () => {
      expect(
        getNextIndex({
          currentIndex: 3,
          direction: "left",
          length: 16,
          rowLength: 4,
        })
      ).toEqual(2);
    });
    test("from bottom left corner", () => {
      expect(
        getNextIndex({
          currentIndex: 12,
          direction: "left",
          length: 16,
          rowLength: 4,
        })
      ).toEqual(15);
    });
    test("from bottom right corner", () => {
      expect(
        getNextIndex({
          currentIndex: 15,
          direction: "left",
          length: 16,
          rowLength: 4,
        })
      ).toEqual(14);
    });
  });
  describe("move right", () => {
    test("from top left corner", () => {
      expect(
        getNextIndex({
          currentIndex: 0,
          direction: "right",
          length: 16,
          rowLength: 4,
        })
      ).toEqual(1);
    });
    test("from top right corner", () => {
      expect(
        getNextIndex({
          currentIndex: 3,
          direction: "right",
          length: 16,
          rowLength: 4,
        })
      ).toEqual(0);
    });
    test("from bottom left corner", () => {
      expect(
        getNextIndex({
          currentIndex: 12,
          direction: "right",
          length: 16,
          rowLength: 4,
        })
      ).toEqual(13);
    });
    test("from bottom right corner", () => {
      expect(
        getNextIndex({
          currentIndex: 15,
          direction: "right",
          length: 16,
          rowLength: 4,
        })
      ).toEqual(12);
    });
  });
  describe("move up", () => {
    test("from top left corner", () => {
      expect(
        getNextIndex({
          currentIndex: 0,
          direction: "up",
          length: 16,
          rowLength: 4,
        })
      ).toEqual(12);
    });
    test("from top right corner", () => {
      expect(
        getNextIndex({
          currentIndex: 3,
          direction: "up",
          length: 16,
          rowLength: 4,
        })
      ).toEqual(15);
    });
    test("from bottom left corner", () => {
      expect(
        getNextIndex({
          currentIndex: 12,
          direction: "up",
          length: 16,
          rowLength: 4,
        })
      ).toEqual(8);
    });
    test("from bottom right corner", () => {
      expect(
        getNextIndex({
          currentIndex: 15,
          direction: "up",
          length: 16,
          rowLength: 4,
        })
      ).toEqual(11);
    });
  });
  describe("move down", () => {
    test("from top left corner", () => {
      expect(
        getNextIndex({
          currentIndex: 0,
          direction: "down",
          length: 16,
          rowLength: 4,
        })
      ).toEqual(4);
    });
    test("from top right corner", () => {
      expect(
        getNextIndex({
          currentIndex: 3,
          direction: "down",
          length: 16,
          rowLength: 4,
        })
      ).toEqual(7);
    });
    test("from bottom left corner", () => {
      expect(
        getNextIndex({
          currentIndex: 12,
          direction: "down",
          length: 16,
          rowLength: 4,
        })
      ).toEqual(0);
    });
    test("from bottom right corner", () => {
      expect(
        getNextIndex({
          currentIndex: 15,
          direction: "down",
          length: 16,
          rowLength: 4,
        })
      ).toEqual(3);
    });
  });
});

describe("convertArrayTo2D", () => {
  test("converts array to 2D array", () => {
    expect(convertArrayTo2D([1, 2, 3, 4, 5, 6], 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
  });
});
