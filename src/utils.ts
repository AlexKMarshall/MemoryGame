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
}: {
  currentIndex: number;
  direction: "left" | "right";
  /** length of the array */
  length: number;
}) {
  const nextIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1;
  return nextIndex < 0 ? length - 1 : nextIndex % length;
}
