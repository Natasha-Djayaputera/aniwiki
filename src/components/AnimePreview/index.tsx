import { MouseEvent } from "react";
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
  selectedAnime: anime | undefined;
  onClose: () => void;
}

const AnimePreview: React.FC<AnimePreviewProps> = ({
  selectedAnime,
  isPreviewOpen,
  onClose,
}) => {
  const synonymsTitle = getTitlesOfType(
    selectedAnime?.titles,
    titles.type.SYNONYM
  );
  const japaneseTitle = getTitlesOfType(
    selectedAnime?.titles,
    titles.type.JAPANESE
  );

  const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    if (isPreviewOpen) {
      e.stopPropagation();
    }
  };

  return (
    <div
      className={`anime-preview ${isPreviewOpen ? "open" : "closed"} overlay`}
      onMouseDown={onClose}
    >
      <div
        className={`anime-preview-body ${isPreviewOpen ? "open" : "closed"}`}
        onMouseDown={stopPropagation}
      >
        <div className="close-btn-wrapper">
          <div className="close-btn-circle" onClick={onClose}>
            <i className="fa-solid fa-xmark close-btn"></i>
          </div>
        </div>
        <Featured featuredData={selectedAnime} />
        <div className="anime-preview-content">
          <div className="flex column">
            <div className="flex space-between">
              <h2>{joinPropertyOf(japaneseTitle, "title")}</h2>
              <p
                className={`tags horizontal-right ${setLowerCaseAndDashTo(
                  getNonUndefinedOrNullText(selectedAnime?.status)
                )}`}
              >
                {getNonUndefinedOrNullText(selectedAnime?.status)}
              </p>
            </div>
            <p>
              <b>{"Synonyms:".toUpperCase()}</b>{" "}
              {joinPropertyOf(synonymsTitle, "title", delimiter.COMMA)}
            </p>
          </div>

          <Rating
            initialValue={
              selectedAnime?.score === undefined
                ? 0
                : Math.floor(selectedAnime?.score!) / 2
            }
            readonly
            size={25}
          />
          <div className="flex flex-m vertical-center">
            <p>{getNonUndefinedOrNullText(selectedAnime?.episodes)} Episodes</p>
            <p>
              <b>
                {getNonUndefinedOrNullText(
                  setSentenceCaseTo(selectedAnime?.season)
                )}
              </b>
            </p>
            <p>
              <b>
                {getNonUndefinedOrNullText(selectedAnime?.year, undefined, "")}
              </b>
            </p>
            <p>{getNonUndefinedOrNullText(selectedAnime?.rating)}</p>
          </div>
          <div className="grid-2">
            <div className="flex column">
              <p>
                <b>Broadcast:</b>{" "}
                {getNonUndefinedOrNullText(selectedAnime?.broadcast?.string)}
              </p>
              <p>
                <b>Demographics:</b>{" "}
                {joinPropertyOf(
                  selectedAnime?.demographics,
                  "name",
                  delimiter.COMMA
                )}
              </p>
              <p>
                <b>Genre:</b>{" "}
                {joinPropertyOf(selectedAnime?.genres, "name", delimiter.COMMA)}
              </p>
              <p>
                <b>Themes:</b>{" "}
                {joinPropertyOf(selectedAnime?.themes, "name", delimiter.COMMA)}
              </p>
            </div>
            <div className="flex column horizontal-right">
              <p>
                <b>Rank:</b>{" "}
                {getNonUndefinedOrNullText(
                  selectedAnime?.rank,
                  `#${selectedAnime?.rank}`
                )}
              </p>
              <p>
                <b>Popularity:</b>{" "}
                {getNonUndefinedOrNullText(
                  selectedAnime?.popularity,
                  `#${selectedAnime?.popularity}`
                )}
              </p>{" "}
            </div>
          </div>
          <Trailer trailer={selectedAnime?.trailer} />
        </div>
      </div>
    </div>
  );
};

export default AnimePreview;
