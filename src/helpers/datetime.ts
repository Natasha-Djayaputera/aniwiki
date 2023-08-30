import moment from "moment";

/**
 * The default date format used for formatting dates.
 * @constant {string}
 */
const DEFAULTDATEFORMAT = "MMM Do, YYYY";

/**
 * Formats a date string using the default date format or returns "?" if invalid.
 * @param {string | null | undefined} date - The input date string.
 * @returns {string} - The formatted date string or "?" if the input is invalid.
 */
export function getDefaultDateFormat(date: string | null | undefined): string {
  return moment(date).isValid() ? moment(date).format(DEFAULTDATEFORMAT) : "?";
}
