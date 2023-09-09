import { THOUSAND_FORMATTER } from "../constants/intl";
import { WHITE_SPACE_REGEX } from "../constants/regex";
import { NOT_APPLICABLE } from "../constants/string";

/**
 * Converts a string to lowercase and replaces spaces with dashes.
 * @param {string} string - The input string.
 * @returns {string} - The transformed string.
 */
export function setLowerCaseAndDashTo(string: string): string {
  return string.toLowerCase().replace(WHITE_SPACE_REGEX, "-");
}

/**
 * Converts the first character of a string to uppercase (sentence case).
 * @param {string | null | undefined} string - The input string.
 * @param {string} [resultString=UNDEFINED] - The value to return for undefined or null inputs.
 * @returns {string} - The transformed string, or the resultString for undefined or null values.
 */
export function setSentenceCaseTo(
  string: string | null | undefined,
  resultString = NOT_APPLICABLE
): string {
  return typeof string === "string"
    ? string?.charAt(0).toUpperCase() + string?.slice(1)
    : resultString;
}

/**
 * Adds thousand separators to a number and handles undefined and null values.
 * @param {number | null | undefined} number - The input number.
 * @returns {string} - The formatted number string with thousand separators,
 *                    or an empty string for undefined or null inputs.
 */
export function setThousandSeparatorTo(
  number: number | null | undefined
): string {
  return typeof number === "string" ? THOUSAND_FORMATTER.format(number) : "";
}

/**
 * Validates a string input, handling undefined and null values.
 * @param {string | null | undefined} string - The input string.
 * @returns {string} - The validated string if it's not undefined or null,
 *                    or an empty string otherwise.
 */
export function validateStringInput(string: string | null | undefined): string {
  return string ?? "";
}

/**
 * Formats a string or number input, handling undefined and null values.
 * @param {string | number} string - The input string or number.
 * @param {string | undefined} formattedResultString - The formatted result string.
 * @param {string} [resultString=UNDEFINED] - The value to return for undefined or null inputs.
 * @returns {string} - The formatted string, or the resultString for undefined or null values.
 */
export function formatStringInput(
  string: string | number,
  formattedResultString?: string | undefined,
  resultString = NOT_APPLICABLE
): string {
  return string === ""
    ? resultString
    : formattedResultString ?? string.toString();
}
