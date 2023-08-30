import { anime_reviews } from "../../generated/jikan";
import ReviewItem from "../ReviewItem";

export interface ReviewProps {
  title: string;
  itemData: anime_reviews | undefined;
}

const Review: React.FC<ReviewProps> = ({ title, itemData }) => {
  if (itemData === undefined) {
    return null;
  }
  if (itemData.data === undefined || itemData.data?.length === 0) {
    return null;
  }

  const animeReviewMap = itemData.data
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
      return <ReviewItem data={data} />;
    });

  return (
    <>
      <h2>{title}</h2>
      <hr></hr>
      {animeReviewMap}
    </>
  );
};

export default Review;
