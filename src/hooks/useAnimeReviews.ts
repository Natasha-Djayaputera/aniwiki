import { useEffect, useState } from "react";
import { AnimeService, anime_reviews } from "../generated/jikan";

export function useAnimeReviews(id: number): anime_reviews | undefined {
  const [animeReviews, setAnimeReviews] = useState<anime_reviews | undefined>();

  const getAnimeReviews = async () => {
    try {
      const response = await AnimeService.getAnimeReviews({
        id,
        preliminary: true,
        spoiler: true,
      });

      setAnimeReviews(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAnimeReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return animeReviews;
}
