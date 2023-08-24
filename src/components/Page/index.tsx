import React, { useEffect, useState } from "react";
import Background from "../../assets/placeholders/background.jpg";
import { AnimeData, fetchTopAiringAnime } from "../../services/jikanService";
import Carousel from "../Carousel";

const Page: React.FunctionComponent = () => {
  const [topAiringAnime, setTopAiringAnime] = useState<AnimeData[] | null>(
    null
  );

  const topAiring = async () => {
    try {
      const response = await fetchTopAiringAnime();

      console.log(response);
      if (response.status === 200) {
        setTopAiringAnime(response.data.data);
        console.log(topAiringAnime);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    topAiring();
  }, []);

  return (
    <main className="">
      {topAiringAnime && (
        <div className="featured">
          <img
            src={Background}
            alt="featured-background"
            className="featured-background "
          />
          <div className="featured-body">
            <h3>{`${topAiringAnime[0].genres
              .map((genre) => genre.name)
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
          <div className="carousel"></div>
        </div>
        <div className="content-item">
          <h3>Top Upcoming Anime</h3>
          <div className="carousel"></div>
        </div>
      </div>
    </main>
  );
};

export default Page;
