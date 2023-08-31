import { NOT_APPLICABLE } from "./string";

/**
 * Retrieves a random element from an array.
 * @template T - The type of elements in the array.
 * @param {T[]} array - The array of elements.
 * @returns {T | undefined} - A random element from the array, or undefined if the array is empty.
 */
export function getRandomElementOf<T>(array: T[]): T | undefined {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Enumeration of join delimiters.
 * @enum {string}
 */
export enum delimiter {
  COMMA = ", ",
  LINEBREAK = "\n",
}

/**
 * Joins the specified property values of objects in an array using a delimiter.
 * @template T - The type of objects in the array.
 * @param {T[] | undefined} array - The array of objects.
 * @param {keyof T} property - The property of objects to join.
 * @param {delimiter} [joinDelimiter=delimiter.LINEBREAK] - The delimiter used for joining.
 * @returns {string} - The joined property values.
 */
export function joinPropertyOf<T>(
  array: T[] | undefined,
  property: keyof T,
  joinDelimiter: delimiter = delimiter.LINEBREAK
): string {
  return array === undefined || array.length === 0
    ? NOT_APPLICABLE
    : array.map((obj) => obj[property]).join(joinDelimiter);
}
