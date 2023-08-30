import React, { useMemo } from "react";
import Carousel from "../../components/Carousel";
import Featured from "../../components/Featured";
import { getRandomElementOf } from "../../helpers/array";
import { useCurrentSeasonAnime } from "../../hooks/useCurrentSeasonAnime";
import { useTopAiringAnime } from "../../hooks/useTopAiringAnime";
import { useTopUpcomingAnime } from "../../hooks/useTopUpcomingAnime";

const HomePage: React.FC = () => {
  const topAiringAnime = useTopAiringAnime();
  const currentSeasonAnime = useCurrentSeasonAnime();
  const topUpcomingAnime = useTopUpcomingAnime();

  const featuredAnime = useMemo(
    () => getRandomElementOf(currentSeasonAnime ?? []),
    [currentSeasonAnime]
  );

  return (
    <main>
      <Featured featuredData={featuredAnime} />
      <div className="content-home">
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

export default HomePage;
