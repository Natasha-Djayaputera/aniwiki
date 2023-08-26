/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class ReviewsService {
  /**
   * @returns any Returns recent anime reviews
   * @throws ApiError
   */
  public static getRecentAnimeReviews({
    page,
    preliminary,
    spoiler,
  }: {
    page?: number;
    /**
     * Any reviews left during an ongoing anime/manga, those reviews are tagged as preliminary. Preliminary reviews are not returned by default. e.g usage: `?preliminary=true`
     */
    preliminary?: boolean;
    /**
     * Any reviews that are tagged as a spoiler. Spoiler reviews are not returned by default. e.g usage: `?spoiler=true`
     */
    spoiler?: boolean;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/reviews/anime",
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
   * @returns any Returns recent manga reviews
   * @throws ApiError
   */
  public static getRecentMangaReviews({
    page,
    preliminary,
    spoiler,
  }: {
    page?: number;
    /**
     * Any reviews left during an ongoing anime/manga, those reviews are tagged as preliminary. Preliminary reviews are not returned by default. e.g usage: `?preliminary=true`
     */
    preliminary?: boolean;
    /**
     * Any reviews that are tagged as a spoiler. Spoiler reviews are not returned by default. e.g usage: `?spoiler=true`
     */
    spoiler?: boolean;
  }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/reviews/manga",
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
}
