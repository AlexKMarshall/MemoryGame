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
