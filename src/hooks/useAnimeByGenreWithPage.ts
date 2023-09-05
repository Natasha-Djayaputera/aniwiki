import { useEffect, useState } from "react";
import { AnimeService, anime_search } from "../generated/jikan";

export function useAnimeByGenreWithPage(
  genres: string,
  page: number = 1
): anime_search | undefined {
  const [searchedAnimeByGenreWithPage, setSearchedAnimeByGenreWithPage] =
    useState<anime_search | undefined>();

  const getAnimeSearchByGenreWithPage = async () => {
    try {
      const response = await AnimeService.getAnimeSearch({
        genres,
        page,
      });

      setSearchedAnimeByGenreWithPage(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAnimeSearchByGenreWithPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return searchedAnimeByGenreWithPage;
}
