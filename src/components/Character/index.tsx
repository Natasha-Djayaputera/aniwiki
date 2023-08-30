import { useState } from "react";
import { getNonUndefinedOrNullText } from "../../helpers/string";
import { useAnimeCharacters } from "../../hooks/useAnimeCharacters";
import CharacterItem from "../CharacterItem";

export interface CharacterProps {
  id: number;
}

const Character: React.FC<CharacterProps> = ({ id }) => {
  const [isShowMore, setIsShowMore] = useState<boolean>(false);
  const animeCharacter = useAnimeCharacters(id);

  const toggleShowMore = () => {
    setIsShowMore(!isShowMore);
  };

  if (animeCharacter === undefined) {
    return null;
  } else if (animeCharacter.data === undefined) {
    return null;
  } else {
    if (
      animeCharacter.data.length !== 0 &&
      typeof animeCharacter.data[0].character?.name === "string"
    ) {
      const characterItemMap = animeCharacter.data
        .slice(0, !isShowMore ? 6 : animeCharacter.data.length)
        .map((data) => {
          const currentData = data;
          return (
            <CharacterItem
              key={getNonUndefinedOrNullText(currentData.character?.name)}
              characterData={currentData}
            />
          );
        });

      return (
        <>
          <h2>Characters & Voice Actors</h2>
          <hr></hr>
          <div className="character-grid">{characterItemMap}</div>
          {!isShowMore && (
            <p className="show-more" onClick={toggleShowMore}>
              Show more...
            </p>
          )}
          {isShowMore && (
            <p className="show-more" onClick={toggleShowMore}>
              Show less...
            </p>
          )}
        </>
      );
    }

    return null;
  }
};

export default Character;
