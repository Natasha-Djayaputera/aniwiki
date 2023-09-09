import { NOT_APPLICABLE } from "../constants/string";
import { TitleType } from "../enum/TitleType";
import { title } from "../generated/jikan";
import { isEmptyArray } from "./array";

/**
 * Retrieves the first title object of a specific type from an array of titles.
 * @param {title[] | undefined} titles - The array of title objects.
 * @param {titles.type} type - The type of title to search for.
 * @returns {title} - The first title object of the specified type,
 *                   or a title object with the UNDEFINED constant if titles are undefined.
 */
export function getFirstTitleOfType(
  titles: title[] | undefined,
  type: TitleType
): title {
  const titleObject = titles?.find((title) => title.type === type);
  return titleObject ?? { title: NOT_APPLICABLE };
}

/**
 * Retrieves an array of title objects of a specific type from an array of titles.
 * @param {title[] | undefined} titles - The array of title objects.
 * @param {titles.type} type - The type of titles to filter for.
 * @returns {title[]} - An array of title objects of the specified type,
 *                     or an array containing a title object with the UNDEFINED constant if titles are undefined.
 */
export function getTitlesOfType(
  titles: title[] | undefined,
  type: TitleType
): title[] {
  const titleObjects = titles?.filter((title) => title.type === type);
  return isEmptyArray(titleObjects)
    ? [{ title: NOT_APPLICABLE }]
    : titleObjects;
}
