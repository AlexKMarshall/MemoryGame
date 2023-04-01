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
 *  Shuffles an array
 * @param array  Array to shuffle
 * @returns  Shuffled array
 */
export function shuffleArray<T>(array: T[]) {
  const newArray = [...array];

  for (
    let unshuffledStart = 0;
    unshuffledStart < newArray.length;
    unshuffledStart++
  ) {
    // Pick a random index from the unshuffled part of the array
    const randomPick = Math.floor(
      Math.random() * (newArray.length - unshuffledStart)
    );
    // Swap the random element with the first unshuffled element
    [newArray[unshuffledStart], newArray[randomPick]] = [
      newArray[randomPick],
      newArray[unshuffledStart],
    ];
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
