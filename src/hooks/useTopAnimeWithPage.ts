import { useEffect, useState } from "react";
import { TopService, anime_search } from "../generated/jikan";

export function useTopAnimeWithPage(
  page: number = 1
): anime_search | undefined {
  const [topAnimeWithPage, setTopAnimeWithPage] = useState<
    anime_search | undefined
  >();

  const getTopAnimeWithPage = async () => {
    try {
      const response = await TopService.getTopAnime({
        page,
      });
      setTopAnimeWithPage(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTopAnimeWithPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return topAnimeWithPage;
}
