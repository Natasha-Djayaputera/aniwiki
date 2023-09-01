import { useEffect, useState } from "react";
import { AnimeService, anime_search } from "../generated/jikan";

export function useAnimeSearch(title: string): anime_search | undefined {
  const [searchedAnime, setSearchedAnime] = useState<
    anime_search | undefined
  >();

  const getAnimeSearch = async () => {
    try {
      const response = await AnimeService.getAnimeSearch({
        q: title,
      });

      setSearchedAnime(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAnimeSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return searchedAnime;
}
