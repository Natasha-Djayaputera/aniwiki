import { TitleType } from "../enum/titles";
import { title } from "../generated/jikan";
import { NOT_APPLICABLE } from "./string";

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
  if (titles === undefined) {
    return { title: NOT_APPLICABLE };
  }
  const titleObject = titles.find((title) => title.type === type);
  if (titleObject === undefined) {
    return { title: NOT_APPLICABLE };
  }
  return titleObject;
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
  if (titles === undefined) {
    return [{ title: NOT_APPLICABLE }];
  }
  const titleObjects = titles.filter((title) => title.type === type);
  if (titleObjects === undefined || titleObjects.length === 0) {
    return [{ title: NOT_APPLICABLE }];
  }
  return titleObjects;
}
