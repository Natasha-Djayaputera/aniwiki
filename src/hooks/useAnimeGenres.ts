import { useEffect, useState } from "react";
import { GenresService, genre } from "../generated/jikan";

export function useAnimeGenres(): genre[] | undefined {
  const [animeGenres, setAnimeGenres] = useState<genre[] | undefined>();

  const getAnimeGenres = async () => {
    try {
      const response = await GenresService.getAnimeGenres({});

      setAnimeGenres(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAnimeGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return animeGenres;
}
