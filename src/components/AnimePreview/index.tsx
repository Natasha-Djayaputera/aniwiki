import { MouseEvent } from "react";
import { Rating } from "react-simple-star-rating";
import { Delimiter } from "../../enum/Delimiter";
import { TitleType } from "../../enum/TitleType";
import { anime } from "../../generated/jikan";
import { joinPropertyOf } from "../../helpers/array";
import { validateNumberInput } from "../../helpers/number";
import { normalizeScore } from "../../helpers/score";
import {
  formatStringInput,
  setLowerCaseAndDashTo,
  setSentenceCaseTo,
  validateStringInput,
} from "../../helpers/string";
import { getTitlesOfType } from "../../helpers/title";
import AnimeFeatured from "../AnimeFeatured";
import InformationRow from "../InformationRow";
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
    TitleType.SYNONYM
  );
  const japaneseTitle = getTitlesOfType(
    selectedAnime?.titles,
    TitleType.JAPANESE
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
        <AnimeFeatured animeFeaturedData={selectedAnime} />
        <div className="anime-preview-content">
          <div className="flex column">
            <div className="flex space-between">
              <h2>{joinPropertyOf(japaneseTitle, "title")}</h2>
              <p
                className={`tags horizontal-right ${setLowerCaseAndDashTo(
                  validateStringInput(selectedAnime?.status)
                )}`}
              >
                {formatStringInput(validateStringInput(selectedAnime?.status))}
              </p>
            </div>
            <InformationRow label="SYNONYMS">
              {joinPropertyOf(synonymsTitle, "title", Delimiter.COMMA)}
            </InformationRow>
          </div>

          <Rating
            initialValue={normalizeScore(selectedAnime?.score)}
            readonly
            size={25}
          />

          <div className="flex flex-m vertical-center">
            <p>
              {formatStringInput(validateNumberInput(selectedAnime?.episodes))}{" "}
              Episodes
            </p>
            {typeof selectedAnime?.season === "string" && (
              <p>
                <b>{setSentenceCaseTo(selectedAnime?.season)}</b>
              </p>
            )}
            {typeof selectedAnime?.year === "number" && (
              <p>
                <b>{selectedAnime?.year}</b>
              </p>
            )}
            <p>
              {formatStringInput(validateStringInput(selectedAnime?.rating))}
            </p>
          </div>
          <div className="grid-2">
            <div className="flex column">
              <InformationRow label="Broadcast">
                {formatStringInput(
                  validateStringInput(selectedAnime?.broadcast?.string)
                )}
              </InformationRow>
              <InformationRow label="Demographics">
                {joinPropertyOf(
                  selectedAnime?.demographics,
                  "name",
                  Delimiter.COMMA
                )}
              </InformationRow>
              <InformationRow label="Genre">
                {joinPropertyOf(selectedAnime?.genres, "name", Delimiter.COMMA)}
              </InformationRow>
              <InformationRow label="Themes">
                {joinPropertyOf(selectedAnime?.themes, "name", Delimiter.COMMA)}
              </InformationRow>
            </div>
            <div className="flex column horizontal-right">
              <InformationRow label="Rank">
                {formatStringInput(
                  validateNumberInput(selectedAnime?.rank),
                  `#${selectedAnime?.rank}`
                )}
              </InformationRow>
              <InformationRow label="Popularity">
                {formatStringInput(
                  validateNumberInput(selectedAnime?.popularity),
                  `#${selectedAnime?.popularity}`
                )}
              </InformationRow>
            </div>
          </div>
          <Trailer trailer={selectedAnime?.trailer} />
        </div>
      </div>
    </div>
  );
};

export default AnimePreview;
