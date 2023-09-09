import { useLocation, useSearchParams } from "react-router-dom";
import AnimeRecommendation from "../../components/AnimeRecommendation";
import { useAnimeRecommendations } from "../../hooks/useAnimeRecommendations";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

const AnimeRecommendationPage: React.FC = () => {
  useDocumentTitle("Anime Recommendation - ANIWIKI");
  let [searchParams, setSearchParams] = useSearchParams();
  const pageParam =
    searchParams.get("page") === null ? 1 : Number(searchParams.get("page"));
  const location = useLocation();
  const animeRecommendationResult = useAnimeRecommendations(pageParam);
  const animeRecommendation = animeRecommendationResult?.data;
  const isLastPage = !animeRecommendationResult?.pagination?.has_next_page;

  const goNextPage = () => {
    setSearchParams((params) => {
      params.set("page", (pageParam + 1).toString());
      return params;
    });
    return searchParams.toString();
  };

  const goPrevPage = () => {
    setSearchParams((params) => {
      params.set("page", (pageParam - 1).toString());
      return params;
    });
    return searchParams.toString();
  };

  const animeRecommendationMap = animeRecommendation?.map((data) => {
    return (
      <AnimeRecommendation
        key={`${data.mal_id}-${data.user?.username}`}
        animeRecommendationData={data}
      />
    );
  });

  return (
    <main>
      <div className="content">
        <h1>Recommendation</h1>
        <div className="flex column recommendation">
          {animeRecommendationMap}
        </div>
        {animeRecommendationResult !== undefined && (
          <div className="flex space-around">
            {pageParam !== 1 && (
              <a
                className="button-style"
                href={`${location.pathname}?${searchParams.toString()}`}
                onClick={goPrevPage}
              >
                Prev Page
              </a>
            )}
            {!isLastPage && (
              <a
                className="button-style"
                href={`${location.pathname}?${searchParams.toString()}`}
                onClick={goNextPage}
              >
                Next Page
              </a>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default AnimeRecommendationPage;
