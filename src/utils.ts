/**
 *  Returns a sequence of numbers from min to max
 * @param param0  min: number, max: number
 * @returns  number[]
 */
export function getNumberSequence({
  min = 0,
  max,
}: {
  min?: number;
  max: number;
}): number[] {
  const length = max - min + 1;
  return Array.from({ length }, (_, i) => i + min);
}

/**
 *  Shuffles an array. Uses the Fisher-Yates shuffle algorithm.
 * @param array  Array to shuffle
 * @returns  Shuffled array
 */
export function shuffleArray<T>(array: T[]) {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}

/**
 *  Returns an array of random numbers in the range
 * @param param0  min: number, max: number, length: number
 * @returns  number[]
 */
export function getRandomNumbers({
  min,
  max,
  length,
}: {
  min: number;
  max: number;
  length: number;
}) {
  return shuffleArray(getNumberSequence({ min, max })).slice(0, length);
}

/**
 * returns the next selected index in an array based on the current index and
 * the direction of the movement
 * @returns number
 */
export function getNextIndex({
  currentIndex,
  direction,
  length,
  rowLength = 1,
}: {
  currentIndex: number;
  direction: "left" | "right" | "up" | "down";
  /** length of the array */
  length: number;
  /** number of items to show in a row */
  rowLength?: number;
}) {
  const isLeft = direction === "left";
  const isRight = direction === "right";
  const isUp = direction === "up";
  const isDown = direction === "down";

  const isLeftEdge = currentIndex % rowLength === 0;
  const isRightEdge = currentIndex % rowLength === rowLength - 1;
  const isTopEdge = currentIndex < rowLength;
  const isBottomEdge = currentIndex >= length - rowLength;

  if (isLeft && isLeftEdge) {
    return currentIndex + rowLength - 1;
  }
  if (isRight && isRightEdge) {
    return currentIndex - rowLength + 1;
  }
  if (isUp && isTopEdge) {
    return currentIndex + length - rowLength;
  }
  if (isDown && isBottomEdge) {
    return currentIndex - length + rowLength;
  }

  return (
    currentIndex + (isLeft ? -1 : isRight ? 1 : isUp ? -rowLength : rowLength)
  );
}

/**
 * Converts an array into a 2D array
 * @param array  Array to convert
 * @param rowLength  Number of items in a row
 * @returns  2D array
 */
export function convertArrayTo2D<T>(array: T[], rowLength: number) {
  const newArray = [];
  for (let i = 0; i < array.length; i += rowLength) {
    newArray.push(array.slice(i, i + rowLength));
  }
  return newArray;
}
