import { NOT_APPLICABLE } from "../constants/string";
import { Delimiter } from "../enum/Delimiter";

/**
 * Retrieves a random element from an array.
 * @template T - The type of elements in the array.
 * @param {T[]} array - The array of elements.
 * @returns {T | undefined} - A random element from the array, or undefined if the array is empty.
 */
export function getRandomElementOf<T>(array: T[]): T | undefined {
  return array[Math.floor(Math.random() * array.length)];
}

export function isEmptyArray<T>(
  array: T[] | null | undefined
): array is [] | null | undefined {
  return array === undefined || array === null || array.length === 0;
}

/**
 * Joins the specified property values of objects in an array using a delimiter.
 * @template T - The type of objects in the array.
 * @param {T[] | undefined} array - The array of objects.
 * @param {keyof T} property - The property of objects to join.
 * @param {Delimiter} [joinDelimiter=Delimiter.LINEBREAK] - The delimiter used for joining.
 * @returns {string} - The joined property values.
 */
export function joinPropertyOf<T>(
  array: T[] | undefined,
  property: keyof T,
  joinDelimiter: Delimiter = Delimiter.LINEBREAK
): string {
  return isEmptyArray(array)
    ? NOT_APPLICABLE
    : array.map((obj) => obj[property]).join(joinDelimiter);
}
