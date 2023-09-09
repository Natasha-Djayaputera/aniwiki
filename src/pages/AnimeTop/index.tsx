import { useSearchParams } from "react-router-dom";
import { anime_search } from "../../generated/jikan";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useTopAnimeWithPage } from "../../hooks/useTopAnimeWithPage";
import AnimeTemplatePage from "../../templates/AnimeTemplate";

const AnimeTopPage: React.FC = () => {
  useDocumentTitle("Top Anime - ANIWIKI");
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
