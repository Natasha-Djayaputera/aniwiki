import { anime_character } from "../../generated/jikan/models/anime_characters";

export interface CharacterItemProps {
  characterData: anime_character;
}

export const MALIMAGEPLACEHOLDERURL =
  "https://cdn.myanimelist.net/images/questionmark_23.gif?s=f7dcbc4a4603d18356d3dfef8abd655c";

export const IMAGEPLACEHOLDERURL =
  "https://upload.wikimedia.org/wikipedia/en/archive/b/b1/20210811082420%21Portrait_placeholder.png";

const CharacterItem: React.FC<CharacterItemProps> = ({
  characterData: data,
}) => {
  if (
    typeof data.character?.images?.jpg?.image_url === "string" &&
    data.voice_actors !== undefined
  ) {
    let characterImage = IMAGEPLACEHOLDERURL;
    let voiceActorLanguage = "";
    let voiceActorName = "";
    let voiceActorImage = IMAGEPLACEHOLDERURL;

    if (data.character.images.jpg.image_url !== MALIMAGEPLACEHOLDERURL) {
      characterImage = data.character.images.jpg.image_url;
    }

    const japaneseVA = data.voice_actors.find(
      (va) => va.language === "Japanese"
    );

    if (japaneseVA !== undefined) {
      voiceActorLanguage = japaneseVA.language ?? "";
      voiceActorName = japaneseVA.person?.name ?? "";
      voiceActorImage = japaneseVA.person?.images?.jpg?.image_url ?? "";
    }

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
            <p>{data.character.name}</p>
            <p>{data.role}</p>
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
  }
  return null;
};

export default CharacterItem;
