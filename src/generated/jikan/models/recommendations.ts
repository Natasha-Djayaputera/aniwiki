/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */

import type { anime_meta } from "./anime_meta";
import type { manga_meta } from "./manga_meta";
import type { pagination } from "./pagination";
import type { user_by_id } from "./user_by_id";

/**
 * Recommendations
 */

export type recommendation = {
  /**
   * MAL IDs of recommendations is both of the MAL ID's with a `-` delimiter
   */
  mal_id?: string;
  /**
   * Array of 2 entries that are being recommended to each other
   */
  entry?: Array<anime_meta | manga_meta>;
  /**
   * Recommendation context provided by the user
   */
  content?: string;
  user?: user_by_id;
};

export type recommendations = {
  data?: Array<recommendation>;
} & pagination;
