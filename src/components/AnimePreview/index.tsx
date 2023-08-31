import { MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { titles } from "../../enum/titles";
import { anime } from "../../generated/jikan";
import { delimiter, joinPropertyOf } from "../../helpers/array";
import {
  getNonUndefinedOrNullText,
  setLowerCaseAndDashTo,
  setSentenceCaseTo,
} from "../../helpers/string";
import { getTitlesOfType } from "../../helpers/title";
import Featured from "../Featured";
import Trailer from "../Trailer";

export interface AnimePreviewProps {
  isPreviewOpen: boolean;
  animes: anime[] | undefined;
}

const AnimePreview: React.FC<AnimePreviewProps> = ({
  animes,
  isPreviewOpen,
}) => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const navigate = useNavigate();

  const query = useQuery();
  const id = query.get("id");

  const animeData = animes?.find((animes) => animes.mal_id === Number(id));

  const synonymsTitle = getTitlesOfType(animeData?.titles, titles.type.SYNONYM);
  const japaneseTitle = getTitlesOfType(
    animeData?.titles,
    titles.type.JAPANESE
  );

  const closeAnimePreview = (e: MouseEvent<HTMLDivElement>) => {
    if (isPreviewOpen) {
      navigate("/");
    }
  };

  const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    if (isPreviewOpen) {
      e.stopPropagation();
    }
  };

  return (
    <div
      className={`anime-preview ${isPreviewOpen ? "open" : "closed"} overlay`}
      onMouseDown={closeAnimePreview}
    >
      <div
        className={`anime-preview-body ${isPreviewOpen ? "open" : "closed"}`}
        onMouseDown={stopPropagation}
      >
        <div className="close-btn-wrapper">
          <div className="close-btn-circle" onClick={closeAnimePreview}>
            <i className="fa-solid fa-xmark close-btn"></i>
          </div>
        </div>
        <Featured featuredData={animeData} />
        <div className="anime-preview-content">
          <div className="flex column">
            <div className="flex space-between">
              <h2>{joinPropertyOf(japaneseTitle, "title")}</h2>
              <p
                className={`tags horizontal-right ${setLowerCaseAndDashTo(
                  getNonUndefinedOrNullText(animeData?.status)
                )}`}
              >
                {getNonUndefinedOrNullText(animeData?.status)}
              </p>
            </div>
            <p>
              <b>{"Synonyms:".toUpperCase()}</b>{" "}
              {joinPropertyOf(synonymsTitle, "title", delimiter.COMMA)}
            </p>
          </div>

          <Rating
            initialValue={
              animeData?.score === undefined
                ? 0
                : Math.floor(animeData?.score!) / 2
            }
            readonly
            size={25}
          />
          <div className="flex flex-m vertical-center">
            <p>{getNonUndefinedOrNullText(animeData?.episodes)} Episodes</p>
            <p>
              <b>
                {getNonUndefinedOrNullText(
                  setSentenceCaseTo(animeData?.season)
                )}
              </b>
            </p>
            <p>
              <b>{getNonUndefinedOrNullText(animeData?.year, undefined, "")}</b>
            </p>
            <p>{getNonUndefinedOrNullText(animeData?.rating)}</p>
          </div>
          <div className="grid-2">
            <div className="flex column">
              <p>
                <b>Broadcast:</b>{" "}
                {getNonUndefinedOrNullText(animeData?.broadcast?.string)}
              </p>
              <p>
                <b>Demographics:</b>{" "}
                {joinPropertyOf(
                  animeData?.demographics,
                  "name",
                  delimiter.COMMA
                )}
              </p>
              <p>
                <b>Genre:</b>{" "}
                {joinPropertyOf(animeData?.genres, "name", delimiter.COMMA)}
              </p>
              <p>
                <b>Themes:</b>{" "}
                {joinPropertyOf(animeData?.themes, "name", delimiter.COMMA)}
              </p>
            </div>
            <div className="flex column horizontal-right">
              <p>
                <b>Rank:</b>{" "}
                {getNonUndefinedOrNullText(
                  animeData?.rank,
                  `#${animeData?.rank}`
                )}
              </p>
              <p>
                <b>Popularity:</b>{" "}
                {getNonUndefinedOrNullText(
                  animeData?.popularity,
                  `#${animeData?.popularity}`
                )}
              </p>{" "}
            </div>
          </div>
          <Trailer trailer={animeData?.trailer} />
        </div>
      </div>
    </div>
  );
};

export default AnimePreview;
