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
    <p className="show-more" onClick={() => toggleShowMore()}>
      {isShowMore ? showLessAltText : showMoreAltText}
    </p>
  );
};

export default ShowMore;
