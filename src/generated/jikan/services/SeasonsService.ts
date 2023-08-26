/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */

import type { anime_search } from "../models/anime_search";
import type { seasons } from "../models/seasons";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class SeasonsService {
  /**
   * @returns anime_search Returns current seasonal anime
   * @throws ApiError
   */
  public static getSeasonNow({
    filter,
    sfw,
    unapproved,
    page,
    limit,
  }: {
    /**
     * Entry types
     */
    filter?: "tv" | "movie" | "ova" | "special" | "ona" | "music";
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
  }): CancelablePromise<anime_search> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/seasons/now",
      query: {
        filter: filter,
        sfw: sfw,
        unapproved: unapproved,
        page: page,
        limit: limit,
      },
      errors: {
        400: `Error: Bad request. When required parameters were not supplied.`,
      },
    });
  }

  /**
   * @returns anime_search Returns seasonal anime
   * @throws ApiError
   */
  public static getSeason({
    year,
    season,
    filter,
    sfw,
    unapproved,
    page,
    limit,
  }: {
    year: number;
    season: string;
    /**
     * Entry types
     */
    filter?: "tv" | "movie" | "ova" | "special" | "ona" | "music";
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
  }): CancelablePromise<anime_search> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/seasons/{year}/{season}",
      path: {
        year: year,
        season: season,
      },
      query: {
        filter: filter,
        sfw: sfw,
        unapproved: unapproved,
        page: page,
        limit: limit,
      },
      errors: {
        400: `Error: Bad request. When required parameters were not supplied.`,
      },
    });
  }

  /**
   * @returns seasons Returns available list of seasons
   * @throws ApiError
   */
  public static getSeasonsList(): CancelablePromise<seasons> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/seasons",
      errors: {
        400: `Error: Bad request. When required parameters were not supplied.`,
      },
    });
  }

  /**
   * @returns anime_search Returns upcoming season's anime
   * @throws ApiError
   */
  public static getSeasonUpcoming({
    filter,
    sfw,
    unapproved,
    page,
    limit,
  }: {
    /**
     * Entry types
     */
    filter?: "tv" | "movie" | "ova" | "special" | "ona" | "music";
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
  }): CancelablePromise<anime_search> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/seasons/upcoming",
      query: {
        filter: filter,
        sfw: sfw,
        unapproved: unapproved,
        page: page,
        limit: limit,
      },
      errors: {
        400: `Error: Bad request. When required parameters were not supplied.`,
      },
    });
  }
}
