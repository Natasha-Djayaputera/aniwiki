import { useSearchParams } from "react-router-dom";
import AnimeTemplatePage from "../../components/AnimeTemplatePage";
import { useAnimeSearchWithPage } from "../../hooks/useAnimeSearchWithPage";

const AnimeSearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("q");
  const page = searchParams.get("page");
  const searchAnimesResult = useAnimeSearchWithPage(
    title ?? "",
    page === null ? 1 : Number(page)
  );

  if (searchAnimesResult === undefined) {
    return null;
  }

  const searchAnimes = searchAnimesResult.data;
  const isLastPage = !searchAnimesResult.pagination?.has_next_page;
  const currentPage = searchAnimesResult.pagination?.current_page;

  return (
    <main>
      <div className="content">
        <AnimeTemplatePage
          currentPage={currentPage}
          isLastPage={isLastPage}
          title={"Search Result"}
          animesData={searchAnimes}
        />
      </div>
    </main>
  );
};

export default AnimeSearchPage;
