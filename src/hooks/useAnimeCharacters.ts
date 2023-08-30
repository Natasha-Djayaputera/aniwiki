import { useEffect, useState } from "react";
import { AnimeService, anime_characters } from "../generated/jikan";

export function useAnimeCharacters(id: number): anime_characters | undefined {
  const [animeCharacters, setAnimeCharacters] = useState<
    anime_characters | undefined
  >();

  const getAnimeCharacters = async () => {
    try {
      const response = await AnimeService.getAnimeCharacters({ id: id });

      setAnimeCharacters(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAnimeCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return animeCharacters;
}
