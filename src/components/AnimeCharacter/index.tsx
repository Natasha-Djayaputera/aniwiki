import { isEmptyArray } from "../../helpers/array";
import { formatStringInput, validateStringInput } from "../../helpers/string";
import { useAnimeCharacters } from "../../hooks/useAnimeCharacters";
import { useFlipFlop } from "../../hooks/useFlipFlop";
import AnimeCharacterItem from "../AnimeCharacterItem";
import ShowMore from "../ShowMore";

export interface AnimeCharacterProps {
  animeId: number;
}

const AnimeCharacter: React.FC<AnimeCharacterProps> = ({ animeId }) => {
  const [isShowMore, , , toggleShowMore] = useFlipFlop(false);
  const animeCharacter = useAnimeCharacters(animeId);
  const animeCharacterData = animeCharacter?.data;

  if (
    isEmptyArray(animeCharacterData) ||
    typeof animeCharacterData[0].character?.name !== "string"
  ) {
    return null;
  }

  const characterItemMap = animeCharacterData
    .slice(0, !isShowMore ? 6 : animeCharacterData.length)
    .map((data) => {
      const currentData = data;
      return (
        <AnimeCharacterItem
          key={formatStringInput(
            validateStringInput(currentData.character?.name)
          )}
          animeCharacterData={currentData}
        />
      );
    });

  return (
    <>
      <h2>Characters & Voice Actors</h2>
      <hr />
      <div className="character-grid">{characterItemMap}</div>
      <ShowMore isShowMore={isShowMore} toggleShowMore={toggleShowMore} />
    </>
  );
};

export default AnimeCharacter;
