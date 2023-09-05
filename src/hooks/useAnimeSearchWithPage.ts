import { useEffect, useState } from "react";
import { AnimeService, anime_search } from "../generated/jikan";

export function useAnimeSearchWithPage(
  title: string,
  page: number = 1
): anime_search | undefined {
  const [searchedAnimeWithPage, setSearchedAnimeWithPage] = useState<
    anime_search | undefined
  >();

  const getAnimeSearchWithPage = async () => {
    try {
      const response = await AnimeService.getAnimeSearch({
        q: title,
        page,
      });

      setSearchedAnimeWithPage(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAnimeSearchWithPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return searchedAnimeWithPage;
}
