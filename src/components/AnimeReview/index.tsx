import { anime_reviews } from "../../generated/jikan";
import { isEmptyArray } from "../../helpers/array";
import AnimeReviewItem from "./partials/AnimeReviewItem";

export interface AnimeReviewProps {
  title: string;
  animeReviewsData: anime_reviews | undefined;
}

const AnimeReview: React.FC<AnimeReviewProps> = ({
  title,
  animeReviewsData,
}) => {
  const animeReviewsDatas = animeReviewsData?.data;

  if (isEmptyArray(animeReviewsDatas)) {
    return null;
  }

  const animeReviewMap = animeReviewsDatas
    .sort((dataA, dataB) => {
      if (
        typeof dataA.reactions?.overall !== "number" ||
        typeof dataB.reactions?.overall !== "number"
      ) {
        return 0;
      }
      return dataB.reactions?.overall! - dataA.reactions?.overall!;
    })
    .slice(0, 5)
    .map((data) => (
      <AnimeReviewItem key={data.mal_id} animeReviewData={data} />
    ));

  return (
    <>
      <h2>{title}</h2>
      <hr />
      {animeReviewMap}
    </>
  );
};

export default AnimeReview;
