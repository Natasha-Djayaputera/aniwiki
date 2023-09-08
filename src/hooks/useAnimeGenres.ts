import { useEffect, useState } from "react";
import { GenresService, genre } from "../generated/jikan";
import { useLocalStorage } from "./useLocalStorage";

const ANIME_GENRE_KEY = "ANIME_GENRE_KEY";

function isGenre(candidate: unknown): candidate is genre {
  return (
    typeof candidate === "object" &&
    candidate !== null &&
    (("mal_id" in candidate &&
      (typeof candidate.mal_id === "number" ||
        candidate.mal_id === undefined)) ||
      !("mal_id" in candidate)) &&
    (("name" in candidate &&
      (typeof candidate.name === "string" || candidate.name === undefined)) ||
      !("name" in candidate)) &&
    (("url" in candidate &&
      (typeof candidate.url === "string" || candidate.url === undefined)) ||
      !("url" in candidate)) &&
    (("count" in candidate &&
      (typeof candidate.count === "number" || candidate.count === undefined)) ||
      !("count" in candidate))
  );
}

function safeJsonParse(value: unknown): unknown {
  if (typeof value !== "string") return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export function useAnimeGenres(): genre[] | undefined {
  const [cache, setCache] = useLocalStorage(ANIME_GENRE_KEY);
  const [animeGenres, setAnimeGenres] = useState<genre[] | undefined>(() => {
    if (!cache) return undefined;

    const parsedValue = safeJsonParse(cache);

    if (!Array.isArray(parsedValue)) return undefined;

    return parsedValue.filter(isGenre);
  });

  const getAnimeGenres = async () => {
    try {
      const response = await GenresService.getAnimeGenres({});

      setAnimeGenres(response.data);
      setCache(JSON.stringify(response.data));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (animeGenres === undefined) getAnimeGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return animeGenres;
}
