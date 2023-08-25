import React, { useEffect, useState } from "react";
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

  const getTopAiring = async () => {
    try {
      const response = await TopService.getTopAnime(
        undefined,
        top_anime_filter.AIRING
      );

      console.log(response);
      setTopAiringAnime(response.data);
      console.log(topAiringAnime);
    } catch (e) {
      console.log(e);
    }
  };

  const getCurrentSeason = async () => {
    try {
      const response = await SeasonsService.getSeasonNow();

      console.log(response);
      setCurrentSeasonAnime(response.data);
      console.log(currentSeasonAnime);
    } catch (e) {
      console.log(e);
    }
  };

  const getTopUpcoming = async () => {
    try {
      const response = await TopService.getTopAnime(
        undefined,
        top_anime_filter.UPCOMING
      );

      console.log(response);
      setTopUpcomingAnime(response.data);
      console.log(topUpcomingAnime);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTopAiring();
    getCurrentSeason();
    getTopUpcoming();
  }, []);

  return (
    <main className="">
      {typeof topAiringAnime !== "undefined" && (
        <div className="featured">
          <img
            src={`${topAiringAnime[0].images!.jpg!.large_image_url}`}
            alt="featured-background"
            className="featured-background "
          />
          <div className="featured-body">
            <h3>{`${topAiringAnime[0]
              .genres!.map((genre) => genre.name)
              .join(", ")}`}</h3>
            <h1>{`${topAiringAnime[0].title_english}`}</h1>
            <p className="ellipsis-multiline">{`${topAiringAnime[0].synopsis}`}</p>
          </div>
          <div className="featured-bottom-border"></div>
        </div>
      )}
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
