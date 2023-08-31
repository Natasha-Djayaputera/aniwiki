import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import AnimePreview from "../../components/AnimePreview";
import Carousel from "../../components/Carousel";
import Featured from "../../components/Featured";
import { anime } from "../../generated/jikan";
import { getRandomElementOf } from "../../helpers/array";
import { useCurrentSeasonAnime } from "../../hooks/useCurrentSeasonAnime";
import { useTopAiringAnime } from "../../hooks/useTopAiringAnime";
import { useTopUpcomingAnime } from "../../hooks/useTopUpcomingAnime";

const HomePage: React.FC = () => {
  const topAiringAnime: anime[] | undefined = useTopAiringAnime();
  const currentSeasonAnime: anime[] | undefined = useCurrentSeasonAnime();
  const topUpcomingAnime: anime[] | undefined = useTopUpcomingAnime();
  // const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const location = useLocation();

  const isPreviewOpen = location.search.includes("id");

  const allAnime: anime[] = [
    ...(topAiringAnime ?? []),
    ...(currentSeasonAnime ?? []),
    ...(topUpcomingAnime ?? []),
  ];

  const featuredAnime = useMemo(
    () => getRandomElementOf(currentSeasonAnime ?? []),
    [currentSeasonAnime]
  );

  // useEffect(() => {
  //   if (location.search.includes("id")) {
  //     setIsPreviewOpen(true);
  //   } else {
  //     setIsPreviewOpen(false);
  //   }
  // }, [location.search]);

  return (
    <>
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
      <AnimePreview isPreviewOpen={isPreviewOpen} animes={allAnime} />
    </>
  );
};

export default HomePage;
