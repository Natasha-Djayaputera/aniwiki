import { recommendation } from "../../generated/jikan/models/recommendations";
import { validateNumberInput } from "../../helpers/number";
import { validateStringInput } from "../../helpers/string";

export interface AnimeRecommendationProps {
  animeRecommendationData: recommendation | undefined;
}

const AnimeRecommendation: React.FC<AnimeRecommendationProps> = ({
  animeRecommendationData,
}) => {
  if (
    animeRecommendationData === undefined ||
    animeRecommendationData.entry === undefined
  ) {
    return null;
  }
  const sourceAnime = animeRecommendationData.entry[0];
  const recommendedAnime = animeRecommendationData.entry[1];

  return (
    <div className="grid-2">
      <div
        className="flex recommendation-item"
        onClick={() => (window.location.href = `/anime/${sourceAnime.mal_id}`)}
      >
        <div>
          <img
            alt={validateNumberInput(sourceAnime.mal_id)}
            src={validateStringInput(sourceAnime.images?.jpg?.image_url)}
          />
        </div>
        <div className="flex column">
          <p>If you liked</p>
          <p>
            <b>{validateStringInput(sourceAnime.title)}</b>
          </p>
        </div>
      </div>
      <div
        className="flex recommendation-item"
        onClick={() =>
          (window.location.href = `/anime/${recommendedAnime.mal_id}`)
        }
      >
        <div>
          <img
            alt={validateNumberInput(recommendedAnime.mal_id)}
            src={validateStringInput(recommendedAnime.images?.jpg?.image_url)}
          />
        </div>
        <div className="flex column">
          <p>...then you might like</p>
          <p>
            <b>{validateStringInput(recommendedAnime.title)}</b>
          </p>
        </div>
      </div>
      <div className="grid-subtitle">
        <p>{animeRecommendationData.content}</p>
      </div>
    </div>
  );
};

export default AnimeRecommendation;
