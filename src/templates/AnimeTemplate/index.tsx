import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { anime } from "../../generated/jikan";
import AnimePageItem from "./partials/AnimePageItem";

export interface AnimePageTemplateProps {
  title: string;
  animesData: anime[] | undefined;
  isLastPage?: boolean | undefined;
  currentPage?: number | undefined;
}

const AnimeTemplate: React.FC<AnimePageTemplateProps> = ({
  title,
  animesData = [],
  isLastPage = true,
  currentPage = 1,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const animePageItemMap = animesData.map((data) => (
    <AnimePageItem key={data.mal_id} animeData={data} />
  ));

  const goToPage = (to: 1 | -1) => () => {
    setSearchParams((params) => {
      params.set("page", (currentPage + to).toString());
      return params;
    });
    return searchParams.toString();
  };

  return (
    <>
      <h1>{title}</h1>
      <div className="flex column page-item">{animePageItemMap}</div>
      <div className="flex space-around">
        {currentPage !== 1 && (
          <a
            className="button-style"
            href={`${location.pathname}?${searchParams.toString()}`}
            onClick={goToPage(-1)}
          >
            Prev Page
          </a>
        )}
        {!isLastPage && (
          <a
            className="button-style"
            href={`${location.pathname}?${searchParams.toString()}`}
            onClick={goToPage(+1)}
          >
            Next Page
          </a>
        )}
      </div>
    </>
  );
};

export default AnimeTemplate;
