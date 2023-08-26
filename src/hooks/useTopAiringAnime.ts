import { useEffect, useState } from "react";
import { TopService, anime, top_anime_filter } from "../generated/jikan";

export function useTopAiringAnime(): anime[] | undefined {
  const [topAiringAnime, setTopAiringAnime] = useState<anime[] | undefined>();

  const getTopAiringAnime = async () => {
    try {
      const response = await TopService.getTopAnime({
        filter: top_anime_filter.AIRING,
      });

      setTopAiringAnime(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTopAiringAnime();
  }, []);

  return topAiringAnime;
}
