import { useEffect, useState } from "react";
import { AnimeService, anime, anime_full } from "../generated/jikan";

export function useFullAnime(id: number): anime_full | undefined {
  const [fullAnime, setFullAnime] = useState<anime | undefined>();

  const getFullAnime = async () => {
    try {
      const response = await AnimeService.getAnimeFullById({ id: id });

      setFullAnime(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getFullAnime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return fullAnime;
}
