export interface ShowMoreProps {
  isShowMore: boolean;
  toggleShowMore: () => void;
}

const ShowMore: React.FC<ShowMoreProps> = ({ isShowMore, toggleShowMore }) => {
  return (
    <>
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
    </>
  );
};

export default ShowMore;
