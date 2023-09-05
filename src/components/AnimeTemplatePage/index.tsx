import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { anime } from "../../generated/jikan";
import AnimePageItem from "../AnimePageItem";

export interface AnimePageTemplateProps {
  title: string;
  animesData: anime[] | undefined;
  isLastPage?: boolean | undefined;
  currentPage?: number | undefined;
}

const AnimePageTemplate: React.FC<AnimePageTemplateProps> = ({
  title,
  animesData = [],
  isLastPage = true,
  currentPage = 1,
}) => {
  const animePageItemMap = animesData.map((data) => {
    return <AnimePageItem key={data.mal_id} animeData={data} />;
  });
  let [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const goNextPage = () => {
    setSearchParams((params) => {
      params.set("page", (currentPage + 1).toString());
      return params;
    });
    return searchParams.toString();
  };

  const goPrevPage = () => {
    setSearchParams((params) => {
      params.set("page", (currentPage - 1).toString());
      return params;
    });
    return searchParams.toString();
  };

  return (
    <main>
      <div className="content">
        <h1>{title}</h1>
        <div className="flex column page-item">{animePageItemMap}</div>
        <div className="flex space-around">
          {currentPage !== 1 && (
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
      </div>
    </main>
  );
};

export default AnimePageTemplate;
