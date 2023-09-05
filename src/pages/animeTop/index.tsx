import { useSearchParams } from "react-router-dom";
import AnimeTemplatePage from "../../components/AnimeTemplatePage";
import { anime_search } from "../../generated/jikan";
import { useTopAnimeWithPage } from "../../hooks/useTopAnimeWithPage";

const AnimeTopPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const topAnimeResult: anime_search | undefined = useTopAnimeWithPage(
    page === null ? 1 : Number(page)
  );
  if (topAnimeResult === undefined) {
    return null;
  }
  const topAnime = topAnimeResult.data;
  const isLastPage = !topAnimeResult.pagination?.has_next_page;
  const currentPage = topAnimeResult.pagination?.current_page;

  return (
    <main>
      <div className="content">
        <AnimeTemplatePage
          currentPage={currentPage}
          isLastPage={isLastPage}
          title={"Top Anime Series"}
          animesData={topAnime}
        />
      </div>
    </main>
  );
};

export default AnimeTopPage;
