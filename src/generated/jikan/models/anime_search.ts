/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */

import type { anime } from "./anime";
import { anime_search_query_orderby } from "./anime_search_query_orderby";
import { anime_search_query_rating } from "./anime_search_query_rating";
import { anime_search_query_status } from "./anime_search_query_status";
import { anime_search_query_type } from "./anime_search_query_type";
import type { pagination_plus } from "./pagination_plus";
import { search_query_sort } from "./search_query_sort";

/**
 * Anime Collection Resource
 */
export type anime_search_param = {
  /**
   * 'Safe For Work'. This is a flag. When supplied it will filter out entries according to the SFW Policy. You do not need to pass a value to it. e.g usage: `?sfw`
   */
  sfw?: boolean;
  /**
   * This is a flag. When supplied it will include entries which are unapproved. Unapproved entries on MyAnimeList are those that are user submitted and have not yet been approved by MAL to show up on other pages. They will have their own specifc pages and are often removed resulting in a 404 error. You do not need to pass a value to it. e.g usage: `?unapproved`
   */
  unapproved?: boolean;
  page?: number;
  limit?: number;
  q?: string;
  type?: anime_search_query_type;
  score?: number;
  /**
   * Set a minimum score for results.
   */
  minScore?: number;
  /**
   * Set a maximum score for results
   */
  maxScore?: number;
  status?: anime_search_query_status;
  rating?: anime_search_query_rating;
  /**
   * Filter out Adult entries
   */

  /**
   * Filter by genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3
   */
  genres?: string;
  /**
   * Exclude genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3
   */
  genresExclude?: string;
  orderBy?: anime_search_query_orderby;
  sort?: search_query_sort;
  /**
   * Return entries starting with the given letter
   */
  letter?: string;
  /**
   * Filter by producer(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3
   */
  producers?: string;
  /**
   * Filter by starting date. Format: YYYY-MM-DD. e.g `2022`, `2005-05`, `2005-01-01`
   */
  startDate?: string;
  /**
   * Filter by ending date. Format: YYYY-MM-DD. e.g `2022`, `2005-05`, `2005-01-01`
   */
  endDate?: string;
};

export type anime_search = {
  data?: Array<anime>;
} & pagination_plus;
