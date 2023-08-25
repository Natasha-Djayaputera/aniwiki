import React, { useEffect, useState } from "react";
import {
  SeasonsService,
  TopService,
  anime,
  top_anime_filter,
} from "../../generated/jikan";
import Carousel from "../Carousel";

const Page: React.FunctionComponent = () => {
  const [featuredAnime, setFeaturedAnime] = useState<anime | undefined>();
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

      setTopAiringAnime(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getCurrentSeason = async () => {
    try {
      const response = await SeasonsService.getSeasonNow();

      setCurrentSeasonAnime(response.data);
      setFeaturedAnime(
        response.data![Math.floor(Math.random() * response.data!.length)]
      );
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

      setTopUpcomingAnime(response.data);
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
      {typeof featuredAnime !== "undefined" && (
        <div className="featured">
          <img
            src={`${featuredAnime.images!.jpg!.large_image_url}`}
            alt="featured-background"
            className="featured-background "
          />
          <div className="featured-body">
            <h1>{`${featuredAnime.title_english}`}</h1>
            <p className="ellipsis-multiline">{`${featuredAnime.synopsis}`}</p>
            <a href={`/anime/${featuredAnime.mal_id}`}>
              <i className="fa-solid fa-circle-info more-info-icon"></i>More
              Info
            </a>
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
