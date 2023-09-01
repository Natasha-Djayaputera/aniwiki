import React from "react";
import { titles } from "../../enum/titles";
import { anime_full } from "../../generated/jikan";
import { joinPropertyOf } from "../../helpers/array";
import { getDefaultDateFormat } from "../../helpers/datetime";
import { validateNumberInput } from "../../helpers/number";
import {
  formatStringInput,
  setSentenceCaseTo,
  setThousandSeparatorTo,
  validateStringInput,
} from "../../helpers/string";
import { getTitlesOfType } from "../../helpers/title";
import AnimeImage from "../AnimeImage";

export interface AnimeSidebarInfoProps {
  animeData: anime_full;
}

const AnimeSidebarInfo: React.FC<AnimeSidebarInfoProps> = ({ animeData }) => {
  const synonymsTitle = getTitlesOfType(animeData.titles, titles.type.SYNONYM);
  const japaneseTitle = getTitlesOfType(animeData.titles, titles.type.JAPANESE);

  return (
    <div className="anime-info">
      <AnimeImage animeData={animeData} />
      <div className="anime-info-grid">
        <h2 className="grid-subtitle">Alternative Titles</h2>

        <p>Synonyms</p>
        <p>{joinPropertyOf(synonymsTitle, "title")}</p>

        <p>Japanese</p>
        <p>{joinPropertyOf(japaneseTitle, "title")}</p>

        <h2 className="grid-subtitle">Information</h2>

        <p>Type</p>
        <p>{formatStringInput(validateStringInput(animeData.type))}</p>

        <p>Episodes</p>
        <p>{formatStringInput(validateNumberInput(animeData.episodes))}</p>

        <p>Status</p>
        <p>{formatStringInput(validateStringInput(animeData.status))}</p>

        <p>Aired</p>
        <p>{`${getDefaultDateFormat(
          animeData.aired?.from
        )} to ${getDefaultDateFormat(animeData.aired?.to)}`}</p>

        <p>Premiered</p>
        <p>{`${
          formatStringInput(setSentenceCaseTo(animeData.season)) + " "
        }${formatStringInput(
          validateNumberInput(animeData.year),
          undefined,
          ""
        )}`}</p>

        <p>Broadcast</p>
        <p>
          {formatStringInput(validateStringInput(animeData.broadcast?.string))}
        </p>

        <p>Producers</p>
        <p>{joinPropertyOf(animeData.producers, "name")}</p>

        <p>Licensors</p>
        <p>{joinPropertyOf(animeData.licensors, "name")}</p>

        <p>Studios</p>
        <p>{joinPropertyOf(animeData.studios, "name")}</p>

        <p>Source</p>
        <p>{formatStringInput(validateStringInput(animeData.source))}</p>

        <p>Genres</p>
        <p>{joinPropertyOf(animeData.genres, "name")}</p>

        <p>Themes</p>
        <p>{joinPropertyOf(animeData.themes, "name")}</p>

        <p>Demographic</p>
        <p>{joinPropertyOf(animeData.demographics, "name")}</p>

        <p>Duration</p>
        <p>{formatStringInput(validateStringInput(animeData.duration))}</p>

        <p>Rating</p>
        <p>{formatStringInput(validateStringInput(animeData.rating))}</p>

        <h2 className="grid-subtitle">Statistics</h2>

        <p>Score</p>
        <p>{`${animeData.score} ${formatStringInput(
          validateNumberInput(animeData.scored_by),
          `(Scored by ${formatStringInput(
            setThousandSeparatorTo(animeData.scored_by)
          )} users)`,
          ""
        )}`}</p>

        <p>Rank</p>
        <p>
          {formatStringInput(
            validateNumberInput(animeData.rank),
            `#${animeData.rank}`
          )}
        </p>

        <p>Popularity</p>
        <p>
          {formatStringInput(
            validateNumberInput(animeData.popularity),
            `#${animeData.popularity}`
          )}
        </p>
      </div>
    </div>
  );
};

export default AnimeSidebarInfo;
