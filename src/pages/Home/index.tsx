import React, { useMemo, useState } from "react";
import AnimeCarousel from "../../components/AnimeCarousel";
import AnimeFeatured from "../../components/AnimeFeatured";
import AnimePreview from "../../components/AnimePreview";
import { anime } from "../../generated/jikan";
import { getRandomElementOf } from "../../helpers/array";
import { useCurrentSeasonAnime } from "../../hooks/useCurrentSeasonAnime";
import { useTopAiringAnime } from "../../hooks/useTopAiringAnime";
import { useTopUpcomingAnime } from "../../hooks/useTopUpcomingAnime";

const HomePage: React.FC = () => {
  const topAiringAnime: anime[] | undefined = useTopAiringAnime();
  const currentSeasonAnime: anime[] | undefined = useCurrentSeasonAnime();
  const topUpcomingAnime: anime[] | undefined = useTopUpcomingAnime();

  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

  const allAnime: anime[] = [
    ...(topAiringAnime ?? []),
    ...(currentSeasonAnime ?? []),
    ...(topUpcomingAnime ?? []),
  ];

  const featuredAnime = useMemo(
    () => getRandomElementOf(currentSeasonAnime ?? []),
    [currentSeasonAnime]
  );

  const selectedAnime = allAnime?.find(
    (selectedAnime) => selectedAnime.mal_id === Number(selectedId)
  );

  const openPreview = (id: string) => {
    setSelectedId(id);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setTimeout(() => setSelectedId(undefined), 300);
  };

  return (
    <>
      <main>
        <AnimeFeatured animeFeaturedData={featuredAnime} />
        <div className="content-home">
          {topAiringAnime && (
            <div className="content-item">
              <h3>Top Airing Anime</h3>
              <AnimeCarousel
                animesData={topAiringAnime}
                onSelectItem={openPreview}
              />
            </div>
          )}
          {currentSeasonAnime && (
            <div className="content-item">
              <h3>Current Season Anime</h3>
              <AnimeCarousel
                animesData={currentSeasonAnime}
                onSelectItem={openPreview}
              />
            </div>
          )}
          {topUpcomingAnime && (
            <div className="content-item">
              <h3>Top Upcoming Anime</h3>
              <AnimeCarousel
                animesData={topUpcomingAnime}
                onSelectItem={openPreview}
              />
            </div>
          )}
        </div>
      </main>
      <AnimePreview
        isPreviewOpen={isPreviewOpen}
        selectedAnime={selectedAnime}
        onClose={closePreview}
      />
    </>
  );
};

export default HomePage;
