/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */

import type { entry_recommendations } from "../models/entry_recommendations";
import type { external_links } from "../models/external_links";
import type { forum } from "../models/forum";
import type { manga } from "../models/manga";
import type { manga_characters } from "../models/manga_characters";
import type { manga_full } from "../models/manga_full";
import type { manga_news } from "../models/manga_news";
import type { manga_pictures } from "../models/manga_pictures";
import type { manga_reviews } from "../models/manga_reviews";
import type { manga_search } from "../models/manga_search";
import type { manga_search_query_orderby } from "../models/manga_search_query_orderby";
import type { manga_search_query_status } from "../models/manga_search_query_status";
import type { manga_search_query_type } from "../models/manga_search_query_type";
import type { manga_statistics } from "../models/manga_statistics";
import type { manga_userupdates } from "../models/manga_userupdates";
import type { moreinfo } from "../models/moreinfo";
import type { relation } from "../models/relation";
import type { search_query_sort } from "../models/search_query_sort";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class MangaService {
  /**
   * @returns any Returns complete manga resource data
   * @throws ApiError
   */
  public static getMangaFullById({ id }: { id: number }): CancelablePromise<{
    data?: manga_full;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/manga/{id}/full",
      path: {
        id: id,
      },
      errors: {
        400: `Error: Bad request. When required parameters were not supplied.`,
      },
    });
  }

  /**
   * @returns any Returns pictures related to the entry
   * @throws ApiError
   */
  public static getMangaById({ id }: { id: number }): CancelablePromise<{
    data?: manga;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/manga/{id}",
      path: {
        id: id,
      },
      errors: {
        400: `Error: Bad request. When required parameters were not supplied.`,
      },
    });
  }

  /**
   * @returns manga_characters Returns manga characters resource
   * @throws ApiError
   */
  public static getMangaCharacters({
    id,
  }: {
    id: number;
  }): CancelablePromise<manga_characters> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/manga/{id}/characters",
      path: {
        id: id,
      },
      errors: {
        400: `Error: Bad request. When required parameters were not supplied.`,
      },
    });
  }

  /**
   * @returns manga_news Returns a list of manga news topics
   * @throws ApiError
   */
  public static getMangaNews({
    id,
    page,
  }: {
    id: number;
    page?: number;
  }): CancelablePromise<manga_news> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/manga/{id}/news",
      path: {
        id: id,
      },
      query: {
        page: page,
      },
      errors: {
        400: `Error: Bad request. When required parameters were not supplied.`,
      },
    });
  }

  /**
   * @returns forum Returns a list of manga forum topics
   * @throws ApiError
   */
  public static getMangaTopics({
    id,
    filter,
  }: {
    id: number;
    /**
     * Filter topics
     */
    filter?: "all" | "episode" | "other";
  }): CancelablePromise<forum> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/manga/{id}/forum",
      path: {
        id: id,
      },
      query: {
        filter: filter,
      },
      errors: {
        400: `Error: Bad request. When required parameters were not supplied.`,
      },
    });
  }

  /**
   * @returns manga_pictures Returns a list of manga pictures
   * @throws ApiError
   */
  public static getMangaPictures({
    id,
  }: {
    id: number;
  }): CancelablePromise<manga_pictures> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/manga/{id}/pictures",
      path: {
        id: id,
      },
      errors: {
        400: `Error: Bad request. When required parameters were not supplied.`,
      },
    });
  }

  /**
   * @returns manga_statistics Returns anime statistics
   * @throws ApiError
   */
  public static getMangaStatistics({
    id,
  }: {
    id: number;
  }): CancelablePromise<manga_statistics> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/manga/{id}/statistics",
      path: {
        id: id,
      },
      errors: {
        400: `Error: Bad request. When required parameters were not supplied.`,
      },
    });
  }

  /**
   * @returns moreinfo Returns manga moreinfo
   * @throws ApiError
   */
  public static getMangaMoreInfo({
    id,
  }: {
    id: number;
  }): CancelablePromise<moreinfo> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/manga/{id}/moreinfo",
      path: {
        id: id,
      },
      errors: {
        400: `Error: Bad request. When required parameters were not supplied.`,
      },
    });
  }

  /**
   * @returns entry_recommendations Returns manga recommendations
   * @throws ApiError
   */
  public static getMangaRecommendations({
    id,
  }: {
    id: number;
  }): CancelablePromise<entry_recommendations> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/manga/{id}/recommendations",
      path: {
        id: id,
      },
      errors: {
        400: `Error: Bad request. When required parameters were not supplied.`,
      },
    });
  }

  /**
   * @returns manga_userupdates Returns manga user updates
   * @throws ApiError
   */
  public static getMangaUserUpdates({
    id,
    page,
  }: {
    id: number;
    page?: number;
  }): CancelablePromise<manga_userupdates> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/manga/{id}/userupdates",
      path: {
        id: id,
      },
      query: {
        page: page,
      },
      errors: {
        400: `Error: Bad request. When required parameters were not supplied.`,
      },
    });
  }

  /**
   * @returns manga_reviews Returns manga reviews
   * @throws ApiError
   */
  public static getMangaReviews({
    id,
    page,
    preliminary,
    spoiler,
  }: {
    id: number;
    page?: number;
    /**
     * Any reviews left during an ongoing anime/manga, those reviews are tagged as preliminary. Preliminary reviews are not returned by default. e.g usage: `?preliminary=true`
     */
    preliminary?: boolean;
    /**
     * Any reviews that are tagged as a spoiler. Spoiler reviews are not returned by default. e.g usage: `?spoiler=true`
     */
    spoiler?: boolean;
  }): CancelablePromise<manga_reviews> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/manga/{id}/reviews",
      path: {
        id: id,
      },
      query: {
        page: page,
        preliminary: preliminary,
        spoiler: spoiler,
      },
      errors: {
        400: `Error: Bad request. When required parameters were not supplied.`,
      },
    });
  }

  /**
   * @returns any Returns manga relations
   * @throws ApiError
   */
  public static getMangaRelations({ id }: { id: number }): CancelablePromise<{
    data?: Array<relation>;
  }> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/manga/{id}/relations",
      path: {
        id: id,
      },
      errors: {
        400: `Error: Bad request. When required parameters were not supplied.`,
      },
    });
  }

  /**
   * @returns external_links Returns manga external links
   * @throws ApiError
   */
  public static getMangaExternal({
    id,
  }: {
    id: number;
  }): CancelablePromise<external_links> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/manga/{id}/external",
      path: {
        id: id,
      },
      errors: {
        400: `Error: Bad request. When required parameters were not supplied.`,
      },
    });
  }

  /**
   * @returns manga_search Returns search results for manga
   * @throws ApiError
   */
  public static getMangaSearch({
    sfw,
    unapproved,
    page,
    limit,
    q,
    type,
    score,
    minScore,
    maxScore,
    status,
    genres,
    genresExclude,
    orderBy,
    sort,
    letter,
    magazines,
    startDate,
    endDate,
  }: {
    /**
     * 'Safe For Work'. This is a flag. When supplied it will filter out entries according to the SFW Policy. You do not need to pass a value to it. e.g usage: `?sfw`
     */
    /**
     * This is a flag. When supplied it will include entries which are unapproved. Unapproved entries on MyAnimeList are those that are user submitted and have not yet been approved by MAL to show up on other pages. They will have their own specifc pages and are often removed resulting in a 404 error. You do not need to pass a value to it. e.g usage: `?unapproved`
     */
    unapproved?: boolean;
    page?: number;
    limit?: number;
    q?: string;
    type?: manga_search_query_type;
    score?: number;
    /**
     * Set a minimum score for results.
     */
    minScore?: number;
    /**
     * Set a maximum score for results
     */
    maxScore?: number;
    status?: manga_search_query_status;
    /**
     * Filter out Adult entries
     */
    sfw?: boolean;
    /**
     * Filter by genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3
     */
    genres?: string;
    /**
     * Exclude genre(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3
     */
    genresExclude?: string;
    orderBy?: manga_search_query_orderby;
    sort?: search_query_sort;
    /**
     * Return entries starting with the given letter
     */
    letter?: string;
    /**
     * Filter by magazine(s) IDs. Can pass multiple with a comma as a delimiter. e.g 1,2,3
     */
    magazines?: string;
    /**
     * Filter by starting date. Format: YYYY-MM-DD. e.g `2022`, `2005-05`, `2005-01-01`
     */
    startDate?: string;
    /**
     * Filter by ending date. Format: YYYY-MM-DD. e.g `2022`, `2005-05`, `2005-01-01`
     */
    endDate?: string;
  }): CancelablePromise<manga_search> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/manga",
      query: {
        sfw: sfw,
        unapproved: unapproved,
        page: page,
        limit: limit,
        q: q,
        type: type,
        score: score,
        min_score: minScore,
        max_score: maxScore,
        status: status,
        genres: genres,
        genres_exclude: genresExclude,
        order_by: orderBy,
        sort: sort,
        letter: letter,
        magazines: magazines,
        start_date: startDate,
        end_date: endDate,
      },
      errors: {
        400: `Error: Bad request. When required parameters were not supplied.`,
      },
    });
  }
}
