import { UNDEFINED } from "./string";

/**
 * Adds thousand separators to a number and handles undefined and null values.
 * @param {number | null | undefined} number - The input number.
 * @returns {string} - The formatted number string with thousand separators,
 *                    or the UNDEFINED constant for undefined or null inputs.
 */
export function setThousandSeperatorTo(
  number: number | null | undefined
): string {
  return number === undefined || number === null
    ? UNDEFINED
    : number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
