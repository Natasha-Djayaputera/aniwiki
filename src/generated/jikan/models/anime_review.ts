/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */

import { user_meta } from "./user_meta";

export type anime_review = {
  user?: user_meta | undefined;
  /**
   * MyAnimeList ID
   */
  mal_id?: number;
  /**
   * MyAnimeList review URL
   */
  url?: string;
  /**
   * Entry type
   */
  type?: string;
  /**
   * User reaction count on the review
   */
  reactions?: {
    /**
     * Overall reaction count
     */
    overall?: number;
    /**
     * Nice reaction count
     */
    nice?: number;
    /**
     * Love it reaction count
     */
    love_it?: number;
    /**
     * Funny reaction count
     */
    funny?: number;
    /**
     * Confusing reaction count
     */
    confusing?: number;
    /**
     * Informative reaction count
     */
    informative?: number;
    /**
     * Well written reaction count
     */
    well_written?: number;
    /**
     * Creative reaction count
     */
    creative?: number;
  };
  /**
   * Review created date ISO8601
   */
  date?: string;
  /**
   * Review content
   */
  review?: string;
  /**
   * Number of user votes on the Review
   */
  score?: number;
  /**
   * Review tags
   */
  tags?: Array<string>;
  /**
   * The review contains spoiler
   */
  is_spoiler?: boolean;
  /**
   * The review was made before the entry was completed
   */
  is_preliminary?: boolean;
  /**
   * Number of episodes watched
   */
  episodes_watched?: number;
};
