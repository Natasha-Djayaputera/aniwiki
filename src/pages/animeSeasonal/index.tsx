import { useSearchParams } from "react-router-dom";
import AnimeTemplatePage from "../../components/AnimeTemplatePage";
import { anime_search } from "../../generated/jikan";
import { useCurrentSeasonAnimeWithPage } from "../../hooks/useCurrentSeasonAnimeWithPage";

const AnimeSeasonalPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const seasonalAnimeResult: anime_search | undefined =
    useCurrentSeasonAnimeWithPage(page === null ? 1 : Number(page));
  if (seasonalAnimeResult === undefined) {
    return null;
  }
  const topAnime = seasonalAnimeResult.data;
  const isLastPage = !seasonalAnimeResult.pagination?.has_next_page;
  const currentPage = seasonalAnimeResult.pagination?.current_page;

  return (
    <main>
      <div className="content">
        <AnimeTemplatePage
          currentPage={currentPage}
          isLastPage={isLastPage}
          title={"Current Season Anime Series"}
          animesData={topAnime}
        />
      </div>
    </main>
  );
};

export default AnimeSeasonalPage;
