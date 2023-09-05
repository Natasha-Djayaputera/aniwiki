import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { anime_review } from "../../generated/jikan";
import { getDefaultDateFormat } from "../../helpers/datetime";
import {
  formatStringInput,
  setLowerCaseAndDashTo,
  validateStringInput,
} from "../../helpers/string";
import ShowMore from "../ShowMore";

export interface AnimeReviewItemProps {
  animeReviewData: anime_review | undefined;
}

const AnimeReviewItem: React.FC<AnimeReviewItemProps> = ({
  animeReviewData,
}) => {
  const [isShowMore, setIsShowMore] = useState<boolean>(false);

  const toggleShowMore = () => {
    setIsShowMore(!isShowMore);
  };

  if (animeReviewData === undefined) {
    return null;
  }

  const reviewTagsMap = animeReviewData.tags?.map((tag) => {
    return (
      <p key={tag} className={`tags ${setLowerCaseAndDashTo(tag)}`}>
        {tag}
      </p>
    );
  });

  return (
    <>
      <div className="flex space-between review">
        <p>
          {formatStringInput(
            validateStringInput(animeReviewData.user?.username)
          )}
        </p>
        <p>{getDefaultDateFormat(animeReviewData.date)}</p>
      </div>
      <div className="flex flex-m">{reviewTagsMap}</div>
      <Rating
        initialValue={
          animeReviewData.score === undefined ? 0 : animeReviewData.score! / 2
        }
        readonly
        size={15}
      />
      <p className={`${isShowMore ? "" : "ellipsis-multiline"}`}>
        {formatStringInput(validateStringInput(animeReviewData.review))}
      </p>
      <ShowMore isShowMore={isShowMore} toggleShowMore={toggleShowMore} />
      <hr />
    </>
  );
};

export default AnimeReviewItem;
