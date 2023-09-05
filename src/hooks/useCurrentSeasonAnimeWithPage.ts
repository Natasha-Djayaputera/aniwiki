import { useEffect, useState } from "react";
import { SeasonsService, anime_search } from "../generated/jikan";

export function useCurrentSeasonAnimeWithPage(
  page: number = 1
): anime_search | undefined {
  const [currentSeasonAnimeWithPage, setCurrentSeasonAnimeWithPage] = useState<
    anime_search | undefined
  >();

  const getCurrentSeasonAnimeWithPage = async () => {
    try {
      const response = await SeasonsService.getSeasonNow({ page });

      setCurrentSeasonAnimeWithPage(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCurrentSeasonAnimeWithPage();
  }, []);

  return currentSeasonAnimeWithPage;
}
