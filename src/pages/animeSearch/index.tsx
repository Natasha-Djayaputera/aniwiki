import { useSearchParams } from "react-router-dom";
import { useAnimeSearch } from "../../hooks/useAnimeSearch";

const AnimeSearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("q");
  const searchAnimes = useAnimeSearch(title ?? "");
  const animeData = searchAnimes?.data?.[0];
  if (animeData === undefined) {
    return null;
  } else {
    window.location.href = `/anime/${animeData.mal_id}`;
  }

  return (
    <main>
      <div className="content anime-page-grid"></div>
    </main>
  );
};

export default AnimeSearchPage;
