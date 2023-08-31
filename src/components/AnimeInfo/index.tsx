import React from "react";
import { titles } from "../../enum/titles";
import { anime_full } from "../../generated/jikan";
import { joinPropertyOf } from "../../helpers/array";
import { getDefaultDateFormat } from "../../helpers/datetime";
import { setThousandSeperatorTo } from "../../helpers/number";
import {
  getNonUndefinedOrNullText,
  setSentenceCaseTo,
} from "../../helpers/string";
import { getTitlesOfType } from "../../helpers/title";
import Image from "../Image";

export interface AnimeInfoProps {
  animeData: anime_full;
}

const AnimeInfo: React.FC<AnimeInfoProps> = ({ animeData }) => {
  const synonymsTitle = getTitlesOfType(animeData.titles, titles.type.SYNONYM);
  const japaneseTitle = getTitlesOfType(animeData.titles, titles.type.JAPANESE);

  return (
    <div className="anime-info">
      <Image animeData={animeData} />
      <div className="anime-info-grid">
        <h2 className="grid-subtitle">Alternative Titles</h2>

        <p>Synonyms</p>
        <p>{joinPropertyOf(synonymsTitle, "title")}</p>

        <p>Japanese</p>
        <p>{joinPropertyOf(japaneseTitle, "title")}</p>

        <h2 className="grid-subtitle">Information</h2>

        <p>Type</p>
        <p>{getNonUndefinedOrNullText(animeData.type)}</p>

        <p>Episodes</p>
        <p>{getNonUndefinedOrNullText(animeData.episodes)}</p>

        <p>Status</p>
        <p>{getNonUndefinedOrNullText(animeData.status)}</p>

        <p>Aired</p>
        <p>{`${getDefaultDateFormat(
          animeData.aired?.from
        )} to ${getDefaultDateFormat(animeData.aired?.to)}`}</p>

        <p>Premiered</p>
        <p>{`${
          getNonUndefinedOrNullText(setSentenceCaseTo(animeData.season)) + " "
        }${getNonUndefinedOrNullText(animeData.year, undefined, "")}`}</p>

        <p>Broadcast</p>
        <p>{getNonUndefinedOrNullText(animeData.broadcast?.string)}</p>

        <p>Producers</p>
        <p>{joinPropertyOf(animeData.producers, "name")}</p>

        <p>Licensors</p>
        <p>{joinPropertyOf(animeData.licensors, "name")}</p>

        <p>Studios</p>
        <p>{joinPropertyOf(animeData.studios, "name")}</p>

        <p>Source</p>
        <p>{getNonUndefinedOrNullText(animeData.source)}</p>

        <p>Genres</p>
        <p>{joinPropertyOf(animeData.genres, "name")}</p>

        <p>Themes</p>
        <p>{joinPropertyOf(animeData.themes, "name")}</p>

        <p>Demographic</p>
        <p>{joinPropertyOf(animeData.demographics, "name")}</p>

        <p>Duration</p>
        <p>{getNonUndefinedOrNullText(animeData.duration)}</p>

        <p>Rating</p>
        <p>{getNonUndefinedOrNullText(animeData.rating)}</p>

        <h2 className="grid-subtitle">Statistics</h2>

        <p>Score</p>
        <p>{`${animeData.score} ${getNonUndefinedOrNullText(
          animeData.scored_by,
          `(Scored by ${setThousandSeperatorTo(animeData.scored_by)} users)`,
          ""
        )}`}</p>

        <p>Rank</p>
        <p>{getNonUndefinedOrNullText(animeData.rank, `#${animeData.rank}`)}</p>

        <p>Popularity</p>
        <p>
          {getNonUndefinedOrNullText(
            animeData.popularity,
            `#${animeData.popularity}`
          )}
        </p>
      </div>
    </div>
  );
};

export default AnimeInfo;
