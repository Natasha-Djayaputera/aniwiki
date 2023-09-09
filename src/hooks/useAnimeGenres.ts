import moment from "moment";
import { useEffect, useMemo, useState } from "react";
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

type GenreCache = {
  data: genre[];
  lastUpdatedAt: Date;
};

function isGenreCache(candidate: unknown): candidate is GenreCache {
  return (
    typeof candidate === "object" &&
    candidate !== null &&
    "lastUpdatedAt" in candidate &&
    candidate.lastUpdatedAt instanceof Date &&
    "data" in candidate &&
    Array.isArray(candidate.data) &&
    candidate.data.every(isGenre)
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
  const parsedCache = useMemo<GenreCache | undefined>(() => {
    if (!cache) return undefined;

    const parsedValue = safeJsonParse(cache);

    if (typeof parsedValue !== "object" || parsedValue === null)
      return undefined;
    if (
      !(
        "lastUpdatedAt" in parsedValue &&
        typeof parsedValue.lastUpdatedAt === "string"
      )
    )
      return undefined;
    const genreCache = {
      ...parsedValue,
      lastUpdatedAt: new Date(parsedValue.lastUpdatedAt),
    };

    return isGenreCache(genreCache) ? genreCache : undefined;
  }, [cache]);
  const [animeGenres, setAnimeGenres] = useState<genre[] | undefined>(
    parsedCache?.data
  );

  const getAnimeGenres = async () => {
    try {
      const response = await GenresService.getAnimeGenres({});

      setAnimeGenres(response.data);
      setCache(
        JSON.stringify({ data: response.data, lastUpdatedAt: new Date() })
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (
      animeGenres === undefined ||
      moment().diff(moment(parsedCache?.lastUpdatedAt), "hour", true) > 1
    )
      getAnimeGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return animeGenres;
}
