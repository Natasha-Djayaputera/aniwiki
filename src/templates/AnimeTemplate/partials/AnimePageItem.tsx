import InformationRow from "../../../components/InformationRow";
import { Delimiter } from "../../../enum/Delimiter";
import { TitleType } from "../../../enum/TitleType";
import { anime } from "../../../generated/jikan";
import { joinPropertyOf } from "../../../helpers/array";
import { validateNumberInput } from "../../../helpers/number";
import {
  formatStringInput,
  validateStringInput,
} from "../../../helpers/string";
import { getFirstTitleOfType } from "../../../helpers/title";

export interface AnimePageItemProps {
  animeData: anime | undefined;
}

const AnimePageItem: React.FC<AnimePageItemProps> = ({ animeData }) => {
  if (animeData === undefined) {
    return null;
  }
  const defaultTitle = getFirstTitleOfType(animeData.titles, TitleType.DEFAULT);
  return (
    <div
      className="page-item-grid"
      onClick={() => (window.location.href = `/anime/${animeData.mal_id}`)}
    >
      <div className="flex column vertical-center space-around">
        <div className="flex column vertical-center">
          <em>Rank</em>
          <p>
            <b className="big">
              {formatStringInput(
                validateNumberInput(animeData.rank),
                `#${animeData.rank}`
              )}
            </b>
          </p>
        </div>
        <div className="flex column vertical-center">
          <em>Popularity</em>
          <p>
            <b className="big">
              {formatStringInput(
                validateNumberInput(animeData.popularity),
                `#${animeData.popularity}`
              )}
            </b>
          </p>
        </div>
      </div>
      <div>
        <img
          alt={validateNumberInput(animeData.mal_id)}
          src={validateStringInput(animeData.images?.jpg?.image_url)}
        ></img>
      </div>
      <div className="flex column space-around">
        <div className="flex column">
          <a href={`/anime/${animeData.mal_id}`}>
            <b>
              {validateStringInput(defaultTitle.title)}
              {` (${animeData.type})`}
            </b>
          </a>
        </div>
        <div className="flex column">
          <p>
            {formatStringInput(
              validateStringInput(animeData?.broadcast?.string)
            )}
          </p>
          <p>
            {formatStringInput(validateNumberInput(animeData?.episodes))}{" "}
            Episodes
            {` | ${animeData.duration}`}
          </p>
        </div>
        <div className="flex column">
          <InformationRow label="Studios">
            {joinPropertyOf(animeData.studios, "name", Delimiter.COMMA)}
          </InformationRow>
          <InformationRow label="Source">
            {formatStringInput(validateStringInput(animeData.source))}
          </InformationRow>
          <InformationRow label="Genres">
            {joinPropertyOf(animeData.genres, "name", Delimiter.COMMA)}
          </InformationRow>
          <InformationRow label="Themes">
            {joinPropertyOf(animeData.themes, "name", Delimiter.COMMA)}
          </InformationRow>
          <InformationRow label="Demographics">
            {joinPropertyOf(animeData.demographics, "name", Delimiter.COMMA)}
          </InformationRow>
        </div>
      </div>
    </div>
  );
};

export default AnimePageItem;
