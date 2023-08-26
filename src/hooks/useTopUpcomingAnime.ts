import { useEffect, useState } from "react";
import { TopService, anime, top_anime_filter } from "../generated/jikan";

export function useTopUpcomingAnime(): anime[] | undefined {
  const [topUpcomingAnime, setTopUpcomingAnime] = useState<
    anime[] | undefined
  >();

  const getTopUpcomingAnime = async () => {
    try {
      const response = await TopService.getTopAnime({
        filter: top_anime_filter.UPCOMING,
      });

      setTopUpcomingAnime(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTopUpcomingAnime();
  }, []);
  return topUpcomingAnime;
}
