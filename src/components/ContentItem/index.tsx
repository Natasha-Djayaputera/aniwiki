import { getNonUndefinedOrNullText } from "../../helpers/string";

export interface ContentItemProps {
  itemTitle: string;
  itemData: string | null | undefined;
}

const ContentItem: React.FC<ContentItemProps> = ({ itemTitle, itemData }) => {
  return (
    <>
      <h2>{itemTitle}</h2>
      <hr></hr>
      <p>{getNonUndefinedOrNullText(itemData)}</p>
    </>
  );
};

export default ContentItem;
