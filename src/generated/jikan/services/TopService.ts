/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */

import type { anime_meta } from "../models/anime_meta";
import type { anime_review } from "../models/anime_review";
import type { anime_search } from "../models/anime_search";
import type { anime_search_query_rating } from "../models/anime_search_query_rating";
import type { anime_search_query_type } from "../models/anime_search_query_type";
import type { characters_search } from "../models/characters_search";
import type { manga_meta } from "../models/manga_meta";
import type { manga_review } from "../models/manga_review";
import type { manga_search } from "../models/manga_search";
import type { manga_search_query_type } from "../models/manga_search_query_type";
import type { pagination } from "../models/pagination";
import type { people_search } from "../models/people_search";
import type { top_anime_filter } from "../models/top_anime_filter";
import type { top_manga_filter } from "../models/top_manga_filter";
import type { top_reviews_type_enum } from "../models/top_reviews_type_enum";
import type { user_meta } from "../models/user_meta";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class TopService {
  /**
   * @returns anime_search Returns top anime
   * @throws ApiError
   */
  public static getTopAnime({
    type,
    filter,
    rating,
    sfw,
    page,
    limit,
  }: {
    type?: anime_search_query_type;
    filter?: top_anime_filter;
    rating?: anime_search_query_rating;
    /**
     * Filter out Adult entries
     */
    sfw?: boolean;
    page?: number;
    limit?: number;
  }): CancelablePromise<anime_search> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/top/anime",
      query: {
        type: type,
        filter: filter,
        rating: rating,
        sfw: sfw,
        page: page,
        limit: limit,
      },
      errors: {
        400: `Error: Bad request. When required parameters were not supplied.`,
      },
    });
  }

  /**
   * @returns manga_search Returns top manga
   * @throws ApiError
   */
  public static getTopManga({
    type,
    filter,
    page,
    limit,
  }: {
    type?: manga_search_query_type;
    filter?: top_manga_filter;
    page?: number;
    limit?: number;
  }): CancelablePromise<manga_search> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/top/manga",
      query: {
        type: type,
        filter: filter,
        page: page,
        limit: limit,
      },
      errors: {
        400: `Error: Bad request. When required parameters were not supplied.`,
      },
    });
  }

  /**
   * @returns people_search Returns top people
   * @throws ApiError
   */
  public static getTopPeople({
    page,
    limit,
  }: {
    page?: number;
    limit?: number;
  }): CancelablePromise<people_search> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/top/people",
      query: {
        page: page,
        limit: limit,
      },
      errors: {
        400: `Error: Bad request. When required parameters were not supplied.`,
      },
    });
  }

  /**
   * @returns characters_search Returns top characters
   * @throws ApiError
   */
  public static getTopCharacters({
    page,
    limit,
  }: {
    page?: number;
    limit?: number;
  }): CancelablePromise<characters_search> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/top/characters",
      query: {
        page: page,
        limit: limit,
      },
      errors: {
        400: `Error: Bad request. When required parameters were not supplied.`,
      },
    });
  }

  /**
   * @returns any Returns top reviews
   * @throws ApiError
   */
  public static getTopReviews({
    page,
    type,
    preliminary,
    spoilers,
  }: {
    page?: number;
    type?: top_reviews_type_enum;
    /**
     * Whether the results include preliminary reviews or not. Defaults to true.
     */
    preliminary?: boolean;
    /**
     * Whether the results include reviews with spoilers or not. Defaults to true.
     */
    spoilers?: boolean;
  }): CancelablePromise<{
    data?: {
      data?: Array<
        | ({
            user?: user_meta;
          } & {
            anime?: anime_meta;
          } & anime_review)
        | ({
            user?: user_meta;
          } & {
            manga?: manga_meta;
          } & manga_review)
      >;
    } & pagination;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/top/reviews",
      query: {
        page: page,
        type: type,
        preliminary: preliminary,
        spoilers: spoilers,
      },
      errors: {
        400: `Error: Bad request. When required parameters were not supplied.`,
      },
    });
  }
}
