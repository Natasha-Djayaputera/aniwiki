/**
 * Validates a number input, handling undefined and null values.
 * @param {number | null | undefined} number - The input number.
 * @returns {string} - The validated number as a string if it's not undefined or null,
 *                    or an empty string otherwise.
 */
export function validateNumberInput(number: number | null | undefined): string {
  if (number === undefined || number === null) {
    return "";
  } else {
    return number.toString();
  }
}
