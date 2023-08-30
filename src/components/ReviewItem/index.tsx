import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { anime_review } from "../../generated/jikan";
import { getDefaultDateFormat } from "../../helpers/datetime";
import {
  getNonUndefinedOrNullText,
  setLowerCaseAndDashTo,
} from "../../helpers/string";

export interface ReviewItemProps {
  data: anime_review | undefined;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ data }) => {
  const [isShowMore, setIsShowMore] = useState<boolean>(false);

  const toggleShowMore = () => {
    setIsShowMore(!isShowMore);
  };

  if (data === undefined) {
    return null;
  }

  const reviewTagsMap = data.tags?.map((tag) => {
    return <p className={`tags ${setLowerCaseAndDashTo(tag)}`}>{tag}</p>;
  });

  return (
    <>
      <div className="flex space-between review">
        <p>{getNonUndefinedOrNullText(data.user?.username)}</p>
        <p>{getDefaultDateFormat(data.date)}</p>
      </div>
      <div className="flex flex-m">{reviewTagsMap}</div>
      <Rating
        initialValue={data.score === undefined ? 0 : data.score! / 2}
        readonly
        size={15}
      />
      <p className={`${isShowMore ? "" : "ellipsis-multiline"}`}>
        {getNonUndefinedOrNullText(data.review)}
      </p>
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
      <hr />
    </>
  );
};

export default ReviewItem;
