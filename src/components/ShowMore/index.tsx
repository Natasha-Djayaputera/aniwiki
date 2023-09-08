export interface ShowMoreProps {
  isShowMore: boolean;
  toggleShowMore: () => void;
  showMoreAltText?: string;
  showLessAltText?: string;
}

const ShowMore: React.FC<ShowMoreProps> = ({
  isShowMore,
  toggleShowMore,
  showMoreAltText = "Show more...",
  showLessAltText = "Show less...",
}) => {
  return (
    <>
      {!isShowMore && (
        <p className="show-more" onClick={toggleShowMore}>
          {showMoreAltText}
        </p>
      )}
      {isShowMore && (
        <p className="show-more" onClick={toggleShowMore}>
          {showLessAltText}
        </p>
      )}
    </>
  );
};

export default ShowMore;
