import { useMemo } from "react";
import { anime_character } from "../../generated/jikan/models/anime_characters";

export interface AnimeCharacterItemProps {
  animeCharacterData: anime_character;
}

export const MAL_IMAGE_PLACEHOLDER_URL =
  "https://cdn.myanimelist.net/images/questionmark_23.gif?s=f7dcbc4a4603d18356d3dfef8abd655c";

export const IMAGE_PLACEHOLDER_URL =
  "https://upload.wikimedia.org/wikipedia/en/archive/b/b1/20210811082420%21Portrait_placeholder.png";

const AnimeCharacterItem: React.FC<AnimeCharacterItemProps> = ({
  animeCharacterData,
}) => {
  const japaneseVA = useMemo(
    () =>
      animeCharacterData.voice_actors?.find((va) => va.language === "Japanese"),
    [animeCharacterData.voice_actors]
  );

  if (
    typeof animeCharacterData.character?.images?.jpg?.image_url !== "string" ||
    animeCharacterData.voice_actors === undefined
  ) {
    return null;
  }

  const characterImage =
    animeCharacterData.character.images.jpg.image_url !==
    MAL_IMAGE_PLACEHOLDER_URL
      ? animeCharacterData.character.images.jpg.image_url
      : IMAGE_PLACEHOLDER_URL;

  const voiceActorLanguage = japaneseVA?.language ?? "";
  const voiceActorName = japaneseVA?.person?.name ?? "";
  const voiceActorImage =
    japaneseVA?.person?.images?.jpg?.image_url ?? IMAGE_PLACEHOLDER_URL;

  return (
    <div className="character-grid-item flex space-between">
      <img
        id={characterImage}
        key={characterImage}
        alt={characterImage}
        src={characterImage}
      ></img>
      <div className="character-text flex column">
        <div className="character-info">
          <p>{animeCharacterData.character.name}</p>
          <p>{animeCharacterData.role}</p>
        </div>
        <div className="voice-actor-info">
          <p>{voiceActorName}</p>
          <p>{voiceActorLanguage}</p>
        </div>
      </div>
      <img
        id={voiceActorImage}
        key={voiceActorImage}
        alt={voiceActorImage}
        src={voiceActorImage}
      ></img>
    </div>
  );
};

export default AnimeCharacterItem;
