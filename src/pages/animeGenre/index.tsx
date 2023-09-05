import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import AnimeTemplatePage from "../../components/AnimeTemplatePage";
import ShowMore from "../../components/ShowMore";
import { useAnimeByGenreWithPage } from "../../hooks/useAnimeByGenreWithPage";
import { useAnimeGenres } from "../../hooks/useAnimeGenres";

const AnimeGenrePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const genreParam = searchParams.get("genre");
  const pageParam = searchParams.get("page");
  const [isShowMore, setIsShowMore] = useState<boolean>(genreParam === null);

  const animeGenresResult = useAnimeGenres();
  const searchAnimesResult = useAnimeByGenreWithPage(
    genreParam ?? "",
    pageParam === null ? 1 : Number(pageParam)
  );

  const searchAnimes = searchAnimesResult?.data;
  const isLastPage = !searchAnimesResult?.pagination?.has_next_page;
  const currentPage = searchAnimesResult?.pagination?.current_page;
  const currentGenre = animeGenresResult?.find(
    (genre) => genre.mal_id === Number(genreParam)
  );
  const sortedAnimeGenres = animeGenresResult?.sort((a, b) => {
    return a.name?.toString().localeCompare(b.name ?? "") ?? 0;
  });

  const toggleShowMore = () => {
    setIsShowMore(!isShowMore);
  };

  const animeGenresMap = sortedAnimeGenres
    ?.slice(0, !isShowMore ? 10 : -1)
    .map((genre) => {
      const setGenre = () => {
        setSearchParams((params) => {
          params.set("genre", genre.mal_id?.toString() ?? "");
          params.set("page", "1");
          return params;
        });
      };
      return (
        <a
          href={`${location.pathname}?${searchParams.toString()}`}
          key={genre.name}
          onClick={setGenre}
        >
          {genre.name} ({genre.count})
        </a>
      );
    });

  return (
    <main>
      <div className="content">
        <h1>Genres</h1>
        <div className="grid-5 genres">{animeGenresMap}</div>
        {searchAnimesResult !== undefined && (
          <ShowMore isShowMore={isShowMore} toggleShowMore={toggleShowMore} />
        )}
        {searchAnimesResult !== undefined && (
          <AnimeTemplatePage
            currentPage={currentPage}
            isLastPage={isLastPage}
            title={currentGenre?.name ?? ""}
            animesData={searchAnimes}
          />
        )}
      </div>
    </main>
  );
};

export default AnimeGenrePage;
