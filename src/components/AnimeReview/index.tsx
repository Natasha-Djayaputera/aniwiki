import { anime_reviews } from "../../generated/jikan";
import AnimeReviewItem from "../AnimeReviewItem";

export interface AnimeReviewProps {
  title: string;
  animeReviewsData: anime_reviews | undefined;
}

const AnimeReview: React.FC<AnimeReviewProps> = ({
  title,
  animeReviewsData,
}) => {
  if (animeReviewsData === undefined) {
    return null;
  }
  if (
    animeReviewsData.data === undefined ||
    animeReviewsData.data?.length === 0
  ) {
    return null;
  }

  const animeReviewMap = animeReviewsData.data
    .sort((dataA, dataB) => {
      if (
        typeof dataA.reactions?.overall === "number" &&
        typeof dataB.reactions?.overall === "number"
      ) {
        return dataB.reactions?.overall! - dataA.reactions?.overall!;
      } else {
        return 0;
      }
    })
    .slice(0, 5)
    .map((data) => {
      if (data === undefined) {
        return null;
      }
      return <AnimeReviewItem key={data.mal_id} animeReviewData={data} />;
    });

  return (
    <>
      <h2>{title}</h2>
      <hr></hr>
      {animeReviewMap}
    </>
  );
};

export default AnimeReview;
