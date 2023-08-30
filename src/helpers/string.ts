/**
 * A constant representing "N/A" for undefined or null values.
 * @constant {string}
 */
export const UNDEFINED = "N/A";

/**
 * Converts a string to lowercase and replaces spaces with dashes.
 * @param {string} string - The input string.
 * @returns {string} - The transformed string.
 */
export function setLowerCaseAndDashTo(string: string): string {
  return string.toLowerCase().replace(/\s+/g, "-");
}

/**
 * Converts the first character of a string to uppercase (sentence case).
 * @param {string | null | undefined} string - The input string.
 * @param {string} [resultString=UNDEFINED] - The value to return for undefined or null inputs.
 * @returns {string} - The transformed string, or the resultString for undefined or null values.
 */
export function setSentenceCaseTo(
  string: string | null | undefined,
  resultString = UNDEFINED
): string {
  return string === undefined || string === null
    ? resultString
    : string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Converts a value to a string, handling undefined, null, and numbers.
 * @template T - The type of the input value.
 * @param {T | null | undefined} text - The input value.
 * @param {string | undefined} [formattedReturnString] - The value to return for non-undefined and non-null inputs.
 * @param {string} [resultString=UNDEFINED] - The value to return for undefined or null inputs.
 * @returns {string} - The transformed string, or the formattedReturnString for non-undefined and non-null values,
 *                    or the resultString for undefined or null values.
 */
export function getNonUndefinedOrNullText<T>(
  text: T | null | undefined,
  formattedReturnString?: string | undefined,
  resultString = UNDEFINED
): string {
  if (text === undefined || text === null) {
    return resultString;
  } else {
    return formattedReturnString ?? text.toString();
  }
}
