import { useEffect, useState } from "react";
import { RecommendationsService, recommendations } from "../generated/jikan";

export function useAnimeRecommendations(
  page: number = 1
): recommendations | undefined {
  const [animeRecommendations, setAnimeRecommendations] = useState<
    recommendations | undefined
  >();

  const getAnimeRecommendations = async () => {
    try {
      const response =
        await RecommendationsService.getRecentAnimeRecommendations({ page });

      setAnimeRecommendations(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAnimeRecommendations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return animeRecommendations;
}
