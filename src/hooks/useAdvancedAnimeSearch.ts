import { useEffect, useState } from "react";
import { AnimeService, anime_search } from "../generated/jikan";
import { anime_search_param } from "../generated/jikan/models/anime_search";

export function useAdvancedAnimeSearch(
  searchParam: anime_search_param
): anime_search | undefined {
  const [searchedAnime, setSearchedAnime] = useState<
    anime_search | undefined
  >();

  const getAnimeSearch = async () => {
    try {
      const response = await AnimeService.getAnimeSearch(searchParam);

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
