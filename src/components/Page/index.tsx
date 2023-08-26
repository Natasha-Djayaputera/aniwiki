import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  SeasonsService,
  TopService,
  anime,
  top_anime_filter,
} from "../../generated/jikan";
import Carousel from "../Carousel";

const Page: React.FunctionComponent = () => {
  const [topAiringAnime, setTopAiringAnime] = useState<anime[] | undefined>();
  const [topUpcomingAnime, setTopUpcomingAnime] = useState<
    anime[] | undefined
  >();
  const [currentSeasonAnime, setCurrentSeasonAnime] = useState<
    anime[] | undefined
  >();

  const path = useLocation();

  const getTopAiring = async () => {
    try {
      const response = await TopService.getTopAnime({
        filter: top_anime_filter.AIRING,
      });

      setTopAiringAnime(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getCurrentSeason = async () => {
    try {
      const response = await SeasonsService.getSeasonNow({});

      setCurrentSeasonAnime(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getTopUpcoming = async () => {
    try {
      const response = await TopService.getTopAnime({
        filter: top_anime_filter.UPCOMING,
      });

      setTopUpcomingAnime(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTopAiring();
    getCurrentSeason();
    getTopUpcoming();
    console.log(path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <div className="content">
        <div className="content-item">
          <h3>Top Airing Anime</h3>
          <Carousel itemData={topAiringAnime} />
        </div>
        <div className="content-item">
          <h3>Current Season Anime</h3>
          <Carousel itemData={currentSeasonAnime} />
        </div>
        <div className="content-item">
          <h3>Top Upcoming Anime</h3>
          <Carousel itemData={topUpcomingAnime} />
        </div>
      </div>
    </main>
  );
};

export default Page;
