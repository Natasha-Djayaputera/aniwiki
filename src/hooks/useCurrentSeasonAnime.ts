import { useEffect, useState } from "react";
import { SeasonsService, anime } from "../generated/jikan";

export function useCurrentSeasonAnime(): anime[] | undefined {
  const [currentSeasonAnime, setCurrentSeasonAnime] = useState<
    anime[] | undefined
  >();

  const getCurrentSeasonAnime = async () => {
    try {
      const response = await SeasonsService.getSeasonNow({});

      setCurrentSeasonAnime(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCurrentSeasonAnime();
  }, []);

  return currentSeasonAnime;
}
