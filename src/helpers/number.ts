import { NOT_APPLICABLE } from "./string";

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
    ? NOT_APPLICABLE
    : number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
